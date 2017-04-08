<template>
  <div id="app" class="container">
    <h1>{{ title }}</h1>
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
</style>
