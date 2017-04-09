<template>
  <div class="panel panel-default">
	  <div class="panel-heading">
	    <form id="form" class="form" v-on:submit.prevent="addPage">
				<div class="form-group">
					<label for="pageTitle">Title:</label>
					<input type="text" id="pageTitle" class="form-control" v-model="newPage.title">
				</div>
				<input type="submit" class="btn btn-primary" value="+ Create">
			</form>
	  </div>
	  </div>
  </div>
</template>

<script>
import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'

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
	    //slugify
	  	newPage.slug = this.slugify(newPage.title);
	  	//set dates
	  	newPage.created = newPage.updated = moment().format();
	  	//add to firebase
		global.db.ref('pages').push(newPage);
		//reset fields
		newPage.title = newPage.slug = newPage.created = newPage.updated = '';
		toastr.success('Page added successfully')
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
