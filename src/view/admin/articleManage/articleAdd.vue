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

      <Row>
        <Col span="8">
        <FormItem label="页数"
                  label-position="top"
                  prop="pages">
          <Input v-model="formData.pages"
                 placeholder="页数" />
        </FormItem>
        </Col>
        <Col span="8">
        &nbsp;
        </Col>
        <Col span="8">

        <FormItem label="价格"
                  label-position="top"
                  prop="price">
          <Input v-model="formData.price"
                 placeholder="价格" />
        </FormItem>
        </Col>

        <Col span="24">
        <FormItem label="技术标签"
                  label-position="top"
                  prop="tags">
          <Input v-model="formData.tags"
                 placeholder="技术标签" />
        </FormItem>

        <!-- <FormItem label="技术标签"
                  label-position="top"
                  prop="tags">
          <Select v-model="formData.tags"
                  multiple
                  style="width:260px">
            <Option v-for="item in tags"
                    :value="item.tagName"
                    :key="item.id">{{ item.tagName }}</Option>
          </Select>
        </FormItem> -->
        <p>请选择技术标签：</p>
        <Button v-for="(item,i) in tags"
                @click="tagSelect(item)"
                :key="i"
                :type="item.isTagDisable?'primary':'default'">
          <!-- :disabled="item.isTagDisable" -->
          {{item.tagName}}
        </Button>

        </Col>
      </Row>

      </FormItem>
      <FormItem label="文章前言"
                label-position="top"
                prop="description">
        <Input type="textarea"
               v-model="formData.description"
               :rows="4"
               placeholder="文章前言" />
      </FormItem>

      <!-- :value无效 -->
      <Editor v-model="formData.content"></Editor>

      <Button @click="submitData(formData)">提交</Button>
    </Form>

  </div>
</template>

<script>

import Editor from '_c/editor'
import apiGetTag from '@/api/tag'
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
      tags: [],
      tagsSelect: [],
      formData: {
        tags: ''
        // status: 1
      },
      ruleFormData: {
        title: [
          { required: true, message: '标题不可为空', trigger: 'blur' }
        ],
        pages: [
          { required: true, message: '页数不可为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不可为空', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '技术标签不可为空', trigger: 'blur' }
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
    this.getTag()
  },
  methods: {
    tagSelect (data) {
      let str = ''
      console.log(data.isTagDisable)
      if (data.isTagDisable) {
        data.isTagDisable = false

        this.tagsSelect.forEach((item, i) => {
          if (item.id === data.id) { this.tagsSelect.splice(i, 1) }
        })
      } else {
        data.isTagDisable = true
        this.tagsSelect.push(data)
        console.log(this.tagsSelect)
      }
      this.tagsSelect.forEach((item) => {
        str += item.tagName + ','
      })

      this.formData.tags = str.substr(0, str.length - 1)

      this.$set(data, data.id, data)
    },

    getTag () {
      console.log(apiGetTag)
      apiGetTag.getListApi({ size: 100 }).then(res => {
        this.tags = res.list
        this.tags.forEach((item, i) => {
          this.tags[i].isTagDisable = false
          this.tags[i].index = i
        })
      }).catch(err => console.log(err))
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
