jQuery(document).ready(function($) {
	var gInc = 100;
	var gSpeed = 1000/3 + gInc;
	var gSpinning; // Holds the spinning interval
	var gFlashing; // Holds the flashing interval
	var gPlay = [playGreen, playRed, playYellow, playBlue];
	var gBoth = [green, red, yellow, blue];
	var gFlash = [flashGreen, flashRed, flashYellow, flashBlue];
	var gLevel = 0;
	var gGameMode = 'start';

	var set = function(x, y) {
		$('#chrome')
			.css('background', "url('images/chrome.png') "+x+"px "+y+"px");
	};
	$('.red')
		.mouseenter(function() { set(-1280, 0); })
		.mousedown( function() { set(-1280,-610); playRed(); });
	$('.blue')
		.mouseenter(function() { set(-2560, 0); })
		.mousedown( function() { set(-2560,-610); playBlue(); });
	$('.green')
		.mouseenter(function() { set(-640 , 0); })
		.mousedown( function() { set(-640 ,-610); playGreen(); });
	$('.yellow')
		.mouseenter(function() { set(-1920, 0); })
		.mousedown( function() { set(-1920,-610); playYellow(); });
	$('#sensors li')
		.mouseleave(function() { set(0, 0); })
		.mouseup(function() { $(this).mouseenter(); });

	var spin = function() {
		$('.green.n1').mouseenter();
		setTimeout(function() {
			$('.green.n1').mouseleave();
			$('.red.n1').mouseenter();
			setTimeout(function() {
				$('.red.n1').mouseleave();
				$('.yellow.n1').mouseenter();
				setTimeout(function() {
					$('.yellow.n1').mouseleave();
					$('.green.n1').mouseenter();
				}, gSpeed);
			}, gSpeed);
		}, gSpeed);
	};
	$('#spin').click(function() {
		var self = $(this);
		if (self.hasClass('active')) {
			self.removeClass('active');
			clearInterval(gSpinning);
			setTimeout(function(){set(0, 0);}, gSpeed*3);
		} else {
			self.addClass('active');
			spin();
			gSpinning = setInterval(spin, gSpeed*3);
		}
	});

	var flashAll = function() {
		set(0, -610);
		setTimeout(function() {
			set(0, 0);
		}, gSpeed);
	};
	$('#flash').click(function() {
		var self = $(this);
		if (self.hasClass('active')) {
			self.removeClass('active');
			clearInterval(gFlashing);
		} else {
			self.addClass('active');
			flashAll();
			gFlashing = setInterval(flashAll, gSpeed*2);
		}
	});

	var next = function() {
		spin();
		setTimeout(function(){set(0, 0);}, gSpeed*5);
		$('#next')[0].play();
	};
	var begin = function() {
		next();
		setTimeout(flashBlue, gSpeed*7);
		setTimeout(flashBlue, gSpeed*9);
	};
	var loose = function() {
		flashAll();
		setTimeout(flashAll, gSpeed*2);
		$('#prev')[0].play();
	};
	var flashGreen = function() {
		$('.green.n1').mouseenter();
		setTimeout(function(){$('.green.n1').mouseleave();}, gSpeed);
	};
	var playGreen = function() {
		var A = $('#noteA')[0];
		A.currentTime = 0;
		A.play();
	};
	var green = function() {
		flashGreen();
		playGreen();
	};
	var flashRed = function() {
		$('.red.n1').mouseenter();
		setTimeout(function(){$('.red.n1').mouseleave();}, gSpeed);
	};
	var playRed = function() {
		var B = $('#noteB')[0];
		B.currentTime = 0;
		B.play();
	};
	var red = function() {
		flashRed();
		playRed();
	};
	var flashYellow = function() {
		$('.yellow.n1').mouseenter();
		setTimeout(function(){$('.yellow.n1').mouseleave();}, gSpeed);
	};
	var playYellow = function() {
		var C = $('#noteC')[0];
		C.currentTime = 0;
		C.play();
	};
	var yellow = function() {
		flashYellow();
		playYellow();
	};
	var flashBlue = function() {
		$('.blue.n1').mouseenter();
		setTimeout(function(){$('.blue.n1').mouseleave();}, gSpeed);
	};
	var playBlue = function() {
		var D = $('#noteD')[0];
		D.currentTime = 0;
		D.play();
	};
	var blue = function() {
		flashBlue();
		playBlue();
	};

	var buildSeq = function(size) {
		var seq = [];
		for (var i=0; i<gLevel; i++) {
			seq.push(Math.floor(Math.random()*4));
		}
		console.log('Building sequence: '+seq);
		return seq;
	};
	var playSeq = function(seq) {
		console.log('Playing sequence: '+seq);
		var time = 0;
		for (var i=0; i<seq.length; i++) {
			setTimeout(function(){gBoth[seq[i]]}, time);
			time += gSpeed;
		}
	};
	var game = function() {
		gSpeed -= gInc;
		playSeq(buildSeq(++gLevel));
		gGameMode = 'getInput';
	};
	$('li').click(function() {
		var btn = $(this).attr('class').match(/^(\w+) n\d$/)[1];
		if (gGameMode == 'getInput') {
			console.log('hi');
			next();
		} else if (gGameMode == 'start' && btn == 'blue') {
			console.log('Beginning game');
			setTimeout(function(){game();}, gSpeed*4);
			gGameMode = 'playing';
		}
	});
	setTimeout(function(){begin();}, gSpeed*2);
});
