<template>
    <div>
        <h1>根据用户收藏推荐</h1>
        <el-divider/>
        <div id="myrec-container" >
          <h1 v-if="$store.state.user === null">请先登录</h1>
          <div id="card-container" v-else>
            <el-card
              v-for="(item, index) in recommendList" :key="index"
              @click.native="handlePlay(item)"
              shadow="hover"
              :body-style="{ padding: '0px' }">
              <img :src="item.songCover" class="image" alt="">
              <div style="padding: 14px;">
                <span>{{ item.songName }}</span>
                <div class="bottom clearfix">{{ item.singer }}</div>
              </div>
            </el-card>
          </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import myRecommend from '../../../plugins/net/myRecommend'
import { parseNetRecommondData } from '../../../plugins/api/parseData'

export default {
  name: 'MyRecommend',
  data () {
    return {
      recommendList: []
    }
  },
  methods: {
    handlePlay (item) {
      this.$store.commit('setDataObj', item)
      this.$store.commit('pushList', {
        listName: 'playList',
        data: item
      })
    }
  },
  mounted () {
    if (this.$store.state.token !== '') {
      myRecommend().then(response => {
        this.recommendList = parseNetRecommondData(response.data)
      }).catch(e => {
        Message.error(e)
      })
    }
  }
}
</script>

<style scoped lang="scss">
 h1 {
   text-align: left;
 }
#myrec-container {
  #card-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    .el-card {
      min-width: 200px;
      width: 270px;
      transition: all .5s;
      position: relative;
      cursor: pointer;
      margin: 20px;
      &:hover{
        transform: translateY(-5px);
        &:after {
          content: "\ebbb";
          font-family: "iconfont";
          font-size: 100px;
          font-style: normal;
          font-weight: 900;
          line-height: 300px;
          color: #C0C4CC;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          height: 100%;
          z-index: 1;
        }
      }
      .image {
        width: 100%;
        display: block;
      }
      .bottom {
        margin-top: 13px;
        line-height: 12px;
        font-size: 13px;
        color: #999;
      }
      .clearfix:before, .clearfix:after {
        display: table;
        content: '';
      }
      .clearfix:after {
        clear: both;
      }
    }
  }
}
</style>
