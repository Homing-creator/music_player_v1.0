import Vue from 'vue'
import Vuex from 'vuex'
import dataObj from '../assets/testdata'
import songDetails from '../assets/songdetails'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultActive: '1',
    dataObj,
    songDetails,
    // 播放状态：0 就绪，1 播放中，2 暂停中
    playStatus: 0,
    // 登录状态
    user: null,
    // loginAndRegister 窗口
    loginAndRegisterDialogVisible: false,
    token: ''
  },
  mutations: {
    updateDefaultActive (state, string) {
      state.defaultActive = string
    },
    setCurrentTime (state, number) {
      state.currentTime = number
    },
    setTime (state, number) {
      state.time = number
    },
    setPlayStatus (state, status) {
      state.playStatus = status
    },
    setDataObj (state, object) {
      state.dataObj = object
    },
    setUser (state, object) {
      state.user = object
    },
    setLoginAndRegisterDialogVisible (state, flag) {
      state.loginAndRegisterDialogVisible = flag
    },
    // 存储 token 方法
    // 设置 token 等于外部传递进来的值
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    updateDefaultActive (context, string) {
      context.commit('updateDefaultActive', string)
    }
  },
  modules: {
  }
})
