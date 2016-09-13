;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	/* ================================
	===  PRE LOADING EFFECT  	   ====
	=================================== */
	$win.load(function() {
	    
	    $(".preloader-text").addClass('pre-animate');

	    // will first fade out the loading animation
		$(".status").delay(3000).fadeOut();
	    
	    // will fade out the whole DIV that covers the website.
		$(".preloader").delay(3500).fadeOut("slow");
	});




	/* ================================
	===  PAGE SCROLLING EFFECTS    ====
	=================================== */
	var iScrollPos = 0;
	
	function scrollEffect() {

		var iCurScrollPos = $(this).scrollTop(),
			newStream = $('.news'),
			navTrigger = $('.nav-trigger');
		
		if (iCurScrollPos > iScrollPos && iCurScrollPos > 100) {

	        newStream.addClass('scrolling');
	        navTrigger.addClass('scrolling');
	      
	    } else if ( iCurScrollPos < 200) {

	       newStream.removeClass('scrolling');
	       navTrigger.removeClass('scrolling');

	    }


	    iScrollPos = iCurScrollPos;	
	}

	$win.on('scroll',scrollEffect);






	/* ================================
	===  BACK TO TOP ANIMATION     ====
	=================================== */
	var offset = 700,
		offsetOpacity = 1200,
		scrollTopDuration = 700,
		backToTop = $('.back-to-top');

	//hide or show the "back to top" link
	$win.scroll(function(){
		( $(this).scrollTop() > offset ) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible fade-out');
		if( $(this).scrollTop() > offsetOpacity ) { 
			backToTop.addClass('fade-out');
		}
	});

	//smooth scroll to top
	backToTop.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scrollTopDuration
		);
	});



	/* ================================
	===  MAIN NAVIGATION           ====
	=================================== */
	var navTrigger = $('.nav-trigger'),
		body = $('body'),
		overlay = $('.overlay');
		

		function toggleNavigation( event ) {
			event.preventDefault();
			body.toggleClass('nav-open');
		}

		function overlayFunction() {
			body.toggleClass('nav-open');
		}

		navTrigger.on('click',toggleNavigation);
		overlay.on('click',overlayFunction);
		

		$('#navigation li').each(function(){  
			$(this).on('click',function(){
       			body.toggleClass('nav-open');
       		});
    	});

		

	
	/* ================================
	===  PARALLAXIFY               ====
	=================================== */

	$.parallaxify({
		positionProperty: 'transform',
		responsive: true,
		motionType: 'natural',
		mouseMotionType: 'performance',
		motionAngleX: 70,
		motionAngleY: 70,
		alphaFilter: 0.5,
		adjustBasePosition: true,
		alphaPosition: 0.025
	});




	/* ================================
	===  SLICK SLIDER              ====
	=================================== */
	
	var slickSlide = $('.screenshot-slider').slick({
		'arrows': false,
		'autoplay' : true,
		'fade' : true
	});

	$('#prev').on('click', function (e) {
    	e.preventDefault();
        slickSlide.slick('slickPrev');
    });

    $('#next').on('click', function (e) {
    	e.preventDefault();
      	slickSlide.slick('slickNext');
    });





	/* ================================
	===  NEWS TICKER               ====
	=================================== */

	$('#vticker').vTicker();
	
	



	/* ================================
	===  OWL CAROUSELS             ====
	=================================== */
	
	var owl = $("#owl-reviews"),
		owlAdvantages = $('#owl-advantages');
		
 
	owl.owlCarousel({
      singleItem: true,
      autoPlay: false
    });

    owlAdvantages.owlCarousel({
    	singleItem: true,
    	autoPlay: false
    });

	



    /* ================================
	===  REVIEW TAB                ====
	=================================== */
	
	// SET REVIEW TAB WATERMARK TEXT
	var reviewSection = $('#reviews');
	var firstLinkText = $('.nav-tabs li:first-child').children('a').text();
	reviewSection.append('<div class="review-watermark">'+ firstLinkText +'</div>');

	$('.nav-tabs li').each(function(){  

		$this = $(this);
		$tabLink = $this.children('a');
		
		$tabLink.on('click',function(){

   			$linkText = $(this).text();
   			$('.review-watermark').remove();
   			reviewSection.append('<div class="review-watermark">'+ $linkText +'</div>');
   		});

	});
	
	
	$(".nav-tabs li").click(function(){
	    var  cur =$(".nav-tabs li").index(this);
	    var elm = $('.tab-pane:eq('+cur+')');
	    elm.addClass("animated fadeInLeft");
	    $('.review-watermark').addClass('animated slideInUp');
	    setTimeout(function() {
	          elm.removeClass("fadeInLeft");
	          $('.review-watermark').removeClass('animated slideInUp');

	    }, 1000);
	});






	/* ================================
	===  IMAGE GALLERY (WORKS)     ====
	=================================== */
	var firstImage = $('.img-gallery li:first() a').attr('href');
	var lightboxImage = $('<img>');
	lightboxImage.attr('src', firstImage);
	var lightboxWrapper = $('<div class="gallery-lightbox"><a class="close" href="#"><i class="fa fa-close"></i></a><figure class="lightbox-image"></figure></div>');
	var myLightbox = lightboxWrapper.children('figure');
	var currentImage = 0;
	var firstAppUserContent = $('.img-gallery li:first()').children('.app-user-temp').html();
	var appUserContent;
	var appUserWrapper = $('<div class="app-user"></div>').append(firstAppUserContent);

	
	function doLightboxEffect() {

		if($('.gallery-lightbox').hasClass('lightbox-effect')) {
			$('.gallery-lightbox').removeClass('lightbox-effect');

			setTimeout(function() {
				$('.gallery-lightbox').addClass('lightbox-effect');
			}, 700);
		} else {
			$('.gallery-lightbox').addClass('lightbox-effect');
		}	

	}

	function prevPhoto(e) {
		e.preventDefault();
		var prImage = currentImage - 1;

		if(prImage < 0) {
			prImage = $('.img-gallery a').length - 1; 
		}
		
		lightboxImage.attr('src', $('.img-gallery a:eq('+prImage+')').attr('href'));
		appUserContent = $('.img-gallery li:eq('+prImage+')').children('.app-user-temp').html();
		appUserWrapper.html(appUserContent);
		doLightboxEffect();
		currentImage = prImage;
		
	}

	function nextPhoto(e) {
		e.preventDefault();
		var nextImage = currentImage + 1;

		if(nextImage ==  $('.img-gallery a').length) {
			nextImage = 0;
		}
		lightboxImage.attr('src', $('.img-gallery a:eq('+nextImage+')').attr('href'));
		appUserContent = $('.img-gallery li:eq('+nextImage+')').children('.app-user-temp').html();
		appUserWrapper.html(appUserContent);
		doLightboxEffect();
		currentImage = nextImage;
	}

	
	$('#works').append(lightboxWrapper);
	myLightbox.append(lightboxImage);
	$('.gallery-lightbox figure').append(appUserWrapper);

	$('.prev-photo').click(prevPhoto);
	$('.next-photo').click(nextPhoto);
	
	$('.img-gallery a').click(function(event) {

		event.preventDefault();
		currentImage = $.inArray(this, $('.img-gallery a'));
		appUserContent = $(this).parent('li').children('.app-user-temp').html();
		appUserWrapper.html(appUserContent);
		appUserWrapper.show();

		var imageLocation = $(this).attr('href');
		lightboxImage.attr('src', imageLocation);
		
		lightboxWrapper.show();

		doLightboxEffect();

	});

	$('.gallery-lightbox .close').on('click',function(e) {
		e.preventDefault();
		$('.gallery-lightbox').removeClass('lightbox-effect');
		$(this).addClass('close-effect');
	});





	/* ================================
	===  STATISTICS                ====
	=================================== */
	var StrokeDasharray = 220,
		ProgressPercentage = $('.progress-percentage').attr('data-percentage'),
		percentage = parseInt(ProgressPercentage),
		percentageToNumber = (StrokeDasharray*percentage) / 100,
		StrokeDashOffset = StrokeDasharray - percentageToNumber;
		
	$('.circle-color').css( "stroke-dashoffset", StrokeDashOffset );
	
	
	
	$(window).scroll(function() {

		$('.circular-progressbar').each(function(){
			var circlePos = $(this).offset().top;

			var topOfWindow = $(window).scrollTop();
			if (circlePos < topOfWindow + 600 && circlePos > topOfWindow + 500) {
				$(this).toggleClass('animate-circle');	
				$('.download-time').countTo({refreshInterval: 50});
				$('.numberofawards').countTo({refreshInterval: 50});
			
			}
		});
		
	});





    /* =================================
	===  SUBSCRIPTION FORM          ====
	==================================== */
	$("#subscribe").submit(function (e) {
	    e.preventDefault();
	    var email = $("#subscriber-email").val();
	    var dataString = 'email=' + email;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email)) {
	        $.ajax({
	            type: "POST",
	            url: "subscribe/subscribe.php",
	            data: dataString,
	            success: function () {
	                $('.subscription-success').fadeIn(1000);
	                $('.subscription-error').fadeOut(500);
	                $('.hide-after').fadeOut(500);
	            }
	        });
	    } else {
	        $('.subscription-error').fadeIn(1000);
	    }

	    return false;
	});



    /* ================================
	===  MAILCHIMP                 ====
	=================================== */

	$('.mailchimp').ajaxChimp({
	    callback: mailchimpCallback,
	    url: "http://arifevrenerdem.us11.list-manage.com/subscribe/post?u=406e31254715533ce9d357b56&id=a088eee114" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
	});

	function mailchimpCallback(resp) {
	     if (resp.result === 'success') {
	        $('.subscription-success').html(resp.msg).fadeIn(1000);
	        $('.subscription-error').fadeOut(500);
	        
	    } else if(resp.result === 'error') {
	        $('.subscription-error').html(resp.msg).fadeIn(1000);
	    }  
	}





    /* ================================
	===  CONTACT FORM              ====
	=================================== */
    $("#cf-trigger").on('click', function(e){
    	e.preventDefault();
    	$(".contact-form").toggleClass('collapsed');
    });

    $(".close-btn").on('click', function(){
        $(".contact-form").removeClass('collapsed');
    });


	$("#contact").submit(function (e) {
	    e.preventDefault();
	    var name = $("#name").val();
	    var email = $("#email").val();
	    var message = $("#message").val();
	    var dataString = 'name=' + name + '&email=' + email + '&message=' + message;

	    function isValidEmail(emailAddress) {
	        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	        return pattern.test(emailAddress);
	    };

	    if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
	        $.ajax({
	            type: "POST",
	            url: "sendmail.php",
	            data: dataString,
	            success: function () {
	                $('.success').fadeIn(1000);
	                $('.error').fadeOut(500);
	            }
	        });
	    } else {
	        $('.error').fadeIn(1000);
	        $('.success').fadeOut(500);
	    }

	    return false;
	});




	/* ================================
	===  RETINA READY              ====
	=================================== */
	retinajs();





	/* ================================
	===  ANIMATE ON SCROLL         ====
	=================================== */
	AOS.init({
		easing: 'ease-out-quart',
		duration: 1200,
		//disable: 'mobile',
		disable: function () {
	    var maxWidth = 1024;
	    return window.innerWidth <= maxWidth;
	  }
	});


})(jQuery, window, document);





/* ================================
===  YOUTUBE IFRAME VIDEO API  ====
=================================== */

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '100%',
	  width: '100%',
	  videoId: 'your_id',
	  playerVars: { 
	  	 'modestbranding' : 1,
         'autoplay' : 0,
         'controls' : 0, 
         'showinfo' : 0,
         'rel' : 0,
  		},
	  events: {
	    'onReady': initialize,
	    'onStateChange': onPlayerStateChange
		}
	});
}



function stopVideo() {
	classie.remove(stopCtrl, 'stop-show');
	classie.remove(pauseCtrl, 'pause-show');
	classie.remove(videoWrap, 'overlay-hide');
	classie.remove(videoWrap, 'wrap-expand');
	classie.remove(videoWrap, 'caption-hide');
	player.stopVideo();
}

function startVideo() {
	player.playVideo();
	classie.add(videoWrap, 'wrap-expand');
	classie.add(videoWrap, 'caption-hide');
	classie.add(videoWrap, 'overlay-hide');
	classie.add(pauseCtrl, 'pause-show');
	classie.add(stopCtrl, 'stop-show');
}

function pauseVideo() {
	classie.remove(pauseCtrl, 'pause-show');
	classie.remove(videoWrap, 'caption-hide');
	classie.remove(videoWrap, 'overlay-hide')
	player.pauseVideo();
}


videoWrap = document.querySelector('.video-inner'),
videoCaption = videoWrap.querySelector('.video-caption'),
playCtrl = videoCaption.querySelector('.play--button'),
pauseCtrl = videoWrap.querySelector('.pause--button'),
stopCtrl = videoWrap.querySelector('.stop--button');

function VideoEnded(playerStatus) {
	if(playerStatus == 0) {
		classie.remove(videoWrap, 'overlay-hide');
		classie.remove(videoWrap, 'wrap-expand');
		classie.remove(videoWrap, 'caption-hide');
		classie.remove(stopCtrl, 'stop-show');
		classie.remove(pauseCtrl, 'pause-show');
	}
}

function onPlayerStateChange(event) {
	VideoEnded(event.data);
}

function initialize() {
	playCtrl.addEventListener('click', startVideo);
	stopCtrl.addEventListener('click', stopVideo);
	pauseCtrl.addEventListener('click', pauseVideo);
}