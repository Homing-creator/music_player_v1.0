import { request } from '../net/request'
import baseurl from '../api/baseurl'
import { aesEncrypt } from '../api/encrypt'
import qs from 'qs'
import { Message } from 'element-ui'

export default function (data) {
  return request({
    url: '/register',
    method: 'post',
    baseURL: baseurl.local,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: function (data) {
      // 对 data 进行任意转换处理
      // 密码加密
      data.userPassword = aesEncrypt(data.userPassword)
      // post 方法的时候 data 需要进行序列化处理，否则后台接收不到数据，且与 headers 有关
      return qs.stringify(data)
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  }).then(response => {
    if (response.status === 200) {
      switch (response.data.err_code) {
        // 0 注册成功
        case 0:
          Message.success({
            message: '注册成功，请登录...'
          })
          // resolve()
          break
        // 1 邮箱已存在
        case 1:
          Message.error({
            message: '邮箱已存在'
          })
          break
        // 2 用户名已存在
        case 2:
          Message.error({
            message: '用户名已存在'
          })
          break
        // 500 服务器繁忙
        case 500:
          Message.error({
            message: '服务器繁忙，请稍后重试...'
          })
          break
        default:
          Message.error({
            message: '未知错误'
          })
      }
    }
  }).catch(error => {
    Message.error(error)
  })
}
