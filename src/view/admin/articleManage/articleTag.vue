<style lang="less" scoped>
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

          <FormItem label="标签名称"
                    label-position="top"
                    prop="title">
            <Input v-model="formData.tagName"
                   placeholder="标签名称" />
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
import api from '@/api/tag'
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
        tagName: [
          { required: true, message: '标签名称不可为空', trigger: 'blur' }
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
          title: '标签',
          key: 'tagName'
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
        addTitle: '添加标签',
        editTitle: '编辑标签'
      }

    }
  },
  created () {
    this.getApi(api)
  },
  methods: {

  }

}
</script>
