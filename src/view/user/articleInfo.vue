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
          <li><a href="#">栏目</a></li>
          <li class="active">文章：约翰尼·德普</li>
        </ol>

        <div class="article">
          <div>
            <div class="plate">

              <h1 class="title"> 119 约翰尼·德普 5页 表格 flash 视频 音乐</h1>
              <p> 购买时请把详细要求和模板编号发给我</p>
              <p> 作品介绍：可另付费修改，承诺：每份网页记录去向，绝不会有撞车情况！</p>
              <img src="../../assets/images/about.jpg"
                   alt="">
              <img src="../../assets/images/about.jpg"
                   alt="">
            </div>

            <hr>
            <div class="row">
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

// 点击图片放大全屏end
export default {
  data () {
    return {

    }
  },
  mounted () {
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
  },
  methods: {
  }
}
</script>
