<template>
  <div>
    <pic @imgFile="imgFile"></pic>
    <Form :model="formData"
          ref="formData"
          :rules="ruleFormData">
      {{file}}
      <FormItem label="文章标题"
                label-position="top"
                prop="title">
        <Input v-model="formData.title"
               placeholder="文章标题" />
      </FormItem>
      <FormItem label="上传图片"
                label-position="top"
                prop="title">

        <input type="file"
               @change="getFiles($event)" />

      </FormItem>

      <Row>

        <Col span="24">
        <FormItem label="首页图"
                  label-position="top"
                  prop="indexImg">

          <Input type="textarea"
                 v-model="formData.indexImg"
                 :rows="3"
                 placeholder="首页图" />
        </FormItem>
        </Col>
        <Col span="8">
        &nbsp;
        </Col>

        <Col span="24">

        <FormItem label="详情页图"
                  label-position="top"
                  prop="img">

          <Input type="textarea"
                 v-model="formData.img"
                 :rows="3"
                 placeholder="详情页图" />

        </FormItem>
        </Col>

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
                 :disabled="true"
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
                size="large"
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
      file: [],
      tags: [],
      tagsSelect: [],
      formData: {
        tags: '',
        img: null
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
        ],
        indexImg: [
          { required: true, message: '首页图片不可为空', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '图片列表不可为空', trigger: 'blur' }
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
    imgFile (e) {
      console.log(e)
      this.file = e
      this.formData.img = null
      this.formData.indexImg = e[0].imgText
      e.forEach((item, i) => {
        if (this.formData.img === null) {
          this.formData.img = item.imgText + ','
        } else {
          this.formData.img += item.imgText + ','
        }
      })
      this.formData.img = this.formData.img.substr(0, this.formData.img.length - 1)
      // this.formData.img = this.formData.img.split(',')//字符串转
      // this.formData.img = Array.from(new Set(this.formData.img))
      // this.formData.img = this.formData.img.join(',')
    },
    getFiles (e) {
      this.file = e.target.files
      console.log(e.target.files)
    },
    // 数据提交
    submitData (e) {
      this.$refs['formData'].validate((valid) => {
        console.log(e)
        if (valid) {
          this.isCloseDrawer = false
          // 添加新的数据，拉取列表

          // let data = {
          //   blog: this.formData,
          //   file: this.file
          // }

          this.apiList.postSaveApi(e).then(res => {
            // 数据处理
            console.log(res)
            this.getList(this.pageInfo)
            this.$alertInfo.alertInfo(res.code, res.msg)
            this.$refs['formData'].resetFields() // 清除数据

            // 清除缓存
            localStorage.setItem('editorCache', '')
          }).catch(err => console.log(err))
        } else {
          this.$Message.error(this.$constV.inputTextRule)
        }
      })
    },

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
