<template>
    <div>
      <div id="collectionlist-title">我的收藏</div>
      <h2 v-if="$store.state.user === null" style="text-align: center;">请先登录</h2>
      <el-table
        v-else
        :data="$store.state.collectionList"
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
            <el-button
              icon="el-icon-caret-right"
              circle
              size="mini"
              @click="handlePlay(scope.$index, scope.row)"/>
            <el-button
              icon="el-icon-plus"
              circle
              size="mini"
              @click="handleAdd(scope.$index, scope.row)"/>
            <el-button
              icon="el-icon-star-off"
              circle
              size="mini"
              :type="flag(scope.row)?'danger':''"
              @click="handleCollected(scope.$index, scope.row, $event)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import collectSong from '../../plugins/net/collectSong'
import { Message } from 'element-ui'
import cancelCollectSong from '../../plugins/net/cancelCollectSong'

export default {
  name: 'CollectionList',
  data () {
    return {
    }
  },
  methods: {
    handlePlay (index, rowData) {
      this.$store.commit('setDataObj', rowData)
      this.$store.commit('pushList', {
        listName: 'playList',
        data: rowData
      })
    },
    handleAdd (index, rowData) {
      this.$store.commit('pushList', { listName: 'playList', data: rowData })
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
  mounted () {
  },
  computed: {
    flag () {
      return function (rowData) {
        return this.$store.state.collectionList.some(item => {
          return item.songId === rowData.songId
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #collectionlist-title {
    text-align: center;
    font-size: 24px;
  }
</style>
