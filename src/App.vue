<template>
  <div id="app">
    <v-home/>
  </div>
</template>

<script>
import Home from './views/Home'

export default {
  name: 'app',
  components: {
    'v-home': Home
  }
}
</script>

<style>
  /* 用于解决 el-scrollbar 出现横向滚动条的问题 */
  .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
  /* 用于解决使用上面的样式之后 el-select-dropdown 出现的样式问题 */
  .el-select-dropdown .el-scrollbar {padding-bottom: 17px;}
</style>
