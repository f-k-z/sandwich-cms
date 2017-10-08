<template>
	<div class="animated-loader overlay">
		<div class="loader">
			<div class="loading"></div>
		</div>
	</div>
</template>

<script>
import global from '@/global'

export default {
	name: 'animated-loader',
	data () {
    return {
      title: global.PROJECT_NAME,
    }
	},
	methods: {
		setOverlay: function() {
			$('.animated-loader').addClass('overlay');
		},
		unsetOverlay: function() {
			$('.animated-loader').removeClass('overlay');
		},
		hide: function() {
			$('.animated-loader').addClass('hide');
		},
		show: function() {
			$('.animated-loader').removeClass('hide');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	$base-line-height: 40px;
	$white: rgb(0,0,0);
	$off-white: rgba($white, 0.2);
	$spin-duration: 1s;

	@keyframes spin {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}

	@keyframes pulse {	
	  50% { 
	    background: $white;
	  } 
	}

	.animated-loader.overlay {
		z-index: 999;
	}

	.animated-loader.hide {
		display: none;
	}

	.animated-loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 9;
	}

	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50px; height: 50px;
		margin-left: -25px;
		margin-top: -25px;
	}

	.loading {
	    border-radius: 50%;
	    width: $base-line-height;
	    height: $base-line-height;
	    border: .25rem solid $off-white;
	    border-top-color: $white;
	    animation: spin $spin-duration infinite linear;
	  &--double {
	    border-style: double;
	    border-width: .5rem;
	  }
	}

</style>
