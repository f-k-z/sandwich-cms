<template>
	<div class="page-view">
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
    }
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
      	});
  		}
  		else
  			console.log('no page');
		});
  },

  methods: {
	},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
