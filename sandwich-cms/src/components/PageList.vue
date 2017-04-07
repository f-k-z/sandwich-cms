<template>
	<div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ msg }}</h3>
      </div>
    </div>
</template>

<script>

import global from '@/global'

export default {
  name: 'page-list',

  data () {
    return {
      	msg: global.test,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
