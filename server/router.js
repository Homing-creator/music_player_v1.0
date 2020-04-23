const express = require('express')
const path = require('path')

const mysqldbMD = require('./api/mysqldb')
const tokenMD = require('./api/token')
const encryptMD = require('./api/encryptAndDecrypt')
const { upload } = require('./api/multer')
const similarityMD = require('./api/similarity')

const router = express.Router()

// 验证 解析 token
// router.use(function (request, response, next) {
//   const urlList = ['/register', '/login', '/tokenlogin']
//   if (urlList.indexOf(request.url) === -1) {
//     console.log(request.headers, 1)
//     if (request.headers['token']) {
//       const reqToken = request.headers['token']
//       tokenMD.verifyToken(reqToken, function (error, decode) {
//         // token 过期
//         if (error !== null) {
//           return response.status(403).json({
//             message: 'Token expired...'
//           })
//         }
//       })
//     }
//   }
//   next()
// })

// tokenlogin 请求处理
router.post('/tokenlogin', async function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      const userInfo = {
        name: userData.userName,
        avatar: userData.userAvatar
      }

      return response.status(200).json({
        err_code: 10,
        userInfo: encryptMD.aesEncrypt(JSON.stringify(userInfo))
      })
    } catch (e) {
      return response.status(200).json({
        message: e
      })
    }
  })
})

// 注册请求处理
router.post('/register', async function (request, response) {
  const body = request.body
  try {
    // 检测邮箱是否存在
    // mysqldbMD.selectOne 会返回一个数组
    // 点操作符运算优先级比 await 高，此处要加上括号
    if ((await mysqldbMD.selectOne('user', { userEmail: body.userEmail })).length > 0) {
      return response.status(200).json({
        err_code: 1
      })
    }

    // 检测用户名是否已存在
    if ((await mysqldbMD.selectOne('user', { userName: body.userName })).length > 0) {
      return response.status(200).json({
        err_code: 2
      })
    }

    // 注册成功 保存用户信息到 mysql 数据库
    body.userPassword = encryptMD.aesDecrypt(body.userPassword)
    await mysqldbMD.insert('user', body)
    return response.status(200).json({
      err_code: 0
    })
  } catch (e) {
    return response.status(500).json({
      err_code: 500,
      message: e.message
    })
  }
})

// 登录请求处理
router.post('/login', async function (request, response) {
  const body = request.body
  body.userPassword = encryptMD.aesDecrypt(body.userPassword)
  try {
    let userData = await mysqldbMD.selectOne('user', { userEmail: body.userEmail })
    // 检测邮箱是否存在
    // 邮箱不存在：
    if (userData.length === 0) {
      return response.status(200).json({
        err_code: 11
      })
    }

    // 取到真正的用户数据对象
    userData = userData[0]

    // 密码错误：
    if (body.userPassword !== userData.userPassword) {
      return response.status(200).json({
        err_code: 12
      })
    }

    // 密码正确，生成 token
    const payload = {
      email: userData.userEmail,
      password: userData.userPassword
    }
    const resToken = tokenMD.generateToken(payload)

    // 返回用户的头像，用户名
    const userInfo = {
      name: userData.userName,
      avatar: userData.userAvatar
    }

    return response.status(200).json({
      err_code: 10,
      token: resToken,
      userInfo: encryptMD.aesEncrypt(JSON.stringify(userInfo))
    })
  } catch (e) {
    return response.status(500).json({
      err_code: 500,
      message: e.message
    })
  }
})

// 音乐上传处理
router.post('/uploadfile', upload.single('file'), function (request, response) {
  // upload.single('file')(request, response, function (error) {
  //   const file = request.file
  //   // {
  //   //   fieldname: 'file',
  //   //   originalname: '银临,云の泣 - 锦鲤抄.mp3',
  //   //   encoding: '7bit',
  //   //   mimetype: 'audio/mp3',
  //   //   destination: './public/songs',
  //   //   filename: '银临,云の泣 - 锦鲤抄.mp3',
  //   //   path: 'public\\songs\\银临,云の泣 - 锦鲤抄.mp3',
  //   //   size: 9863155
  //   // }
  // })
  const file = request.file

  if (file.length === 0) {
    return response.status(200).json({
      err_code: 21,
      message: 'upload error'
    })
  }
  // 文件上传成功，保存文件信息到数据库
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      const param = {
        userId: userData.userId,
        fileName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
        size: file.size
      }

      await mysqldbMD.insert('upload', param)
      return response.status(200).json({
        err_code: 20,
        message: 'upload success'
      })
    } catch (e) {
      return response.status(200).json({
        message: e
      })
    }
  })
})

// 获取用户上传列表处理
router.post('/uploadlist', async function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      const list = await mysqldbMD.selectAll('upload', { userId: userData.userId})

      return response.status(200).json({
        list
      })
    } catch (e) {
      return response.status(500).json({
        message: e
      })
    }
  })
})

// 音乐下载处理
router.get('/song', async function (request, response) {
  try {
    let songData = await mysqldbMD.selectOne('upload', { songId: request.query.id })
    songData = songData[0]
    const fileName = songData.fileName
    response.set('Content-Type', songData.mimeType)
    response.download(path.join(__dirname, '/public/songs', fileName), fileName)
  } catch (e) {
    response.status(500).json({
      message: e
    })
  }
})

// 评论处理
router.get('/comment', async function (request, response) {
  const songId = request.query.songId
  try {
    const commentList = await mysqldbMD.selectAll('comment', { comMusicId: songId })
    return response.status(200).json({
      commentList
    })
  } catch (e) {
    return response.status(500).json({
      message: e
    })
  }
})
router.post('/comment', function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      const body = request.body


      await mysqldbMD.insert('comment', {
        comMusicId: body.songId,
        comUserId: userData.userId,
        comUserName: userData.userName,
        comContent: body.message
      })

      return response.status(200).json({
        err_code: 30,
        message: 'Comment success'
      })
    } catch (e) {
      return response.status(500).json({
        message: e
      })
    }
  })
})

// 收藏处理
router.get('/collection', function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      const list = await mysqldbMD.selectAll('collection', { userId: userData.userId })
      return response.status(200).json({
        list
      })
    } catch (e) {
      return response.status(500).json({
        message: e
      })
    }
  })
})
router.post('/collection', function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      await mysqldbMD.deleteOne('collection', { userId: userData.userId, songId: request.body.songId})
      request.body.userId = userData.userId
      await mysqldbMD.insert('collection', request.body)

      return response.send('ok')
    } catch (e) {
      return response.status(500).json({
        message: e
      })
    }
  })
})

router.post('/cancelcollection', function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) {
      return response.status(403).json({
        message: 'Token expired...'
      })
    }

    try {
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]

      await mysqldbMD.deleteOne('collection', { userId: userData.userId, songId: request.body.songId})

      return response.send('ok')
    } catch (e) {
      return response.status(500).json({
        message: e
      })
    }
  })
})

router.post('/recommend', function (request, response) {
  const token = request.headers['token']
  tokenMD.verifyToken(token, async function (error, decode) {
    // token 过期
    if (error !== null) { return response.status(403).json({ message: 'Token expired...' }) }

    try {
      // 获取用户信息
      let userData = await mysqldbMD.selectOne('user', { userEmail: decode.email })
      userData = userData[0]
      // 获取用户收藏列表 list [{songId, songName, singer, songCover}, {}]
      const list = await mysqldbMD.selectSongId('collection', { userId: userData.userId })
      const songIdLista = list.map(value => value.songId)

      // 获取所有的用户 id [1,2,3]
      const idList = (await mysqldbMD.selectUserId('user', userData.userId)).map(v => v.userId)

      let resultList = []
      for (let i = 0; i < idList.length; i++) {
        // [{songId, songName, singer, songCover}, {}]
        const userCollectionList = await mysqldbMD.selectSongId('collection', { userId: idList[i] })
        const songIdListb = userCollectionList.map(value => value.songId)

        const similar = similarityMD(songIdLista, songIdListb)
        if (similar >= 0.1) {
          // 用户相似
          const similarList = userCollectionList.filter(v => !songIdLista.includes(v.songId))
          resultList = resultList.concat(similarList)
        }
        if (resultList.length >= 4) { break }
      }
      return response.status(200).json({
        list: resultList
      })
    } catch (e) {
      return response.status(500).json({ message: e })
    }
  })
})

module.exports = router
