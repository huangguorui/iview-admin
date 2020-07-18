<style lang="less" scoped>
.col {
  padding: 16px;
  background: #fff;
  height: 100%;
  border: 10px;
  // & :hover col {
  //   box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  //   border-color: #eee;
  //   // border: 1px solid #dcdee2;
  //   border-radius: 10px;
  // }
}
.btn {
  button {
    margin-right: 15px;
  }
  margin-bottom: 15px;
}
</style>
<template>
  <div>
    <Col class="col">
    <div class="btn">
      <Button type="primary">删除</Button>
      <Button type="primary">添加</Button>
      <Input style="width:200px;margin-right:15px"></Input>
      <Button type="primary">搜索</Button>
    </div>
    <Table :columns="columns1"
           :data="data1"></Table>

    </Col>
  </div>
</template>
<script>
import { getTableData } from '@/api/data'
export default {
  created () {
    console.log(getTableData())
  },
  data () {
    return {
      columns1: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  }
}
</script>
