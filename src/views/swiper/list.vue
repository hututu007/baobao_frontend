<template>
  <div>
    <el-switch v-model="obj.blogshow" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    <el-button type="primary" @click="handelUpdate">更新</el-button>
  </div>
</template>

<script>
  import {
    fetchList,
    update
  } from '@/api/setting'

  export default {
    data() {
      return {
        obj: {
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        fetchList().then(res => {
          const data = res.data[0]
          this.obj = data
        })
      },
      handelUpdate(){
        if(!this.obj.blogshow){
          this.obj.blogshow = ''
        }
        update(this.obj).then(res => {
          this.getList()
        })
      }
    }
  }

</script>

<style>
</style>
