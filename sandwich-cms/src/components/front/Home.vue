<template>
  <div class="home">
  <h1>{{ msg }}</h1>
    <ul class="nav">
    	<li v-for="page in pages">       
        <router-link :to="'page/'+page.slug">{{page.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: 'Home',
  firebase: {
    pages: global.db.ref('pages')
  },
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
