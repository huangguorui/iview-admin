<template>
  <div>
    <Editor :value="text"></Editor>

  </div>
</template>

<script>

import Editor from '_c/editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    add () {
      console.log(123)
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
