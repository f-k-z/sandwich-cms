<template>
  <div class="home">
  <button v-if="isUser" class="btn btn-primary action right" v-on:click="goToAdmin(page)">Admin <i class="fa fa-home" aria-hidden="true"></i></button>
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
import Firebase from 'firebase'

export default {
  name: 'Home',
  firebase: {
    pages: global.db.ref('pages')
  },
  data () {
    return {
      msg: 'Home',
      isUser: false
    }
  },
  methods: {
    goToAdmin: function () {
      this.$router.push('/admin');
    },
  },
  //load object on created
  created: function() {
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .action { 
    right:15px; 
    position: absolute; 
    top: 15px; 
    opacity: .5; 
  }
  .action:hover { opacity: 1; }
</style>
