<style lang="less" scoped>
</style>
<template>
  <div>
    <div class="btn">
      <Button @click="isModalClose=true"
              :disabled="delList.length==0?true:false">删除</Button>
      <Button type="primary"
              @click="addRoleAndPermission"
              :disabled="isBtnDisable">提交资源绑定角色</Button>
      <Button @click="addData('formData')"
              type="primary">{{title.addTitle}}</Button>
      <!-- @on-change="searchData" -->
      <Input v-model.trim="query.permissionName"
             placeholder="请输入需要搜索的文字"
             :clearable="true"
             style="  width: 150px;margin-right:15px" />

      <Button type="primary"
              @click="searchData">搜索</Button>

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
        <Form :model="formData"
              ref="formData"
              :rules="ruleFormData">
          <FormItem label="资源名称"
                    label-position="top"
                    prop="permissionName">
            <Input v-model="formData.permissionName"
                   placeholder="请输入资源名" />
          </FormItem>
          <FormItem label="资源路径"
                    prop="url"
                    label-position="top">
            <Input v-model="formData.url"
                   placeholder="请输入资源路径" />
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

  </div>
</template>
<script>
import api from '@/api/permission'
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
      ruleFormData: {
        permissionName: [
          { required: true, message: '资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '资源地址不可为空', trigger: 'blur' }
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
          key: 'id'
        }, {
          title: '资源名',
          key: 'permissionName'
        },
        {
          title: '资源路径',
          key: 'url'
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
        addTitle: '添加资源',
        editTitle: '编辑资源'
      }

    }
  },
  created () {
    this.getApi(api)
  },
  methods: {

    // 发送角色和资源关联请求
    addRoleAndPermission () {
      if (this.$route.query.id == null) {
        return false
      }
      this.delList.push(this.$route.query.id)
      api.postAddRoleAndPermission(this.delList).then(res => {
        console.log(res)
        this.getList(this.data)
      }).catch(err => console.log(err))
    }
  }

}
</script>
