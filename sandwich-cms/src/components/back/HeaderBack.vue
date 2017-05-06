<template>
	 	<nav class="navbar navbar-default">
	    <div class="navbar-header">
		    <span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>
		    <h1>
		      <router-link v-bind:to="'/'">{{ title }}</router-link>
		   	</h1>
	    </div>
		</nav>
</template>

<script>
export default {
	name: 'header-back',
	data () {
    return {
      title: 'Sandwich CMS'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar { background: transparent; border:0;}
</style>
