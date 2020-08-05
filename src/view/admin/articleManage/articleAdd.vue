<template>
  <div>

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
      <!-- <FormItem label="文章内容"
                label-position="top"
                prop="content">
        <Input type="textarea"
               v-model="formData.content"
               :rows="4"
               placeholder="文章内容" />
      </FormItem> -->
      <!-- <FormItem label="文章状态"
                prop="status">
        <Select v-model="formData.status"
                placeholder="文章状态">
          <Option :value="item.status"
                  v-for="item in articleType"
                  :key="item.status">{{item.text}}</Option>
        </Select>
      </FormItem> -->
      <!-- :value无效 -->
      <Editor v-model="formData.content"></Editor>

      <Button @click="submitData(formData)">提交</Button>
    </Form>

  </div>
</template>

<script>

import Editor from '_c/editor'
import api from '@/api/article'
import page from '@/libs/mixins/page'
import defaultValue from '@/libs/mixins/defaultValue'
import list from '@/libs/mixins/list'
export default {
  mixins: [defaultValue, list, page],
  components: {
    Editor
  },
  // watch: {
  //   content: {
  //     handler (newVal) {
  //       console.log(newVal)
  //     },
  //     deep: true
  //   }
  // },
  data () {
    return {
      formData: {
        // status: 1
      },
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
      articleType: [{
        status: 1,
        text: '启用'
      }, {
        status: 0,
        text: '禁用'
      }]
    }
  },
  created () {
    this.getApi(api)
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
</style>
