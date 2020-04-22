import vuex from '../../store'

import { request } from './request'
import baseurl from '../api/baseurl'

export default function (rowData) {
  return request({
    baseURL: baseurl.local,
    url: '/cancelcollection',
    method: 'post',
    headers: { token: vuex.state.token },
    data: rowData
  })
}
