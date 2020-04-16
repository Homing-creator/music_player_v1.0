const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router')

let app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(path.join(__dirname, './node_modules/'))))

// app.engine('html', require('express-art-template'))
// app.set('views', path.join(__dirname, './views/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*", function (req, res,next){
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Token")
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  // 跨域允许时间 单位 s 用于缓存 option 请求，达到允许时间内只有一次 option 的效果
  res.header("Access-Control-Max-Age", "2592000")
  if (req.method.toLowerCase() === 'options')
    res.sendStatus(200)  //让options尝试请求快速结束
  else
    next()
})

app.use(router)

app.use(function (request, response) {
  return response.sendStatus(404)
})

app.listen(5000, function () {
  console.log('running in 5000')
})
