<template>
    <div id="lyric-container">
      <el-scrollbar id="lyric-scrollbar">
        <ul id="lyric-list">
          <li v-for="(item, index) in lyricData" :key="index">{{ item }}</li>
        </ul>
      </el-scrollbar>
    </div>
</template>

<script>
import getlyric from '../../../plugins/net/getlyric'
import parseLyric from '../../../plugins/api/parselyric'

export default {
  name: 'Lyric',
  data () {
    return {
      lyricData: []
    }
  },
  mounted () {
    getlyric(this.$store.state.dataObj.songId).then(response => {
      this.lyricData = parseLyric(response.data.lrc.lyric)
    })
  }
}
</script>

<style scoped lang="scss">
#lyric-container {
  height: 400px;
  width: 400px;
  #lyric-scrollbar {
    height: 100%;
    #lyric-list {
      padding: 0;
      width: 100%;
      li {
        list-style: none;
        line-height: 36px;
        text-align: center;
      }
    }
  }
}
</style>
