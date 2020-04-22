<template>
  <div>
    <div id="playlist-title">播放列表</div>
    <el-table
      ref="playlist"
      :data="$store.state.playList"
      stripe
      style="width: 100%"
      height="600"
      empty-text>
      <el-table-column
        prop="songName"
        label="歌名"
        width="300"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="歌手"
        width="150"
        sortable>
        <template slot-scope="{row}">
          {{ row.singer || '未知' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handlePlay(scope.$index, scope.row)" icon="el-icon-caret-right" circle size="mini"/>
          <el-button :type="flag(scope.row)?'danger':''" @click="handleCollected(scope.$index, scope.row, $event)" icon="el-icon-star-off" circle size="mini"/>
<!--          :type="scope.row.isCollected?'danger':''"-->
<!--          :class="[scope.row.isCollected?'el-button--danger':'']"-->
<!--          :type="collectIcon(scope.$index)"-->
        </template>
      </el-table-column>
      </el-table>
  </div>
</template>

<script>
import collectSong from '../../plugins/net/collectSong'
import cancelCollectSong from '../../plugins/net/cancelCollectSong'
import { Message } from 'element-ui'

export default {
  name: 'PopList',
  data () {
    return {
      // List: [
      //   // {
      //   //   fileName: null,
      //   //   singer: null
      //   // }
      // ],
      collected: true
    }
  },
  methods: {
    handlePlay (index, rowData) {
      this.$store.commit('setDataObj', rowData)
    },
    handleCollected (index, rowData, event) {
      if (this.$store.state.user === null) {
        Message.error({
          message: '请先登录...'
        })
        return false
      }
      if (event.currentTarget.classList.contains('el-button--danger')) {
        // 取消收藏
        cancelCollectSong(rowData).then(response => {
          Message.success('取消收藏')
          this.$store.commit('popList', { data: rowData, listName: 'collectionList' })
        }).catch(e => {
          this.$store.commit('pushList', { data: rowData, listName: 'collectionList' })
          Message.error('操作失败，错误：' + e)
        })
      } else {
        // 收藏
        collectSong(rowData).then(response => {
          this.$store.commit('pushList', { data: rowData, listName: 'collectionList' })
          Message.success('收藏成功')
        }).catch(e => {
          this.$store.commit('popList', { data: rowData, listName: 'collectionList' })
          Message.error('操作失败，错误：' + e)
        })
      }
    }
  },
  computed: {
    flag () {
      return function (rowData) {
        return this.$store.state.collectionList.some(item => {
          return item.songId === rowData.songId
        })
      }
    }
  },
  watch: {
    // '$store.state.collectionList': {
    //   handler (newValue, oldValue) {
    //     console.log(newValue)
    //     console.log(oldValue)
    //   },
    //   deep: true
    // }
  },
  mounted () {
    // console.log(this.$store.state.user)
  }
}
</script>

<style scoped lang="scss">
  #playlist-title {
    text-align: center;
    font-size: 24px;
  }
</style>
