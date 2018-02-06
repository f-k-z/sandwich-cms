<template>
	<div class="animated-loader overlay">
		<div id="logo-loader" class="loader">
			<div id="logo" class="loader-png"><img width="217" height="117" src="../../assets/loader.png"></div>
		</div>
		<div class="spinner-wrapper hide">
			<div class="spinner"></div>
		</div>
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
      itvGif: null,
      tId: null
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
			clearTimeout(this.tId);
			$('.animated-loader').addClass('hide');
		},
		close: function() {
			var scope = this;
			$('body').css('position', 'static');
			//Velocity($("#logo"), { left: '12.38%' }, { duration: 2000, transition:"easeInOutExpo", complete: function () {
			Velocity($("#logo"), { opacity: 0 }, { duration: 1000, transition:"easeInOutExpo", complete: function () {
					$("#logo-loader").addClass('hide');
					scope.$emit('close');
			} });
		},
		show: function() {
			this.tId = setTimeout(function() {
				$('.animated-loader').removeClass('hide');
			}, 600);
			
		},
		startRandomGif: function() {
			$(".spinner-wrapper").removeClass('hide');
			return;
			$('.gif_dance').css('opacity', 0);
			$('.gif_dance').removeClass('hide');
			for (var i = 0; i < 8; i++) {
				this.animateRandomGif(i);
			};
		},
		stopRandomGif: function() {
			$(".spinner-wrapper").addClass('hide');
			return; 
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
		},
		created: function() {
			$('body').css('position', 'fixed');
		}
	}
}
</script>

<style lang="scss">

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	$base-line-height: 240px;
	$black: rgb(0,0,0);
	$off-black: rgba($black, 0.2);
	$white: rgb(255,255,255);
	$off-white: rgba($white, 0.2);
	$spin-duration: 0.8s;

	@keyframes spin {
	  0% {
	    width: 0;
	  }
	  50% {
	    width: $base-line-height;
	  }
	  100% {
	    margin-left: $base-line-height;
	  }
	}
	.spinner-wrapper {
		position: absolute;
		left: 12.38%;
		margin-left: -$base-line-height/2;
		top: 50%;
		margin-top: 40px;
		width: $base-line-height;
    height: 1px;
    overflow: hidden;
	}
	.spinner {
    width: $base-line-height;
    height: 1px;
    background-color: $black;
    animation: spin $spin-duration infinite linear;
	}

	.about .spinner {
		background-color: $white;
	}

	.animated-loader {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
		opacity: 1;
		transition: all .5s ease-out;
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
		opacity: 0;
	}

	.loader-png {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 217px; height: 117px;
		margin-left: -108px;
		margin-top: -91px;
	}

</style>

<!-- RESPONSIVE -->
<style lang="scss" scoped>

	$base-line-height: 120px;
  @media (max-width : 1100px) {
  	.spinner-wrapper {
  		left: 50%;
  		margin: 0;
			margin-left: -$base-line-height/2!important;
			top: 50%;
			width: $base-line-height;
			position: fixed;
			padding: 0;
  	}
  	.spinner {
    	width: $base-line-height;
  	}
  }
</style>
