<template>
	<div class="form-group">
		<label for="slugField">Slug:</label>
		<input type="text" id="slugField" class="form-control" v-model="slug">
	</div>
</template>

<script>
export default {
	name: 'slug-field',
	props: ['stringToSlug'],
	data () {
    return {
      slug: ''
    }
  },
	methods: {
	  slugify: function (str) {
		  str = str.replace(/^\s+|\s+$/g, ''); // trim
		  str = str.toLowerCase();
		  
		  // remove accents, swap ñ for n, etc
		  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		  var to   = "aaaaeeeeiiiioooouuuunc------";
		  for (var i=0, l=from.length ; i<l ; i++) {
		    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		  }

		  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		    .replace(/\s+/g, '-') // collapse whitespace and replace by -
		    .replace(/-+/g, '-'); // collapse dashes

		  return str;
		},
	},
	watch: {
	    stringToSlug: function () {
	      	this.slug = this.slugify(this.stringToSlug);
	  	},
	  	slug: function () {
	      	this.$emit('update', this.slug);
	  	},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
