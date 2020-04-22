import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import baseurl from '../api/baseurl'
import { Loading, Message } from 'element-ui'
// import vuex from '../../store/index'

Vue.use(VueAxios, axios)

const baseURL = baseurl.netCloud

export function request (config) {
  // . 创建 axios 的实例
  const instance = Vue.axios.create({
    baseURL,
    timeout: 10000
  })

  let loadingInstance = null

  // 2. axios 的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // if (config.baseURL === baseurl.local) {
    //   const token = sessionStorage.getItem('token')
    //   token && (config.headers.common.Token = token)
    // }
    // loading 动画
    loadingInstance = Loading.service({
      text: '拼命加载中'
    })
    return config
  }, error => {
    window.console.log(error)
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(response => {
    // loading动画关闭
    loadingInstance.close()
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    // loading动画关闭
    loadingInstance.close()
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Message.error({
            message: '检测到用户未登录，请先登录...'
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地 token 和清空 vuex 中 token 对象
        // 跳转登录页面
        case 403:
          Message.error({
            message: '密码过期，请重新登录...'
          })
          break
        // 404请求不存在
        case 404:
          Message.error({
            message: '请求不存在'
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message.error({
            message: error.response.data.message
          })
      }
      return Promise.reject(error.response)
    }
  })

  // 发送真正的网络请求
  return instance(config)
}
