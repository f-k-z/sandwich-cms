<template>
	<div class="animated-loader overlay">
		<div class="loader">
			<div id="logo" class="loading"></div>
		</div>
		<img id="gif0" class="gif_dance hide" src='../../assets/gif_dance/GIF-1-.gif'>
		<img id="gif1" class="gif_dance hide" src='../../assets/gif_dance/GIF-close-up-BW-2.gif'>
		<img id="gif2" class="gif_dance hide" src='../../assets/gif_dance/GIF-fall-2.gif'>
		<img id="gif3" class="gif_dance hide" src='../../assets/gif_dance/GIF-laugh-2.gif'>
		<img id="gif4" class="gif_dance hide" src='../../assets/gif_dance/GIF-Medhi-1.gif'>
		<img id="gif5" class="gif_dance hide" src='../../assets/gif_dance/GIF-reverse-2.gif'>
		<img id="gif6" class="gif_dance hide" src='../../assets/gif_dance/GIF-shake-2.gif'>
		<img id="gif7" class="gif_dance hide" src='../../assets/gif_dance/GIF-twist-2.gif'>
		<img id="gif8" class="gif_dance hide" src='../../assets/gif_dance/GIF-wall-fight-2.gif'>
	</div>
</template>

<script>
import global from '@/global'
import Velocity from 'velocity-animate'

export default {
	name: 'animated-loader',
	data () {
    return {
      title: global.PROJECT_NAME,
      itvGif: null
    }
	},
	methods: {
		setOverlay: function() {
			$('.animated-loader').addClass('overlay');
		},
		unsetOverlay: function() {
			$('.animated-loader').removeClass('overlay');
			$("#logo").addClass('hide');
		},
		hide: function() {
			$('body').css('position', 'static');
			$('.animated-loader').addClass('hide');
		},
		close: function() {
			var scope = this;
			Velocity($("#logo"), { left: '12.38%' }, { duration: 2000, transition:"easeInOutExpo", complete: function () {
					scope.$emit('close');
			} }); 
		},
		show: function() {
			$('body').css('position', 'fixed');
			$('.animated-loader').removeClass('hide');
		},
		startRandomGif: function() {
			$('.gif_dance').css('opacity', 0);
			$('.gif_dance').removeClass('hide');
			for (var i = 0; i < 8; i++) {
				this.animateRandomGif(i);
			};
		},
		stopRandomGif: function() {
			$('.gif_dance').addClass('hide');
			$('.gif_dance').css('opacity', 0);
		},
		animateRandomGif: function(id) {
			var domId = "#gif"+id;
			var gif_w = 400;
			var gif_h = Math.round($( window ).height() / 7);
			var gif_gap_h = gif_h * id; 
			//windows width - sidebar width
			var sidebar_width = ($( window ).width() * 0.25);
			var ww = $( window ).width() - sidebar_width - gif_w;
			var rTop = gif_gap_h;
			var rLeft = sidebar_width + Math.round(Math.random() * ww);
			Velocity($(domId), { top: rTop, left: rLeft, opacity:0 }, { duration: 0 });
			Velocity($(domId), { opacity: 1}, { duration: 400, delay:50*id, transition:"easeOutExpo", complete: function () {
					
			} }); 

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

	.gif_dance {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
	}

	.overlay {
		z-index: 30;
	}

	.hide {
		display: none;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 217px; height: 117px;
		margin-left: -108px;
		margin-top: -91px;
		background: transparent url('../../assets/loader.gif') no-repeat top left;
	}

</style>
