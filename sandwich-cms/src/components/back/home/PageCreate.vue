<template>
  <div class="panel panel-default">
  	<div class="panel-heading">
      <strong>New Page</strong>
    </div>
	  <div class="panel-body">
	    <form id="form" class="form" v-on:submit.prevent="validate">
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
        newPage: {
	        title: '',
	        slug: '',
	        created: '',
	        updated: '',
	        type: 'basic',
	        published: false
      	},
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
			toastr.success('Page added successfully')
	  },
	  validate: function () {
	  	var scope = this;
	  	//check if slug already exists
	  	var doublon = false;
	  	this.$firebaseRefs.pages.once('value').then(function(snapshot) {
		    snapshot.forEach(function(data) {
		        var page = data.val();
		        if(page.slug == scope.slug) {
		        	toastr.error('Page slug already exists')
		        	doublon = true;
		        	//simple return to cancel further snapshot.forEach call
		        	return true;
		        }
		    });
		    if(!doublon)
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
