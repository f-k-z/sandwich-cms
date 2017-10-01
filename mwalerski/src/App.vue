<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: 'app',
  data () {
    return {
      title: ''
    }
  },
  filters: {
    truncate: function(string, value) {
      return string.substring(0, value) + '...';
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  height:100%;
  width: 100%;
}

h1 { text-align: center; display: inline-block; }
h1 a, h1 a:hover, h1 a:visited { text-decoration: none!important; color: grey; }
.glyphicon-tasks {  display: inline-block; font-size: 26px; margin-left: 15px; color: grey; }

.btn { font-weight: bold}

.action {  cursor: pointer; }
.action:hover { background: #DDD; }

body {
  overflow-x: hidden;
}

/*** FRONT CSS ***/
.front {
  font-family: 'CalibreRegular';
  font-size: 16px;
}

/*** FONTS ***/

@font-face {
  font-family: 'Cardo';
  src: url('./assets/fonts/Cardo-Bold.eot');
  src: url('./assets/fonts/Cardo-Bold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Cardo-Bold.woff') format('woff'),
    url('./assets/fonts/Cardo-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'CardoItalic';
  src: url('./assets/fonts/Cardo-Italic.eot');
  src: url('./assets/fonts/Cardo-Italic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Cardo-Italic.woff') format('woff'),
    url('./assets/fonts/Cardo-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'CardoRegular';
  src: url('./assets/fonts/Cardo-Regular.eot');
  src: url('./assets/fonts/Cardo-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Cardo-Regular.woff') format('woff'),
    url('./assets/fonts/Cardo-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('./assets/fonts/CormorantGaramond-Regular.eot');
  src: url('./assets/fonts/CormorantGaramond-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/CormorantGaramond-Regular.woff') format('woff'),
    url('./assets/fonts/CormorantGaramond-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreMediumItalic';
  src: url('./assets/fonts/Calibre-MediumItalic.eot');
  src: url('./assets/fonts/Calibre-MediumItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-MediumItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-MediumItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreBlackItalic';
  src: url('./assets/fonts/Calibre-BlackItalic.eot');
  src: url('./assets/fonts/Calibre-BlackItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-BlackItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-BlackItalic.ttf') format('truetype');
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreSemiboldItalic';
  src: url('./assets/fonts/Calibre-SemiboldItalic.eot');
  src: url('./assets/fonts/Calibre-SemiboldItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-SemiboldItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-SemiboldItalic.ttf') format('truetype');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreThinItalic';
  src: url('./assets/fonts/Calibre-ThinItalic.eot');
  src: url('./assets/fonts/Calibre-ThinItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-ThinItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-ThinItalic.ttf') format('truetype');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreBlack';
  src: url('./assets/fonts/Calibre-Black.eot');
  src: url('./assets/fonts/Calibre-Black.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Black.woff') format('woff'),
    url('./assets/fonts/Calibre-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreSemibold';
  src: url('./assets/fonts/Calibre-Semibold.eot');
  src: url('./assets/fonts/Calibre-Semibold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Semibold.woff') format('woff'),
    url('./assets/fonts/Calibre-Semibold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreLight';
  src: url('./assets/fonts/Calibre-Light.eot');
  src: url('./assets/fonts/Calibre-Light.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Light.woff') format('woff'),
    url('./assets/fonts/Calibre-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreRegular';
  src: url('./assets/fonts/Calibre-Regular.eot');
  src: url('./assets/fonts/Calibre-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Regular.woff') format('woff'),
    url('./assets/fonts/Calibre-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreMedium';
  src: url('./assets/fonts/Calibre-Medium.eot');
  src: url('./assets/fonts/Calibre-Medium.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Medium.woff') format('woff'),
    url('./assets/fonts/Calibre-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreBold';
  src: url('./assets/fonts/Calibre-Bold.eot');
  src: url('./assets/fonts/Calibre-Bold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Bold.woff') format('woff'),
    url('./assets/fonts/Calibre-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreRegularItalic';
  src: url('./assets/fonts/Calibre-RegularItalic.eot');
  src: url('./assets/fonts/Calibre-RegularItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-RegularItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-RegularItalic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreThin';
  src: url('./assets/fonts/Calibre-Thin.eot');
  src: url('./assets/fonts/Calibre-Thin.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-Thin.woff') format('woff'),
    url('./assets/fonts/Calibre-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'CalibreBoldItalic';
  src: url('./assets/fonts/Calibre-BoldItalic.eot');
  src: url('./assets/fonts/Calibre-BoldItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-BoldItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: 'CalibreLightItalic';
  src: url('./assets/fonts/Calibre-LightItalic.eot');
  src: url('./assets/fonts/Calibre-LightItalic.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre-LightItalic.woff') format('woff'),
    url('./assets/fonts/Calibre-LightItalic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

</style>
