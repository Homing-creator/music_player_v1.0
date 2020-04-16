<template>
    <div>
      <section v-if="tableData.length === 0">
        目前没有可下载歌曲
        <el-tooltip class="item" effect="light" content="只能下载用户已上传的歌曲" placement="top-end">
          <el-button>提示</el-button>
        </el-tooltip>
      </section>
      <section v-else>
        <div style="margin-top: 20px">
          <el-button @click="download()">下载选中</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="refresh()">刷新</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'name', order: 'descending' }">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="歌名"
            width="300"
            sortable
            show-overflow-tooltip>
            <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop="singer"
            label="歌手"
            width="150"
            sortable>
            <template slot-scope="{row}">
              {{ row.err || '未知' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小">
            <template slot-scope="{row}">
              {{ (row.size / 1024 / 1024).toFixed(1) + 'Mb' }}
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="download()">下载选中</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </section>
    </div>
</template>

<script>
import getUploadList from '../../../plugins/net/getuploadlist'
import { Message } from 'element-ui'
import downloadMD from '../../../plugins/net/download'

export default {
  name: 'UploadTable',
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    download () {
      if (this.multipleSelection.length > 0) {
        downloadMD(this.multipleSelection[0].songId).catch(err => {
          console.log(err)
        })
      }
    },
    refresh () {
      getUploadList().then(res => {
        this.tableData = res.data.list
      }).catch(err => {
        Message.error({
          message: err
        })
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped lang="scss">

</style>
