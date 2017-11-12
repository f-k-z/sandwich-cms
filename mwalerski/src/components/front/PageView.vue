<template>
	<div class="page-view" :class="page.css_class">
		<div id="slices" class="page-content">
      <div v-for="(slice, sliceKey) in slicesToDisplay" v-if="slice.visible"  :style="slice.css_style" >
        <div :id="'slice_' + page.slug + '_' + sliceKey" :class="'slice '+slice.css_class" v-html="slice.content"></div>
      </div>
    </div>
	</div>
</template>

<script>
import global from '@/global'
import HeaderFront from '@/components/front/HeaderFront'
import Firebase from 'firebase'
import { TimelineMax, TweenMax, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import SplitText from 'split-text';
import Velocity from 'velocity-animate';
import Croppie from 'croppie';
/** Weird NPM comment to resolve dependencie issue,
see here for a mush cleaner approach: https://grzegorowski.com/scrollmagic-setup-for-webpack-commonjs/ */
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

export default {
  name: 'page-edit',
  props: ['slug'],
  firebase: {
	  pages: global.db.ref('pages')
	},
  
  components: {
    HeaderFront
  },
  computed: {
    
    // a computed getter
    slicesToDisplay: {
      cache: false,
      get: function () {
        // `this` points to the vm instance
        return this.slices;
      }
    }
  },
  data () {
    return {
      title: global.PROJECT_NAME,
      page: {},
      key: '',
      slices: [],
      isUser: false,
      firstLoad: true,
      isReload: false,
      scrollController: null
    }
  },
  methods: {
    editPage: function (page) {
      this.$router.push('/admin/edit/'+this.key);
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
          if(imagesLoaded == assets.length) {
            scope.initScrollAnimation();
          }
        }
      }
    },
    refreshSliceView: function () {
      var scope = this;
      var imgToLoad = [];
      //get slices in an array
      global.db.ref('pages/'+this.key+'/slices').orderByChild('index').once('value', function(slicesSnapshot) {
        
        //snapshot as an array
        slicesSnapshot.forEach(function (snapshot) {
          var sliceKey = snapshot.key;
          var object = snapshot.val();
          /** Loading stuff, we store img path **/
          if(scope.firstLoad) {
            var sliceDOM = object.content;
            //get image path
            var src = sliceDOM.match(/img.*?src="(.*?)"/);
            if(src)
              imgToLoad.push(src[1]);
          }
          /** end loading stuff **/
          object.sliceKey = sliceKey;
          scope.slices.push(object);
        });
        if(scope.firstLoad) {
          scope.firstLoad = false;
          scope.loadAsset(imgToLoad);
        }
        
      });
    },
    initPage: function() {
      this.firstLoad = true;
      this.$forceUpdate();
      var scope = this;
      this.slices = [];
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
    initScrollAnimation: function () {
      /*** ScrollMagic ***/
      this.destroyScrollMagic();

      // init controller
      this.scrollController = new ScrollMagic.Controller();

      for (var i = 3; i < this.slices.length; i++) {
        var slice = this.slices[i];
        var domId = "#slice_"+ this.page.slug +"_" +i;
        //important, reset style, otherwise vue keeps old TweenLite.set
        $(domId).attr('style', '');

        var isTween = false;
        var isReverse = false; 
        var onComplete
        if(slice.css_class.indexOf("header") >= 0 || slice.css_class.indexOf("no-anim") >= 0) {
          isTween = false;
        }
        /*else if(slice.css_class.indexOf("normal-text") >= 0) {
          var tween = new TimelineMax().to(domId, .6, {opacity: 1, scale:1, ease: Expo.easeOut });
          TweenLite.set(domId, {opacity: 0, scale:1.2});
          isTween = true;
        }*/
        else if(slice.css_class.indexOf("quote") >= 0) {
          var tween = new TimelineMax().to(domId, 1, {opacity: 1, scale:1, ease: Power3.easeOut });
          TweenLite.set(domId, {opacity: 0, scale:1.3});
          /*var pId = domId;
          var mySplitText = new SplitText(pId, {type:"lines"}),
          tween = new TimelineLite();
          tween.staggerFrom(mySplitText.lines, 0.5, {opacity:0, cycle:{x:[100, -100]}}, 0.2)
          /* */
          isTween = true;
        }
        else if(slice.css_class.indexOf("img-float-left") >= 0 ||  slice.css_class.indexOf("off") >= 0) {
          var tween = new TimelineMax().to(domId, 1.2, {opacity: 1, left:0, ease: Power3.easeOut });
          TweenLite.set(domId, {opacity: 0, left:"50%"});
          /* */
          isTween = isReverse = true;
        }
        else if(slice.css_class.indexOf("img-float-right") >= 0) {
          var tween = new TimelineMax().to(domId, 1.2, {opacity: 1, right:0, ease: Power3.easeOut });
          TweenLite.set(domId, {opacity: 0, right:"50%"});
          /* */
          isTween = isReverse = true;
        }
        else {
          /* Tween simple non synchro */
          var tween = new TimelineMax().to(domId, .5, {opacity: 1});
          TweenLite.set(domId, {opacity: 0});
          isTween = true;
        }

        if(isTween)
          new ScrollMagic.Scene({
           triggerElement: domId,
           reverse:false
          })
          //.setTween(domId, 1, { scale: 2.5 })
          .setTween(tween)
          //.addIndicators({name: "timeline"}) 
          .addTo(this.scrollController);
      };

      this.scrollController.update(true);
      this.emitEnd();
    },
    emitEnd: function() {
      var scope = this;
      //EMIT LOADED EVENT
      this.$emit('loaded');

      if(this.page.css_class)
        this.$emit("cssclass", this.page.css_class);
      else
        this.$emit("cssclass", '');

      if(this.page.css_class == 'contact')
      {
        this.resizeContact();
        $( window ).resize(function() {
          scope.resizeContact();
        });
      }
    },
    resizeContact: function() {
      //calculate the ratio base on original image size (1024px height & 685px width)
      var ratio = $(window).height()/1024;
      var next_w = Math.round(ratio*685);
      var r = 80 + next_w;
      $( "#slice_contact_2" ).css('right', r+'px');
      $( "#slice_contact_1" ).css('right', (r - 350)+'px');
    },
    destroyScrollMagic: function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      if(this.scrollController) {
        this.scrollController.destroy(true);
        this.scrollController = null;
      }
    }
  },
  //load object on created
  created: function() {
    this.initPage();
  },
  destroyed: function() {
    
  },
  watch: {
    '$route' (to, from) {
      this.isReload = true;
      this.$emit('reload');
    }
  }

}
</script>

<!-- Global CSS -->
<style lang="scss">
  .slice img {
    max-width: 100%;
    height: auto;
  }


  .contact-pic { 
    .slice img {
      height: 100%;
      max-width: none;
      width: auto;
      position: absolute;
      right: 0;
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
  .about .credits {
    color: #fff;
  }
  .normal-text b, .normal-text a {
    color: #1A1A1A;
    font-family: 'CalibreRegular';
    font-weight: normal;
  }

  .quote b, .quote strong {
    font-family: "CalibreMedium";
    font-size: 14px;
    letter-spacing: 0;
    float: right;
    text-transform: uppercase;
  }

  .about .normal-text b, .about .normal-text a {
    color: #FFF;
  }

  .contact-pic  { 
    position: absolute;
    img { height: 100%!important; }
  }
  #slice_contact_2 {
    position: absolute;
    bottom: 120px;
    right: 700px;
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
    margin-top: 80px;
  }

  /*.video { width: 100%; p { width: 100%;} text-align: center;}*/

  .video { 
    margin: 80px 0 80px 15%; 
  }

  .asset {
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .inside-img { padding: 40px; }

  .margin-top-null { margin-top: 0!important; }

  .sub {
    font-family: 'CardoItalic';
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    margin: 80px 0 20px 15%;
  }

  .header { margin-top: -200px; }

  .header-right {
    margin-top: 50px;
  }

  .header, .normal-text, .sub, .quote, .title {
    padding: 0;
  }

  .contact-pic  { 
    position: absolute; height: 100%;
    right: 0;
    img { height: 100%!important; }
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
  }

  .big-letter {
    font-family: "CardoRegular";
    font-size: 40px;
    color: #1A1A1A;
    letter-spacing: 130.4px;
    line-height: 150px;
    text-transform: uppercase;
    position: absolute;
    z-index: 10;
    word-wrap: break-word;
    width: 550px;
    top: 120px;
    text-align:center;
  }

  .credits {
    max-width: 450px;
    width: 80%;
    text-align: center;
    margin-top: 120px;
    margin-bottom: 120px;
  }

  .credits.unalign {
    text-align: left;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .quote {
    font-family: 'CardoItalic';
    font-size: 26px;
    color: #222222;
    letter-spacing: 0;
    line-height: 39px;
    max-width: 900px;
    width: 80%;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .quote + div { margin-top: 0; }

  .about .quote { color: #fff; }

  .img-float-left {
    position: absolute;
    left: -0px;
    max-width: $sidebar_w - 2%;
    z-index: 12;
  }

  .img-float-right {
    position: absolute;
    right: 0px;
    max-width: $sidebar_w;
    z-index: 13;
  }

  .off {
    position: absolute;
    left: 0px;
    margin-top: 150px;
    max-width: 22%;
  }
  .contact .normal-text.info {
    text-align: right
  }

</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>

  @media (max-width : 1100px) {

    .header, .normal-text, .sub { margin-left: 0; }

    .header, .normal-text, .sub, .quote, .title, .credits {
      width: 100%;
      padding: 0 40px;
      max-width: 800px;
      margin: 30px auto;
    }
    .title { position: static; }
    .quote { margin-top: 0!important; }

    .header { text-align: center; width: 100%; }

    .video { margin: 0; width: 100%; p { width: 100%;} text-align: center;}

    .img-float-left, .img-float-right, .off  {
      position: static;
      width: 100%;
      text-align: center;
      max-width: 70%;
      margin: 0 auto;
    }

    .contact-pic { display: none; }

    .big-letter { 
      font-size: 30px;
      color: #1A1A1A;
      letter-spacing: 93px;
      line-height: 115px;
    }

    .contact .big-letter { 
      left: 50%!important; 
      margin-top: 90px; margin-left: -145px; 
      width: 380px;
    }


    .contact .normal-text.info {
      bottom: auto!important;
      top: 540px;
      right: 50%!important;
      text-align: center!important;
      width: 320px;
      margin-right: -160px;
    }

  }
</style>
