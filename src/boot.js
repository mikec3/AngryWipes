var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};

// =========================================================
//Global variables defined here.
// =========================================================
var gameBoundX = 1000;
var gameBoundY = 600;

var gameTitle;			// holds logo image.
var backgroundImage;		// background image.

var fulcrumX = 220;	// x location of fulcrum
fulcrumY = 360;		// y location of fulcrum.
var velocityMultiplier = 3;	// multiplier of slope for launch velocity
var gravity = 400;		// gravity for physics.
var arrow;
var wipe;
// 	var wipeIdle;  		// animation for wipe idle
	var wipeFlushAnimation;  // wipe flushing animation
	var wipeOnFloorAnim;		// wipe on floor animation.
var toiletsGroup;			// toiletsGroup.
var toilet;
	var toiletFlushAnim;	// for flush animation.
	
var trashCan;	// trashCan game object.
	var trashCanSpeed = 100;
var trashCeleb;     // celebrate animation.

var tileFloor;		// tile floor

var catchFlag = false;
var launchVelocity = 0;
var collisionDetectDelay = .2;		// amount of time after launch until collisions detect
var launchTime;			// holds time @ launch.

var subState = 0;		// sub states index

	// text for questions.
var questionTextPositionX = 500;
var questionTextPositionY = 200;
var questionText;
var question1 = "Most clogged toilets are caused by:\n \n\n\n OR ";
var question2= "Wipes and gloves can cause\n $500 - $1500 worth of damage to a single toilet.";
var question3 = "Flushed items that reach central pumps\n have potential to cause over $80,000 in damages.";

// answer buttons
var answeredBool = false;	// holds if questions have been answered or not.
var wrongAnswer = false;	// holds if wrong answer was selected.
var wrongAnswerButton;
var rightAnswerButton;
var buttonAlpha = 0.85;

var clickTimeDelay;	// time button clicked + delay
var delay = .5;			// preset delay in seconds for quiz pages

	

    //================================================================================
    //	BOOT
    //================================================================================
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/loading.png"); 
	},
  	create: function(){
  		testFunctionFromAnotherState(this);
	     // start the arcade phaser physics
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
      // set global gravity
    this.game.physics.arcade.gravity.y = gravity;
    // background color;
    this.game.stage.backgroundColor = '#0072bc';
    
     // change the scale automatically, persists through all other states.
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    
    // align the page horizontally.
        this.scale.pageAlignHorizontally = true;
        this.scale.refresh();   // refresh scale.
    
    this.world.setBounds(0,0, gameBoundX, gameBoundY);  
		this.game.state.start("Preload");
	}
};



	
