<template>
  <el-container style="height: 100vh;">
    <el-header><v-header /></el-header>
    <el-container>
      <el-aside><v-aside /></el-aside>
      <el-main><v-main /></el-main>
    </el-container>
    <el-footer style="height: 80px"><v-footer /></el-footer>
  </el-container>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'
import Main from '../components/Main'

export default {
  name: 'Home',
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'v-aside': Aside,
    'v-main': Main
  }
}
</script>

<style scoped lang="scss">
  $header-bgc: #D74D45;
  $footer-bgc: #EBEEF5;
  .el-header, .el-footer {
    background-color: $header-bgc;
    color: #333;
    line-height: 60px;
  }
  .el-footer {
    padding: 0;
    background-color: $footer-bgc;
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }
</style>
