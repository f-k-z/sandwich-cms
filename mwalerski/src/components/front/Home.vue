<template>
  <div class="home">
    <ul class="nav page-content">
    	<li class="nav-item" v-for="page in pages">       
        <router-link class="thumb" :to="'page/'+page.slug">
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
  name: 'home',
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
  },
  //load object on created
  created: function() {
    var user = Firebase.auth().currentUser;
    this.isUser = (user) ? true : false;
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
    margin-top: 30px;
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
