<template>
  <div>
    <div class="demo-upload-list"
         v-for="item in uploadList"
         :key="item.id">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline"
                @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline"
                @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info></Progress>
      </template>
    </div>

    <form method="post"
          enctype="multipart/form-data"
          action="http://localhost:8081/article/pic">
      <p style="margin:10px 0;">上传图片: &nbsp;&nbsp;
        <input type="file"
               name="file"
               multiple
               ID="fupPhoto" />
        <input type="submit"
               id="fileSubmit"
               name="Submit"
               value="上传" />

      </p>
    </form>

    <Upload ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="http://localhost:8081/article/pic"
            style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera"
              size="20"></Icon>
      </div>
    </Upload>
    <!-- <img src="http://localhost:8081/uploads/about.jpg"
         alt="..."> -->

    <Modal title="View Image"
           v-model="visible">
      <img :src="'http://localhost:8081/uploads/' + imgName "
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultList: [
        // {
        //   'name': 'logo.jpg',
        //   'url': 'http://192.168.25.1:8081/uploads/logo.jpg'
        // }
        // {
        //   'name': 'bc7521e033abdd1e92222d733590f104',
        //   'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        // }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      imgFileList: []
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      // this.defaultList = Object.assign(this.defaultList, res.data)

      res.data.forEach((item, i) => {
        let imgInfo = {}
        imgInfo.name = item.imgName
        imgInfo.url = item.imgUrl
        console.log('imgInfo===')
        console.log(imgInfo)
        file.url = item.imgUrl
        file.name = item.imgName
        // this.defaultList.push(imgInfo)

        this.imgFileList.push({
          imgUrl: item.imgUrl,
          imgName: item.imgName,
          imgText: item.imgText
        })
        this.$emit('imgFile', this.imgFileList)
      })

      console.log(this.defaultList)
      console.log(res)

      // file.url = 'http://192.168.25.1:8081/uploads/logo.jpg'
      // file.name = 'logo.jpg'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      console.log(this.defaultList)

      //   return new Promise((resolve, reject) => {
      //     this.$Modal.confirm({
      //       title: 'Title',
      //       content: '<p>Content of dialog</p><p>Content of dialog</p>',
      //       onOk: () => {
      //         resolve()
      //         this.$Message.info('Clicked ok')
      //       },
      //       onCancel: () => {
      //         // reject()

      //         this.$Message.info('Clicked cancel')
      //       }
      //     })

      //     // this.$Model.confirm({
      //     //   title: '是否取消',
      //     //   onOk: () => {
      //     //     resolve()
      //     //   },
      //     //   onCancel: () => {
      //     //     reject()
      //     //   }
      //     // })
      //   })

      //   const check = this.uploadList.length < 5
      //   if (!check) {
      //     this.$Notice.warning({
      //       title: 'Up to five pictures can be uploaded.'
      //     })
      //   }
      //   return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
