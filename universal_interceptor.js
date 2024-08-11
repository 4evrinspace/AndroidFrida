
function logging () {
    Java.enumerateLoadedClassesSync().filter(c => c.includes(intercepted_package)).forEach(c => {
            try {
                var currentClass = Java.use(c);
                var classMethods = currentClass.class.getDeclaredMethods();
                classMethods.forEach(curMethod => {
                    var method = currentClass[curMethod.getName()];
                    if (!method) {
                        return;
                    }
                    var overloads = method.overloads;
                    for (var overload of overloads) {
                        overload.implementation = function () {
                            console.log('Called:' + curMethod.getDeclaringClass().getName() + '.' + curMethod.getName());
                            var i = 0;
                                for (var arg of arguments) {
                                    if (arg !== null && arg !== undefined) {
                                        console.log(`\tArgs[${i}]: ${arg.toString()}`);
                                    }
                                    i += 1;
                                }

                            var ret = this[curMethod.getName()].apply(this, arguments);
                            if (ret !== null && ret !== undefined) {
                                console.log(`\t\t- Returned:${ret.toString()}`)
                            }
                            return ret;
                        };
                    }
                });
            } catch (e) {
                console.log("Error");
            }
        });
};

setTimeout(function () {
    Java.perform(function () {
        logging();
    });
}, 1000);

