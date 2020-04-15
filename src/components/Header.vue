<template>
    <el-container id="header-container">
      <v-routes-history/>
      <v-search/>
      <el-button v-if="$store.state.user === null" type="text" @click="$store.commit('setLoginAndRegisterDialogVisible', true)" id="login-btn">登录 / 注册</el-button>
      <v-avatar v-else/>
      <v-login/>
    </el-container>
</template>

<script>
import RoutesHistory from './Header/RoutesHistory'
import Search from './Header/Search'
import Login from './Header/LoginAndRegister'
import Avatar from './Header/Avatar'

export default {
  name: 'Header',
  components: {
    'v-routes-history': RoutesHistory,
    'v-search': Search,
    'v-login': Login,
    'v-avatar': Avatar
  }
}
</script>

<style scoped lang="scss">
  #header-container {
    align-items: center;
    justify-content: space-around;
    width: 100%;
    #login-btn {
      color: #fff;
      /*width: 40px;*/
    }
  }
</style>
