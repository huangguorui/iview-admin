<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");
</style>
<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>
      <div class="container mt50px input_style ">
        <ol class="breadcrumb"
            style="margin-top:20px">
          <li><a href="#">首页</a></li>
          <li><a href="#">{{article.themeName}}</a></li>
          <li class="active">{{article.title}}</li>
        </ol>

        <div class="article">
          <div>
            <div class="plate">
              <h1 class="title"> {{article.title}}</h1>
              <!-- <p style="text-align:center">发布时间：{{article.created}}</p> -->
              {{article.imgArr}}
              <div class="strong">
                <p> 购买时请把详细要求和模板编号发给我</p>
                <p> 作品介绍：可另付费修改，承诺：每份网页记录去向，绝不会有撞车情况！</p>
              </div>
              <p class="strong">技术标签：</p>

              <!-- <tag v-for="(item,i) in article.tagsArr"
                   :key="i"
                   :color="color[i]">
                {{item}}
              </tag> -->

              <router-link tag="a"
                           v-for="(item,i) in article.tagsArr"
                           :key="i"
                           :to="{path:'/tag/'+item}">
                <Tag :color="color[i]"
                     size="large"> {{item}}</Tag>
              </router-link>

              <p class="strong">前言：</p>
              <p style="text-indent: 2em;">{{article.description}}</p>

              <p class="strong">效果图展示：</p>

              <div v-for="(imgPath,i) in article.imgArr"
                   :key="'i'+i">
                <img :src="'http://localhost:8081'+imgPath"
                     :alt="article.title">
                <span class=""
                      style="text-align:center;display:block;padding:20px">第{{i+1}}个页面</span>
              </div>

              <p class="strong">正文：</p>

              <div v-html="article.content">{{article.content}} </div>
              <!-- <div class="hots">当前文章共有6人赞同</div>
 -->
              <!-- <img src="../../assets/images/about.jpg"
                   alt="">
              <img src="../../assets/images/about.jpg"
                   alt=""> -->
            </div>

            <hr>
            <div class="row"
                 v-show="false">
              <div class="col-md-4 col-lg-4">
                <div class="thumbnail">
                  <img src="../../assets/images/weixin.png"
                       alt="...">

                  <div class="caption">
                    <h3>微信</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="thumbnail">
                  <img src="../../assets/images/weixin.png"
                       alt="...">

                  <div class="caption">
                    <h3>支付宝</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="thumbnail">
                  <img src="../../assets/images/weixin.png"
                       alt="...">

                  <div class="caption">
                    <h3>QQ交谈</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <nav aria-label="...">
          <ul class="pager">
            <li class="previous"><a href=article.html><span aria-hidden="true">&larr;</span> 上一篇作业：我的个人博客制作</a></li>
            <li class="next"><a href=article.html>下一篇作业：我的个人博客制作 <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>
      </div>

    </div>
    <user-footer-m></user-footer-m>

  </div>
  </div>
</template>
<script>
import $ from 'jquery'
import api from '@/api/article'
import defaultValue from '@/libs/mixins/defaultValue'

// 点击图片放大全屏end
export default {
  mixins: [defaultValue],

  created () {
    console.log(this.$route.params.id)
    this.getList(this.$route.params.id)
  },
  data () {
    return {
      article: {
        created: '',
        content: '',
        description: '',
        id: '',
        status: '',
        title: '',
        userId: 1
      }
    }
  },

  methods: {
    getList (data) {
      api.getProject(data).then(res => {
        this.article = res.data
        // this.article.tagsArr = this.article.tagsArr.split(',')
        // this.article.img = this.article.img.split(',')
      }).catch(err => console.log(err))
    }
  },
  mounted () {
    setTimeout(() => {
      // 点击图片放大全屏start
      var runPrefixMethod = function (element, method) {
        var usablePrefixMethod;
        ['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
          if (usablePrefixMethod) return
          if (prefix === '') {
            // 无前缀，方法首字母小写
            method = method.slice(0, 1).toLowerCase() + method.slice(1)
          }

          var typePrefixMethod = typeof element[prefix + method]

          if (typePrefixMethod + '' !== 'undefined') {
            if (typePrefixMethod === 'function') {
              usablePrefixMethod = element[prefix + method]()
            } else {
              usablePrefixMethod = element[prefix + method]
            }
          }
        })

        return usablePrefixMethod
      }
      if (typeof window.screenX === 'number') {
        var eleFull = $('.article img')
        for (var i = 0; i < eleFull.length; i++) {
          eleFull[i].addEventListener('click', function () {
            if (runPrefixMethod(document, 'FullScreen') || runPrefixMethod(document, 'IsFullScreen')) {
              runPrefixMethod(document, 'CancelFullScreen')
              this.title = this.title.replace('退出', '')
            } else if (runPrefixMethod(this, 'RequestFullScreen')) {
              this.title = this.title.replace('点击', '点击退出')
            }
          })
        }
      } else {
        alert('爷，现在都什么时代了，你还在用这么土的浏览器~~')
      }
    }, 5000)
  }
}
</script>
