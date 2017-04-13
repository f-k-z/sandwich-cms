<template>
  <div class="panel panel-default">
	  <div class="panel-heading">
	    <form id="form" class="form" v-on:submit.prevent="validate">
				<div class="form-group">
					<label for="pageTitle">Title:</label>
					<input type="text" id="pageTitle" class="form-control" v-model="newPage.title">
				</div>
				<div class="form-group">
					<label for="pageSlug">URL:</label>
					{{ slug }}
				</div>
				<input id="submitos" type="submit" class="btn btn-primary" v-bind:class="{ disabled: !active }" value="+ Create">
			</form>
	  </div>
	  </div>
  </div>
</template>

<script>
import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'
import jquery from 'jquery'

export default {
	  name: 'page-create',

	  firebase: {
	    pages: global.db.ref('pages')
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
	      	}
	    }
 	},
	methods: {
	  addPage: function () {
	    //get the scope
	    var newPage = this.newPage;
	  	//set dates
	  	newPage.created = newPage.updated = moment().format();
	  	//add to firebase
		this.$firebaseRefs.pages.push(newPage);
		//reset fields
		newPage.title = newPage.slug = newPage.created = newPage.updated = '';
		toastr.success('Page added successfully')
	  },
	  updateSlug: function () {
	  	console.log(slug);
	  	this.newPage.slug = slug;
	  },
	  validate: function () {
	  	var scope = this;
	  	var doublon = false;
	  	this.$firebaseRefs.pages.once('value').then(function(snapshot) {
		    snapshot.forEach(function(data) {
		        var page = data.val();
		        if(page.slug == scope.newPage.slug) {
		        	toastr.error('Page URL already exists')
		        	doublon = true;
		        	//simple return to cancel further snapshot.forEach call
		        	return true;
		        }
		    });
		    if(!doublon)
				scope.addPage();
		});
	  },
	  slugify: function (str) {
		  str = str.replace(/^\s+|\s+$/g, ''); // trim
		  str = str.toLowerCase();
		  
		  // remove accents, swap ñ for n, etc
		  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		  var to   = "aaaaeeeeiiiioooouuuunc------";
		  for (var i=0, l=from.length ; i<l ; i++) {
		    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		  }

		  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		    .replace(/\s+/g, '-') // collapse whitespace and replace by -
		    .replace(/-+/g, '-'); // collapse dashes

		  return str;
		},
	},
	computed: {
	    slug: function () {
	    	this.newPage.slug = this.slugify(this.newPage.title);
	      	return this.newPage.slug;
	  	},
	  	active: function () {
	  		return (this.newPage.slug != '');
	  	}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
