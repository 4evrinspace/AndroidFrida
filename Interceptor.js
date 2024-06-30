function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }


Java.perform(() => {
    var Crypto = Java.use("java.security.MessageDigest");
    var Cipher = Java.use("javax.crypto.Cipher");
    Crypto.getInstance.overload('java.lang.String').implementation = function (v) {
        console.log("Crypto caught");
        console.log(v);
        return this.getInstance(v);
    };
    Crypto.update.overload("[B").implementation = function (v) {
        console.log("Update caught");
        console.log(toHexString(v));
        this.update(v);
    };
    Crypto.digest.overload().implementation = function () { 
        console.log("Digest caught");
        let bytes = this.digest();
        console.log(toHexString(bytes));
        return bytes;
    };
    Cipher.doFinal.overload('[B').implementation = function (v) {
        var test = this.doFinal(v);
        console.log(test);
        return test;
    };
});
