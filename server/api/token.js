const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')

const privateKey = md5('homingPrivateKey')

// 生成 token
const generateToken = function (payload) {
  // sign(payload,secret, {expiresIn:60*60*24// 授权时效24小时})
  // 此方法会生成一个 token ，第一个参数是数据，第二个参数是签名,第三个参数是设置
  return jwt.sign(payload, privateKey, {
    // expiresIn: '24h' // 生存时间 24 小时
    expiresIn: '30 days'
  })
}

// 检验 token
const verifyToken = function (token, callback) {
  return jwt.verify(token, privateKey, callback)
}

module.exports = {
  generateToken,
  verifyToken
}
