<template>
  <el-dropdown :hide-timeout="250" :hide-on-click="true" id="drop-down" @command="handleCommand">
    <div id="avatar-container">
      <el-avatar @error="true" :size="40" :src="$store.state.user.avatar">
        <img src="../../assets/images/avatar/default.png" alt=""/>
      </el-avatar>
      <div id="user-name">
        {{ $store.state.user.name }}
      </div>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="/new">设置个人信息</el-dropdown-item>
      <el-dropdown-item divided command="quit">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'Avatar',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'quit') {
        sessionStorage.clear()
        this.$store.commit('setUser', null)
        this.$store.commit('setToken', '')
        this.$store.commit('setCollectionList', [])
      } else {
        this.$router.push(command)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    #user-name {
      margin-left: 10px;
      color: #fff;
    }
  }
  #drop-down {
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
