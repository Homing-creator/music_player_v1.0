import { request } from './request'

export default function (keywords) {
  return request({
    url: '/search',
    method: 'get',
    params: {
      keywords
    }
  })
}
