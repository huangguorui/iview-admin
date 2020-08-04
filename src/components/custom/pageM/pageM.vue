<style lang="less" scoped>
.page {
  text-align: center;
  margin-top: 2%;
}
</style>

<template>
  <div class="container">
    <Page class="page"
          :total="pageData.total"
          :page-size="pageData.size"
          :show-total="true"
          :show-sizer="isSize"
          :page-size-opts="pageSizeOpts"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          show-elevator
          size="small" />

    <!--

           -->
  </div>
</template>
<script>

export default {
  name: 'pageM',
  props: {
    pageData: {
      type: Object,
      default: Object
    },
    isSize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageSizeOpts: [10, 20, 30, 40, 50, 100, 500]

    }
  },
  methods: {
    pageChange (e) {
      this.$emit('pageChange', e)
    },
    pageSizeChange (e) {
      console.log('分页')
      this.$emit('pageSizeChange', e)
    }
  }

}
</script>
