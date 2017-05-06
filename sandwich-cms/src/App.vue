<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: 'app',
  data () {
    return {
      title: 'Sandwich CMS'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1 { text-align: center; display: inline-block; }
h1 a, h1 a:hover, h1 a:visited { text-decoration: none!important; color: grey; }
.glyphicon-tasks {  display: inline-block; font-size: 26px; margin-left: 15px; color: grey; }
</style>
