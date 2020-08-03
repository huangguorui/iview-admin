<style lang="less" scoped>
.page {
  text-align: center;
  margin-bottom: 3%;
}
</style>

<template>
  <div class="container">
    <Page class="page"
          :total="pageData.total"
          :page-size="pageData.size"
          :show-total="true"
          :show-sizer="isSize"
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
      default: false
    }

  },
  data () {
    return {
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
