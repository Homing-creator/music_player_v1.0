<template>
    <div class="container">
      <el-input
        v-popover:searchpopover placeholder="请输入歌名或歌手名"
        v-model="searchInput"
        class="input-with-select"
        @change="submit">
        <el-button @click="submit" slot="append" icon="el-icon-search"/>
      </el-input>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import search from '../../plugins/net/search'
import parseSearchList from '../../plugins/api/parseSearchList'

export default {
  name: 'Search',
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    submit () {
      if (this.search === '') {
        return Message.error('检测到搜索信息为空，请输入歌名或歌手名进行搜索...')
      }
      search(this.searchInput).then(response => {
        this.$store.commit('setSearchList', parseSearchList(response.data))
        this.$router.push('/discovery')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .el-input {
    width: 500px;
  }
}
</style>
