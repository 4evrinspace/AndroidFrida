Java.perform(function() {
    var use_single_byte = false;
    var complete_bytes = new Array();
    var index = 0;
    
    var secretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
    var ivParameterSpec = Java.use('javax.crypto.spec.IvParameterSpec');
    var cipher = Java.use('javax.crypto.Cipher');
    var keyFactory = Java.use('java.security.KeyFactory');
    var encodedKeySpec = Java.use('java.security.spec.EncodedKeySpec');
    keyFactory.getInstance.overload('java.lang.String').implementation = function(alg) {
        console.log("Using " + alg + "for keyFactory");
        return this.getInstance(alg);
    }
    keyFactory.generatePrivate.overload('java.security.spec').implementation = function(key) {
        var privatekey = this.generatePrivate(key);
        console.log(privatekey);
        return privatekey
    }
    secretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function(arr, alg) {
        var key = b2s(arr);
        console.log("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return this.$init(arr, alg);
    }

    secretKeySpec.$init.overload('[B', 'int', 'int', 'java.lang.String').implementation = function(arr, off, len, alg) {
        var key = b2s(arr);
        console.log("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return this.$init(arr, off, len, alg);
    }

    ivParameterSpec.$init.overload('[B').implementation = function(arr)
    {
        var iv = b2s(arr);
        console.log("Creating IV:\\n" + hexdump(iv));
        return this.$init(arr);
    }

    ivParameterSpec.$init.overload('[B', 'int', 'int').implementation = function(arr, off, len)
    {
        var iv = b2s(arr);
        console.log("Creating IV, plaintext:\\n" + hexdump(iv));
        return this.$init(arr, off, len);
    }

    cipher.doFinal.overload().implementation = function() {
        var ret = this.doFinal();
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B').implementation = function(arr) {
        addtoarray(arr);
        var ret = this.doFinal(arr);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int').implementation = function(arr, a) {
        addtoarray(arr);
        var ret = this.doFinal(arr, a);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int').implementation = function(arr, a, b) {
        addtoarray(arr);
        var ret = this.doFinal(arr, a, b);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int', '[B').implementation = function(arr, a, b, c) {
        addtoarray(arr);
        var ret = this.doFinal(arr, a, b, c);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int', '[B', 'int').implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        var ret = this.doFinal(arr, a, b, c, d);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, c);
        return ret;
    }

    cipher.update.overload('[B').implementation = function(arr) {
        addtoarray(arr);
        return this.update(arr);
    }

    cipher.update.overload('[B', 'int', 'int').implementation = function(arr, a, b) {
        addtoarray(arr);
        return this.update(arr, a, b);
    }

    cipher.update.overload('[B', 'int', 'int', '[B').implementation = function(arr, a, b, c) {
        addtoarray(arr);
        return this.update(arr, a, b, c);
    }

    cipher.update.overload('[B', 'int', 'int', '[B', 'int').implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        return this.updatel(arr, a, b, c, d);
    }
    function info(iv, alg, plain, encoded) {
        console.log("Performing encryption/decryption");
        if (iv) {
            console.log("Initialization Vector: \\n" + hexdump(b2s(iv)));
        } else {
            console.log("Initialization Vector: " + iv);
        }
        console.log("Algorithm: " + alg);
        console.log("In: \\n" + hexdump(b2s(plain)));
        console.log("Out: \\n" + hexdump(b2s(encoded)));
        complete_bytes = [];
        index = 0;
    }

    function hexdump(buffer, blockSize) {
        blockSize = blockSize || 16;
        var lines = [];
        var hex = "0123456789ABCDEF";
        for (var b = 0; b < buffer.length; b += blockSize) {
            var block = buffer.slice(b, Math.min(b + blockSize, buffer.length));
            var addr = ("0000" + b.toString(16)).slice(-4);
            var codes = block.split('').map(function(ch) {
                var code = ch.charCodeAt(0);
                return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
            }).join("");
            codes += "   ".repeat(blockSize - block.length);
            var chars = block.replace(/[\\x00-\\x1F\\x20]/g, '.');
            chars += " ".repeat(blockSize - block.length);
            lines.push(addr + " " + codes + "  " + chars);
        }
        return lines.join("\\n");
    }

    function b2s(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode((array[i] % 256 + 256 ) % 256);
        }
        return result;
    }

    function addtoarray(arr) {
        for (var i = 0; i < arr.length; i++) {
            complete_bytes[index] = arr[i];
            index = index + 1;
        }
    }
});
