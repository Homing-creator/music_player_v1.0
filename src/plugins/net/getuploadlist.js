import { request } from './request'
import baseurl from '../api/baseurl'

export default function () {
  return request({
    baseURL: baseurl.local,
    method: 'post',
    url: '/uploadlist'
  })
}

// export default function (idList) {
//   return request({
//     url: '/song',
//     params: {
//       id: idList[0]
//     }
//   })
// }
