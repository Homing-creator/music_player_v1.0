import { request } from '../net/request'
import baseurl from '../api/baseurl'
import { aesEncrypt } from '../api/encrypt'
import qs from 'qs'
import { Message } from 'element-ui'

export default function (data) {
  return request({
    url: '/login',
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
        // 0 登录成功
        case 10:
          Message.success({
            message: '登录成功'
          })
          return Promise.resolve(response.data)
        // 1 邮箱不存在
        case 11:
          Message.error({
            message: '邮箱不存在'
          })
          break
        // 2 密码错误
        case 12:
          Message.error({
            message: '密码错误'
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
    Message.error({
      message: error
    })
  })
}
