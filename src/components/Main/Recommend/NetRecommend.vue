<template>
    <div>
        <h1>
          推荐歌曲
          <el-divider/>
        </h1>
        <div id="netrec-container">
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
</template>

<script>
import getnetrecommend from '../../../plugins/net/getnetrecommend'
import { parseNetRecommondData } from '../../../plugins/api/parseData'
import { Message } from 'element-ui'

export default {
  name: 'NetRecommend',
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
    getnetrecommend().then(response => {
      this.recommendList = parseNetRecommondData(response.data)
    }).catch(e => {
      Message.error({
        message: e
      })
    })
  }
}
</script>

<style scoped lang="scss">
  h1 {
    text-align: left;
  }
  #netrec-container {
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
</style>
