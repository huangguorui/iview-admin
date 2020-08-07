<template>
  <div>
    <div class="btn">

      <Button @click="isModalClose=true"
              :disabled="isBtnDisable">删除</Button>

      <Button @click="addData('formData')"
              type="primary">{{title.addTitle}}</Button>
      <!-- @on-change="searchData" -->
      <Input v-model.trim="pageInfo.permissionName"
             placeholder="请输入需要搜索的文字"
             style="width: 150px;margin-right:15px" />
      <Button type="primary"
              @click="searchData">搜索</Button>
    </div>
    <!-- row-key="id" -->

    <Table border
           @on-selection-change="parkCheck"
           @on-row-click="expand"
           ref="selection"
           :loading="isTableLoading"
           :columns="rowTitle"
           :max-height="1000"
           :data="list"></Table>
    <drawer-m :formData="formData"
              :isCloseDrawer="isCloseDrawer"
              :titleDrawer="titleDrawer"
              @closeDrawer="closeDrawer"
              @submitData="submitData">

      <template slot="formData">
        <Form :model="formData"
              ref="formData"
              :rules="ruleFormData">
          <FormItem label="用户昵称"
                    label-position="top"
                    prop="username">
            <Input v-model="formData.username"
                   placeholder="用户昵称" />
          </FormItem>
          <FormItem label="用户邮箱"
                    label-position="top"
                    prop="email">
            <Input v-model="formData.email"
                   placeholder="用户邮箱" />
          </FormItem>

        </Form>
      </template>

    </drawer-m>
    <modal-m :isModalClose="isModalClose"
             :isModalLoading="isModalLoading"
             :delList="delList"
             @cancelModalClose="cancelModalClose"
             @deleteData="deleteData"></modal-m>

    <page-m :page-data="pageInfo"
            @pageChange="pageChange"
            @pagSizesChange="pageSizeChange"></page-m>

  </div>
</template>
<script>
import api from '@/api/user'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'

export default {
  name: 'user',
  mixins: [defaultValue, list, page],
  created () {
    this.getApi(api)
  },
  data () {
    return {
      ruleFormData: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      rowTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('table-expand-row2', {
              props: {
                row: params.row
              },
              on: {
                click: () => {
                  console.log(params.row)
                }
              }
            })
          }
        },
        {
          title: 'ID',
          key: 'id',
          tree: true

        }, {
          title: '用户ID',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '邮箱',
          key: 'email'
        },

        {
          title: '操作',
          align: 'center',
          type: 'text',
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
                on: {
                  click: () => {
                    // this.isCloseDrawer = true
                    // this.titleDrawer = "编辑资源"
                    // 带上id跳转到角色列表页面
                    this.$router.push({ path: 'roleList', query: { id: params.row.id } })
                    // 防止表格中的数据随着修改而发生改变
                    this.formData = Object.assign({}, params.row)
                  }
                }
              }, '添加角色'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.isCloseDrawer = true
                    this.titleDrawer = '编辑角色'
                    // 防止表格中的数据随着修改而发生改变
                    this.formData = Object.assign({}, params.row)
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
              }, '删除')
            ])
          }
        }

      ],
      title: {
        addTitle: '添加用户',
        editTitle: '编辑用户'
      }
    }
  },

  methods: {

  }
}
</script>
