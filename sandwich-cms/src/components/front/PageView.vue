<template>
	<div class="page-view">
    <router-link :to="'/'"><i class="fa fa-arrow-left" aria-hidden="true"></i> Home</router-link>
    <br>
    <button v-if="isUser" class="btn btn-primary action" v-on:click="editPage(page)">Edit Page <i class="fa fa-pencil" aria-hidden="true"></i></button>
		<h1>{{ page.title }}</h1>
		<div id="slices">
            <div v-for="(slice, sliceKey) in slices" :class="slice.css_class" v-if="slice.visible">
              <p v-html="slice.content"></p>
            </div>
        </div>
	</div>
</template>

<script>

import global from '@/global'
import Firebase from 'firebase'

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
      slices: [],
      isUser: false
    }
  },
  methods: {
    editPage: function (page) {
      this.$router.push('/admin/edit/'+this.key);
    },
    refreshSliceView: function () {
      var scope = this;
      //get slices in an array
      global.db.ref('pages/'+this.key+'/slices').orderByChild('index').once('value', function(slicesSnapshot) {
        scope.slices = [];
        //snapshot as an array
        slicesSnapshot.forEach(function (snapshot) {
           var sliceKey = snapshot.key;
           var object = snapshot.val();
           object.sliceKey = sliceKey;
           scope.slices.push(object);
        });
      });
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
          scope.key = snapshot.key;
          scope.refreshSliceView();
      	});
  		}
  		else
  			console.log('no page');
		});

    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action { float: right; margin-top: 15px; }
</style>
