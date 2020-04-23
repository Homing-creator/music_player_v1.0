<template>
  <div>
    <h1 v-if="$store.state.dataObj === null">当前未播放歌曲</h1>
    <section v-else>
      <div id="playing-container">
        <v-cover/>
        <section>
          <h1>{{ this.$store.state.dataObj.songName }}</h1>
          <h4>歌手：{{ this.$store.state.dataObj.singer }}</h4>
          <el-divider/>
          <v-lyric/>
          <el-divider/>
        </section>
      </div>
      <div>
        <v-comment/>
      </div>
    </section>
  </div>
</template>

<script>
import Cover from './Playing/Cover'
import Lyric from './Playing/Lyric'
import Comment from './Playing/Comment'

export default {
  name: 'Playing',
  components: {
    'v-cover': Cover,
    'v-lyric': Lyric,
    'v-comment': Comment
  },
  data () {
    return {
      title: '未知',
      singer: '未知',
      refresh: true
    }
  }
}
</script>

<style scoped lang="scss">
#playing-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
