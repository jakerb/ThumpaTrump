var trump = {

	init:function() {
		var that = this;
		var whack = $(that.whack).parent().find('.whackWrapper').html();
		whack = '<div class="whackWrapper active">' + whack + '</div>';
		that.whackDom = whack;
		that.loaderBar(1);
		that.touch();

		$(that.restartBtn).on('click', function(e) {
			e.preventDefault();
			location.reload();
		});
	},

	tap:function() {
		var that = this;
		$('body').on('click', '.trump', function(e) {
			$(e.currentTarget).addClass('active');
			$(e.currentTarget).closest('.whackWrapper').removeClass('active');
			that.loaderBar();
			that.changeScore(true);
			$(that.game).append(that.whackDom);
			$(that.game).css('width', $(that.game).width() * 5);
			that.offset = that.offset - ($(that.whack).width() + 150);
			setTimeout(function() {
				$(that.game).velocity({
					marginLeft: that.offset
				}, 200);
			}, 300);
			
			
		});
	},

	touch:function() {
		var that = this;
		$('html').swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			  if(direction == 'left') {
			  	$(that.activeTrump).addClass('righthook');
			  	that.punchFx.playclip()
			  	that.respond(1);
			  	
			  }
			  if(direction == 'up') {
			  	$(that.activeTrump).addClass('uppercut');
			  	that.punchFx.playclip()
			  	that.respond(0);
			  	
			  }
			  if(direction == 'right') {
			  	$(that.activeTrump).addClass('lefthook');
			  	that.punchFx.playclip()
			  	that.respond(2);
			  	
			  }
			}
		});
	},

	respond:function(action) {
		var that = this;
		
		//that.loaderBar();

		if(action == that.actionSet) {
			that.changeScore(true);
			$(that.activeTrump).find('h4').text('+10');
		} else {
			that.changeScore(false);
			$(that.activeTrump).find('h4').text('-10');
			$(that.livesDom).eq(that.lives-1).addClass('lost');
			that.lives--;

			if(that.lives == 0) {
				var twitterLink = 'https://twitter.com/home?status=I%20thumped%20trump%20to%20'+that.currentScore+'%20points%20on%20TrumpThumper%20app%20for%20Android!%20%23trumpthumper';
				$('.menu').find('a.share-twitter').attr("onclick", "window.open('"+twitterLink+"', '_system');");
				$('.menu').addClass('on');
			}
		}

		$(that.activeTrump).find('.trump').addClass('active');
		$(that.activeTrump).removeClass('active');
		
		$(that.game).append(that.whackDom);
		$(that.game).css('width', $(that.game).width() * 5);
		that.offset = that.offset - ($(that.whack).width() + 150);

		that.actionSet = that.randomAction();
		$(that.actionDom).text(that.action[that.actionSet]);

		setTimeout(function() {
			$(that.game).velocity({
				marginLeft: that.offset
			}, 200);
		}, 300);
	},


	loaderBar:function(secs) {
		var that = this;
		if(!secs) {
			$(that.loader).css('width', 0);
		} else {
			$(that.loader).velocity({
				width: '100%'
			}, secs*1000);
		}
	},

	changeScore:function(updown) {
		var that = this;
		var change = updown ? 10 : -10;
		var current = parseInt($(that.score).eq(1).text()) + change;
		if(current > 0) {
			that.currentScore = current;
			$(that.score).text(current);
		}

	},

	randomAction:function(not) {
		var that = this;
		if(not) {
			if(not == 1) {
				return 0;
			}
			if(not == 0) {
				return 2;
			}
			if(not == 2) {
				return 1;
			}
		}
		return Math.floor(Math.random() * 3) + 0;
	}

};

trump.level = 1;
trump.currentScore = 0;
trump.action = ['uppercut', 'left hook', 'right hook'];
trump.actionSet = 1;
trump.lives = 3;
trump.livesDom = '.lives i';
trump.hit = 'tap';
trump.head = '.trump';
trump.restartBtn = '.restart-game';
trump.activeTrump = '.whackWrapper.active';
trump.score = '.scoreBoardScore';
trump.whack = '.game .whackWrapper';
trump.game = '.game';
trump.actionDom = '.action h4';
trump.loader = '.loader .filler';
trump.offset = 0;
trump.whackDom = '';
trump.punchFx = ss_soundbits('fx/punch.mp3');

trump.init();

//trump.tap();