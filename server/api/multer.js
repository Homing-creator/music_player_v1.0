const multer = require('multer')

// 保存文件的路径
const saveUrl = './public/songs'

const storage = multer.diskStorage({
  destination (request, file, callback) {
    callback(null, saveUrl)
  },
  filename (request, file, callback) {
    // file.originalname 为原始的文件名
    // 取后缀名
    // const fileFormat = (file.originalname).split('.').pop()
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage
})

module.exports = {
  upload
}
