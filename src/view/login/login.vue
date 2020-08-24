<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in"
            title="欢迎登录"
            :bordered="false">
        <div class="form-con">
          <!-- <login-form @on-success-valid="handleSubmit"></login-form> -->
          <!-- ref="formData"
              :rules="ruleFormData" -->
          <Form :model="formData"
                ref="formData"
                :rules="ruleFormData">

            <FormItem label="username"
                      label-position="top"
                      prop="username">
              <Input v-model="formData.username"
                     placeholder="username" />
            </FormItem>
            <FormItem label="password"
                      label-position="top"
                      prop="password">
              <Input v-model="formData.password"
                     placeholder="password" />
            </FormItem>
            <Button type="primary"
                    @click="handleSubmit">提交</Button>
            <a href="/"> <Button style="margin-left: 8px">返回首页</Button></a>

          </Form>
          <span @click="test">&nbsp;提交</span>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

// import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import defaultValue from '@/libs/mixins/defaultValue'

import api from '@/api/login'

export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      ruleFormData: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mixins: [defaultValue],

  components: {
    // LoginForm
  },
  created () {

  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),

    test () {
      console.log(this.getUrlIp)
      $.ajax({
        type: 'post',
        url: this.getUrlIp + 'admin', // 必选。规定吧请求发送到那个URL。
        data: 'a=1', // 可选。映射或字符串值。规定连同请求发送到服务器的数据。
        success: function (e) {
          console.log(e)
        }, // 可选，请求成功时执行的回调函数。
        datatype: 'json'// 可选。规定预期的服务器响应的数据类型。默认执行职能判断(xml,json,script 或html)
      })
      this.$refs['formData'].validate((valid) => {
        if (valid) { // { 'username': 'makerhub', 'password': '111111' }
          // api.postLoginApi({ 'username': 'makerhub', 'password': '111111' }).then(res => {
          //   // 登录成功，存token
          //   localStorage.setItem('token', res.data.token)
          //   console.log(res)
          //   console.log(res.data.token)
          //   this.$router.push({
          //     name: 'home'
          //   })
          // }).catch(err => console.log(err))
        } else {
          this.$Message.error('请按照提示进行填写')
        }
      })
    },

    handleSubmit () {
      this.$refs['formData'].validate((valid) => {
        if (valid) { // { 'username': 'makerhub', 'password': '111111' }
          api.postLoginApi(this.formData).then(res => {
            // 登录成功，存token
            localStorage.setItem('token', res.data.token)
            console.log(res)
            console.log(res.data.token)
            this.$router.push({
              name: 'home'
            })
          }).catch(err => console.log(err))
        } else {
          this.$Message.error('请按照提示进行填写')
        }
      })

      // this.$router.push({
      //   name: 'home'
      // })

      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
    }
  }
}
</script>

<style>
</style>
