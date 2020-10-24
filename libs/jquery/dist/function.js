function ratingPlus(a, c) {
	$.get('/engine/ajax/controller.php?mod=rating', {
		go_rate: a,
		news_id: c
	}, function (a) {
		if (a.success) {
			$(".ratingtypeplus").html(a.votenum)
		} else {
			if (a.error) {
				$('body').append("<span class=\"error-message\">" + a.errorinfo + "</span>");
				setTimeout(function () {
					$('.error-message').remove();
				}, 3000);
			}
		}
	}, "json");
}