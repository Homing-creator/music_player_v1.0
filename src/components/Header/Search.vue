<template>
    <div class="container">
      <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchInput: ''
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
