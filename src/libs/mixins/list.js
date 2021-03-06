/**
 *
 * @author h
 */
export default {
  name: 'list',
  data () {
    return {
      apiList: {}
    }
  },
  computed: {

  },
  watch: {
    delList: function () {
      if (this.delList.length === 0) {
        this.isBtnDisable = true
      } else {
        this.isBtnDisable = false
      }
    }
  },
  created () {},
  methods: {
    // 开始调用
    getApi (apiList) {
      // console.log('----混合开始----')
      this.apiList = apiList
      this.getList(this.pageInfo)
    },
    // 模块化的数据列表
    getList (data) {
      // setInterval(() => {
      this.isTableLoading = true
      this.apiList.getListApi(data).then(res => {
        // 数据处理
        this.pageInfo = res.pageInfo
        this.list = res.list
        this.isTableLoading = false
      }).catch(err => console.log(err))
      // }, 3000)
    },
    // 删除
    deleteData () {
      this.isModalLoading = true
      this.apiList.postDeleteApi(this.delList).then(res => {
        // 数据处理
        console.log(res)
        this.delList = []
        this.isModalLoading = false
        this.isModalClose = false
        this.getList(this.pageInfo)
        this.$alertInfo.alertInfo(res.code, res.msg)
      }).catch(err => console.log(err))
    },
    // 数据提交
    submitData (e) {
      this.$refs['formData'].validate((valid) => {
        console.log(e)
        if (valid) {
          this.isCloseDrawer = false
          // 添加新的数据，拉取列表
          this.apiList.postSaveApi(e).then(res => {
            // 数据处理
            console.log(res)
            this.getList(this.pageInfo)
            this.$alertInfo.alertInfo(res.code, res.msg)
            this.$refs['formData'].resetFields() // 清除数据
          }).catch(err => console.log(err))
        } else {
          this.$Message.error(this.$constV.inputTextRule)
        }
      })
    },
    // 选中表格
    parkCheck (e) {
      if (e.length === 0) {
        this.delList = []
      }
      let id = []
      // 分离出id进行发送
      e.forEach(item => {
        id.push(item.id)
      })
      this.delList = id
    },
    // 搜索数据
    searchData () {
      // 将两个对象合并到一起
      let query = Object.assign(this.query, this.pageInfo)
      this.getList(query)
      console.log(this.pageInfo)
    },
    // 关闭组件侧拉框
    closeDrawer () {
      this.isCloseDrawer = false
    },
    // 添加drawer组件数据
    addData (clearData) {
      this.formData = {

      }
      this.$refs[clearData].resetFields()
      this.titleDrawer = this.title.addTitle
      this.isCloseDrawer = true
    },
    // 编辑drawer组件数据
    editData () {
      this.titleDrawer = this.title.editTitle
      this.isCloseDrawer = true
    },
    // 关闭模态框
    cancelModalClose () {
      this.isModalClose = false
    },
    // 获取表格数据，可以进行一些操作
    expand () {
      // e
      // console.log(e)
    }

  }
}
