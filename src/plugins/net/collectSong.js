// import { Message } from 'element-ui'
import vuex from '../../store'

import { request } from './request'
import baseurl from '../api/baseurl'

export default function (rowData) {
  return request({
    baseURL: baseurl.local,
    url: '/collection',
    method: 'post',
    headers: { token: vuex.state.token },
    data: rowData
  })
}

// 同步收藏列表
// updateCollectionList(this.$store.state.collectionList, this.$store.state.token)
// 求出 oldList 和 newList 的对称差集
// const result = oldList.concat(newList).filter(value => !oldList.includes(value) || !newList.includes(value))
