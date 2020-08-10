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
                      prop="peoplePhone">
              <Input v-model="formData.peoplePhone"
                     placeholder="请输入电话"></Input>
            </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span="11">
            <FormItem label="请输入邮箱"
                      prop="peopleEmail">
              <Input v-model="formData.peopleEmail"
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
          <!-- {{formData.peopleDescribe.length}} -->

          <FormItem :label="'需求概述:'+'最多可输入10000字，当前已输入【'+formData.peopleDescribe.length+'】'"
                    prop="peopleDescribe">
            <Input v-model="formData.peopleDescribe"
                   type="textarea"
                   :maxlength="10000"
                   :autosize="{minRows: 5,maxRows: 20}"
                   placeholder="需求概述：请告知我们产品的使用品台、功能需求、数量等"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary"
                    @click="submitData(formData)">提交</Button>
            <Button @click="handleReset('formData')"
                    style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>

        <h5>什么是订做？</h5>
        <p>
          订做设计作品就是我们根据您的任务书要求量身订做,由于订做花的人力,时间比较多,价格比成品贵,现成的都是做好的,所以价格便宜,订做和现成的都保证原创,无重复。

        </p>
        <p>
          定做计有定做和成品两种模式，可以从几个方面比较一下它们的区别，以便更好选择：

        </p>
        <p>
          1、性价比：前者价格比较高，后者价格相对较低；

        </p>
        <p>
          2、时效性：前者是根据客户的要求来做，一般需要1-7天的时间，后者是技术利用空余时间已经做好的，随时可以买到；

        </p>
        <p>
          3、适用性：前者适用于有具体的要求（比如有固定的题目，特别是有详细的要求），后者适用于没有具体要求的（比如没有固定题目，没有详细要求的）

        </p>

      </div>
      <user-footer-m></user-footer-m>

    </div>
  </div>
</template>
<script>

import api from '@/api/custom'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'
export default {
  mixins: [defaultValue, list, page],
  created () {
    this.getApi(api)
  },
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
        type: 'Html页面'
      }, {
        type: '小型系统'
      }, {
        type: '大型系统'
      }, {
        type: '其它'
      }],
      formData: {
        peopleName: '',
        peopleEmail: '',
        peoplePhone: '',
        peopleDescribe: '',
        porjectType: ''
      },
      ruleValidate: {

        peopleName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        peoplePhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],

        porjectType: [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        peopleEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '电子邮件格式不正确', trigger: 'blur' }
        ],
        peopleDescribe: [
          { required: true, message: '请输入需求概述', trigger: 'blur' },
          { type: 'string', min: 20, message: '字数不能少于20', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 数据提交
    submitData (e) {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          // 添加新的数据，拉取列表
          this.apiList.postSaveApi(e).then(res => {
            console.log(e)
            // 数据处理
            this.$alertInfo.alertInfo(res.code, res.msg)
            this.$refs['formData'].resetFields() // 清除数据
          }).catch(err => console.log(err))
        } else {
          this.$Message.error(this.$constV.inputTextRule)
        }
      })
    },
    // handleSubmit (name) {
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //       console.log(this.formData)
    //       this.$Message.success('Success!')
    //     } else {
    //       this.$Message.error('Fail!')
    //     }
    //   })
    // },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
