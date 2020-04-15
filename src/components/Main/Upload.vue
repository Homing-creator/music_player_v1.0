<template>
  <div>
    <section v-if="$store.state.user === null">
      <h1>请先登录 ↑</h1>
    </section>
    <section v-else id="upload-container">
      <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:5000/uploadfile"
        :headers="headers"
        multiple
        :before-remove="beforeRemove"
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-error="handleError"
        accept="audio/*"
      >
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传音乐文件，如：MP3, FLAC, APE</div>
      </el-upload>
    </section>
    <v-uploadtable/>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import UploadTable from './Upload/UploadTable'

export default {
  name: 'Upload',
  components: {
    'v-uploadtable': UploadTable
  },
  data () {
    return {
      fileList: [],
      headers: {
        Token: this.$store.state.token
      }
    }
  },
  methods: {
    handleRemove () {
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess () {
      Message.success({
        message: '上传成功'
      })
    },
    handleError (error) {
      Message.error({
        message: error
      })
    }
  }
}
</script>

<style scoped lang="scss">
#upload-container {
  /*display: block;*/
}
</style>
