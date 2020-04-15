import { request } from './request'

export function getMusicdata () {
  return request({
    // url: 'img/module_table_bottom.png'
    // url: 'img/banner'
    url: '/song/url',
    params: {
      // id: 405998841
      id: 33894312
    }
  })
}
