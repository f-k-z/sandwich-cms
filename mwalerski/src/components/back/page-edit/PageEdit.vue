<template>
<div class="page-edit container">
	<div class="row container">
		<header-back></header-back>
	</div>
  <div class="col col-md-5">
  	<div class="panel panel-default">
		  <div class="panel-heading">
		  	<strong>Edit Page #{{ key }}</strong>
		  </div>
		  <div class="panel-body">
		  	<form id="form-create" class="form" v-on:submit.prevent="validate">
					<div class="form-group">
						<label for="pageTitle">Title:</label>
						<input type="text" id="pageTitle" class="form-control" v-model="title">
					</div>
					<slug-field v-on:update="updatePageSlug" :string-to-slug="stringToSlug"></slug-field>
					<div class="form-group">
            <label for="pageCSSClass">CSS Class</label>
            <input type="text" id="pageCSSClass" v-model="currentPage.css_class">
          </div>
					<div class="form-group">
						<input type="checkbox" id="pagePublished" v-model="currentPage.published">
						<label for="pagePublished">Published</label> | 
						<input type="checkbox" id="pageLocked" v-model="currentPage.locked">
						<label for="pageLocked">Locked</label> | 
						<input type="checkbox" id="pageListed" v-model="currentPage.listed">
						<label for="pageListed">Listed</label>
					</div>
					<div class="form-group dates">
						<p><strong>Created:</strong> {{currentPage.created | timestampToDate}}<br>
						<strong>Last update:</strong>  {{currentPage.updated | timestampToDate}}</p>
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-primary" value="/ Edit">
						<router-link class="btn btn-info"  :to="{ path: '/page/'+currentPage.slug }"><i class="fa fa-eye" aria-hidden="true"></i> Preview</router-link>
					</div>
				</form>
		  </div>
	  </div>
	  <file-manager :page-key="key"></file-manager>
  </div>
  <div class="col col-md-7">
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
import FileManager from '@/components/back/page-edit/FileManager'
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
      currentPage: global.getEmptyPage(),
      title: '',
      stringToSlug: ''
    }
  },
  components: {
    HeaderBack, SlugField, SliceManager, FileManager
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
	  		var isCurrentPage = false;
	  		//check if the existing slug belongs to current page
	  		snapshot.forEach(function(childSnapshot) {
			      if(childSnapshot.key == scope.key)
			      	isCurrentPage = true;
			  });
	  		if(exists && !isCurrentPage)
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
.col-md-5 { padding-left: 0px;}
.col-md-7 { padding: 0; }
@media (max-width: 992px) {
  .col-md-5 { padding: 0;}
}
.dates { font-size: 12px; }

#form-create .btn-info { float: right; }
</style>
