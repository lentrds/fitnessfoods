$(function () {

	/*multi level tabs*/
	$('.tab').hide();
	$('.tabs').each(function(){
		if(!$(this).children('ul').children('.active_tab').length) {$(this).children('ul').children('li').first().addClass('active_tab');}
		//console.log($(this).children('ul').children('.active_tab'));
		var nmb = $(this).children('ul').find('li.active_tab').index();
		$(this).children('.tab').eq(nmb).show();
		//console.log($(this).children('ul').children('.active_tab'));
		$(this).children('ul').children('li').on('click',function(e){
			e.preventDefault();
			$(this).parent('ul').parent('.tabs').children('ul').children('.active_tab').removeClass('active_tab');
			$(this).addClass('active_tab');
			var nmb = $(this).parent('ul').parent('.tabs').children('ul').children('.active_tab').index();
			$(this).parent('ul').parent('.tabs').children('.tab').hide().eq(nmb).show();
		});
	});

	/*removing side pictures*/
	$('.menu_info').addClass('perm_height');
	$('.tab_menu li').on('click',function(){
		var nbr = $(this).index();
		var sidepicsminheight=532;
		var li = $(this);
		$('.menu_info').toggleClass('perm_height',!(li.parent().siblings('div').eq(nbr).innerHeight()<532));
	});


	/*faq*/
	$('.faq dl dt').on('click',function(){
		$('.faq dl dd').not($(this).next()).slideUp();
		$('.faq dl dt').not($(this)).removeClass('transformation');
		$(this).next().slideToggle(300);
		$(this).toggleClass('transformation');
		//console.log(a);
	});

	/*options underline*/
	$('.options a').on('click',function(e){
		e.preventDefault();
		$(this).parent('li').toggleClass('option',!$(this).parent('li').is('.option'));
	});

	/*feedback clone*/
	$('.av').each(function(){
		$(this).children('p').addClass('visible-lg visible-md').clone().removeAttr('class').addClass('visible-sm visible-xs').appendTo($(this));
	});

/*scroll_to_order*/
	$('.scroll_to_order,.prog').on('click',function(){
		$destination= $($(this).attr('data-href'));
		//console.log($destination);
		$('body,html').animate({scrollTop:$destination.offset().top},800);
	});

	/*callback*/
	$(window).on('scroll',function(){
		var a = 'fade'+($(window).scrollTop()>$(window).height()?'In':'Out');
		//console.log(a);
		$('.callback')[a]();
	});

	/*popups*/
	$('.callback,.call_us,.application, .consulting').on('click',function(e){
		e.preventDefault();
		$('.overlay').fadeIn();
		$('.callback_popup').fadeIn();
	});

	$(document).on('keyup', 'body', function (e) {if (e.which == 27) { $('.overlay,.popup').fadeOut();}});
	$('.overlay').on('click',function(){
		$(this).fadeOut();
		$('.popup').fadeOut();
	});

	/*form*/
	$('.phone').on('keydown', function(e){
		/*var chars=' +-()0123456789';
		return (chars.indexOf(String.fromCharCode(e.keyCode))!=-1);*/
		var chars = [8,9,16,17,18,27,32,38,40,46,48,49,50,51,52,53,54,55,56,57,187,189];
		return (chars.indexOf(e.keyCode)!=-1);
	});


	$('.subm,.trigger_submit').on('click', function(){
		var flag=true;
		var a = false;
		var b = true;
		//console.log(flag);
		$(this).parents('form').find('input[type="text"]').each(function(){
			//console.log($(this));
			if ($(this).val()!==''&&$(this).is('.warning')) {$(this).removeClass('warning')} else
			if($(this).val()==='') {
				$(this).addClass('warning');
				flag=false;
				b=false;
			}
		});
		//console.log(flag);
		$(this).parents('form').find('input[name="email"]').each(function(){
			//console.log($(this));
			if($(this).val().match(/\w+\@[a-z-]+\.[a-z]+/)==null) {
				flag=false;
				a = true;
			} else {a=false;}
		});
		//console.log(flag);

		if (!flag) {
			$(this).parents('form').find('.warning_desc').remove();
			if (!(b==true&&a==true)) {
				$(this).before('<p class="warning_desc">Для відправки форми необхідно заповнити виділені поля!</p>');
			}
			$(this).parents('form').find('.email_warning').remove();
			if(a) {
				$(this).before('<p class="email_warning">Необхідно вказати коректний email!</p>');
			}
			return false;
		} else {
			$(this).parents('form').find('.warning_desc').remove();
			$(this).parents('form').find('.email_warning').remove();
			var btn = $(this);
			function ajaxSubmit() {
				var form = btn.parents('form').eq(0);
				$.ajax({
					type: "POST",
					url: "testmail.php",
					data: form.serialize(),
					success: function (data) {
						console.log('ajax OK!');
						console.log(JSON.parse(data));
						if (JSON.parse(data)=='Recaptcha problems') {
						    console.log('You have to prove you\'re not a robot!');
						    btn.prev('.robot-warning').remove();
                            btn.before('<p class="robot-warning">Необхідно підтвердити, що ви не робот!</p>');
                        } else if(JSON.parse(data)=='Done'){
						    console.log('You\'re a human!');
                           if (form.attr('data-desc')=='order_form'){
                               btn.prev('.robot-warning').remove();$('.overlay, .ord_receipt').fadeIn();
						   } else if(form.attr('data-desc')=='application_form'){
                               btn.prev('.robot-warning').remove();$('.callback_popup').hide();$('.overlay, .application_popup').fadeIn();
						   }
                        }
					}
				});
			}
			ajaxSubmit();
			return false;
		}

	});

	function scrollAnimation(section, left_block, right_block) {
		var sec = $(section);
		//console.log(sec);
		var top = sec.offset().top;
		var bottom = sec.height() + top;
		top = top - $(window).height();
		var scroll_top = $(this).scrollTop();
		if ((scroll_top < top) || (scroll_top > bottom)) {
			$(left_block + ',' + right_block).addClass('hide_me');
			//console.log("HIDDEN!");
		} else {
			$(left_block).removeClass('hide_me').animate({'left': 0}, 3000);
			$(right_block).removeClass('hide_me').animate({'right': 0}, 3000);
			//console.log($(left_block + ',' + right_block));
			//console.log("SHOWN!");
		}
	}

	$(window).on('scroll', function(){scrollAnimation('.offer', '.salmon', '.granola')}).trigger('scroll');
	$(window).on('scroll', function(){scrollAnimation('.partners', '.side_veggie', '.asparagus')}).trigger('scroll');

	$('.offer a').on('click',function(e){
		e.preventDefault();
	});

	/*multiple slider initialization*/
	$('.menu_info a').on('click',function(e){
		e.preventDefault();
	});


	for (var i=1;i<3;i++){
		$('.cycle-slideshow-'+i).cycle({
			timeout:0,
			pager:'.day_pager-'+i,
			pagerTemplate:'',
			slides:'.slide_item',
			fx:'scrollHorz',
			swipeFx:'scrollHorz',
			swipe:true
		});
	}




});




