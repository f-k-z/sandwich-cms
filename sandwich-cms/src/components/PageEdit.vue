<template>
  <div class='container'>
  	<h2>{{ key }}</h2>
  	<h3>{{ currentPage.title }}</h3>
  </div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'

export default {
  name: 'page-edit',

  data () {
    return {
    	//page key
      key: this.$route.params.page_id,
      currentPage: global.emptyPage
    }
  },
  //load object on created
  created: function() {
  	var scope = this;
		global.db.ref('pages').child(this.key)
	    .once('value')
	    .then(function(snapshot) {
	      var object = snapshot.val();
	      scope.currentPage = object;
	    })
	    .catch();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
