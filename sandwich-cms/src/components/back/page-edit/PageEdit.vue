<template>
<div class="page-edit">
	<div class="row container">
		<header-back></header-back>
	</div>
  <div class="col col-md-4">
  	<div class="panel panel-default">
		  <div class="panel-heading">
		  	<strong>{{ key }}</strong>
		  </div>
		  <div class="panel-body">
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
					<div class="form-group">
						<p><strong>Created:</strong> {{currentPage.created | timestampToDate}}</p>
						<p><strong>Last update:</strong>  {{currentPage.updated | timestampToDate}}</p>
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-primary" value="/ Edit">
					</div>
					<div class="form-group">
						<router-link :to="{ path: '/'+currentPage.slug }">Preview</router-link>
					</div>
				</form>
		  </div>
	  </div>
  </div>
  <div class="col col-md-8">
  	<slice-manager v-on:update="updatePageData" :page-key="key"></slice-manager>
  </div>
</div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'
import SlugField from '@/components/back/field/SlugField'
import SliceManager from '@/components/back/page-edit/SliceManager'
import HeaderBack from '@/components/back/HeaderBack'

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
    HeaderBack, SlugField, SliceManager
  },
  //load object on created
  created: function() {
  	var scope = this;
  	toastr.info(global.errorMessages.LOADING);
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
	    });
  },

  methods: {
  	updatePageSlug: function (newSlug) {
	  	this.currentPage.slug = newSlug;
	  },
	  editPage: function () {
	  	this.currentPage.updated = moment().format('x');
	  	this.$firebaseRefs.pages.child(this.key).set(this.currentPage);
			toastr.success(global.errorMessages.PAGE_EDITED)
	  },
	  validate: function () {
	  	var scope = this;
	  	//check if slug already exists
	  	this.$firebaseRefs.pages.orderByChild("slug").equalTo(this.currentPage.slug).once('value').then(function(snapshot) {
	  		var exists = snapshot.exists();
	  		if(exists)
	  			toastr.error(global.errorMessages.SLUG_EXIST);
	  		else
	  			scope.editPage();
			});
  	},
  	updatePageData: function (page) {
  		this.currentPage = page;
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
