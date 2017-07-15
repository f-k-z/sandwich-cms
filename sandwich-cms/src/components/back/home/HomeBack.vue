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
  name: 'home-back',
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
.col-md-3 { padding-left: 0px;}
.col-md-9 { padding: 0; }
@media (max-width: 992px) {
  .col-md-3 { padding: 0;}
}
</style>
