<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  // overflow: hidden;
  overflow: auto;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}

.col {
  padding: 2%;
  background: #fff;
  // height: 100%;
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
