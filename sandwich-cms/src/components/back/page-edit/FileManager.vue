<template>
  <h3>{{ msg }} page #{{ pageKey }}</h3>
</template>

<script>
import global from '@/global'

export default {
  name: 'file-manager',
  props: ['pageKey'],
  data () {
    return {
      msg: 'File Manager'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
