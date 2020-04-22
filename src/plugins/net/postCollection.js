import { request } from './request'
import baseurl from '../api/baseurl'

export default function (list) {
  return request({
    baseURL: baseurl.local,
    url: '/collection',
    method: 'post',
    data: {
      list
    }
  })
}
