<style lang="less" scoped>
</style>
<template>
  <div>
    {{list}}

    <img src="../../assets/images/login-bg.jpg">

    <a href="/articleInfo">跳转</a>
    <a href="/custom">私人定制</a>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    console.log(getTableData().then(res => {
      console.log(res)
      this.list = res.data.data
      this.pageInfo = res.data.data
    }))
  }
}

</script>

<style lang="scss" scoped>
</style>
