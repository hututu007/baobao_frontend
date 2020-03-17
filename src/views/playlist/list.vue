<template>
  <div>
    <el-button type="primary" @click="doAdd">新增</el-button>
    <el-table v-loading="loading" :data="playlist" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column prop="content" label="描述"></el-table-column>
      <el-table-column prop="index" label="期刊"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="onMusic(scope.row)">添加歌曲</el-button>
          <el-button size="mini" @click="onImg(scope.row)">添加图片</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该期刊吗吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // 跨域
  // http://www.a.com  http://www.b.com
  // http://www.a.com:8080  http://www.a.com:8081
  // http://www.a.com   http://news.a.com
  // http://www.a.com   https://www.a.com

  import {
    fetchList,
    del
  } from '@/api/playlist'
  import scroll from '@/utils/scroll'

  export default {
    data() {
      return {
        playlist: [],
        count: 50,
        loading: false,
        // 删除歌单的对话框是否显示
        delDialogVisible: false,
        info: {}
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      // scroll.start(this.getList)
    },
    methods: {
      getList() {
        this.loading = true
        fetchList().then(res => {
          this.playlist = res.data
          if (res.data.length < this.count) {
            scroll.end()
          }
          this.loading = false
        })
      },
      onEdit(row) {
        this.$router.push({
          name: 'playlistEdit',
          params: {
            ...row,
            form1: true
          }
        })
      },
      onMusic(row) {
        this.$router.push({
          name: 'playlistEdit',
          params: {
            form2: true,
            _id: row._id,
            path:'http://localhost:3000/v1/playlist/updateMusic'
          }
        })
      },
      onImg(row) {
        this.$router.push({
          name: 'playlistEdit',
          params: {
            form2: true,
            _id: row._id,
            path:'http://localhost:3000/v1/playlist/updateImg'
          }
        })
      },
      doAdd() {// 新增
        this.$router.push({
          name: 'playlistEdit',
          params: {
            form1: true
          }
        })
      },
      onDel(row) {
        this.delDialogVisible = true
        this.info.img = row.img
        this.info.url = row.url
        this.info.id = row._id
      },
      doDel() {
        del({
          img: this.info.img,
          url: this.info.url,
          id: this.info.id
        }).then(res => {
          this.delDialogVisible = false
          if (res.data.errcode == 0) {
            this.playlist = []
            this.getList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      }
    }
  }

</script>

<style>
</style>
