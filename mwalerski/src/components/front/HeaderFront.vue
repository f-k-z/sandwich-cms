<template>
  <header>    
		<h2>Choregrapher  <span class="cardo">&</span> Dancer</h2>
		<h1 class="logo"><router-link class="btn" :to="'/'">{{ title }}</router-link></h1>
    <div id="nav-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
		<nav>
			<ul>
				<li><router-link :to="'/work'"><span class="cardo">View</span> My Work</router-link></li>
				<li><router-link :to="'/about'"><span class="cardo">About</span> Me</router-link></li>
				<li><router-link :to="'/contact'"><span class="cardo">Keep</span> Contact</router-link></li>
			</ul>
		</nav>
  </header>
</template>

<script>
import global from '@/global'
import Firebase from 'firebase'

export default {
  name: 'header-front',
  firebase: {
    pages: global.db.ref('pages')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  $sidebar_w: 25%;

  header {
    position: fixed;
    width: $sidebar_w;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 100;
    z-index: 10;
  }

  .action { 
    right:15px; 
    position: absolute; 
    top: 15px; 
    opacity: .5; 
  }
  .action:hover { opacity: 1; }

  h2 {
    font-family: 'CalibreMedium';
    font-size: 16px;
    color: #222222;
    letter-spacing: 2px;
    width: 130px;
    text-align: center;
    margin: 57px auto 0 auto;
    text-transform: uppercase;
  }

  .cardo {
    font-style: italic;
    font-family: 'CardoItalic';
    color: #999999;
    text-transform: none!important;
    transition: color 0.5s ease-in-out;
  }

  h1.logo {
    width: 100%;
    position: absolute;
    top:50%;
    margin: -100px 0 0 0;
  }

  h1.logo a {
    font-family: 'Cormorant Garamond';
    font-size: 64px;
    color: #222222;
    line-height: 69px;
    width: 240px;
    display: block;
    font-weight: normal;
    margin: 0 auto;
    white-space: inherit;
    text-align: center;
    padding: 0;
    z-index: 999;
    -webkit-appearance: none;
    transition: color 0.5s ease-in-out;
  }


  input:hover
  input:active, 
  input:focus, 
  textarea:active,
  textarea:hover,
  textarea:focus, 
  button:focus,
  button:active,
  button:hover
  {
      outline:0px !important;
  }


  nav {
  	position: absolute;
  	bottom: 57px;
  	left: 50%;
    margin-left: -56px;

  	ul { list-style-type: none; padding: 0; margin: 0 }
  	li a{
  		font-family: 'CalibreMedium';
			font-size: 17px;
			color: #222222;
			letter-spacing: 0;
			line-height: 33px;
			width: 112px; text-align: center;
			display: block;
			text-transform: uppercase;
      text-decoration: none!important;
  	}

  	li a:not(:hover) {
  		color: #999999;
  	}

    li a.router-link-active:not(:hover) {
      color: #222222;
    }
  }

  /*** HAMBURGER ***/
  #nav-icon {
    display: none;
    width: 37px;
    height: 21px;
    position: relative;
    margin: 30px auto 0 auto;
    cursor: pointer;
  }

  #nav-icon span {
    display: block;
    height: 3px;
    width: 100%;
    background: #000;
    margin-bottom: 6px;
    transition: background-color 0.5s ease-in-out;
  }

  .about #nav-icon span {
    background: #fff;
  }

  .about h1.logo a, .about .cardo, .about h2, .about nav li a.router-link-active:not(:hover), .about nav li a  {
    color: #FFF;
  }

</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>

  @media (max-width : 1100px) {
    header {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      height: 210px;
    }
    h2 { display: none; }
    nav { display: none; }
    h1.logo { position: static; margin: 0; margin-top: 50px; }
    h1.logo a {
      width: 200px;
      font-size: 44px;
      line-height: 39px;
    }
    #nav-icon { display: block; }
  }
</style>

