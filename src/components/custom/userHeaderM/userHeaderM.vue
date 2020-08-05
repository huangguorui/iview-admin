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
            <span class="sr-only">大学生作业网</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"
             href="/">大学生作业网</a>
        </div>

        <div class="collapse navbar-collapse"
             id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
          </ul>
          </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="./">首页</a></li>
            <li><a href="custom">网页定制</a></li>
             <li><a href="./pay">支付方式</a></li>
            <!-- <li><a href="free">免费下载专区</a></li> -->
            <li><a href="help">帮助中心</a></li>
            <li><a href="./login">登录</a></li>
            <li><a href="./reg">注册</a></li>
            <form class="navbar-form navbar-left">
              <div class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="搜索">
              </div>
              <button type="submit"
                      class="btn btn-default">搜索</button>
            </form>
            <li class="dropdown">
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
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
</style>
