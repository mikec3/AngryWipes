var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		createLogo(this.game.world.centerX, 160);
		var playButton = this.game.add.button(this.game.world.centerX,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		
		var leaderboardButton = this.game.add.button(this.game.world.centerX,420,"leaderboardButton",this.goToLeaderboard,this);
		leaderboardButton.anchor.setTo(0.5,0.5);
		
		createBackgroundImage();
		backgroundImage.alpha = .1;
    
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	
	goToLeaderboard: function(){
		window.location.href = "stats.php";
	}
	
	
}

// creates game logo at x, y coordinates.
function createLogo(x,y){
	 gameTitle = this.game.add.sprite(x, y,"logo");
		gameTitle.anchor.setTo(0.5,0.5);	
}

