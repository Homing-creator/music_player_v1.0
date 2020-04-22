<template>
    <section id="comment-container" v-if="refresh">
      <h3>
        精彩评论：
      </h3>
      <p v-if="$store.state.user === null">登录后可以发表评论</p>
      <section id="com" v-else>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <div class="clearfix">
          <el-button id="btn" type="primary" @click="submitCom">发表</el-button>
        </div>
      </section>
      <p v-if="this.list.length === 0">该歌曲还没有评论，快点来评论吧！</p>
      <section id="comment-list" v-else>
        <el-card shadow="hover" v-for="(item, index) in pageList" :key="index">
          <el-avatar class="avatar" :size="60" src="../../../assets/images/avatar/default.png" @error="errorHandler">
            <img :src="avatarUrl(item.comUserAvatar)" alt=""/>
          </el-avatar>
          <div class="username">{{ item.comUserName }}<span> 说：</span></div>
          <div class="content">{{ item.comContent }}</div>
          <div class="time">评论于：{{ parseTime(item.comCreatedTime) }}</div>
        </el-card>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length">
        </el-pagination>
      </section>
    </section>
</template>

<script>
import submitComment from '../../../plugins/net/submitcomment'
import getComment from '../../../plugins/net/getcomment'

export default {
  name: 'Comment',
  data () {
    return {
      list: [],
      currentPage: 1,
      pageSize: 5,
      textarea: '',
      refresh: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    errorHandler () {
      return true
    },
    submitCom () {
      /* songId, message, token */
      submitComment(405998841, this.textarea, this.$store.state.token).then(res => {
        this.handleRefresh()
      })
    },
    avatarUrl (url) {
      return `http://127.0.0.1:5000${url}`
    },
    parseTime (time) {
    //  2020-04-17T11:22:14.000Z
      const pattern = /\.\d*Z/g
      return time.replace('T', ' ').replace(pattern, '')
    },
    handleRefresh () {
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  },
  computed: {
    pageList () {
      return this.list.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  mounted () {
    if (this.$store.state.user !== null) {
      getComment(405998841).then(response => {
        this.list = response.data.commentList
      })
    }
  }
}
</script>

<style scoped lang="scss">
#comment-container {
  margin: 0 auto;
  text-align: left;
  width: 500px;
  #com {
    margin-bottom: 20px;
    #btn {
      margin-top: 10px;
      float: right;
    }
  }
  #comment-list {
    /*display: flex;*/
    .el-card {
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
      .avatar {
        float: left;
        margin-right: 20px;
      }
      .username {
        color: #1E90FF;
        margin-bottom: 5px;
        span {
          color: #000;
        }
      }
      .content {
        padding-left: 20px;
        margin-bottom: 10px;
        word-wrap: break-word; /*允许长单词换行到下一行*/
        word-break: break-all; /*这个参数根据需要来决定要不要*/
        overflow: hidden;/*这个参数根据需要来决定要不要*/
        line-height: 24px
      }
      .time {
        font-size: 14px;
      }
    }
  }
}
</style>
