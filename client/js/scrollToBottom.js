$(function(){
	$('.to-bottom a').on('click', function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $('#btn').offset().top}, 400);
	});


	$('.pagetop01').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 800);
	});

	$('.pagetop02').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 800, 'easeInQuint');
	});
	
	$('.pagetop03').on('click', function(e){
		e.preventDefault();
		$('html, body').scrollTop(800).stop().animate({
			scrollTop: 0
		}, 800, 'easeOutExpo');
	});
	
	$('.pagetop04').on('click', function(e){
		e.preventDefault();
		$('html, body').css('opacity', '0').scrollTop(0).animate({
			opacity: 1
		}, 800);
	});
	
	$('.pagetop05').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 600,
			opacity: 0
		}, 400, function() {
			$('html, body').animate({
				opacity: 1,
				scrollTop: 0
			}, 400);
		});
	});
});