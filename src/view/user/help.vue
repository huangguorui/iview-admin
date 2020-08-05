<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");
</style>
<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>
      <div class="container"
          >

        <ol class="breadcrumb mt70px">
          <li><a href="#">首页</a></li>
          <li><a href="#">帮助中心</a></li>
          <li class="active">问题解答</li>
        </ol>

        <div class="article">
          <div>
            <div class="plate">

              <h1 class="title"> 如何解压：</h1>
              <p> 很多学生收到文件后，不会解压文件，问的人太多了，我总结了下，不会的仔细看下。</p>
              <p> 如果自己本机没有下载解压软件的话，去这里下载下解压文件</p>
              <p>
                http://rj.baidu.com/soft/detail/13643.html?ald
              </p>
              <p>
                点普通下载就可以了。

              </p>
              <p>
                最后下载完安装好软件，（安装点下一步下一步就可以了）

              </p>
              <p>
                然后，安装好不懂解压的，看看下面的截图演示步骤，步骤地址为

              </p>
              <p>
                http://wenku.baidu.com/link?url=CMWJL4JxnVUynnwMzhDsP2VJTMrg_vpg9ZlG131qfNcL1BgGgztjRHmCQLcsD-jKJEjcuGTCb-hjvnw42tmUcFfJumwK1a-FF9xyqX1v4vK

              </p>

            </div>
          </div>

        </div>
      </div>
      <user-footer-m></user-footer-m>

    </div>
  </div>
</template>

<script>

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
        }
      ],
      pageInfo: {}
    }
  },

  created () {
  }
}

</script>

<style lang="scss" scoped>
</style>
