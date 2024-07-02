function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }


Java.perform(() => {
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

});
