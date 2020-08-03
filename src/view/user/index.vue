<style lang="less" scoped>
</style>
<template>
  <div>
    <Row>
      <ul>
        <li v-for="item in list"
            :key="item.id">
          <div class="text">
            <a href="javascript:;">
              <router-link exact
                           tag="h2"
                           :to="{path:'/articleInfo/id/'+item.id}">
                ID: {{item.id}}------ {{item.title}}</router-link>
            </a>
            {{item.content}}
          </div>
        </li>
      </ul>
    </Row>
    <page-m :page-data="pageInfo"
            @pageChange="pageChange"
            @pagSizesChange="pageSizeChange"></page-m>
    <!-- <img src="../../assets/images/login-bg.jpg"> -->

    <a href="/articleInfo">跳转</a>
    <a href="/custom">私人定制</a>
    {{pageInfo}}
  </div>
</template>

<script>
import api from '@/api/data'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'
export default {
  mixins: [defaultValue, list, page],
  data () {
    return {
      list: [
        {
          created: '',
          id: '',
          status: '',
          userId: '',
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',

          content: 'This is the content, this is the content, this is the content, this is the content.'
        }
      ],
      pageInfo: {}
    }
  },

  created () {
    console.log(api)
    this.getApi(api)
    // console.log(getTableData().then(res => {
    //   console.log(res)
    //   console.log(res.list)
    //   this.list = res.list
    //   this.pageInfo = res.pageInfo
    // }))
  }
}

</script>

<style lang="scss" scoped>
</style>
