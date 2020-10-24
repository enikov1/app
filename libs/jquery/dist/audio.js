function replay() {
	var player = $('.mp3-player audio');

	if (typeof player.attr('autoplay') === "undefined" || player.attr('loop') === "undefined") {
		player.attr("autoplay", "");
		player.attr("loop", "");
	} else {
		player.removeAttr("autoplay", "");
		player.removeAttr("loop", "");
	}
}

function apPrev() {
	$(".js-item");
	var a = localStorage.getItem("vol"),
		e = $(".show-player").index(".js-item"),
		t = $(".js-item").eq(e - 1).length ? $(".js-item").eq(e - 1) : $(".js-item:last");
	$(".player-control").removeClass("js-stop").addClass("js-play").find(".icon").removeClass("icon-pause-btn").addClass("icon-play-btn"), $(".js-item").removeClass("show-player js-item-played js-item-stopped"), $(".mp3-loud").remove(), t.find(".js-play").removeClass("js-play").addClass("js-stop").find(".icon").removeClass("icon-play-btn").addClass("icon-pause-btn");
	var s = t,
		i = s.data(),
		d = i.track,
		l = i.artist,
		o = i.title,
		n = i.img;
	s.addClass("show-player js-item-played"), $(".wrap").append('<div class="mp3-loud"><audio preload="auto" controls><source src="' + d + '" /></audio></div>'), $("body").find(".mp3-loud audio").audioPlayer(), $("body").find(".mp3-loud audio").get(0).volume = a, $("body").find(".mp3-loud audio").get(0).play(), $(".mp3-player").find(".controls").append('<div class="next"><span class="icon icon-next"></span></div><div class="replay"><span class="icon icon-replay"></span></div><div class="suffle"><span class="icon icon-suffle"></span></div><div class="desc"><div class="artist">' + l + '</div><div class="title">' + o + '</div></div>'), $(".mp3-player").find(".controls").prepend('<div class="prev"><span class="icon icon-prev"></span></div>'), $('.mp3-player').removeClass('mp3-player-stopped').addClass('mp3-player-playing').find('.mp3-player-playpause').appendTo('.controls')
}

function apNext() {
	$(".js-item");
	var a = localStorage.getItem("vol"),
		e = $(".show-player").index(".js-item"),
		t = $(".js-item").eq(e + 1).length ? $(".js-item").eq(e + 1) : $(".js-item:first");
	$(".player-control").removeClass("js-stop").addClass("js-play").find(".icon").removeClass("icon-pause-btn").addClass("icon-play-btn"), $(".js-item").removeClass("show-player js-item-played js-item-stopped"), $(".mp3-loud").remove(), t.find(".js-play").removeClass("js-play").addClass("js-stop").find(".icon").removeClass("icon-play-btn").addClass("icon-pause-btn");
	var s = t,
		i = s.data(),
		d = i.track,
		l = i.artist,
		o = i.title,
		n = i.img;
	s.addClass("show-player js-item-played"), $(".wrap").append('<div class="mp3-loud"><audio preload="auto" controls><source src="' + d + '" /></audio></div>'), $("body").find(".mp3-loud audio").audioPlayer(), $("body").find(".mp3-loud audio").get(0).volume = a, $("body").find(".mp3-loud audio").get(0).play(), $(".mp3-player").find(".controls").append('<div class="next"><span class="icon icon-next"></span></div><div class="replay"><span class="icon icon-replay"></span></div><div class="suffle"><span class="icon icon-suffle"></span></div><div class="desc"><div class="artist">' + l + '</div><div class="title">' + o + '</div></div>'), $(".mp3-player").find(".controls").prepend('<div class="prev"><span class="icon icon-prev"></span></div>'), $('.mp3-player').removeClass('mp3-player-stopped').addClass('mp3-player-playing').find('.mp3-player-playpause').appendTo('.controls')
} ! function (b, a, t, e) {
	var $ = "ontouchstart" in a,
		j = $ ? "touchstart" : "mousedown",
		x = $ ? "touchmove" : "mousemove",
		P = $ ? "touchcancel" : "mouseup",
		I = function (a) {
			var e = a / 3600,
				t = Math.floor(e),
				s = a % 3600 / 60,
				i = Math.floor(s),
				d = Math.ceil(a % 3600 % 60);
			return 59 < d && (d = 0, i = Math.ceil(s)), 59 < i && (i = 0, t = Math.ceil(e)), (0 == t ? "" : 0 < t && t.toString().length < 2 ? "0" + t + ":" : t + ":") + (i.toString().length < 2 ? "0" + i : i) + ":" + (d.toString().length < 2 ? "0" + d : d)
		},
		E = function (a) {
			var e = t.createElement("audio");
			return !(!e.canPlayType || !e.canPlayType("audio/" + a.split(".").pop().toLowerCase() + ";").replace(/no/, ""))
		};
	b.fn.audioPlayer = function (C) {
		C = b.extend({
			classPrefix: "mp3-player",
			strPlay: "",
			strPause: "",
			strVolume: "",
			strPlayI: '<span class="icon icon-play-btn"></span>',
			strPauseI: '<span class="icon icon-pause-btn"></span>',
			strVolumeI: '<span class="icon icon-volume-up"></span>'
		}, C);
		var w = {},
			a = {
				playPause: "playpause",
				playing: "playing",
				stopped: "stopped",
				time: "time",
				timeCurrent: "current",
				timeDuration: "duration",
				bar: "bar",
				barLoaded: "bar-loaded",
				barPlayed: "bar-played",
				volume: "volume",
				volumeButton: "volume-button",
				volumeAdjust: "volume-adjust",
				noVolume: "novolume",
				muted: "muted",
				mini: "mini"
			};
		for (var e in a) w[e] = C.classPrefix + "-" + a[e];
		return this.each(function () {
			if ("audio" != b(this).prop("tagName").toLowerCase()) return !1;
			var a = b(this),
				e = a.attr("src"),
				t = "" === (t = a.get(0).getAttribute("autoplay")) || "autoplay" === t,
				s = "" === (s = a.get(0).getAttribute("loop")) || "loop" === s,
				i = !1;
			void 0 === e ? a.find("source").each(function () {
				if (void 0 !== (e = b(this).attr("src")) && E(e)) return !(i = !0)
			}) : E(e) && (i = !0);
			var d = b('<div class="' + C.classPrefix + '">' + (i ? b("<div>").append(a.eq(0).clone()).html() : '<embed src="' + e + '" width="0" height="0" volume="100" autostart="' + t.toString() + '" loop="' + s.toString() + '" />') + '<div class="' + w.playPause + '" title="' + C.strPlay + '"><a href="#">' + C.strPauseI + "</a></div></div>"),
				l = (l = i ? d.find("audio") : d.find("embed")).get(0);
			if (i) {
				d.find("audio").css({
					width: 0,
					height: 0,
					visibility: "hidden"
				}), d.append('<div class="progress"><div class="' + w.bar + '"><div class="' + w.barLoaded + '"></div><div class="' + w.barPlayed + '"></div></div><div class="text"><div class="' + w.time + " " + w.timeCurrent + '"></div><div class="' + w.time + " " + w.timeDuration + '"></div></div></div> <div class="controls"><div onclick="return playlist();" class="btn playlists"><i class="icon"></i></div><div class="' + w.volume + '"><div class="' + w.volumeButton + '" title="' + C.strVolume + '"><a href="#">' + C.strVolumeI + '</a></div><div class="' + w.volumeAdjust + '"><div><div></div></div></div></div></div>');
					//document.getElementsByName('body').append('<div class="b_playlists hide"><div class="content"><div id="current_playlist" class="current"></div></div><div class="tabs"><div class="tab current active"><a href="#current_display">Текущий плейслит</a></div></div></div>');
					// document.querySelectorAll('b_list_mp3s').clone().appendTo($('#current_playlist'));
				var o = d.find("." + w.bar),
					n = d.find("." + w.barPlayed),
					r = d.find("." + w.barLoaded),
					p = d.find("." + w.timeCurrent),
					u = d.find("." + w.timeDuration),
					v = d.find("." + w.volumeButton),
					f = d.find("." + w.volumeAdjust + " > div"),
					m = 0,
					c = function (a) {
						theRealEvent = $ ? a.originalEvent.touches[0] : a, l.currentTime = Math.round(l.duration * (theRealEvent.pageX - o.offset().left) / o.width())
					},
					y = function (a) {
						theRealEvent = $ ? a.originalEvent.touches[0] : a, l.volume = 1 - Math.abs((theRealEvent.pageX - (f.offset().left + f.width())) / f.width())
					},
					h = l.volume,
					g = l.volume = .111;
				Math.round(1e3 * l.volume) / 1e3 == g ? l.volume = h : d.addClass(w.noVolume), u.html("&hellip;"), p.html(I(0)), l.addEventListener("loadeddata", function () {
					var a;
					a = setInterval(function () {
						if (l.buffered.length < 1) return !0;
						r.width(l.buffered.end(0) / l.duration * 100 + "%"), Math.floor(l.buffered.end(0)) >= Math.floor(l.duration) && clearInterval(a)
					}, 100), u.html(b.isNumeric(l.duration) ? I(l.duration) : "&hellip;"), f.find("div").height(100 * l.volume + "%"), m = l.volume
				}), l.addEventListener("timeupdate", function () {
					p.html(I(l.currentTime)), n.width(l.currentTime / l.duration * 100 + "%")
				}), l.addEventListener("volumechange", function () {
					f.find("div").width(100 * l.volume + "%"), 0 < l.volume && d.hasClass(w.muted) && d.removeClass(w.muted), l.volume <= 0 && !d.hasClass(w.muted) && d.addClass(w.muted), localStorage.setItem("vol", l.volume)
				}), l.addEventListener("ended", function () {
					d.removeClass(w.playing).addClass(w.stopped), apNext()
				}), o.on(j, function (a) {
					c(a), o.on(x, function (a) {
						c(a)
					})
				}).on(P, function () {
					o.unbind(x)
				}), v.on("click", function () {
					return d.hasClass(w.muted) ? (d.removeClass(w.muted), l.volume = m) : (d.addClass(w.muted), m = l.volume, l.volume = 0), !1
				}), f.on(j, function (a) {
					y(a), f.on(x, function (a) {
						y(a)
					})
				}).on(P, function () {
					f.unbind(x)
				})
			} else d.addClass(w.mini);
			d.addClass(t ? w.playing : w.stopped), d.find("." + w.playPause).on("click", function () {
				b(this).parent().parent().attr("class");
				return d.hasClass(w.playing) ? (b(this).attr("title", C.strPlay).find("a").html(C.strPlayI), d.removeClass(w.playing).addClass(w.stopped), i ? l.pause() : l.Stop(), b(".show-player").removeClass("js-item-played").addClass("js-item-stopped")) : (b(this).attr("title", C.strPause).find("a").html(C.strPauseI), d.addClass(w.playing).removeClass(w.stopped), i ? l.play() : l.Play(), b(".show-player").removeClass("js-item-stopped").addClass("js-item-played"), b(".wplayer").removeClass("wplayer-init")), !1
			}), a.replaceWith(d)
		}), this
	}
}(jQuery, window, document);