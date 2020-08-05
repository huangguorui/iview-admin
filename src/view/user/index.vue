<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");
</style>
<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>

      <div class="container  mt50px">
        <!-- <div class=" search">
          <div>网页主题：

            <button class="btn btn-default"
                    type="submit">人物博客</button>
            <button class="btn btn-default"
                    type="submit">学校网页</button>
            <button class="btn btn-default"
                    type="submit">新闻时政</button>
            <button class="btn btn-default"
                    type="submit">电影音乐</button>
            <button class="btn btn-default"
                    type="submit">体育运动</button>
            <button class="btn btn-default"
                    type="submit">旅游美食</button>
            <button class="btn btn-default"
                    type="submit">购物电商</button>
            <button class="btn btn-default"
                    type="submit">汽车军事</button>
            <button class="btn btn-default"
                    type="submit">文化环保</button>
            <button class="btn btn-default"
                    type="submit">公司企业</button>
            <button class="btn btn-default"
                    type="submit">其他成品</button>
          </div>
          <div>网页页数：
            <button class="btn btn-default"
                    type="submit">1-2页</button>
            <button class="btn btn-default"
                    type="submit">3-5页</button>
            <button class="btn btn-default"
                    type="submit"> 6-10页</button>
            <button class="btn btn-default"
                    type="submit">11-15页</button>
            <button class="btn btn-default"
                    type="submit">16-20页</button>
            <button class="btn btn-default"
                    type="submit">21-30页</button>
            <button class="btn btn-default"
                    type="submit">30页以上</button>

          </div>

          <div>使用技术：
            <button class="btn btn-default"
                    type="submit">html+css</button>
            <button class="btn btn-default"
                    type="submit">表格</button>
            <button class="btn btn-default"
                    type="submit">DIV</button>
            <button class="btn btn-default"
                    type="submit">特效</button>
            <button class="btn btn-default"
                    type="submit">音乐</button>
            <button class="btn btn-default"
                    type="submit">表单</button>
            <button class="btn btn-default"
                    type="submit">框架</button>
            <button class="btn btn-default"
                    type="submit">论文</button>
          </div>

        </div> -->

        <div class="row">
          <div class="col-md-3 col-lg-3"
               v-for="item in list"
               :key="item.id">
            <router-link exact
                         tag="a"
                         :to="{path:'/articleInfo/id/'+item.id}">
              <div class="thumbnail">
                <img src="../../assets/images/about.jpg"
                     alt="...">
                <div class="caption">
                  <h3 style="font-size:16px">{{item.title}}</h3>

                  <p>ID：{{item.id}}</p>
                  <p>网站名称：我的博客</p>
                  <p>价格：30</p>
                  <p>页数：5页</p>
                  <p><a href="#"
                       class="btn btn-primary"
                       role="button">支付</a> <a href="#"
                       class="btn btn-default"
                       role="button">收藏</a></p>
                </div>
              </div>
            </router-link>

          </div>
        </div>

      </div>
      <page-m :page-data="pageInfo"
              @pageChange="pageChange"
              @pagSizesChange="pageSizeChange"></page-m>
      <!-- <nav aria-label="Page navigation"
           style="text-align: center;">
        <ul class="pagination">
          <li>
            <a href=article
               aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href=article>1</a></li>
          <li><a href=article>2</a></li>
          <li><a href=article>3</a></li>
          <li><a href=article>4</a></li>
          <li><a href=article>5</a></li>
          <li>
            <a href=article
               aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> -->
      <user-footer-m></user-footer-m>

    </div>
    <!-- <Row>
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
            @pagSizesChange="pageSizeChange"></page-m> -->
    <!-- <img src="../../assets/images/login-bg.jpg"> -->

    <!-- <a href="/articleInfo">跳转</a>
    <a href="/custom">私人定制</a>
    {{pageInfo}} -->
  </div>
</template>

<script>

// import $ from 'jquery'

import api from '@/api/article'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'
export default {
  mixins: [defaultValue, list, page],
  components: {

  },
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
    this.getApi(api)
  }
}

</script>

<style lang="scss" scoped>
</style>
