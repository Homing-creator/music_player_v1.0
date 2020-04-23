import { request } from './request'

export default function (ids) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  })
}
