<style lang="less" scoped>
</style>
<style scoped>
.top,
.bottom {
  text-align: center;
}
.center {
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}
.center-left {
  float: left;
}
.center-right {
  float: right;
}
</style>
<template>
  <div>
    <div class="btn">
      <Button @click="isModalClose=true"
              :disabled="delList.length==0?true:false">删除</Button>

      <Button @click="addData('formData')"
              type="primary">{{title.addTitle}}</Button>
      <!-- @on-change="searchData" -->
      <Input v-model.trim="query.permissionName"
             @input="searchData"
             placeholder="请输入需要搜索的文字"
             :clearable="true"
             style="  width: 150px;margin-right:15px" />

      <Button type="primary"
              @click="searchData">搜索</Button>
      <Button type="primary"
              @click="exportData ">下载Excel文件</Button>
    </div>
    <Table border
           @on-selection-change="parkCheck"
           ref="selection"
           :loading="isTableLoading"
           :columns="rowTitle"
           :max-height="450"
           size="small"
           :data="list"></Table>
    <drawer-m :formData="formData"
              :isCloseDrawer="isCloseDrawer"
              :titleDrawer="titleDrawer"
              @closeDrawer="closeDrawer"
              @submitData="submitData">

      <template slot="formData">
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

          <FormItem label="需求概述"
                    prop="peopleDescribe">
            <Input v-model="formData.peopleDescribe"
                   type="textarea"
                   :autosize="{minRows: 5,maxRows: 20}"
                   placeholder="需求概述：请告知我们产品的使用品台、功能需求、数量等"></Input>
          </FormItem>

        </Form>
      </template>

    </drawer-m>

    <modal-m :isModalClose="isModalClose"
             :isModalLoading="isModalLoading"
             :delList="delList"
             @cancelModalClose="cancelModalClose"
             @deleteData="deleteData"></modal-m>
    <!-- {{isCloseDrawer}} -->
    <page-m :page-data="pageInfo"
            @pageChange="pageChange"
            :isSize="true"
            @pageSizeChange="pageSizeChange"></page-m>

    <Modal v-model="isInfo"
           title="项目描述详情"
           @on-ok="ok"
           @on-cancel="cancel">
      <p>项目描述详情：</p>
      <Input v-model="infoData.peopleDescribe"
             type="textarea"
             :disabled="true"
             :autosize="{minRows: 5,maxRows: 20}"
             placeholder=""></Input>
    </Modal>

  </div>
</template>
<script>
import api from '@/api/custom'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'

export default {
  name: 'permission',
  mixins: [defaultValue, list, page],
  components: {
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
        type: '大型系统'
      }, {
        type: '其它'
      }],
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
      },
      rowTitle: [
        {
          type: 'selection',
          width: 60,

          align: 'center'
        },
        {
          title: 'ID',
          key: 'id',
          width: 50
        },
        {
          title: '创建时间',
          key: 'created'
        },
        {
          title: '项目类型',
          key: 'porjectType'
        },
        {
          title: '联系人姓名',
          key: 'peopleName'

        },
        {
          title: '联系人电话',
          key: 'peoplePhone'
        },
        {
          title: '联系人邮箱',
          key: 'peopleEmail'
        },
        {
          title: '项目描述',
          key: 'peopleDescribe',
          width: 200,
          render: (h, params) => {
            return h('div', [

              h('div', {
                props: {
                },
                style: {
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                  width: 200
                },
                attrs: { title: '单击查看详情' },
                on: {
                  click: () => {
                    this.isInfo = true
                    this.infoData = params.row
                    console.log(params.row)
                  }
                }
              }, params.row.peopleDescribe)
            ])
          }
        },
        {
          title: '当前状态',
          key: 'status'

        },

        {
          title: '发送人Ip',
          key: 'ip'
        },
        {
          title: '操作',
          align: 'center',
          type: 'text',
          width: 200,
          render: (h, params) => {
            return h('div', [

              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                // props: {
                //   size: 'small'
                // },
                on: {
                  click: () => {
                    this.isCloseDrawer = true
                    this.titleDrawer = '编辑资源'

                    // 防止表格中的数据随着修改而发生改变
                    this.formData = Object.assign({}, params.row)
                    console.log(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row)
                    this.delList = [params.row.id]
                    this.isModalClose = true
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                // props: {
                //   size: 'small'
                // },
                on: {
                  click: () => {
                  }
                }
              }, '邮件回复')
            ])
          }
        }

      ],
      title: {
        addTitle: '添加',
        editTitle: '编辑定制'
      },
      isInfo: false,
      infoData: {}

    }
  },
  created () {
    this.getApi(api)
  },
  methods: {
    exportData () {
      let data = []

      // setInterval(() => {
      this.apiList.getListApi({ size: this.pageInfo.total }).then(res => {
        // 数据处理
        data = res.list
        console.log(data)
        console.log('size: ' + this.pageInfo.total)
        // selection 要和表的ref一致
        this.$refs.selection.exportCsv({
          filename: '定制需求列表',
          columns: this.rowTitle,
          data: data
        })
      }).catch(err => console.log(err))
      // }, 3000)
    },
    cancel () {
      this.isInfo = false
    },
    ok () {
      this.isInfo = false
    }
  }

}
</script>
