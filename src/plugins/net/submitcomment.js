import { request } from './request'
import baseurl from '../api/baseurl'
import { Message } from 'element-ui'

export default function (songId, message, token) {
  return request({
    baseURL: baseurl.local,
    url: '/comment',
    method: 'post',
    headers: {
      Token: token
    },
    data: {
      songId,
      message
    }
  }).then(response => {
    if (response.status === 200) {
      switch (response.data.err_code) {
        // 0 登录成功
        case 10:
          Message.success({
            message: '评论成功'
          })
          break
      }
    }
  }).catch(err => {
    Message.error({
      message: err
    })
  })
}
