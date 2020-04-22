import { request } from './request'
import baseurl from '../api/baseurl'

export default function (token) {
  return request({
    baseURL: baseurl.local,
    url: '/collection',
    method: 'get',
    headers: {
      token
    }
  })
}
