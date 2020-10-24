function message(status, message) {
	let div = document.createElement('div'),
		target = document.querySelector('body');
	div.className = status;
	div.innerHTML = message;
	target.appendChild(div);

	setTimeout(function () {
		div.remove();
	}, 3000);
}
function ratingPlus(status, id) {
	const request = new XMLHttpRequest();
	const url = "/engine/ajax/controller.php?mod=rating";
	const params = "go_rate=" + status + "&news_id=" + id;

	request.responseType = "json";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.addEventListener("readystatechange", () => {

		if (request.readyState === 4 && request.status === 200) {
			let obj = request.response;
			let div_rate = document.querySelector('.social-like_count').textContent;

			if (obj.error === true) {
				message('error', obj.errorinfo);
			}

			if (obj.success === true) {
				document.querySelector('.social-like_count').textContent = Number.parseInt(div_rate) + 1;
			}

		}
	});

	request.send(params);
}

$(function(){

	$('.footer-right_top').click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	$('.slice-js').each(function () {
		var size = 20;
		newsContent = $(this);
		newsText = newsContent.text();

		if (newsText.length > size) {
			newsContent.text(newsText.slice(0, size) + '...');
		}

	});

	$('.article-text').readmore({
		speed: 75,
		maxHeight: 200,
		moreLink: '<a href="#">Показать текст полностью</a>',
		lessLink: '<a href="#">Спрятать</a>',
		afterToggle: function (trigger, element, more) {
			if (!more) { // кнопка "Скрыть" была нажата
				$('html, body').animate({
					scrollTop: element.offset().top
				}, {
					duration: 100
				});
			}
		}
	});
});

	

	$(document).ready(function () {

		function shuffleElements($elements) {
			var i, index1, index2, temp_val;

			var count = $elements.length;
			var $parent = $elements.parent();
			var shuffled_array = [];


			// populate array of indexes
			for (i = 0; i < count; i++) {
				shuffled_array.push(i);
			}

			// shuffle indexes
			for (i = 0; i < count; i++) {
				index1 = (Math.random() * count) | 0;
				index2 = (Math.random() * count) | 0;

				temp_val = shuffled_array[index1];
				shuffled_array[index1] = shuffled_array[index2];
				shuffled_array[index2] = temp_val;
			}

			// apply random order to elements
			$elements.detach();
			for (i = 0; i < count; i++) {
				$parent.append($elements.eq(shuffled_array[i]));
			}
		}

		function playerMessage(text) {

			$('body').append('<div class="player-message" style="bottom: ">' + text + '</div>');
			if ($('.player-message').length > 1) {
				//$(this).css('bottom', 'px');
				//var pos_b = 25;
			}

			setTimeout(function () {
				$('.player-message').remove();
			}, 3000);
		}

		//docready();
		var dropMenuWrap = $('.dropmenu-top'),
			dropMenuClose = $('.dropmenu-top_close');
		$('.icon-active-top-menu').click(function () {
			dropMenuWrap.css('display', 'flex');
			$(this).addClass('active');
		});
		dropMenuClose.click(function(){
			dropMenuWrap.hide();
		});

		// btnActiveDropMenu.addEventListener('click', function() {
		// 	dropMenuWrap.style.display = 'flex';
		// 	btnActiveDropMenu.classList.add('active');
		// });

		$(document).mouseup(function (e) {
			var container = $('.popup-player-info');
			if (container.has(e.target).length === 0) {
				container.hide();
				$('.icon-active-top-menu').removeClass('active');
				$('.player-right_active').removeClass('active');
			}
		});

		$('.player-right_active').click(function(){
			
			var popup_dom = $(this).parent().find('.popup-player-info');

			if (popup_dom == popup_dom.css('display', 'block')) {
				//popup_dom.fadeOut();
				//$(this).removeClass('active');
			} else {
				$('.player-right_active').toggleClass('active');
				//popup_dom.fadeIn();
			}

		});
		

		

		var vol = localStorage.getItem('vol');
		if (vol == undefined) { localStorage.setItem('vol', 1); };

		console.log(vol);

		$('body').on('click', '.js-play', function (e) {


			var vol = localStorage.getItem('vol');
			$('.player-control').removeClass('js-stop').addClass('js-play').find('.icon').removeClass('icon-pause-btn').addClass('icon-play-btn');
			$('.js-item').removeClass('show-player js-item-played js-item-stopped');
			$('.mp3-loud').remove();
			$(this).removeClass('js-play').addClass('js-stop').find('.icon').removeClass('icon-play-btn').addClass('icon-pause-btn');
			var current = $(this).closest('.js-item'),
				data = current.data(),
				src = data.track, artist = current.find('.player-icon_top').html(), title = current.find('.player-icon_bottom').html(), img = data.img;
			current.addClass('show-player js-item-played');
			$('.wrap').append('<div class="mp3-loud"><audio preload="auto" controls><source src="' + src + '" /></audio></div>');
			$('.wrap').find('.mp3-loud audio').audioPlayer();
			$('.wrap').find('.mp3-loud audio').get(0).volume = vol;
			$('.wrap').find('.mp3-loud audio').get(0).play();
			$('.mp3-player').removeClass('mp3-player-stopped').addClass('mp3-player-playing').find('.mp3-player-playpause').appendTo('.controls');
			$('.mp3-player').find('.controls').append('<div class="next"><span class="icon icon-next"></span></div><div class="replay"><span class="icon icon-replay"></span></div><div class="suffle"><span class="icon icon-suffle"></span></div><div class="desc"><div class="desc-img"><img src="' + img + '" alt="' + title + ' - ' + artist +'"></div><div class="desc-text"><div class="artist">' + artist + '</div><div class="title">' + title + '</div></div></div>');
			$('.mp3-player').find('.controls').prepend('<div class="prev"><span class="icon icon-prev"></span></div>');
		});
		$('body').on('click', '.js-stop', function () {
			//$(this).removeClass('js-stop').addClass('js-play').find('.icon').removeClass('icon-pause-btn').addClass('icon-play-btn');
			$(this).find('.icon').toggleClass('icon-play-btn');
			$('.mp3-player-playpause a').trigger("click");
		});

		$('body').on('click', '.controls .next', function () {
			apNext();
		});
		$('body').on('click', '.controls .prev', function () {
			apPrev();
		});
		$('body').on('click', '.controls .replay', function () {
			replay();
			$(".replay").toggleClass('replay-active');

			if ($(this).hasClass('replay-active')) {
				playerMessage('Повтор аудио включен');
			} else {
				playerMessage('Повтор аудио выключен');
			}
		});
		$('body').on('click', '.suffle', function () {

			playerMessage('Плейлист перемешан');


			shuffleElements($('.shuffle .item-player'));
		});

	});