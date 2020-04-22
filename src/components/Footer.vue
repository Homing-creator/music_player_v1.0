<template>
    <el-container>
      <audio
        v-if="$store.state.dataObj !== null"
        ref="audio"
        :src="musicUrl"
        @canplay="ready"
        @timeupdate="setCurrentTime"
        @play="playingStatus(true)"
        @pause="playingStatus(false)"
        autoplay>
        Your browser does not support the audio tag.
      </audio>
<!--      进度条 start *************************************************************-->
      <el-slider v-model="currentTime" :max="maxTime" @change="setTime" :format-tooltip="formatTooltip" id="progress"/>
<!--      进度条 end *************************************************************-->

      <section class="container">
        <div class="songInfo" v-if="$store.state.dataObj !== null">
          <el-avatar shape="square" :size="60" :src="$store.state.dataObj.songCover" />
          <div class="titleAndTime">
            <div class="titleAndAuthor">{{ $store.state.dataObj.songName }} - {{ $store.state.dataObj.singer }}</div>
            <div class="time">{{ showCurrentTime }}/{{ showMaxTime }}</div>
          </div>
        </div>
        <div class="controller">
          <button class="prev"><i class="iconfont icon-SanMiAppglyphico"/></button>
          <button @click="togglePlay" class="play">
            <i class="iconfont" :class="[ isPlay ? 'icon-bofangzanting':'icon-bofang']" />
          </button>
          <button class="next"><i class="iconfont icon-SanMiAppglyphico"/></button>
        </div>
        <div class="menu">
          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            content="音量">
            <el-button slot="reference" @click="setMuted">
              <i class="iconfont" :class="[ isMuted ? 'icon-jingyin':'icon-shengyin1']"/>
            </el-button>
          </el-popover>

          <el-slider v-model="volume" id="volume-progress" @change="setVolume"/>

          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            :content="playModel">
            <el-button slot="reference"><i class="iconfont" :class="playModelIcon"/></el-button>
          </el-popover>
<!--          播放列表 *******************************************************-->
          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            content="播放列表">
            <el-button slot="reference" v-popover:playlist><i class="iconfont icon-yinleliebiaokuai" /></el-button>
          </el-popover>
          <el-popover
            ref="playlist"
            placement="top-start"
            width="600">
            <v-playlist/>
          </el-popover>
<!--          收藏列表 *******************************************************-->
          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            content="收藏">
            <el-button slot="reference" v-popover:collectionlist @click="getCollectionData"><i class="iconfont icon-boshiweb_weishoucang" /></el-button>
          </el-popover>
          <el-popover
            ref="collectionlist"
            placement="top-start"
            width="600">
            <v-collectionlist/>
          </el-popover>
        </div>
      </section>
    </el-container>
</template>

<script>
// import { getMusicdata } from '../plugins/net/main'
import formatTime from '../plugins/api/formatTime'
import PlayList from './Footer/PlayList'
import CollectionList from './Footer/CollectionList'
import getCollectionList from '../plugins/net/getCollectionList'
import { parseCollectionListData } from '../plugins/api/parseData'

export default {
  name: 'Footer',
  components: {
    'v-playlist': PlayList,
    'v-collectionlist': CollectionList
  },
  data () {
    return {
      currentTime: 0,
      maxTime: 0,
      // songName: this.$store.state.dataObj.songName,
      // songCover: this.$store.state.dataObj.songCover,
      // singer: this.$store.state.dataObj.singer,
      isPlay: false,
      playModel: '顺序播放',
      playModelIcon: 'icon-ttpodicon',
      volume: 100,
      isMuted: false,
      drawer: false
    }
  },
  methods: {
    ready (e) {
      const obj = e.target
      this.maxTime = obj.duration
      // this.$store.commit('setPlayStatus', 0)
    },
    togglePlay () {
      const audioObj = this.$refs.audio
      // const audioObj = document.getElementById('audio')
      if (this.$refs.audio) {
        if (this.isPlay) {
          audioObj.pause()
        } else {
          audioObj.play()
        }
      }
    },
    setCurrentTime (e) {
      this.currentTime = e.target.currentTime
    },
    setTime (timeNum) {
      // const obj = document.getElementById('audio')
      this.$refs.audio.currentTime = timeNum
    },
    formatTooltip (val) {
      return formatTime(val)
    },
    setVolume (volumeNum) {
      this.$refs.audio.volume = volumeNum / 100
      this.isMuted = volumeNum === 0
    },
    setMuted () {
      this.isMuted = !this.isMuted
      this.$refs.audio.muted = this.isMuted
    },
    playingStatus (boolean) {
      this.isPlay = boolean
    },
    getCollectionData () {
      if (this.$store.state.user === null) {
        return false
      }
      getCollectionList(this.$store.state.token).then(response => {
        this.$store.commit('setCollectionList', parseCollectionListData(response.data.list))
      })
    }
  },
  computed: {
    showCurrentTime () {
      return formatTime(this.currentTime)
    },
    showMaxTime () {
      return formatTime(this.maxTime)
    },
    musicUrl () {
      const id = this.$store.state.dataObj.songId
      return 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
    }
  },
  watch: {
  },
  created () {
    // getMusicdata()
    //   .then(res => {
    //     this.$store.commit('setDataObj', res.data)
    //   }).catch(err => {
    //     console.log(err)
    //   })
  }
}
</script>

<style scoped lang="scss">
.el-container {
  position: relative;
  #progress {
    width: 100%;
    position: absolute;
    top: -22px;
    overflow: hidden;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    .songInfo {
      display: flex;
      flex-direction: row;
      .titleAndTime {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .titleAndAuthor {
          font-size: 18px;
          line-height: 34px;
        }
        .time {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
    .controller {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .play {
        display: block;
        cursor: pointer;
        border: 0;
        border-radius: 50%;
        background-color: #D74D45;
        width: 50px;
        height: 50px;
        outline: none;
        font-weight: bold;
        color: #fff;
        i {
          font-weight: normal;
          font-size: 30px;
        }
      }
      .prev, .next {
        display: block;
        cursor: pointer;
        border: 0;
        border-radius: 50%;
        background-color: transparent;
        width: 40px;
        height: 40px;
        outline: none;
        font-weight: bold;
        color: black;
        i {
          font-weight: normal;
          font-size: 30px;
        }
      }
      .next {
        transform: rotateY(180deg);
      }
    }
  }
  .menu {
    display: flex;
    flex-direction: row;
    #volume-progress {
      width: 100px;
      margin: 0 20px;
      padding-top: 10px;
    }
    .el-popover__reference {
      padding: 5px 10px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
