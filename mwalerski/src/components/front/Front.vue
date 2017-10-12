<template>
  <div id="front">
    <header-front></header-front>
    <animated-loader id="loader" ref="aload"></animated-loader>
    <div id="content">
      <transition v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:enter-cancelled="enterCancelled"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
          v-on:leave-cancelled="leaveCancelled">
        <router-view></router-view>
      </transition>
    </div>
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
      loading: false,
    }
  },
  methods: {
    // --------
    // ENTERING
    // --------
    beforeEnter: function (el) {
    },
    // the done callback is optional when
    // used in combination with CSS
    enter: function (el, done) {
      //get all images in content and listen to their load
      var images = el.getElementsByTagName("img");
      var done = done;
      var imagesLoaded = 0 ;
      var scope = this;
      for(var i=0; i < images.length; i++){
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
      }
    },
    afterEnter: function (el) {
      this.$refs.aload.hide();
      //back the scroll to top
      Velocity($("#content"), "scroll", { offset:0, duration: 0 });
      //show main content
      Velocity($("#content"), { opacity: 1 }, { duration: 800, transition:"easeInOutExpo"});
    },
    enterCancelled: function (el) {
      // ...
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
      if(this.isLoading)
        this.$refs.aload.show();
    },
    // leaveCancelled only available with v-show
    leaveCancelled: function (el) {
      // ...
    },
    startMainLoader: function() {
      var aload = this.$refs.aload;
      /*console.log(this.$el);
      var images = this.$el.getElementsByTagName("img");
      console.log(images.length);
      var imagesLoaded = 0 ;
      var scope = this;
      
      for(var i=0; i < images.length; i++){
        images[i].onload = function() {
          imagesLoaded++;
          if(imagesLoaded == images.length)
          {
            //loading is finish!
            console.log('loading is finish!');
          }
        } 
      }*/
      
      aload.hide();
      aload.unsetOverlay();
    }
  },
  //load object on created
  created: function() {
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
    var scope = this;
    
    //here we load firebase at first to access data and set up DOM
    this.$firebaseRefs.pages.once('value', 
      function(pageSnapshot) {
      scope.startMainLoader();
    });
  },
}
</script>
<!-- GLOBAL CSS -->
<style lang="scss">
  
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
