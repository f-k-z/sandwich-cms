<template>
  <page-view :slug="slug"></page-view>
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
