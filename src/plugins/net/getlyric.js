import { request } from './request'

export default function (id) {
  return request({
    method: 'get',
    url: '/lyric',
    params: {
      id
    },
    responseType: 'text'
  })
}
