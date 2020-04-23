import { request } from './request'
import baseurl from '../api/baseurl'
import vuex from '../../store/index'

export default function () {
  return request({
    url: '/recommend',
    method: 'post',
    baseURL: baseurl.local,
    headers: { token: vuex.state.token }
  })
}
