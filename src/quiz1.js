var quiz1 = function(game){}

quiz1.prototype = {
	preload: function(){
	answeredBool = false;		// reset to false
	wrongAnswer = false;		// reset to false
	var validateText;			// holds "correct" and "try again".
	},
  	create: function(){
  		// test function - should console.log "quiz1" state.
        		testFunctionFromAnotherState(this);
        		
		createBackgroundImage();	// background image
		backgroundImage.alpha = .1;	// background image alpha
		// quiz question
		
		 validateText = game.add.text(this.game.world.centerX, this.game.world.centerY + 150, "", {font: "52px Arial",
	fill: "#ffffff",
	align: "center"	
	});
	validateText.anchor.setTo(0.5, 0.5);
	
		createSceneFromSubState();
    	
	},
	
	update: function(){
	if (answeredBool){	// if question answered & delay has happened.
	if (clickTimeDelay < this.game.time.totalElapsedSeconds()){
		if (wrongAnswer){	// if wrong answer selected
		validateText.text = "";	// reset text after wrong answer delay is finished.
		answeredBool = false;		// reset to false
		wrongAnswer = false;		// reset to false
		} else {					// otherwise
		subStateLevelManager();		// subStateLeveManager function.
	}	
}	
	}
	
		
	}
}

function rightAnswerClick(){
	answeredBool = true;
	// add extra delay to established delay variable on top of total elapsed seconds.
 	clickTimeDelay = this.game.time.totalElapsedSeconds() + delay +1;
 	wrongAnswerButton.kill();	// destroy the wrong answer button.
	 validateText.text = "Correct!";	// show correct validateText
}
// creates right answer button based on frame of answerButton sheet.
function createRightAnswerButton(image, frame){
// right answer button.
	console.log("rightrubtton");
    		rightAnswerButton = this.game.add.button(this.game.world.centerX - 250, 
    		// wipes sprite is [2]
    		this.game.world.centerY+40, image, rightAnswerClick, this, frame, frame,frame);
    		rightAnswerButton.anchor.setTo(0.5, 0.5);
    		rightAnswerButton.alpha = buttonAlpha;	
}

function wrongAnswerClick(){
	answeredBool = true;
	wrongAnswer = true;
	clickTimeDelay = this.game.time.totalElapsedSeconds() + delay;
	validateText.text = "Try again";	// show try again validateText.
}

function createWrongAnswerButton(image, frame){
    		// wrong answer button.
    		wrongAnswerButton = this.game.add.button(this.game.world.centerX + 250, this.game.world.centerY+40, image, wrongAnswerClick, this, frame, frame, frame);
    		wrongAnswerButton.anchor.setTo(0.5, 0.5);
    		wrongAnswerButton.alpha = buttonAlpha;	
}

function createToiletPaperButton(frame){
    		// wrong answer button.
    		wrongAnswerButton = this.game.add.button(this.game.world.centerX + 250, this.game.world.centerY, "answerButton", wrongAnswerClick, this, frame, frame, frame);
    		wrongAnswerButton.anchor.setTo(0.5, 0.5);
    		wrongAnswerButton.alpha = buttonAlpha;	
}

function createSceneFromSubState(){
		switch(subState){
			case 1:
				// builds wipes vs. toilet paper for what clogs most toilets.
    		textBuilder(questionText, question1, questionTextPositionX, questionTextPositionY);
    		createRightAnswerButton("wipesPackage");
    		createWrongAnswerButton("toiletPaper", 4);
    		break;
    		case 3:
    			// builds true vs false for single toilet cost
    			textBuilder(questionText, question2, questionTextPositionX, questionTextPositionY);
    			createRightAnswerButton("answerButton", 0);
    			createWrongAnswerButton("answerButton", 1);
    			break;
    			
    		case 5:
    			// builds true vs false for central pump repair cost.
    			textBuilder(questionText, question3, questionTextPositionX, questionTextPositionY);
    			createRightAnswerButton("answerButton", 0);
    			createWrongAnswerButton("answerButton", 1);
    			break;
    		
    		default:
    			console.log("quiz1 createSceneFromSubState default case");
    			break;
    	}
}