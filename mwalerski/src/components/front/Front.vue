<template>
  <div id="front">
    <header-front></header-front>
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
import Firebase from 'firebase'
import Velocity from 'velocity-animate'

export default {
  name: 'front',
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
    // --------
    // ENTERING
    // --------
    beforeEnter: function (el) {
      // ...

    },
    // the done callback is optional when
    // used in combination with CSS
    enter: function (el, done) {
      //$("#content").css('opacity', 0);
      Velocity($("#content"), "scroll", { offset:0, duration: 0 });
      Velocity($("#content"), { opacity: 1 }, { duration: 800, transition:"easeInOutExpo", complete: done })
    },
    afterEnter: function (el) {
      
    },
    enterCancelled: function (el) {
      // ...
    },
    // --------
    // LEAVING
    // --------
    beforeLeave: function (el) {
      // ...
    },
    // the done callback is optional when
    // used in combination with CSS
    leave: function (el, done) {
      Velocity($("#content"), { opacity: 0 }, { duration: 300, transition:"easeInExpo", complete: done }); 
      //done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled only available with v-show
    leaveCancelled: function (el) {
      // ...
    }
  },
  //load object on created
  created: function() {
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
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
</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>
  @media (max-width : 1100px) {
    #content {
      width: 100%;
      margin: 210px 0 0 0;
    }
  }
</style>
