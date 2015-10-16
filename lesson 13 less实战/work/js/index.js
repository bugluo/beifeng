window.onload = function(){
	WOW.prototype.addBox = function(element){
        // this.boxes.push(element);
    };
	/*tony*/
	var width = $(window).width(),
		t1_left,d1_left,d11_top,d2_left,d4_left,d5_top,d2_init,d2_init1,d4_init,d5_init,
		d6_top;
	//d5_top, d4_top etc...

	if(width > 1440){
		d5_top = '560px';
		d6_top = '470px';
		t1_left = '0px';
		d1_left = '740px';
		d11_top = '55px';
		d2_left = '-220px';
		d4_left = '-405px';
		d2_init = '-420px';
		d2_init1 = '20px';
		d4_init = '-576px';
		d5_init = '760px';
	}else{
		d5_top = '280px';
		d6_top = '375px';
		t1_left = '80px';
		d1_left = '780px';
		d11_top = '20px';
		d2_left = '0px';
		d4_left = '-5px';
		d2_init = '420px';
		d2_init1 = '30px';
		d4_init = '-576px';
		d5_init = '760px';
	}

	function init(){
		$('.d2,.d4,.d5,.d6').removeClass('animated').removeAttr('style');
		$('.d2').css({left:d2_init,opacity:0});
		$('.d4').css({left:d4_init,opacity:0});
		$('.d5').css({top:d5_init,opacity:0});
		$('.d6').css({top:'510px',opacity:0});
	}

	var wow = new WOW({
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       300,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			callback:     function(box) {
				// init();
				// setTimeout(function(){
				// 	wow.addBox(box);
				// },5000)
				var $box = $(box);
				if($box.hasClass('d1')){
					$box.animate({left:d1_left,opacity:1},1600);
				}else if($box.hasClass('d11')){
					setTimeout(function(){
						$box.animate({top:d11_top,opacity:1},1600);
					},1800)
				}
				else if($box.hasClass('d2')){
					$box.animate({left:d2_left,top:d2_init1,opacity:1},1600);
				}else if($box.hasClass('d4')){
					$box.animate({left:d4_left,opacity:1},1600);
				}

			},
			scrollContainer: null // optional scroll container selector, otherwise use window
		}
	);
	wow.init();

	var wow1 = new WOW({
			boxClass:     'wow1',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       -300,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			callback:     function(box) {
				// init();
				// setTimeout(function(){
				// 	wow1.addBox(box);
				// },5000)
				var $box = $(box);
				if($box.hasClass('d5')){
					$box.animate({top:d5_top,opacity:1},1600);
				}else if($box.hasClass('d6')){
					$box.animate({top:d6_top,opacity:1},1600);
				}

			},
			scrollContainer: null // optional scroll container selector, otherwise use window
		}
	);
	wow1.init();

	$(".banner").slick({
		slider:'.page',
		slidesToShow:1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		autoplaySpeed: 6000,
		dots: true,
		infinite: true,
		onBeforeChange: function(d, f, e) {

		},
		onAfterChange: function(d, c) {

		}
	});

	$('.leave,#button2').on('mouseover',function(){
		$('#home').fadeOut(500);
		$('.text2').fadeOut(500);
		$('.button2').removeClass('button2').addClass('button1');
		setTimeout(function(){
			$('.text1').fadeIn(500);
		})
	})
	$('.home,#button1').on('mouseover',function(){
		$('#home').fadeIn(500);
		$('.text1').fadeOut(500);
		$('.button1').removeClass('button1').addClass('button2');
		setTimeout(function(){
			$('.text2').fadeIn(500);
		})

	})
	$('img').attr('title','');

}