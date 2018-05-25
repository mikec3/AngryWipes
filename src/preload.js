var preload = function(game){}

preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
          
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("logo", "assets/angryWipesLogo.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("leaderboardButton", "assets/leaderboardButton.png");
			
   this.game.load.image("analog", "assets/fusia.png");
   this.game.load.image("slingShot", "assets/slingShot.png");
    this.game.load.image("arrow", "assets/arrow.png");
    this.game.load.spritesheet("wipe", "assets/wipeSheet62X60X23.png", 62, 60, 23); 
    this.game.load.image("wipesPackage", "assets/wipesPackage.png");
    this.game.load.image("toiletPaper", "assets/toiletPaper.png");   
    this.game.load.spritesheet("toilet", "assets/ToiletFlushSheet158X158X27.png", 158, 158, 27);
    
    // answerButtonSheet [true, false, wipes, stool, toilet paper]
    this.game.load.spritesheet("answerButton", "assets/answerButtonSheet.png", 200, 50);
    
      // TrashCan
  this.game.load.spritesheet('trashCan', 'assets/TrashCanSheet168X170X12.png', 168.5, 170.5, 12);
  
  // background image.
// this.game.load.image('wipeBackground', 'assets/WipesBackground.png');
 this.game.load.image('wipeBackground', "assets/bathroomBackground.png");
 
 // tile floor image.
   this.game.load.image('tileFloor', 'assets/tileFloor800x64.png');
		
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}

  //================================================================
    //	PUBLIC FUNCTIONS
    //==============================================================
function testFunctionFromAnotherState(game){
		  	      // log current state
        console.log("current game state: " + game.state.current);
        console.log(subState + " subState");
	}
	
function createBackgroundImage(){
		      // add background image.
     backgroundImage = game.add.sprite(0,0, 'wipeBackground');
    backgroundImage.scale.setTo(1.2,1.2);
    
    // fixes background image to camera.
    backgroundImage.fixedToCamera = true;
    
     // change background image alpha
    backgroundImage.alpha = .4;	
    
    // add tileFloor
    tileFloor = game.add.sprite(0, game.world.height - 34, 'tileFloor');
    game.physics.enable(tileFloor, Phaser.Physics.ARCADE);	// enable physics.
    tileFloor.body.immovable = true;	// tileFloor cannot move.
    tileFloor.body.allowGravity = false;	// no gravity on fileFloor
    tileFloor.scale.setTo(2, 1);			// scale to fill game world.
    }

function textBuilder(textElement, string, x, y){
   textElement = game.add.text(x, y, string,  {
      
        font:  "35px Arial",
    
        fill: "#ffffff",
        align: "center"
    });
   textElement.anchor.setTo(0.5, 0.5);     
}

function rightAnswerClicked(){
	console.log('right answer clicked');
}

function wrongAnswerClicked(){
	console.log('wrong answer clicked');	
}




