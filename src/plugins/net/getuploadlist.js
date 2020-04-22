import { request } from './request'
import baseurl from '../api/baseurl'
import vuex from '../../store/index'

export default function () {
  return request({
    baseURL: baseurl.local,
    method: 'post',
    url: '/uploadlist',
    headers: {
      token: vuex.state.token
    }
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
