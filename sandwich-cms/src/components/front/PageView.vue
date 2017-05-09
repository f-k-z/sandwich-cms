<template>
	<div class="page-view">
    <button class="btn btn-primary action" v-on:click="editPage(page)">Edit Page <i class="fa fa-pencil" aria-hidden="true"></i></button>
		<h1>{{ page.title }}</h1>
		<div id="slices">
            <div v-for="(slice, sliceKey) in page.slices" :class="slice.css_class" v-if="slice.visible">
              <p v-html="slice.content"></p>
            </div>
        </div>
	</div>
</template>

<script>

import global from '@/global'

export default {
  name: 'page-edit',

  firebase: {
	    pages: global.db.ref('pages')
	},

  data () {
    return {
    	//page slug
      slug: this.$route.params.page_slug,
      page: {},
      key: '',
    }
  },
  methods: {
    editPage: function (page) {
      this.$router.push('/page/edit/'+this.key);
    },
  },
  //load object on created
  created: function() {
  	var scope = this;
  	//get page by slug
  	this.$firebaseRefs.pages.orderByChild("slug").equalTo(this.slug).on('value', function(pageSnapshot) {
  		var exists = pageSnapshot.exists();
  		if(exists)
  		{
  			pageSnapshot.forEach(function (snapshot) {
          scope.page = snapshot.val();
          scope.key = snapshot.key;
      	});
  		}
  		else
  			console.log('no page');
		});
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action { float: right; margin-top: 15px; }
</style>
