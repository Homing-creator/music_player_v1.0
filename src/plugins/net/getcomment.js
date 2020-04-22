import { request } from './request'
import baseurl from '../api/baseurl'

export default function (songId) {
  return request({
    baseURL: baseurl.local,
    url: '/comment',
    method: 'get',
    params: {
      songId
    }
  })
}
