<template>
  <div id="front" :class="css_class">
    <header-front></header-front>
    <animated-loader v-on:close="onLoaderClose" id="loader" ref="aload"></animated-loader>
    <div id="content">
      <transition v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:enter-cancelled="enterCancelled"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
          v-on:leave-cancelled="leaveCancelled">
        <router-view ref="routerView" v-on:reload="onReload" v-on:loaded="onLoaded" v-on:cssclass="onClass"></router-view>
      </transition>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import global from '@/global'
import HeaderFront from '@/components/front/HeaderFront'
import AnimatedLoader from '@/components/front/AnimatedLoader'
import Firebase from 'firebase'
import Velocity from 'velocity-animate'

export default {
  name: 'front',
  firebase: {
    pages: global.db.ref('pages')
  },
  components: {
    HeaderFront, AnimatedLoader
  },
  data () {
    return {
      title: global.PROJECT_NAME,
      isUser: false,
      isLoading: false,
      firstLoad: true,
      css_class: ''
    }
  },
  methods: {
    onClass: function(css_class) {
      this.css_class = css_class;
    },
    // --------
    // ENTERING
    // --------
    beforeEnter: function (el) {
    },
    enter: function (el, done) {
      //get all images in content and listen to their load
      // we use this and not the loaded event because there is some issue with the cache (Image have been loaded each time we open the äge view component on it)
      /*var images = el.getElementsByTagName("img");
      var done = done;
      var imagesLoaded = 0 ;
      var scope = this;
      for(var i = 0; i < images.length; i++){
        images[i].onload = function() {
          imagesLoaded++;
          if(imagesLoaded == images.length)
          {
            //loading is finish!
            scope.isLoading = false;
            //done callback
            done();
          }
        } 
      }*/
      done();
    },
    afterEnter: function (el) {
      
      
    },
    enterCancelled: function (el) {
      // ...
    },
    showContent: function () {
      this.$refs.aload.hide();
      //back the scroll to top
      Velocity($("#content"), "scroll", { offset:0, duration: 0 });
      //show main content
      Velocity($("#content"), { opacity: 1 }, { duration: 800, transition:"easeInOutExpo"});
    },
    // --------
    // LEAVING
    // --------
    beforeLeave: function (el) {

    },
    // the done callback is optional when
    // used in combination with CSS
    leave: function (el, done) {
      this.isLoading = true;
      //hide content
      Velocity($("#content"), { opacity: 0 }, { duration: 300, transition:"easeInExpo", complete: done }); 
    },
    afterLeave: function (el) {
      var aload = this.$refs.aload;
      //don't show the loader if load is already done
      if(this.isLoading) {
        aload.show();
        aload.startRandomGif();
      }
    },
    // leaveCancelled only available with v-show
    leaveCancelled: function (el) {
      // ...
    },
    /** LOADED LISTENER **/
    onReload: function() {
      var scope = this;
      var routerView = this.$refs.routerView;
      this.isLoading = true;
      var aload = this.$refs.aload;
      Velocity($("#content"), { opacity: 0 }, { duration: 300, transition:"easeInExpo", complete: function() {
        scope.css_class = '';
        routerView.initPage();
        if(scope.isLoading) {
          aload.show();
          aload.startRandomGif();
        }
          
      } }); 
    },
    onLoaded: function() {
      var aload = this.$refs.aload;
      var images = $("#content img");
      this.isLoading = false;
      aload.stopRandomGif();
      //On first load
      if(this.firstLoad)
      {
        this.firstLoad = false;
        aload.close();
      }
      else
        this.showContent();
    },
    onLoaderClose: function() {
      var aload = this.$refs.aload;
      //hide loader
      Velocity($("#loader"), { opacity: 0 }, { duration: 800, transition:"easeInOutExpo", 
        complete: function () {
          aload.hide();
          aload.unsetOverlay();
          //set back loader opacity to 0 again
          Velocity($("#loader"), { opacity: 1 }, { duration: 0 });
        } 
      }); 
    }
  },
  //load object on created
  created: function() {
    
    $('body').css('overflow', 'hidden');
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
    var scope = this;
  },
}
</script>
<!-- GLOBAL CSS -->
<style lang="scss">
  #front { width: 100%; height: 100%; }
  #front .bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0; left: 0;
    z-index: -1;
    transition: background-color 0.5s ease-in-out;
  }
  #front.about .bg{
    background: #000;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $sidebar_w: 25%;

  #content {
    margin-left: $sidebar_w;
  }

  /** DON'T REMOVE: This little thing let the next content hide during the transition **/
  .v-leave-active + div {
    display: none;
  }
</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>
  @media (max-width : 1100px) {
    #content {
      width: 100%;
      margin: 0;
      padding-top: 210px;
    }
  }
</style>
