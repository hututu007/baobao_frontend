<template>
  <div>
    <el-form v-if="playlist.form1" ref="form1" :model="playlist" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="playlist.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="playlist.content"></el-input>
      </el-form-item>
      <el-form-item label="期刊">
        <el-input v-model="playlist.index"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="playlist.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="playlist._id" type="primary" @click="onUpdate">更新</el-button>
        <el-button type="primary" @click="handelAdd">新增</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="playlist.form2" ref="form2" :model="playlist" label-width="80px">
      <el-form-item label="上传">
        <el-upload ref="upload" style="display:inline-block" :auto-upload="false"
          :action="playlist.path" :file-list="fileList" :on-success="onSuccess"
          :headers="headers" :data='playlist'>
          <el-button slot="trigger" type="primary" size="mini" icon="el-icon-upload2">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelUpload">确 定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    fetchById,
    update,
    onAdd
  } from '@/api/playlist'
  export default {
    data() {
      return {
        playlist: {},
        fileList: [],
        headers: { //请求头
        },
      }
    },
    created() {
      this.playlist = this.$route.params
    },
    methods: {
      onUpdate() {
        update(this.playlist).then((res) => {
          if (res.data.errcode == 0) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$message.error('更新失败')
          }
          this.$router.push('/playlist/list')
        })
      },
      handelAdd() {// 新增
        onAdd(this.playlist).then((res) => {
          if (res.data.errcode == 0) {
            this.$message({
              message: '成功',
              type: 'success'
            })
          } else {
            this.$message.error('失败')
          }
          this.$router.push('/playlist/list')
        })
      },
      handelUpload() {//上传文件
        this.$refs.upload.submit();
      },
      onCancel() { // 取消
        this.$router.push('/playlist/list')
      },
      onSuccess(res) { // 文件上传成功的返回
        if (res.data.errcode == 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.push('/playlist/list')
        }
        this.fileList = []
      },
    }
  }

</script>

<style scoped>
</style>
