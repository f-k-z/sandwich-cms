<template>
  <div class="page-list">
    <ul class="nav page-content">
    	<li :id="page.slug" class="nav-item" v-if="page.listed && page.published" v-for="page in pages">       
        <router-link class="thumb" :to="'/work/'+page.slug">
        <!-- We only take the first three slice (header, text and sub) -->
          <div :class="slice.css_class" v-if="slice.index < 3" v-for="slice in page.slices"> 
            <div v-html="slice.content"></div>
          </div>
        </router-link>
      </li>
    </ul>
    <div id="anchor-nav">
      <ul>
        <li class="anchor-nav-item" v-if="page.listed && page.published" v-for="page in pages">       
          <a v-on:click="smoothScrollTo(page.slug)" :href="'#'+page.slug">
              {{ page.title }}
          </a>
          <div><hr></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import global from '@/global'
import HeaderFront from '@/components/front/HeaderFront'
import Firebase from 'firebase'
import Velocity from 'velocity-animate';

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
    },
    smoothScrollTo: function(slug) {
      $("#"+slug).velocity('scroll', {
          duration: 1200,
          easing: 'easeInOutSine'
      });
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
    transition: all .5s ease-out;
    filter: brightness(100%) contrast(100%);
  }
  .thumb:hover {
    img {
      filter: brightness(80%) contrast(150%);
    }
    .title > div:before {
      transform: scaleX(1)!important;
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  #anchor-nav {
    position: fixed;
    top:0px;
    right: 0px;
    height: 100%;
    
    display: flex;
    align-items: center;
    ul {
      list-style-type: none;
    
    }
    li {
      text-align: right;
      margin-bottom: 10px;
      position: relative;
    }
    li a {
       background: transparent!important;
      font-family: 'CardoItalic';
      font-size: 18px;
      color: #222;
      margin-right: 26px;
      transition: all .3s ease-out;
    }
    li:hover a {
      text-decoration: none;
      color: #999;
      padding-right: 5px;
    }
    li div {
      position: absolute;
      right: 0px;
      top: 13px;
    }
    li hr {
      border: 0;
      height: 1px;
      background: transparent;
      width: 10px;
      margin: 0;
      transition: all .3s ease-out;
    }

    li:hover hr {
      width: 15px;
      background: #999;
    }
    
  }

  .nav { 
    a, a:hover {
      background: transparent!important;
      font-family: 'CardoItalic';
      font-size: 22px;
      color: #222222;
    }
    a:hover .title {
      /*text-decoration: underline;*/
    }
  }

  $randomNumber: random(10%);

  .nav-item:nth-child(odd) { margin-left: 30% + $randomNumber; }
  .nav-item:nth-child(odd) .thumb { max-width: 50%; }

  $marginTop: 60px;
  .thumb {
    max-width: 40%;
    min-width: 280px;
    padding: 0;
    position: relative;
    margin-bottom:  20px;
    padding-top: $marginTop;
    .header { margin-left: 30px; }
    .title {
      font-family: "CalibreMedium";
      font-size: 18px;
      color: #000000;
      letter-spacing: 1.46px;
      margin-top: 30px;
      margin-left: 30px;
      text-transform: uppercase;
      display: inline-block;
      position: relative;
      > div {
        display: inline-block;
      }
    }
    .title > div:before {
      content: "";
      width: 100%;
      height: 1px;
      bottom: 4px;
      left: 0;
      position: absolute;
      background: #000000;
      transform: scaleX(0);
      transition: .25s linear;
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
        margin-top: $marginTop;   
      }
    }
  }

  @media (max-width : 650px) {
   #anchor-nav  {
      display: none;
    }
  }

</style>
