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
            <!-- themeList -->

            <Tag :color="color[Math.round(Math.random() * color.length-1)]"
                 v-for="(item,i) in themeList"
                 :key="i"
                 size="large"
                 style="margin-right:5px;"> {{item.themeName}}</Tag>

          </div>

          <div>网页页数：
            <Tag :color="color[Math.round(Math.random() * color.length-1)]"
                 v-for="(item,i) in pageList"
                 :key="i"
                 size="large"
                 style="margin-right:5px;"> {{item.pageName}}页</Tag>

          </div>
          <div>使用技术：
            <!-- <router-link exact
                         tag="a"
                         v-for="(item,i) in tagList"
                         :key="i"
                         style="padding:5px"
                         :to="{path:'/tag/'+item.tagName}">
              <Tag :color="color[Math.round(Math.random() * color.length-1)]"
                   size="large"
                   style="margin-right:5px;"> {{item.tagName}}</Tag>
            </router-link> -->
            <Tag :color="color[Math.round(Math.random() * color.length-1)]"
                 v-for="(item,i) in tagList"
                 :key="i"
                 size="large"
                 style="margin-right:5px;"> {{item.tagName}}</Tag>
          </div>

        </div>

        <div class="row">
          <div class="col-md-3 col-lg-3"
               v-for="item in list"
               :key="item.id">
            <!-- <router-link exact
                         tag="a"
                         :to="{path:'/project/id/'+item.id}"> -->
            <div class="thumbnail hf">
              <img :src="item.indexImg==null?'http://localhost:8081/uploads/404.jpg':'http://localhost:8081'+item.indexImg"
                   :alt="item.title"
                   :title="item.title"
                   onerror="this.src='http://localhost:8081/uploads/404.jpg'"
                   @error="nofindImg">
              <div class="caption">
                <p class="truncate-text"
                   style="font-size:16px">名称：{{item.title}}</p>

                <p>ID：<Tag size="medium">{{item.id}}</Tag>
                </p>
                <!-- <p>我的博客</p> -->
                <p>
                  价格： <Tag size="medium">{{item.price}} 元</Tag>
                </p>
                <p>
                  页数： <Tag size="medium">{{item.pages}} 页</Tag>
                </p>

                <Poptip trigger="hover"
                        title="所用到的技术"
                        word-wrap
                        :content="text">
                  <!-- <p class="truncate-text">效果：{{text.substring(0,25)}}……</p> -->
                  <p class="truncate-text">
                    效果：

                    <Tag :color="color[Math.round(Math.random() * color.length-1)]"
                         v-for="(item,i) in item.tagsArr"
                         :key="i"
                         v-if="i<=1"> {{item}}</Tag>
                    <!--
                    <router-link exact
                                 tag="a"
                                 v-for="(item,i) in item.tagsArr"
                                 :key="i"
                                 :to="{path:'/tag/'+item}">
                      <Tag :color="color[i]"
                           v-if="i<=1"> {{item}}</Tag>
                    </router-link> -->
                    …
                  </p>
                  <div class="api"
                       slot="content">

                    <router-link tag="a"
                                 v-for="(item,i) in item.tagsArr"
                                 :key="i"
                                 :to="{path:'/tag/'+item}">
                      <Tag :color="color[Math.round(Math.random() * color.length-1)]"> {{item}}</Tag>
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
                               target="_blank"
                               style="margin-left:10px"
                               :to="{path:'/project/id/'+item.id}">查看详情
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
                           :to="{path:'/project/id/'+item.id}">
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

    <!-- <a href="/project">跳转</a>
    <a href="/custom">私人定制</a>
    {{pageInfo}} -->
  </div>
</template>

<script>

// import $ from 'jquery'

import api from '@/api/article'
import getTag from '@/api/tag'
import getTheme from '@/api/theme'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'
export default {
  mixins: [defaultValue, list, page],
  components: {

  },
  data () {
    return {
      themeList: [
        {
          themeName: '人物博客'
        },
        {
          themeName: '学校网页'
        },
        {
          themeName: '新闻时政'
        },
        {
          themeName: '电影音乐'
        },
        {
          themeName: '体育运动'
        },
        {
          themeName: '旅游美食'
        },
        {
          themeName: '购物电商'
        },
        {
          themeName: '汽车军事'
        },
        {
          themeName: '文化环保'
        },
        {
          themeName: '公司企业'
        },
        {
          themeName: '其他成品'
        }
      ],

      pageList: [
        {
          page: '2', pageName: '1-2'
        }, {
          page: '5', pageName: '3-5'
        }, {
          page: '10', pageName: '6-10'
        }, {
          page: '15', pageName: '11-15'
        }, {
          page: '20', pageName: '16-20'
        }, {
          page: '30', pageName: '21-30'
        }, {
          page: '31', pageName: '30'
        }
      ],
      text: '',
      orderId: '',
      tagList: [],
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
    this.getCreated()
    //     color = color.split('、')
  },
  mounted () {
  },
  methods: {
    getCreated () {
      getTag.getListApi({ size: 100 }).then(res => {
        // 数据处理
        this.tagList = res.list

        // console.log(this.list)
      }).catch(err => console.log(err))

      getTheme.getListApi({ size: 100 }).then(res => {
        // 数据处理
        this.themeList = res.list

        // console.log(this.list)
      }).catch(err => console.log(err))
    },
    getList (data) {
      this.apiList.getListApi(data).then(res => {
        // 数据处理
        this.pageInfo = res.pageInfo
        this.list = res.list
        // this.list.forEach((item, i) => {
        //   this.list[i].tagsArr = item.tagsArr.split(',')
        // })
        // console.log(this.list)
      }).catch(err => console.log(err))
    },
    asyncOK () {
      setTimeout(() => {
        this.isModal = false
      }, 2000)
    },
    open (id) {
      this.orderId = id
      this.isModal = true
    },
    nofindImg (index) {
      // console.log(index)
      // let img = event.srcElement

      // img.src = '../../assets/images/about.jpg'

      // img.onerror = null // 防止一直跳动
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
