/**
 *
 * @author h
 */
export default {
  name: 'defaultValue',
  data () {
    return {
      color: ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'],

      isModalLoading: false, // 模态框loading状态
      isModalClose: false, // 是否关闭模态框
      isTableLoading: true, // 表格loading
      isCloseDrawer: false, // 是否关闭侧面窗口
      titleDrawer: '', // 窗口标题
      delList: [], // 删除列表
      isBtnDisable: true, // 按钮状态
      list: [], // 获取的数据列表
      formData: {}, // 提交的数据
      getUrlIp: 'http://49.234.91.147:8081/', // 实际开发请求地址
      query: { // 查询

      }

    }
  },
  computed: {

  },

  // 开局刷新
  created () {
    // console.log("混入开始")
  },
  methods: {

  }
}
