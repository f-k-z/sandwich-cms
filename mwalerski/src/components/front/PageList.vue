<template>
  <div class="page-list">
    <ul class="nav page-content">
    	<li class="nav-item" v-if="page.listed && page.published" v-for="page in pages">       
        <router-link class="thumb" :to="'/work/'+page.slug">
        <!-- We only take the first three slice (header, text and sub) -->
          <div :class="slice.css_class" v-if="slice.index < 3" v-for="slice in page.slices"> 
            <div v-html="slice.content"></div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import global from '@/global'
import HeaderFront from '@/components/front/HeaderFront'
import Firebase from 'firebase'

export default {
  name: 'page-list',
  firebase: {
    pages: global.db.ref('pages')
  },
  components: {
    HeaderFront
  },
  data () {
    return {
      title: global.PROJECT_NAME,
      isUser: false
    }
  },
  methods: {
    goToAdmin: function () {
      this.$router.push('/admin');
    },
    loadAsset: function (assets) {
      var scope = this;
      var imagesLoaded = 0;
      // start preloading
      for(var i = 0; i < assets.length; i++) 
      {
        var imageObj = new Image();
        imageObj.src = assets[i];
        imageObj.onload = function() {
          imagesLoaded++;
          if(imagesLoaded == assets.length)
            //EMIT LOADED EVENT
            scope.$emit('loaded');
        }
      }
    }
  },
  //load object on created
  created: function() {
    var scope = this;
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
    /** css class **/
    scope.$emit("cssclass", 'work');
    /** LOADER 
       * get all header slices (slice at 0) to load images
    **/
    this.$firebaseRefs.pages.once('value', function(pageSnapshot) {
      var headers = [];
      pageSnapshot.forEach(function (snapshot) {
        var object = snapshot.val();
        var slices = object.slices;
        //get header slice
        var headerDOM = slices[Object.keys(slices)[0]].content;
        //get image path
        var src = headerDOM.match(/src="(.*?)"/);
        if(src)
          headers.push(src[1]);
      });
      scope.loadAsset(headers);      
    });
  },
}
</script>

<style lang="scss">
  .thumb img {
    max-width: 100%;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .nav { 
    padding-top: 30px;
    a, a:hover {
      background: transparent!important;
      font-family: 'CardoItalic';
      font-size: 22px;
      color: #222222;
    }
    a:hover .title {
      text-decoration: none;
      color: #999999!important;
    }
  }

  $randomNumber: random(10%);

  .nav-item:nth-child(odd) { margin-left: 30% + $randomNumber; }
  .nav-item:nth-child(odd) .thumb { max-width: 50%; }

  .thumb {
    max-width: 40%;
    min-width: 280px;
    padding: 0;
    position: relative;
    margin-bottom:  60px;
    .header { margin-left: 30px; }
    .title {
      font-family: "CalibreMedium";
      font-size: 18px;
      color: #000000;
      letter-spacing: 1.46px;
      margin-top: 30px;
      margin-left: 30px;
      text-transform: uppercase;
    }
    .sub {
      font-family: "CardoItalic";
      font-size: 16px;
      color: #000000;
      letter-spacing: 0;
      position: absolute;
      bottom: 0;
      height: 100%;
      left: -20px;
      text-align: left;
      transform: translate(-100%, 0px);
      div {
        transform-origin: top right;
        transform: rotate(-90deg) ;     
      }
    }
  }
</style>
