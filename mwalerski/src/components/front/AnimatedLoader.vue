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
			$('body').css('overflow', 'visible');
			$('.animated-loader').addClass('hide');
		},
		show: function() {
			$('body').css('overflow', 'hidden');
			$('.animated-loader').removeClass('hide');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	.animated-loader {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}

	.overlay {
		z-index: 30;
	}

	.hide {
		display: none;
	}

	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 217px; height: 117px;
		margin-left: -108px;
		margin-top: -68px;
		background: transparent url('../../assets/loader.gif') no-repeat top left;
	}

</style>
