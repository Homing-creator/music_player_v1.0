import { request } from './request'
import baseurl from '../api/baseurl'

export default function (id) {
  return request({
    baseURL: baseurl.local,
    method: 'get',
    url: '/song',
    params: {
      id
    }
  })
}
