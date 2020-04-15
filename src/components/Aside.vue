<template>
  <el-container direction="vertical">
<!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--      <el-radio-button :label="false">展开</el-radio-button>-->
<!--      <el-radio-button :label="true">收起</el-radio-button>-->
<!--    </el-radio-group>-->
    <el-menu :default-active="$store.state.defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="1" @click="$router.push('/discovery')">
        <i class="iconfont icon-wangyiyunyinle"/>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/recommend')">
        <i class="iconfont icon-yinleliebiaokuai"/>
        <span slot="title">推荐歌单</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/new')">
        <i class="iconfont icon-yinyue"/>
        <span slot="title">最新音乐</span>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/musicvideo')">
        <i class="iconfont icon-mv"/>
        <span slot="title">推荐MV</span>
      </el-menu-item>
      <el-menu-item index="5" @click="$router.push('/playing')">
        <i class="iconfont icon-ting"/>
        <span slot="title">正在播放</span>
      </el-menu-item>
      <el-menu-item index="6" @click="$router.push('/upload')">
        <i class="iconfont icon-shangchuan"/>
        <span slot="title">上传/下载</span>
      </el-menu-item>
    </el-menu>
  </el-container>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: false,
      defaultActive: '1'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      window.console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      window.console.log(key, keyPath)
    },
    updateDefaultActive () {
      const list = ['/discovery', '/recommend', '/new', '/musicvideo', '/playing', '/upload']
      const index = list.indexOf(this.$route.path)
      this.$store.dispatch('updateDefaultActive', index + 1 + '')
    }
  },
  watch: {
    $route: 'updateDefaultActive'
  }
}
</script>

<style scoped lang="scss">
  .el-container {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: solid 1px #e6e6e6;
    height: 100%;
    .el-menu-vertical-demo {
      border: none;
    }
    .el-menu-item {
      i {
        font-size: 20px;
        margin: 0 auto;
      }
      span {
        font-size: 20px;
      }
    }
  }
</style>
