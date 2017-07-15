<template>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <router-link class="navbar-brand" v-bind:to="'/admin'">
			    {{ title }}
			  </router-link>
	    </div>
	    <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ email }}<span class="caret"></span></a>
	          <ul class="dropdown-menu">
	          	<li>
	          		<router-link v-bind:to="'/admin'">Home Admin</router-link>
	          	</li>
	            <li role="separator" class="divider"></li>
	            <li><a v-on:click="signOut">Sign out</a></li>
	          </ul>
	        </li>
	    </ul>
	  </div>
	</nav>
</template>

<script>
import global from '@/global'
import Firebase from 'firebase'

export default {
	name: 'header-back',
	data () {
    return {
      title: global.PROJECT_NAME,
      email: '',
    }
	},
	methods: {
		signOut: function () {
			var scope = this;
			Firebase.auth().signOut().then(function() {
			  scope.$router.push('/login');
			}, function(error) {
			  console.error('Sign Out Error', error);
			});
		}
	},
  created: function() {
	  var user = Firebase.auth().currentUser;
		if (user) {
		  // User is signed in.
		  this.email = user.email;
		} else {
		  // No user is signed in.
		  this.$router.push('/login');
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar { margin-bottom: 15px; border-radius: 0 0 5px 5px; border-top: 0;}
</style>
