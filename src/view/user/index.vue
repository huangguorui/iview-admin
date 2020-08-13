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
      <user-header-m @selectTitle="selectTitle"></user-header-m>
      <div class="container  mt50px">
        <div class="search_top">

          <!-- themeList -->
          <div>
            搜索内容为：
            <span class="current"
                  v-for='(item,key) in choose'
                  :key="key">
              <Tag closable
                   v-if="item.tagName"
                   color="primary"
                   style="margin-right:5px;"
                   @on-close="removeHandle(key)"> {{item.tagName}}</Tag>
              <Tag closable
                   v-if="item.pageName"
                   color="primary"
                   style="margin-right:5px;"
                   @on-close="removeHandle(key)"> {{item.pageName}}</Tag>
              <Tag closable
                   v-if="item.themeName"
                   color="primary"
                   style="margin-right:5px;"
                   @on-close="removeHandle(key)"> {{item.themeName}}</Tag>

            </span>
            <div v-for='(item,index) in searchList'
                 :key="index">
              {{item.title}}
              <span v-for="(option,i) in item.list"
                    :key="i"
                    @click="addChooseHandle(option,index,i)">
                <Button v-if="index==0"
                        :type="item.index === i?'primary':'default'"
                        size="small"> {{option.themeName}}</Button>
                <Button v-if="index==1"
                        :type="item.index === i?'primary':'default'"
                        size="small"> {{option.pageName}}</Button>
                <Button v-if="index==2"
                        :type="item.index === i?'primary':'default'"
                        size="small"> {{option.tagName}}</Button>

              </span>
            </div>
          </div>
          <!-- <Tag color="default"
                 v-for="(item,i) in themeList"
                 :key="i"
                 size="large"
                 style="margin-right:5px;"> {{item.themeName}}</Tag> -->
          <!-- <Button size="small"
                  v-for="(item,i) in themeList"
                  :key="i"> {{item.themeName}}</Button> -->

        </div>

        <div class="row">
          <div class="col-md-3 col-lg-3"
               v-for="item in list"
               :key="item.id">
            <!-- <router-link exact
                         tag="a"
                         :to="{path:'/project/id/'+item.id}"> -->
            <div class="thumbnail hf">
              <img :src="item.indexImg==null?getUrlIp+'/uploads/404.jpg':getUrlIp+item.indexImg"
                   :alt="item.title"
                   :title="item.title"
                   @error="nofindImg">
              <!-- :src="item.indexImg==null?getUrlIp+'/uploads/404.jpg':getUrlIp+item.indexImg" -->
              <!-- onerror="this.src=getUrlIp+'/uploads/404.jpg'" -->

              <div class="caption">
                <p class="truncate-text"
                   style="font-size:16px">名称：{{item.title}}</p>

                <p>ID：<Tag size="medium">{{item.id}}</Tag>
                </p>
                <!-- <p>我的博客</p> -->
                <p>
                  价格： <Tag size="medium">{{item.price}}{{item.price=='免费'?'':' 元'}}</Tag>
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

      <user-footer-m></user-footer-m>

      <Modal v-model="isModal"
             class-name="vertical-center-modal"
             :mask-closable="false"
             title="请选择支付方式"
             :loading="loading"
             @on-ok="asyncOK">
        <p class="">
          您当前选择的文件
          <strong class="strong">ID</strong>为：
          <strong class="strong">{{orderId}}</strong>，
          请凭此<strong class="strong">ID</strong>联系客服，付款后索取提取码。</p>

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
  </div>

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

      ],
      searchList: [
        {
          title: '网页主题：',
          list: this.themeList
        }, {
          title: '网页页数：',
          list: this.pageList
        }, {
          title: '使用技术：',
          list: this.tagList
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
      choose: {

      }
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
    searchVal (e) {
      console.log(e)
    },
    addChooseHandle (option, index, i) {
      // 使用set添加对象
      this.$set(this.choose, index, option)
      console.log(this.choose)
      // 找到操作的一行，把这一行的数据中的index，设置为
      this.searchList[index].index = i

      // 添加就会搜索
      // let data = {
      //   pages: this.choose.page,
      //   tag: this.choose.tagName,
      //   theme: this.choose.themeName
      // }
      // console.log(data)
    },
    removeHandle (key) {
      console.log(key)
      this.$delete(this.choose, key)
      this.searchList[key].index = -1
    },
    selectTitle (e) {
      console.log(e)
      this.query.title = e
      let data = Object.assign(this.query, this.pageInfo)
      this.getList(data)
    },
    getCreated () {
      this.searchList[1].list = this.pageList

      getTag.getListApi({ size: 100 }).then(res => {
        // 数据处理

        this.searchList[2].list = res.list
      }).catch(err => console.log(err))

      getTheme.getListApi({ size: 100 }).then(res => {
        // 数据处理

        this.searchList[0].list = res.list
        // console.log(this.list)
      }).catch(err => console.log(err))

      this.serialize()
    },
    // 循环遍历给搜索条件增加-1
    serialize () {
      this.searchList.forEach((item, index) => {
        this.searchList[index].list.forEach((row, i) => {
          this.searchList[index].list[i].index = -1
        })
      })
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
      let img = event.srcElement

      // img.src = '../../assets/images/about.jpg'

      img.src = this.getUrlIp + '/uploads/404.jpg'

      img.onerror = null // 防止一直跳动
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
