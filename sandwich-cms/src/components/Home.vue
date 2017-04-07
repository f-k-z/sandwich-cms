<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <page-create></page-create>
    <page-list></page-list>
  </div>
</template>

<script>
import PageCreate from '@/components/PageCreate'
import PageList from '@/components/PageList'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home'
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
