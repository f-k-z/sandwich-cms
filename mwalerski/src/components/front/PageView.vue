<template>
	<div class="page-view">
		<div id="slices" class="page-content">
      <div v-for="(slice, sliceKey) in slices" :class="slice.css_class" v-if="slice.visible" :style="slice.css_style">
        <p class="slice" v-html="slice.content"></p>
      </div>
    </div>
	</div>
</template>

<script>

import global from '@/global'
import HeaderFront from '@/components/front/HeaderFront'
import Firebase from 'firebase'

export default {
  name: 'page-edit',

  firebase: {
	  pages: global.db.ref('pages')
	},
  
  components: {
    HeaderFront
  },
  data () {
    return {
      title: global.PROJECT_NAME,
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

<!-- Global CSS -->
<style lang="scss">
  .slice 
  {
    width: 100%;
    img {
      max-width: 100%!important;
      height: auto;
    }
  }

  .video iframe { margin: 0 auto; }

  .credits {
    h3 {
      font-family: 'CalibreMedium';
      font-size: 18px;
      color: #000000;
      letter-spacing: 1.46px;
      text-transform: uppercase;
      width: 100%;
    }
    ul {
      list-style-type: none;
      margin: 0; padding: 0;
      li {
        font-family: 'CalibreMedium';
        text-transform: uppercase;
        letter-spacing: 0;
        line-height: 30px;
      }
      li strong, li b {
        font-family: 'CardoItalic';
        font-size: 16px;
        color: #999999;
        text-transform: none;
      }
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  $sidebar_w: 25%;

  .header, .normal-text, .sub, .credits { margin-left: 15%; }
  .header-wide { margin-left: 0; }

  .action { 
    right:15px; 
    position: absolute; 
    top: 15px; 
    opacity: .5; 
  }
  .action:hover { opacity: 1; }

  .back { position: absolute; top: 10px; left: 0px;}

  .title {
    font-family: 'CalibreMedium';
    font-size: 22px;
    color: #000000;
    letter-spacing: 1.79px;
    position: absolute;
    text-transform: uppercase;
    margin-top: 20px;
  }

  /*.video { width: 100%; p { width: 100%;} text-align: center;}*/

  .video { margin-left: 15%; }

  .sub {
    font-family: 'CardoItalic';
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    margin: 30px 0 20px 15%;
  }

  .header { margin-top: -200px; }

  .header, .normal-text, .sub, .quote, .title {
    padding: 0;
  }

  .normal-text {
    font-family: 'CalibreRegular';
    font-size: 16px;
    color: #999999;
    letter-spacing: 0;
    line-height: 32px;
    max-width: 450px;
    width: 80%;
    text-align: justify;
    margin-bottom: 20px;
  }

  .credits {
    max-width: 450px;
    width: 80%;
    text-align: center;
    margin-top: 60px;

  }

  .quote {
    font-family: 'CardoItalic';
    font-size: 26px;
    color: #222222;
    letter-spacing: 0;
    line-height: 39px;
    max-width: 900px;
    width: 80%;
    margin-bottom: 30px;
  }


  .img-float-left {
    position: absolute;
    left: -0px;
    max-width: $sidebar_w - 2%;
  }

  .img-float-right {
    position: absolute;
    right: 0px;
    max-width: $sidebar_w;
  }

  .off {
    position: absolute;
    left: 0px;
    margin-top: 150px;
    max-width: 22%;
  }

</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>

  @media (max-width : 1100px) {

    .header, .normal-text, .sub { margin-left: 0; }

    .header, .normal-text, .sub, .quote, .title, .credits {
      width: 100%;
      padding: 0 40px;
      text-align: center;
      max-width: 800px;
      margin: 30px auto;
    }
    .title { position: static; }

    .header { text-align: center; width: 100%; }

    .video { margin: 0; width: 100%; p { width: 100%;} text-align: center;}

    .img-float-left, .img-float-right, .off  {
      position: static;
      width: 100%;
      text-align: center;
      max-width: 70%;
      margin: 0 auto;
    }

  }
</style>
