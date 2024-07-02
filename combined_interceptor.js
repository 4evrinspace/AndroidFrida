Java.perform(function() {
    var secretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
    var ivParameterSpec = Java.use('javax.crypto.spec.IvParameterSpec');
    var cipher = Java.use('javax.crypto.Cipher');
    secretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function(arr, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpec_init_1.call(this, arr, alg);
    }

    secretKeySpec.$init.overload('[B', 'int', 'int', 'java.lang.String').implementation = function(arr, off, len, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpec_init_2.call(this, arr, off, len, alg);
    }

    ivParameterSpec.$init.overload('[B').implementation = function(arr)
    {
        var iv = b2s(arr);
        send("Creating IV:\\n" + hexdump(iv));
        return ivParameterSpec_init_1.call(this, arr);
    }

    ivParameterSpec.$init.overload('[B', 'int', 'int').implementation = function(arr, off, len)
    {
        var iv = b2s(arr);
        send("Creating IV, plaintext:\\n" + hexdump(iv));
        return ivParameterSpec_init_2.call(this, arr, off, len);
    }

    cipher.doFinal.overload().implementation = function() {
        var ret = cipherDoFinal_1.call(this);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B').implementation = function(arr) {
        addtoarray(arr);
        var ret = cipherDoFinal_2.call(this, arr);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int').implementation = function(arr, a) {
        addtoarray(arr);
        var ret = cipherDoFinal_3.call(this, arr, a);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int').implementation = function(arr, a, b) {
        addtoarray(arr);
        var ret = cipherDoFinal_4.call(this, arr, a, b);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int', '[B').implementation = function(arr, a, b, c) {
        addtoarray(arr);
        var ret = cipherDoFinal_5.call(this, arr, a, b, c);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipher.doFinal.overload('[B', 'int', 'int', '[B', 'int').implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        var ret = cipherDoFinal_6.call(this, arr, a, b, c, d);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, c);
        return ret;
    }

    cipher.update.overload('[B').implementation = function(arr) {
        addtoarray(arr);
        return cipherUpdate_1.call(this, arr);
    }

    cipher.update.overload('[B', 'int', 'int').implementation = function(arr, a, b) {
        addtoarray(arr);
        return cipherUpdate_2.call(this, arr, a, b);
    }

    cipher.update.overload('[B', 'int', 'int', '[B').implementation = function(arr, a, b, c) {
        addtoarray(arr);
        return cipherUpdate_3.call(this, arr, a, b, c);
    }

    cipher.update.overload('[B', 'int', 'int', '[B', 'int').implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        return cipherUpdate_4.call(this, arr, a, b, c, d);
    }
    function info(iv, alg, plain, encoded) {
        send("Performing encryption/decryption");
        if (iv) {
            send("Initialization Vector: \\n" + hexdump(b2s(iv)));
        } else {
            send("Initialization Vector: " + iv);
        }
        send("Algorithm: " + alg);
        send("In: \\n" + hexdump(b2s(plain)));
        send("Out: \\n" + hexdump(b2s(encoded)));
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
    var Hash = Java.use("java.security.MessageDigest");
    Hash.getInstance.overload('java.lang.String').implementation = function (HashAlgorithm) {
        console.log("getInstance caught: " + HashAlgorithm);
        return this.getInstance(HashAlgorithm);
    };
    Hash.update.overload("[B").implementation = function (AddedBytes) {
        console.log("Update caught: " + toHexString(AddedBytes));
        this.update(AddedBytes);
    };
    Hash.digest.overload().implementation = function () { 
        let OutputBytes = this.digest();
        console.log("Digest caught: " + toHexString(OutputBytes));
        return OutputBytes;
    };
    function toHexString(byteArray) {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
      }

});