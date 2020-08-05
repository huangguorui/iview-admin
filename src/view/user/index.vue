<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");

.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
<style lang="less" >
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>

<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>

      <div class="container  mt50px">
        <div class="search_top">
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

        </div>

        <div class="row">
          <div class="col-md-3 col-lg-3"
               v-for="item in list"
               :key="item.id">
            <!-- <router-link exact
                         tag="a"
                         :to="{path:'/articleInfo/id/'+item.id}"> -->
            <div class="thumbnail">
              <img src="../../assets/images/about.jpg"
                   alt="...">
              <div class="caption">
                <h3 class="truncate-text"
                    style="font-size:16px">标题：{{item.title}}</h3>

                <p>ID：<Tag size="medium">{{item.id}}</Tag>
                </p>
                <!-- <p>我的博客</p> -->
                <p>
                  价格： <Tag size="medium">30 元</Tag>
                </p>
                <p>
                  页数： <Tag size="medium">5 页</Tag>
                </p>

                <Poptip trigger="hover"
                        title="所用到的技术"
                        word-wrap
                        :content="text">
                  <!-- <p class="truncate-text">效果：{{text.substring(0,25)}}……</p> -->
                  <p class="truncate-text">
                    效果：

                    <router-link exact
                                 tag="a"
                                 v-for="(item,i) in tags"
                                 :key="i"
                                 :to="{path:'/tag/'+item}">
                      <Tag :color="color[i]"
                           v-if="i<=2"> {{item}}</Tag>
                    </router-link>
                    …
                  </p>
                  <div class="api"
                       slot="content">
                    <!-- <router-link exact
                                 tag="Tag"
                                 v-for="(item,i) in tags"
                                 :key="i"
                                 :to="{path:'/tag/'+item}">
                      {{item}}
                    </router-link> -->
                    <router-link tag="a"
                                 v-for="(item,i) in tags"
                                 :key="i"
                                 :to="{path:'/tag/'+item}">
                      <Tag :color="color[i]"> {{item}}</Tag>
                    </router-link>

                  </div>
                </Poptip>
                <p><a href="#"
                     @click.stop="open(item.id)"
                     class="btn btn-primary"
                     role="button">支付</a>

                  <!-- <a href="#"
                       class="btn btn-default"
                       role="button">收藏</a> -->

                  <router-link exact
                               tag="a"
                               class="btn btn-default"
                               role="button"
                               style="margin-left:10px"
                               :to="{path:'/articleInfo/id/'+item.id}">查看详情
                  </router-link>
                </p>
              </div>
            </div>
            <!-- </router-link> -->

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

      <Modal v-model="isModal"
             class-name="vertical-center-modal"
             :mask-closable="false"
             title="请选择支付方式"
             :loading="loading"
             @on-ok="asyncOK">
        <p class="">您当前选择的文件<strong class="strong">ID</strong>为：<strong class="strong">{{orderId}}</strong>，请凭此<strong class="strong">ID</strong>联系客服，付款后索取提取码。</p>

        <Row class="open">
          <Col span="6"> <img style="width:100%;display:block"
               src="../../assets/images/weixin.png"
               alt="...">
          <p>微信支付</p>
          </Col>
          <Col span="3"> &nbsp;</Col>
          <Col span="6"> <img style="width:100%;display:block"
               src="../../assets/images/weixin.png"
               alt="...">
          <p>支付宝支付</p>

          </Col>
          <Col span="3"> &nbsp;</Col>
          <Col span="6"> <img style="width:100%;display:block"
               src="../../assets/images/weixin.png"
               alt="...">
          <p>关注微信公众号</p>

          </Col>

        </Row>
        <p class="pay_style">请勿直接付款，请先联系客服<a target="_blank"
             href="http://wpa.qq.com/msgrd?v=3&amp;uin=1793712591&amp;site=qq&amp;menu=yes"
             class="strong">（点击联系客服）</a>，确定后即可付款。</p>

      </Modal>
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
      text: 'html css css3 html5 css3 vue-clihtml css css3 html5 css3 vue-clihtml css css3 html5 css3 vue-clihtml css css3 html5 css3 vue-clihtml css css3 html5 css3 vue-clihtml css css3 html5 css3 vue-cli',
      tags: ['html', 'css', 'css3', 'html5', 'vue', 'table', 'html', 'css', 'css3', 'html5', 'vue', 'table'],
      color: ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'],
      orderId: '',
      list: [
        {
          created: '',
          id: '',
          status: '',
          userId: '',
          title: '',
          description: '',
          content: ''
        }

      ],
      isModal: false,
      loading: true,
      pageInfo: {}
    }
  },

  created () {
    this.getApi(api)
    //     color = color.split('、')
  },
  methods: {
    asyncOK () {
      setTimeout(() => {
        this.isModal = false
      }, 2000)
    },
    open (id) {
      this.orderId = id
      this.isModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
