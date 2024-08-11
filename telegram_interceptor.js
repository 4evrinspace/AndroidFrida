Java.perform(function() {
    console.log("enter");
    var sym = Module.findExportByName("libtmessages.49.so", "_ZN10Datacenter16aesIgeEncryptionEPhS0_S0_bbj");
    if (sym !== null) {
        Interceptor.attach(sym, {
            onEnter(args) {
                console.log("[+] Datacenter::aesIgeEncryption called");
            },
            onLeave(retval) {
                console.log("[+] Datacenter::aesIgeEncryption returned: " + retval);
            }
        });
    } else {
        console.log("[!] Datacenter::aesIgeEncryption not found!");
    }
    var encryption = Java.use("org.telegram.messenger.voip.Instance$EncryptionKey");
    console.log("exit");
    encryption.$init.overload.implementation = function(ar1, ar2) {
        var key = this.$init(ar1, ar2);
        console.log(key.toString());
        return key;
    }

    var tlrpc = Java.use("org.telegram.TLRPC$EncryptedMessage");
    console.log("exit");
    encryption.$init.overload.implementation = function(ar1, ar2) {
        var key = this.$init(ar1, ar2);
        console.log(key.toString());
        return key;
    }
    
});
