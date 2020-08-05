<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");
</style>
<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>
      <div class="container">

        <ol class="breadcrumb mt70px">
          <li><a href="#">首页</a></li>
          <li><a href="#">帮助中心</a></li>
          <li class="active">问题解答</li>
        </ol>

        <div class="article">
          <div>
            <div class="plate">

              <h1 class="title"> 支付方式：</h1>
              <p> 付款流程
              </p>
              <p> 买成品的：选好您需要的网站成品,QQ联系给我编号</p>
              <p>
                http://rj.baidu.com/soft/detail/13643.html?ald
              </p>
              <p>
                定做的：请先沟通，说清楚具体的要求,如：网页主题题材、网页制作难易度、网页需要几页、什么时间完成，确定需求再付款

              </p>
              <p>
                支付方式：微信、淘宝店铺、支付宝转账、QQ红包、银行卡卡转账

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
