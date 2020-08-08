<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top nav_style">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false">
            <span class="sr-only">资源网</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"
             href="/">资源网</a>
        </div>

        <div class="collapse navbar-collapse"
             id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
          </ul>
          </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/">首页</a></li>
            <li><a href="/custom">网页定制</a></li>
            <li><a href="/pay">支付方式</a></li>
            <!-- <li><a href="free">免费下载专区</a></li> -->
            <li><a href="/help">帮助中心</a></li>
            <!-- <li><a href="/login">登录</a></li>
            <li><a href="/reg">注册</a></li> -->

            <!-- <li>
              <form class="form-inline">
                <div class="form-group">
                  <label class="sr-only"
                         for="exampleInputEmail3">Email address</label>
                  <input type="email"
                         class="form-control"
                         id="exampleInputEmail3"
                         placeholder="Email">
                </div>
                <div class="form-group">
                  <label class="sr-only"
                         for="exampleInputPassword3">Password</label>
                  <input type="password"
                         class="form-control"
                         id="exampleInputPassword3"
                         placeholder="Password">
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox"> Remember me
                  </label>
                </div>
                <button type="submit"
                        class="btn btn-default">Sign in</button>
              </form>
            </li> -->

            <li class="search">
              <div>
                <div class="input-group">
                  <input type="text"
                         class="form-control"
                         placeholder="标题查找">
                  <span class="input-group-btn">
                    <button class="btn btn-default"
                            type="button">查找</button>
                  </span>
                </div><!-- /input-group -->
              </div>
            </li>
            <li class="search">
              <div>
                <div class="input-group">
                  <input type="text"
                         class="form-control"
                         v-model.trim="code"
                         placeholder="提取码">
                  <span class="input-group-btn">
                    <button class="btn btn-default"
                            type="button"
                            @click="getUrl">搜索</button>
                  </span>
                </div><!-- /input-group -->
              </div>
            </li>
            <!-- <li class="dropdown">
              <a href="#"
                 class="dropdown-toggle"
                 data-toggle="dropdown"
                 role="button"
                 aria-haspopup="true"
                 aria-expanded="false">操作 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">我的账户</a></li>
                <li role="separator"
                    class="divider"></li>
                <li><a href="#">退出</a></li>
              </ul>
            </li> -->
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <table class=" url_code table table-bordered "
           style="background:#fff"
           v-if="urlCode.id">
      <thead>
        <tr>
          <th>ID</th>
          <th>提取链接</th>
          <th>提取码</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{urlCode.id}}</th>
          <td><a :href="urlCode.url">{{urlCode.url}}</a></td>
          <td>{{urlCode.code}}</td>
        </tr>
        <tr>
          <span style="font-weight:bold;padding:5px;display:block">注意：点击链接进入百度网盘，输入提取码进行提取。</span>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import getUrl from '@/api/link'
import defaultValue from '@/libs/mixins/defaultValue'
export default {
  mixins: [defaultValue],
  created () {
    // if (localStorage.getItem('token') === null) {
    //   localStorage.setItem('token', '')
    //   window.location.reload()
    // }
  },
  data () {
    return {
      code: null,
      urlCode: {
        url: '',
        code: '',
        id: ''
      }
    }
  },
  methods: {
    getUrl () {
      if (this.code == null) {
        this.$alertInfo.alertInfo(404, '未输入提取码')
        return false
      }

      getUrl.getuListApi({ code: this.code }).then(res => {
        // 数据处理
        if (res.list.length === 0) {
          this.$alertInfo.alertInfo(404, '未找到数据，请重新输入')
          this.urlCode = []
          return false
        }
        this.urlCode = res.list[0]
        console.log(res.list[0])
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
