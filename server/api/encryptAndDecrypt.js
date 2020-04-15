const crypto = require('crypto-js')

const secretKey = crypto.MD5('homingsecretkey').toString()
/*
* md5 加密
* var hash = CryptoJS.MD5("Message");
*/
/* aes 加密/ 解密
var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
*  */

const aesEncrypt = function (message) {
  return crypto.AES.encrypt(message, secretKey).toString()
}

const aesDecrypt = function (ciphertext) {
  return crypto.AES.decrypt(ciphertext, secretKey).toString(crypto.enc.Utf8)
}

module.exports = {
  aesEncrypt,
  aesDecrypt
}
