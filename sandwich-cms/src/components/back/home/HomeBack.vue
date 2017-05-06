<template>
  <div class="home-back">
    <header-back></header-back>
    <div class="col col-md-3">
      <page-create></page-create>
    </div>
    <div class="col col-md-9">
      <page-list></page-list>
    </div>
  </div>
</template>

<script>
import PageCreate from '@/components/back/home/PageCreate'
import PageList from '@/components/back/home/PageList'
import HeaderBack from '@/components/back/HeaderBack'

export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    PageCreate,
    PageList,
    HeaderBack
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
