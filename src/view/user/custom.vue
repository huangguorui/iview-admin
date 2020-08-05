<style lang="less" scoped>
@import url("../../assets/css/bootstrap.css");
@import url("../../assets/css/index.css");
</style>
<template>
  <div>
    <div class="main">
      <user-header-m></user-header-m>
      <div class="container mt50px input_style ">
        <h3>您的需求</h3>
        <p>一次美好的合作从一封邮件开始，欢迎填写表格或发送邮件至：123@qq.com</p>

        <Form ref="formData"
              style="padding:10px"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
          <Row>
            <Col span="11">
            <FormItem label="请输入联系人"
                      prop="peopleName">
              <Input v-model="formData.peopleName"
                     placeholder="请输入联系人"></Input>
            </FormItem>
            </Col>
            <Col span="2">&nbsp;
            </Col>
            <Col span="11">
            <FormItem label="请输入电话"
                      prop="phone">
              <Input v-model="formData.phone"
                     placeholder="请输入电话"></Input>
            </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span="11">
            <FormItem label="请输入邮箱"
                      prop="mail">
              <Input v-model="formData.mail"
                     placeholder="请输入邮箱"></Input>
            </FormItem>
            </Col>
            <Col span="2">&nbsp;
            </Col>
            <Col span="11">
            <FormItem label="项目类型"
                      prop="porjectType">
              <Select v-model="formData.porjectType"
                      placeholder="项目类型">
                <Option :value="item.type"
                        v-for="item in porjectType"
                        :key="item.type">{{item.type}}</Option>
              </Select>
            </FormItem>
            </Col>

          </Row>

          <FormItem label="需求概述"
                    prop="describe">
            <Input v-model="formData.describe"
                   type="textarea"
                   :autosize="{minRows: 5,maxRows: 20}"
                   placeholder="需求概述：请告知我们产品的使用品台、功能需求、数量等"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary"
                    @click="handleSubmit('formData')">Submit</Button>
            <Button @click="handleReset('formData')"
                    style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
      </div>
      <user-footer-m></user-footer-m>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      porjectType: [{
        type: 'App'
      }, {
        type: 'Web'
      }, {
        type: 'Wap'
      }, {
        type: '小程序'
      }, {
        type: '大型系统'
      }, {
        type: '其它'
      }],
      formData: {
        peopleName: '',
        mail: '',
        phone: '',
        describe: '',
        porjectType: ''
      },
      ruleValidate: {

        peopleName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],

        porjectType: [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '电子邮件格式不正确', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入需求概述', trigger: 'blur' },
          { type: 'string', min: 20, message: '字数不能少于20', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
