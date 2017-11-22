<template>
	<div class="page-view" :class="page.css_class">
		<div id="slices" class="page-content">
      <div v-for="(slice, sliceKey) in slicesToDisplay" v-if="slice.visible"  :style="slice.css_style" >
        <div :id="'slice_' + page.slug + '_' + sliceKey" class="video-container" v-if="slice.css_class == 'video'">
        <div :class="'slice '+slice.css_class" v-html="slice.content"></div>
        </div>
        <div v-if="slice.css_class != 'video'" :id="'slice_' + page.slug + '_' + sliceKey" :class="'slice '+slice.css_class" v-html="slice.content"></div>
      </div>
    </div>
    <div id="nav-page" v-if="page.listed">
      <div id="prev-next" v-if="page.listed">
        <router-link class="thumb prev" v-if="prevPage" :to="'/work/'+prevPage.slug">
            <div :class="slice.css_class" v-if="slice.index < 3" v-for="slice in prevPage.slices"> 
              <div v-html="slice.content"></div>
            </div>
        </router-link>
        <router-link class="thumb next" v-if="nextPage" :to="'/work/'+nextPage.slug">
            <div :class="slice.css_class" v-if="slice.index < 3" v-for="slice in nextPage.slices"> 
              <div v-html="slice.content"></div>
            </div>
        </router-link>
        <div class="clearfix"></div>
      </div>
    </div>
    <router-link id="push-home" :to="'/work'" v-if="page.slug == 'home'">
      <div class="thumb" v-bind:class="[ listedPageKey == 0 ? 'show' : '']" v-for="(listedPage, listedPageKey) in listedPages" v-if="listedPage.published">
        <div :class="slice.css_class" v-if="slice.index < 1" v-for="slice in listedPage.slices"> 
          <div v-html="slice.content"></div>
        </div>
        <p>Discover my work</p>
      </div>
    </router-link>
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
    slicesToDisplay: {
      cache: false,
      get: function () {
        return this.slices;
      }
    }
  },
  data () {
    return {
      title: global.PROJECT_NAME,
      page: {},
      key: '',
      totalItems: 0,
      currentIndex: 0,
      slices: [],
      isUser: false,
      firstLoad: true,
      isReload: false,
      scrollController: null,
      prevPage: null,
      nextPage: null,
      listedPages: [],
      itvSlide: null,
      countSlide: 0,
      scrollTweens: [],
    }
  },
  methods: {
    editPage: function (page) {
      this.$router.push('/admin/edit/'+this.key);
    },
    initSlideshow: function() {
      var scope = this;
      this.itvSlide = setInterval(function() {
        $("#push-home .thumb").removeClass("show");
        var n = scope.countSlide + 1;
        var total = $("#push-home .thumb").length - 1;
        scope.countSlide = (n > total) ? 0 : n;
        $("#push-home").children().eq(scope.countSlide).addClass("show");
      }, 2500);
    },
    loadAsset: function (assets) {
      var scope = this;
      var imagesLoaded = 0;
      //if no asset, directly set up scroll
      if(assets.length == 0) {
        scope.initScrollAnimation();
        return;
      }
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
      //reinit slices
      this.slices =[]; 
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
    initPage: function(nextSlug = null) {
      this.firstLoad = true;
      var scope = this;
      this.slices = [];
      var i = 0;
      //need to force slug sometimes because vue.js act like a fool
      var nextSlug = (nextSlug) ? nextSlug : this.slug;
      //get page by slug
      this.$firebaseRefs.pages.on('value', function(pagesSnapshot) {
          scope.totalItems = pagesSnapshot.numChildren();
          pagesSnapshot.forEach(function (snapshot) {
            var p = snapshot.val();
            
            if(p.slug == nextSlug)
            {
              scope.page = p;
              scope.currentIndex = i;
              scope.key = snapshot.key;                
            }

            if(p.listed) {
              scope.listedPages.push(p);
              i++;
            }
          });
          scope.refreshSliceView();
          scope.getNextPrev();
      
      });

      var user = Firebase.auth().currentUser;
      this.isUser = (user) ? true : false;
    },
    getNextPrev: function() {

      var scope = this;
      var currentIndex = this.currentIndex;
      var totalIndex = this.listedPages.length - 1;
      
      var prevIndex = currentIndex - 1;
      if(prevIndex < 0)
        prevIndex = totalIndex;

      var nextIndex = currentIndex + 1;
      if(nextIndex > totalIndex)
        nextIndex = 0;

      this.prevPage = this.listedPages[prevIndex];
      this.nextPage = this.listedPages[nextIndex];

    
    },
    initScrollAnimation: function () {
      /*** ScrollMagic ***/
      this.destroyScrollMagic();

      //remove previous tween
      for (var i = this.scrollTweens.length - 1; i >= 0; i--) {
        this.scrollTweens[i].pause(0);
        this.scrollTweens[i].clear();
      };
      this.scrollTweens = [];

      // init controller
      this.scrollController = new ScrollMagic.Controller();
      var start = (this.page.listed) ? 4 : 3;

      for (var i = start; i < this.slices.length; i++) {
        var slice = this.slices[i];
        var domId = "#slice_"+ this.page.slug +"_" +i;
        //important, reset style, otherwise vue keeps old TweenLite.set
        $(domId).attr('style', '');
        //ugly hack for rotation issue :(
        TweenLite.set(domId, {clearProps:"all"});

        var isTween = false;
        var isReverse = false; 

        if(slice.css_class.indexOf("quote") >= 0) {
          var tween = new TimelineMax().to(domId, 1.5, {opacity: 1, scale:1, ease: Power3.easeOut,  });
          TweenLite.set(domId, {opacity: 0, scale:1.3});
          /*var pId = domId;
          var mySplitText = new SplitText(pId, {type:"lines"}),
          tween = new TimelineLite();
          tween.staggerFrom(mySplitText.lines, 0.5, {opacity:0, cycle:{x:[100, -100]}}, 0.2)
          /* */
          isTween = true;
        }
        else if(slice.css_class.indexOf("img-float-left") >= 0 ||  slice.css_class.indexOf("off") >= 0) {
          var tween = new TimelineMax().to(domId, 1, {opacity: 1, left:0, ease: Sine.easeOut, rotation:0  });
          TweenLite.set(domId, {opacity: 0, left:"-100px", rotation:20, transformOrigin:"left center"});
          /* var tween = new TimelineMax().to(domId, 1.8, {opacity: 1, right:0, ease: Sine.easeOut, bezier:{type:"soft", values:[{x:0, y:0}, {x:0, y:-300}, {x:0, y:0}]} });
          TweenLite.set(domId, {opacity: 0, left:"50%"});*/
          isTween = isReverse = true;
        }
        else if(slice.css_class.indexOf("img-float-right") >= 0) {

          var tween = new TimelineMax().to(domId, 1, {opacity: 1, right:0, ease: Sine.easeOut, rotation:0 });
          TweenLite.set(domId, {opacity: 0, right:"-100px", rotation:20, transformOrigin:"right center"});
          /* var tween = new TimelineMax().to(domId, 1.8, {opacity: 1, right:0, ease: Sine.easeOut, bezier:{type:"soft", values:[{x:0, y:0}, {x:0, y:300}, {x:0, y:0}]} });
          TweenLite.set(domId, {opacity: 0, right:"50%"}); */
          isTween = isReverse = true;
        }
        //anim everywhere except video
        else if(slice.css_class.indexOf("video") == 0) {
          /* Tween simple non synchro */
          var tween = new TimelineMax().to(domId, .8, {opacity: 1});
          TweenLite.set(domId, {opacity: 0});
          isTween = true;
        }

        if(isTween)
          this.scrollTweens.push(tween);
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
    var w = Math.round($(window).width()*0.75*0.5);
    this.initSlideshow();
  },
  destroyed: function() {
    clearInterval(this.itvSlide);
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

  .video {
    position:relative;
    padding-bottom:56.25%;
    padding-top:30px;
    height:0;
    overflow:hidden;
  }

  .video-container {
    width: 80%;
    max-width: 560px;
    margin: 40px 0 40px 15%;
  }

  .video iframe, .video object, .video embed {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }

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

  #nav-page {
    width: 100%;  
  }

  $thumbH: 270px;

  .page-view .thumb {
    width: 35%;
    height: $thumbH;
    float: left;
    position: relative;
    overflow: hidden;
    
    padding: 0;
    .header { 
      width: 100%;
      position: absolute;
      top: 0;
      padding: 0!important;
      margin: 0!important;
      text-align: left!important;
      height: $thumbH;
      div {
        height: $thumbH;
        overflow: hidden;
        position: relative;
      }
      img {
        position:absolute;
        top:0;
        bottom:0;
        margin:auto;
      }
    }

    .title {
      font-family: "CardoItalic";
      font-size: 36px;
      color: #FFF;
      margin-top: -22px;
      letter-spacing: 1.46px;
      text-transform: capitalize;
      text-align: center;
      width: 100%;
      position: absolute;
      top: 50%;
      left:0;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
    }
    .sub {
      font-family: "CardoItalic";
      font-size: 14px;
      color: #000000;
      letter-spacing: 0;
      position: absolute;
      bottom: 0;
      height: 100%;
      left: -20px;
      text-align: left;
      margin: 0;
      transform: translate(-100%, 0px);
      div {
        transform-origin: top right;
        transform: rotate(-90deg) ;     
      }
    }
  }
  #push-home {
    margin-top: 80px;
    width: 60%;
    position: relative;
    height: 200px;
    display: block;
    margin: 80px 0 0 15%;
    height: $thumbH;
    p {
      font-family: "CardoItalic";
      font-size: 36px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 68px;
      position: absolute;
      width: 100%;
      text-align: center;
      top:50%;
      margin-top: -34px;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
    }
    .thumb {
      position: absolute;
      width: 100%;
      img { width: 100% ;}
      opacity: 0;
      transition: opacity 1s ease-out;
    }
    .thumb.show { opacity: 1; }
  }

  #push-home:hover {
    img {
      filter: brightness(80%) contrast(150%)!important;
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
    margin-top: 80px;
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

  $thumbHR: 180px;

  @media (max-width : 1550px) {
    .page-view .thumb {
      height: $thumbHR;
      .header { 
        height: $thumbHR;
        div {
          height: $thumbHR;
        }
      }
    }

    #push-home {
      height: $thumbHR;
    }
  }

  $thumbHR2: 150px;
  @media (max-width : 450px) {
    #prev-next .thumb {
      height: $thumbHR2;
      .header { 
        height: $thumbHR2;
        div {
          height: $thumbHR2;
        }
      }
    }
    #push-home {
      height: $thumbHR2;
    }
  }

  @media (max-width : 670px) {
   #push-home {
      width: 100%!important;
    }
    .video-container {
      margin-left: 10%;
      max-width: 80%
    }
  }

  @media (max-width : 1100px) {

    #push-home {
      margin: 80px auto 0 auto;
      width: 60%;
    }

    .video-container {
      margin-left: 20%;
      max-width: 60%
    }

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

    .page-view .thumb {
      display: block;
      width: 80%;
    }

    #prev-next {
      margin-left: 20%;
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
