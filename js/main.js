$(document).ready(function () {
	// запуск анимации при появлении блока на экране
	var windowHeight = $(window).height();
 
	$(document).on('scroll', function() {
		$('.addanimateFadeInUp').each(function() {
			var self = $(this),
			height = self.offset().top;
			if ($(document).scrollTop() + windowHeight >= height) {
				self.addClass('fadeInUp')
			}
		});
	});

	// 
	// $(document).on('scroll', function() {
	// 	$('.addanimateZoomIn').each(function() {
	// 		var self = $(this),
	// 		height = self.offset().top;
	// 		if ($(document).scrollTop() + windowHeight >= height) {
	// 			self.addClass('zoomIn')
	// 		}
	// 	});
	// });

	// плавная якорная прокрутка
	$("a.scrollto").click(function () {
        var elementClick = '#'+$(this).attr("href").split("#")[1]
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
        return false;
    });   

	// button scrollup
	$(window).scroll(function(){
	  	if($(document).scrollTop()>$(window).height()){
	    	$('.scrolltotop').show();
	    }else{
	    	$('.scrolltotop').hide();
	    }
	});
	$('.scrolltotop').click(function(){
		$('html,body').animate({scrollTop: 0}, 1000);
	});

	// slick slider
	$('.slider').slick({
		infinite: true,
  		slidesToShow: 1,
  		slidesToScroll: 1,
  		dots: true,
  		// autoplay: false,
  		autoplay: true,
  		autoplaySpeed: 5000,
  		prevArrow: '<button type="button" class="slider__arrow slider__arrow_right d-none d-sm-block"><i class="fa fa-chevron-right"></i></button>',
  		nextArrow: '<button type="button" class="slider__arrow slider__arrow_left d-none d-sm-block"><i class="fa fa-chevron-left"></i></button>'
	});

	// Parallax
	// Кешируем объект окна
	$window = $(window);
                
   $('[data-type="background"]').each(function(){
     var $bgobj = $(this); // Назначаем объект
                    
      $(window).scroll(function() {
                    
		// Прокручиваем фон со скоростью var.
		// Значение yPos отрицательное, так как прокручивание осуществляется вверх!
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		// Размещаем все вместе в конечной точке
		var coords = '50% '+ yPos + 'px';

		// Смещаем фон
		$bgobj.css({ backgroundPosition: coords });
		
		}); 
 	});


   	// The validator is connected, to check the form for the fullness
   	$('[data-submit]').on('click', function(e){
	    e.preventDefault();
		$(this).parent('form').submit();
	})
	$.validator.addMethod(
	        "regex",
	        function(value, element, regexp) {
	            var re = new RegExp(regexp);
	            return this.optional(element) || re.test(value);
	        },
	        "Please check your input."
			);
	function valEl(el){
		 
          el.validate({
        rules:{
          tel:{
            required:true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name:{
            required:true
          },
          email:{
          	required:true,
            email:true
          }
        },
          messages:{
            tel:{
              	required:'Поле обязательно для заполнения',
              	regex:'Телефон может содержать символы + - ()'
            },
            name:{
              	required:'Поле обязательно для заполнения',
            },
            email:{
            	required:'Поле обязательно для заполнения',	
            	email:'Неверный формат E-mail'
            }
        },            
        submitHandler: function (form) {
        	$('#loader').fadeIn();
	        var $form = $(form);
	        var $formId = $(form).attr('id');
	        switch($formId){
	          case'goToNewPage':
	            $.ajax({
	                  type: 'POST',
	                  url: $form.attr('action'),
	                  data: $form.serialize(),
	                })
	                .always(function (response) {  
	                    //ссылка на страницу "спасибо" - редирект
	                    location.href='https://wayup.in/lm/landing-page-marathon/success';
	                    //отправка целей в Я.Метрику и Google Analytics
	                    ga('send', 'event', 'masterklass7', 'register');
			    yaCounter27714603.reachGoal('lm17lead');
	            });
	        break;        
	        case'popupResult':
            $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize(),
                })
                .always(function (response) {                    
                setTimeout(function (){
                 $('#loader').fadeOut();
                },800);
                setTimeout(function (){
                  $('#overlay').fadeIn();
                  $('form').fadeOut();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                },1100);
                $('#overlay').on('click', function(e) {
  			$('#overlay').fadeOut();
		});
                    
            });
        break;          
        }       
return false; 
    }                           
  })
        }                        
     
              $('.js-form').each(function() {
                valEl($(this)); 
              });
		$('[data-scroll]').on('click', function(){
			$('html, body').animate({
		        scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
		    }, 2000);
		    event.preventDefault();
		})              
})
