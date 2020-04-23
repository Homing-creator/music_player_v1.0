import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前 aside 所在
    defaultActive: '1',
    // 当前播放歌曲
    dataObj: null, // {songId, songName, songCover, singer}
    // 播放列表
    playList: [],
    // 收藏列表
    collectionList: [],
    // songDetails,
    // 播放状态：0 就绪，1 播放中，2 暂停中
    playStatus: 0,
    // 控制播放器自动播放
    autoPlay: false,
    // 登录状态
    user: null,
    // loginAndRegister 窗口
    loginAndRegisterDialogVisible: false,
    token: '',
    // 搜索结果
    searchList: null
  },
  mutations: {
    // 设置 Aside 的当前 active 标签
    updateDefaultActive (state, string) {
      state.defaultActive = string
    },
    // 同步音乐播放时间
    setCurrentTime (state, number) {
      state.currentTime = number
    },
    // 设置播放时间，用于音乐播放进度条
    setTime (state, number) {
      state.time = number
    },
    // 设置播放状态 目前用于设置音乐就绪状态，（注意，每次调整进度条都会触发
    setPlayStatus (state, status) {
      state.playStatus = status
    },
    // 用于设置音乐
    setDataObj (state, object) {
      state.dataObj = object
    },
    // 设置当前登录用户
    setUser (state, object) {
      state.user = object
    },
    // 用于设置登录、注册窗口是否可见
    setLoginAndRegisterDialogVisible (state, flag) {
      state.loginAndRegisterDialogVisible = flag
    },
    // 存储 token 方法
    // 设置 token 等于外部传递进来的值
    setToken (state, token) {
      state.token = token
    },
    // 往 object.name 数组中 push object.data
    pushList (state, object) {
      const id = object.data.songId
      const cList = state[object.listName]
      if (!cList.some(item => { return item.songId === id })) {
        // 如果 List 中没有，则 push
        state[object.listName].push(object.data)
      }
    },
    // 往 object.name 数组中删除 object.data
    popList (state, object) {
      const list = state[object.listName]
      let i = -1
      list.forEach((item, index) => {
        if (item.songId === object.data.songId) {
          i = index
        }
      })
      state[object.listName].splice(i, 1)
    },
    setCollectionList (state, list) {
      state.collectionList = list
    },
    setSearchList (state, list) {
      state.searchList = list
    }
  },
  actions: {
    // updateDefaultActive (context, string) {
    //   context.commit('updateDefaultActive', string)
    // }
  },
  modules: {
  }
})
