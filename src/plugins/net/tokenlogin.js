import { request } from '../net/request'
import baseurl from '../api/baseurl'

export default function (token) {
  return request({
    url: '/tokenlogin',
    method: 'post',
    baseURL: baseurl.local,
    headers: {
      Token: token
    }
  })
}
