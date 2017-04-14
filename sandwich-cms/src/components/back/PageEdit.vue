<template>
	<div class="page-edit">
  <div class="col col-md-3">
  	<div class="panel panel-default">
	  <div class="panel-heading">
	  	<h5>{{ key }}</h5>
	    <form id="form" class="form" v-on:submit.prevent="validate">
				<div class="form-group">
					<label for="pageTitle">Title:</label>
					<input type="text" id="pageTitle" class="form-control" v-model="title">
				</div>
				<slug-field v-on:update="updatePageSlug" :string-to-slug="stringToSlug"></slug-field>
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
import SlugField from '@/components/back/field/SlugField'

export default {
  name: 'page-edit',

  firebase: {
	    pages: global.db.ref('pages')
	},

  data () {
    return {
    	//page key
      key: this.$route.params.page_id,
      currentPage: global.emptyPage,
      title: '',
      stringToSlug: ''
    }
  },
  components: {
    SlugField,
  },
  //load object on created
  created: function() {
  	var scope = this;
  	toastr.info('Loading page...')
		this.$firebaseRefs.pages.child(this.key)
	    .once('value')
	    .then(function(snapshot) {
	      var object = snapshot.val();
	      scope.currentPage = object;
	      //always update title before slug
	      scope.title = scope.currentPage.title;
	      //init first slug
	      scope.stringToSlug = scope.currentPage.slug;
	      toastr.clear();
	    })
	    .catch();
  },

  methods: {
  	updatePageSlug: function (newSlug) {
	  	this.currentPage.slug = newSlug;
	  },
	  editPage: function () {
	  	this.currentPage.updated = moment().format();
	  	this.$firebaseRefs.pages.child(this.key).set(this.currentPage);
			toastr.success('Page edited successfully')
	  },
	  validate: function () {
	  	var scope = this;
	  	var doublon = false;
	  	this.$firebaseRefs.pages.once('value').then(function(snapshot) {
		    snapshot.forEach(function(data) {
		        var page = data.val();
		        if(page.slug == scope.currentPage.slug) {
		        	toastr.error('Page slug already exists')
		        	doublon = true;
		        	//simple return to cancel further snapshot.forEach call
		        	return true;
		        }
		    });
		    if(!doublon)
					scope.editPage();
			});
  	},
	},

	watch: {
	    title: { 
	    	handler: function () {
		      this.currentPage.title = this.title;
		      this.stringToSlug = this.title;
		  	},
		  	//make it sync to avoid stringToSlug override by title when both values are directly set 
		  	sync: true,
		  }
	},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
