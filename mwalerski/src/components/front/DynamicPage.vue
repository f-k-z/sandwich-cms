<template>
  <page-view v-on:reload="onReload" v-on:reloaded="onReloaded" v-on:loaded="onLoaded" v-on:cssclass="onClass" :slug="slug"></page-view>
</template>

<script>
import global from '@/global'
import PageView from '@/components/front/PageView'

export default {
  name: 'front',
  components: {
    PageView
  },
  data () {
    return {
      slug: this.$route.params.slug,
    }
  },
  methods: {
    onLoaded: function() {
      this.$emit('loaded');
    },
    onReload: function() {
      this.$emit('reload');
    },
    onReloaded: function() {
      this.$emit('reloaded');
    },
    onClass: function(css_class) {
      this.$emit("cssclass", css_class);
    },
  },
  //load object on created
  created: function() {
    
  },
}
</script>
<!-- GLOBAL CSS -->
<style lang="scss">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>

</style>
