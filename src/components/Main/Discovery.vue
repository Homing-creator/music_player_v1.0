<template>
    <div>
      <div v-if="$store.state.searchList === null" id="homepic">
        <img src="../../assets/images/home.png"/></div>
      <div v-else>
        <h1>Discovery</h1>
        <el-table
          :data="$store.state.searchList"
          stripe
          style="width: 100%"
          empty-text>
          <el-table-column type="index" width="50"/>
          <el-table-column prop="songName" label="歌名" min-width="300" sortable show-overflow-tooltip/>
          <el-table-column label="歌手"
            min-width="150"
            sortable>
            <template slot-scope="{row}">
              {{ row.singer || '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handlePlay(scope.$index, scope.row)" icon="el-icon-caret-right" circle size="mini"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Discovery',
  data () {
    return {}
  },
  methods: {
    handlePlay (index, rowData) {
      this.$store.commit('pushList', {
        listName: 'playList',
        data: rowData
      })
      this.$store.commit('setDataObj', rowData)
    }
  }
}
</script>

<style scoped lang="scss">
#homepic {
  display: flex;
  justify-content: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
