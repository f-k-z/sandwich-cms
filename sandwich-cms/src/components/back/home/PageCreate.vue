<template>
  <div class="panel panel-default">
  	<div class="panel-heading">
      <strong>New Page</strong>
    </div>
	  <div class="panel-body">
	    <form id="form-create" class="form" v-on:submit.prevent="validate">
				<div class="form-group">
					<label for="pageTitle">Title:</label>
					<input type="text" id="pageTitle" class="form-control" v-model="title">
				</div>
				<slug-field v-on:update="updatePageSlug" :string-to-slug="stringToSlug"></slug-field>
				<input type="submit" class="btn btn-primary" v-bind:class="{ disabled: !active }" value="+ Create">
			</form>
	  </div>
	  </div>
  </div>
</template>

<script>
import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'
import SlugField from '@/components/back/field/SlugField'

export default {
	name: 'page-create',

  firebase: {
    pages: global.db.ref('pages')
  },

  components: {
    SlugField,
  },
  
	data () {
    return {
        newPage: global.emptyPage,
      	slug: '',
      	stringToSlug: '',
      	title: ''
    }
 	},
	methods: {
		updatePageSlug: function (newSlug) {
	  	this.slug = newSlug;
	  },
	  addPage: function () {
	    //get the scope
	    var newPage = this.newPage;
	    //
	    newPage.title = this.title;
	    newPage.slug = this.slug; 
	  	//set dates
	  	newPage.created = newPage.updated = moment().format('x');
		//add to firebase
		this.$firebaseRefs.pages.push(newPage);
		//reset fields
			newPage.title = newPage.slug = newPage.created = newPage.updated = this.slug = this.title = '';
			toastr.success(global.errorMessages.PAGE_ADDED);
	  },
	  validate: function () {
	  	var scope = this;
	  	//check if slug already exists
	  	this.$firebaseRefs.pages.orderByChild("slug").equalTo(this.slug).once('value').then(function(snapshot) {
	  		var exists = snapshot.exists();
	  		if(exists)
	  			toastr.error(global.errorMessages.SLUG_EXIST);
	  		else
	  			scope.addPage();
		});
  	},
  },
	computed: {
	  	active: function () {
	  		return (this.slug != '');
	  	}
	},
	watch: {
	    title: { 
	    	handler: function () {
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
