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
      <Input v-model.trim="pageInfo.permissionName"
             placeholder="请输入需要搜索的文字"
             style="width: 150px;margin-right:15px" />

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

          <FormItem label="文章标题"
                    label-position="top"
                    prop="title">
            <Input v-model="formData.title"
                   placeholder="文章标题" />
          </FormItem>
          <FormItem label="文章前言"
                    prop="description"
                    label-position="top">
            <Input type="textarea"
                   v-model="formData.description"
                   :rows="3"
                   placeholder="文章前言" />
          </FormItem>
          <FormItem label="文章内容"
                    label-position="top"
                    prop="content">
            <Input type="textarea"
                   v-model="formData.content"
                   :rows="4"
                   placeholder="文章内容" />
          </FormItem>
          <FormItem label="文章状态"
                    v-if="formData.status==0?true:formData.status==1?true:false"
                    prop="status">
            <Select v-model="formData.status"
                    placeholder="文章状态">
              <Option :value="item.status"
                      v-for="item in articleType"
                      :key="item.status">{{item.text}}</Option>
            </Select>
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
import api from '@/api/article'
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

      articleType: [{
        status: 1,
        text: '启用'
      }, {
        status: 0,
        text: '禁用'
      }],
      ruleFormData: {
        title: [
          { required: true, message: '标题不可为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '文章前言不可为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章内容不可为空', trigger: 'blur' }
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
          title: '创建时间',
          key: 'created',
          width: 200
        },
        {
          title: '文章标题',
          key: 'title'
        },
        // {
        //   title: '文章前言',
        //   key: 'description'
        // },
        // {
        //   title: '文章内容',
        //   key: 'content'
        // },
        {
          title: '文章状态',
          key: 'status'
        }, {
          title: '发表人ID',
          key: 'userId'
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
        addTitle: '添加文章',
        editTitle: '编辑文章'
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
