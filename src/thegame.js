var theGame = function(game) {
  // redefine globals here for this state.

}

theGame.prototype = {
    create: function() {
      createBackgroundImage();
      backgroundImage.alpha = .8;
      // create logo
      createLogo(this.game.world.centerX, 65);
      gameTitle.scale.setTo(0.75, 0.75);
      gameTitle.alpha = .8;
      // test function - should console.log "theGame" state.
      testFunctionFromAnotherState(this);

      // create graphic.
      createGraphic(this);

      // create analog
      createAnalog(this);

      // create arrow.
      createArrow(this);

      // add Wipe to game.
      createWipe(this);
      // initialize toiletsGroup.
      initializeToiletsGroup(this);

      // create scene based on current subState.
      subStateGameCreation();

    },

    update: function() {
      findSlopeOfObject(wipe); // rotate wipe w/ flight path.

      arrow.rotation = this.game.physics.arcade.angleBetween(arrow, wipe);

      if (catchFlag == true) {
        //  Track the wipe sprite to the mouse  
        wipe.x = this.game.input.activePointer.worldX;
        wipe.y = this.game.input.activePointer.worldY;

        arrow.alpha = 1;
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = this.game.physics.arcade.distanceToPointer(arrow);
        launchVelocity = analog.height;
      }
      // if enouch time has passed since launch && not currently holding onto launcher.
      if (launchTime < this.game.time.totalElapsedSeconds() && !catchFlag) {
        // detects all physics collisions/overlaps.
        collisionDetect();
      }
      // moves the trash can if initial velocity already set.  
      moveTrashCan();

    }
  }
  //======================================================
  //	PUBLIC FUNCTIONS
  //==============================================================
  //===============================================
  //	SUBSTATE GAME CREATION
  //================================================
function subStateGameCreation() {
  switch (subState) {
    case 0:
       createTrashCan();
       textBuilder(null, "Launch the wipe into the trash!", 500, 150);
      break;
    case 1:
      // quiz scene

      break;
    case 2:
      createTrashCan();
      createToilet(this, 600, 100);
      trashCan.body.velocity.x = trashCanSpeed;

      break;
    case 3:
      // quiz scene
      break;

    case 4:
      //3rd gamescene
      createTrashCan();
      trashCan.body.velocity.x = trashCanSpeed;
      createToilet(this, 350, 100);
      createToilet(this, 750, 100);
      break;

    default:
      subState = 0;
      this.game.state.start("gameTitle");
  }
}
//===============================================
//	COLLISION/OVERLAP DETECTION
//================================================
function collisionDetect() {
  // check for collision of wipe and toilets, perform function.
  this.game.physics.arcade.overlap(wipe, toiletsGroup, wipeFlush, null, this);

  if (wipe.animations.currentAnim.name != "wipeFlush") {

    // check for collision of wipe and trashcans, perform function.
    this.game.physics.arcade.overlap(wipe, trashCan, wipeThrownAway, null, this);

  }

  console.log(wipe.animations.currentAnim.name + " : current animation of wipe");


  this.game.physics.arcade.overlap(wipe, tileFloor, wipeOnFloor, null, this);
}
//===============================================
//	findSlopeOfObject AND ROTATE 
//================================================
function findSlopeOfObject(obj) {
  velocityX = obj.body.velocity.x; // x velocity
  velocityY = obj.body.velocity.y; // y velocity
  slope = velocityY / velocityX; // y/x = slope
  // if obj is moving, rotate along w/ slope, otherwise, rotate w/ arrow.
  if (obj.body.velocity.x > 2 || obj.body.velocity.x < -2) {
    obj.rotation = Math.atan(slope) - 3.14 / 2;
  } else {
    obj.rotation = arrow.rotation;
  }
}

function createGraphic(game) {
  //     		    var graphics = game.add.graphics(0,0);
  //     // color fill of graphic, takes hex color w/o #
  //     graphics.beginFill(845422);
  //     	//( x, y, width, length)
  //     graphics.drawRect(fulcrumX, fulcrumY, 10, 280);
  var slingShot = this.game.add.sprite(fulcrumX - 30, fulcrumY - 25, 'slingShot');
}

// create analog image
function createAnalog(game) {

  analog = game.add.sprite(fulcrumX, fulcrumY, 'wipe');

  game.physics.enable(analog, Phaser.Physics.ARCADE);

  analog.body.allowGravity = false;
  analog.width = 8;
  analog.rotation = 220;
  analog.alpha = 0;
  analog.anchor.setTo(0.5, 0.0);

}
//===============================================================
// CREATE ARROW
//===============================================================
// creates arrow image
function createArrow(game) {
  arrow = game.add.sprite(fulcrumX, fulcrumY, 'arrow');

  game.physics.enable(arrow, Phaser.Physics.ARCADE);

  arrow.anchor.setTo(0.1, 0.5);
  arrow.body.moves = false;
  arrow.body.allowGravity = false;
  arrow.alpha = 0;
}
//=======================================================
// CREATE TRASH CAN
//=========================================================
function createTrashCan() {
  // create a trashCan
  trashCan = this.game.add.sprite(650, 350, 'trashCan');
  // enable physics on trashCans group.
  game.physics.enable(trashCan, Phaser.Physics.ARCADE);
  // set trashCan anchor to middle of sprite.
  trashCan.anchor.setTo(0.5, 1);
  trashCan.body.collideWorldBounds = true; // collides w/ world bounds.
  trashCan.body.width = 50; // set width of body(collisions).
  trashCan.body.height = 75; // set height of body(collisions).
  // create toilet animation.
  animationBuilder(trashCan, trashCeleb, 'trashCelebrate', trashStopped, trashStart);
}

function trashStart() {
  // infoText.text = "Good Job!!";   
  wipe.kill();
  // wipe hit trash
}

// called when trashCeleb animation is complete
function trashStopped() {
  //console.log("trashCeleb Stopped");  
  // infoText.text = ' ';
  // reset the trashCan frame to 0.
  trashCan.frame = 0;
  subStateLevelManager();
}

function moveTrashCan() {
  if (trashCan.position.x <= 300) {
    trashCan.body.velocity.x = trashCanSpeed;
  } else if (trashCan.position.x >= 800) {
    trashCan.body.velocity.x = -trashCanSpeed;
  }
}
//===============================================================
// CREATE TOILET
//===============================================================
// initialize the toiletsGroup.
function initializeToiletsGroup(game) {
  toiletsGroup = game.add.group();
  // enable physics on toiletsGroup
  toiletsGroup.enableBody = true;
}

// create toilets.
function createToilet(game, x, y) {
  toilet = toiletsGroup.create(x, y, 'toilet');
  // toilet collides with world bounds.
  toilet.body.collideWorldBounds = true;
  // set anchor
  toilet.anchor.setTo(0.5, 0.7);
  // toilet body cannot move unless coded.
  toilet.body.immovable = true;
  // bouncy toilet
  toilet.body.bounce.setTo(0.2, 0.2);
  // flips the sprite.
  toilet.scale.x = -1;

  toilet.body.width = 50; // set width of body(collisions).
  toilet.body.height = 100; // set height of body(collisions).

  animationBuilder(toilet, toiletFlushAnim, 'toiletFlush', flushStopped, flushStarted);

}

function flushStarted() {
  //  infoText.text = "Avoid the toilets!"; 
}

function flushStopped(toilet) {
  toilet.frame = 0; // leave toilet lid closed after animation.
  resetWipe();
  //     
  //     infoText.text = ' ';

  //         // kill and revive at original position.
  //    killAndRevive(wipe, wipeInitialPosX, wipeInitialPosY);
}
//===============================================================
// CREATE WIPE
//===============================================================
// adds and builds Wipe.
function createWipe(game) {

  wipe = game.add.sprite(100, 400, 'wipe');
  game.physics.enable(wipe, Phaser.Physics.ARCADE);
  wipe.anchor.setTo(0.5, 0.5);
  wipe.body.collideWorldBounds = true;
  wipe.body.bounce.setTo(0.9, 0.9);
  // Enable input.
  wipe.inputEnabled = true;
  wipe.input.start(0, true);
  wipe.events.onInputDown.add(set);
  wipe.events.onInputUp.add(launch);

  // wipe animations
  //     wipeIdle = wipe.animations.add('wipeIdle',[0, 0, 0], 10, true);
  //     wipe.animations.play('wipeIdle', 10, false);	// play wipeOnFloor animation.
  wipeFlushAnim = wipe.animations.add('wipeFlush', [8, 9, 10, 11, 12, 13, 14, 15], 15, false);
  wipeOnFloorAnim = wipe.animations.add('wipeOnFloor', [16, 17, 18, 19, 20, 21, 22, 22, 22, 22, 22, 22, 22, 22], 10, false);
  wipeOnFloorAnim.onComplete.add(wipeOnFloorAnimComplete, this);

  wipe.body.moves = false; // start out with wipe No move!
  wipe.body.allowGravity = false; // no physics.
  // rotation for analog using the arrow
  arrow.rotation = game.physics.arcade.angleBetween(arrow, wipe);
  analog.alpha = 0.5; // show the analog
  analog.rotation = arrow.rotation - 3.14 / 2; // rotate the analog to the wipe
  // give analog distance.
  analog.height = game.physics.arcade.distanceBetween(arrow, wipe);
}

function wipeFlush(wipe, toilet) {
  // console.log('wipe flushed!');  
  // console.log(toilet.position.x);

  // once wipe enters toilet, no movement.
  canMoveWipe = false;
  wipe.body.velocity.x = 0;
  wipe.body.velocity.y = 0;
  toilet.animations.play('toiletFlush', 15, false);
  wipe.animations.play('wipeFlush');

}

function wipeThrownAway() {
  // once wipe enters toilet, no movement.
  canMoveWipe = false;
  wipe.body.velocity.x = 0;
  wipe.body.velocity.y = 0;

  // play trashCelebrate animation, frameRate, loop.
  trashCan.animations.play('trashCelebrate', 10, false);
}

// wipe hits floor. start wipeOnFloor animation.
function wipeOnFloor() {
  wipe.body.velocity.setTo(0, 0); // don't move wipe after hits floor.
  wipe.position.y = wipe.position.y + 5; // lower the wipe onto the floor surface after hitting.
  wipe.rotation = 0; // wipe lays on floor flat.
  wipe.animations.play('wipeOnFloor', 7, false, true); // play wipeOnFloor animation.
}

function wipeOnFloorAnimComplete() {
  console.log('wipeOnFloorAnimComplete');

  resetWipe();
}

// kill and create a new wipe at starting position.
function resetWipe() {
  wipe.kill(); // destroy the wipe.
  createWipe(this.game); // create new wipe at starting position.		
}

//===============================================================
// SET & LAUNCH
//===============================================================
function set(wipe, pointer) {

  wipe.body.moves = false;
  wipe.body.velocity.setTo(0, 0);
  wipe.body.allowGravity = false;
  catchFlag = true;

}

function launch() {

  catchFlag = false;

  wipe.body.moves = true;
  arrow.alpha = 0;
  analog.alpha = 0;
  Xvector = (arrow.x - wipe.x) * velocityMultiplier;
  Yvector = (arrow.y - wipe.y) * velocityMultiplier;
  wipe.body.allowGravity = true;
  wipe.body.velocity.setTo(Xvector, Yvector);
  // set launchTime + delay for collision detection
  launchTime = this.game.time.totalElapsedSeconds() + collisionDetectDelay;
}
//===============================================================
// SUBSTATES MANAGERS
//===============================================================
function subStateLevelManager() {

  switch (subState) {
    case 0:
      // GOTO quiz1
      subState = 1;
      this.game.state.start("quiz1");
      break;
    case 1:
      // GOTO game subState 2
      subState = 2;
      this.game.state.start("TheGame");
      break;
    case 2:
      // GOTO quiz2
      console.log("hello from case:2");
      subState = 3;
      this.game.state.start("quiz1");
      break;
    case 3:
      // GOTO game subState 4
      console.log(subState + " subState. " + " case: 3");
      subState = 4;
      this.game.state.start("TheGame");
      break;

    case 4:
      subState = 5;
      this.game.state.start("quiz1");
      break;

    case 5:
      subState = 0;
      // send to certificate page.
      window.location.href = "addStats.php";

    default:
      subState = 0;
      this.game.state.start("GameTitle");
  }
}
//===============================================================
// ANIMATION BUILDER
//===============================================================
// animation builder. onComplete, onStart, onLoop are function names to be passed in. can be null.
function animationBuilder(obj, animVar, animName, onComplete, onStart, onLoop) {
  // adds animation name to animation variable
  animVar = obj.animations.add(animName);

  // if onComplete is not null, add to onComplete process.
  if (onComplete != null) {
    animVar.onComplete.add(onComplete, this);
  }

  if (onStart != null) {
    animVar.onStart.add(onStart, this);
  }

  // onLoop will only be called if loop=true.
  if (onLoop != null) {
    animVar.onLoop.add(onLoop, this);
  }

}
