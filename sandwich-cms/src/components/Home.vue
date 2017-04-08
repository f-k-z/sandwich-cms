<template>
  <div class="home">
    <div class="col col-md-3">
      <page-create></page-create>
    </div>
    <div class="col col-md-9">
      <page-list></page-list>
    </div>
  </div>
</template>

<script>
import PageCreate from '@/components/PageCreate'
import PageList from '@/components/PageList'

export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    PageCreate,
    PageList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
