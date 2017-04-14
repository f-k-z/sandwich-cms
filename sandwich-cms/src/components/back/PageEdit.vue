<template>
	<div class="page-edit">
  <div class="col col-md-3">
  	<div class="panel panel-default">
	  <div class="panel-heading">
	  	<h5>{{ key }}</h5>
	    <form id="form" class="form" v-on:submit.prevent="editPage">
				<div class="form-group">
					<label for="pageTitle">Title:</label>
					<input type="text" id="pageTitle" class="form-control" v-model="currentPage.title">
				</div>
				<div class="form-group">
					<label for="pageTitle">Slug:</label>
					<input type="text" id="pageSlug" class="form-control" v-model="currentPage.slug">
				</div>
				<div class="form-group">
					<input type="checkbox" id="pagePublished" v-model="currentPage.published">
					<label for="pagePublished">Published</label>
				</div>
				<input type="submit" class="btn btn-primary" value="/ Edit">
			</form>
	  </div>
	  </div>
  </div>
  <div class="col col-md-9">
  </div>
</div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'

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
  	toastr.info('Loading page...')
		global.db.ref('pages').child(this.key)
	    .once('value')
	    .then(function(snapshot) {
	      var object = snapshot.val();
	      scope.currentPage = object;
	      toastr.clear();
	    })
	    .catch();
  },

  methods: {
	  editPage: function () {
	  	this.currentPage.updated = moment().format();
	  	global.db.ref('pages').child(this.key).set(this.currentPage);
			toastr.success('Page edited successfully')
	  },
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
