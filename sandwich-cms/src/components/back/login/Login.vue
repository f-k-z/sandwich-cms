<template>
  <div class="col-md-6 col-md-offset-3">
  	<h2>{{ title }}</h2>
  	<div class="panel panel-default ">
  	<div class="panel-heading">
      <strong>Login</strong>
    </div>
	  <div class="panel-body">
	  <form id="form-login" class="form" v-on:submit.prevent="login">
	  	<div class="form-group">
					<label for="login">Email:</label>
					<input type="text" id="email" class="form-control" v-model="email">
			</div>
			<div class="form-group">
					<label for="pwd">Password:</label>
					<input type="password" id="pwd" class="form-control" v-model="pwd">
			</div>
	    <input type="submit" class="btn btn-primary" value="> Login">
	    <br>
	    <div v-if="error !== ''" class="alert alert-danger alert-dismissible">
			  {{ error }}
			</div>
	  </form>
		</div></div>
  </div>
</template>

<script>
import global from '@/global'
import Firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
    	title: global.PROJECT_NAME,
      email: '',
      pwd: '',
      error: '',
    }
  },
  methods: {
  	login: function () {
	  	var scope = this;
	  	var credential = Firebase.auth().signInWithEmailAndPassword(this.email, this.pwd).then(function() {
  				// Sign-in successful.
  				scope.$router.push('/admin');
				}).catch(function(error) {
	  		console.log(error);
				  // Errors
				  var errorCode = error.code;
				  scope.error = error.message;
				});;
	  },
  },
  created: function() {
  	//
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.alert { margin: 15px 0 0 0; }
</style>
