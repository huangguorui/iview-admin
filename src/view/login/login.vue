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
                     type="password"
                     placeholder="password" />
            </FormItem>
            <Button type="primary"
                    @click="handleSubmit">提交</Button>
            <a href="/"> <Button style="margin-left: 8px">返回首页</Button></a>

          </Form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
// import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

import api from '@/api/login'

export default {
  data () {
    return {
      formData: {
        username: 'makerhub',
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

    handleSubmit () {
      this.$refs['formData'].validate((valid) => {
        if (valid) { // { 'username': 'makerhub', 'password': '111111' }
          api.postLoginApi(this.formData).then(res => {
            // 登录成功，存token
            console.log(res)
            if (res.code === 200) {
              localStorage.setItem('token', res.data.token)
              this.$alertInfo.alertInfo(res.code, res.msg)
              this.$router.push({
                name: 'home'
              })
            } else {
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
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
