// JavaScript Document

// function that controls the paddle logic
function paddleLogic(type){
	if(type==0){
		playerPaddleKey();
	}
	else{
		automaticMovement();
	}	
}


// function of implement ball physics
function ballPhysics(){
	
	if(checkPositionBall(ball.position.x, ball.position.y)){
		
		updateScore(1);
	}
	
	else{
		// if ball goes off the 'left' side (Player's side)
		if ((ball.position.x - radius) <= -fieldWidth/2){	
			// reset ball to center
			resetBall(1);	
		}
		// if ball goes off the 'right' side (Wall's side)
		if ((ball.position.x + radius) >= fieldWidth/2){
			// change x direction according to bounce	
			ballDirX = -ballDirX;	
		}
		// if ball goes off the right side (side of table)
		if ((ball.position.y-radius) <= -fieldHeight/2){	
			// change y direction according to bounce	
			ballDirY = -ballDirY;
		}	
		// if ball goes off the left side (side of table)
		if ((ball.position.y +radius)>= fieldHeight/2){
			// change x direction according to bounce	
			ballDirY = -ballDirY;
		}
		
		// update ball position over time
		ball.position.x += ballDirX * ballSpeed;
		ball.position.y += ballDirY * ballSpeed;
		
		// limit ball's y-speed to 1.5x the x-speed in such a way the ball doesn't speed from left to right super fast keeps game playable
		if (ballDirY > ballSpeed * 1.2){
			ballDirY = ballSpeed * 1.2;
		}
		else if (ballDirY < -ballSpeed * 1.2){
			ballDirY = -ballSpeed * 1.2;
		}
	}
	
}

// Handles paddle collision logic
function paddlePhysics()
{
	// we check between the front and the middle of the paddle
	if ((ball.position.x <= paddlePlayer.position.x + paddleWidth) && (ball.position.x >= paddlePlayer.position.x)){
		// and if ball is aligned with paddlePlayer on y plane
		if ((ball.position.y <= paddlePlayer.position.y + paddleHeight/2) && (ball.position.y >= paddlePlayer.position.y - paddleHeight/2)){
			// and if ball is travelling towards player
			if (ballDirX < 0){
				// stretch the paddle to indicate a hit
				paddlePlayer.scale.y = 1.5;
				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;
				// we impact ball angle when hitting it
				ballDirY -= paddlePlayerDirY;
			}
		}
	}
}

function getRandomValue(){
	return Math.floor(Math.random()*2);
}


function resetCounter(line){
	// update matrix dimension and limitX
	dimensionMatrixBlock = line;
	limitX = (initialWidth+5)-(10*dimensionMatrixBlock);

	// reset total bricks 
	totalBricks = 0;

	// reset counter of destroyed block
	destroyBricks = 0;

	//Initialize the matrixBlock and Hit
	matrixBlock = new Array(dimensionMatrixBlock);
	matrixBlockHit = new Array(dimensionMatrixBlock);
}


// Handles CPU paddle movement that work accords to Linear Interpolation rule
function automaticMovement()
{
	// paddle follows the ball movement
	paddlePlayerDirY = (ball.position.y - paddlePlayer.position.y);
	
	// if the function compute a movement lesser than paddleSpeed, we update the paddle direction
	if(Math.abs(paddlePlayerDirY) <= paddleSpeed){	
		paddlePlayer.position.y += paddlePlayerDirY;
	}
	// if the function compute a movement bigger than paddleSpeed, we clamp it
	else
	{
		// if paddle is going forward positive direction
		if (paddlePlayerDirY > paddleSpeed)
		{
			paddlePlayer.position.y += paddleSpeed;
		}
		// if paddle is going forward negative direction
		else if (paddlePlayerDirY < -paddleSpeed)
		{
			paddlePlayer.position.y -= paddleSpeed;
		}
	}
	
	// reset paddle size after stretching
	paddlePlayer.scale.y += (1 - paddlePlayer.scale.y) * 0.2;	
	
	if(ballDirY==0 && ballDirX==0){
		ballDirY = 1;
		ballDirX = 1;
	}
}


// Handles player's paddle movement
function playerPaddleKey()
{
	// move left
	if (Key.isDown(Key.A))		
	{
		// if paddle is not touching the side of table we move it
		if (paddlePlayer.position.y < fieldHeight * 0.45)
		{
			paddlePlayerDirY = paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle to indicate we can't move
		else{
			paddlePlayerDirY = 0;
			paddlePlayer.scale.z += (10 - paddlePlayer.scale.z) * 0.2;
		}
	}	
	// move right
	else if (Key.isDown(Key.D))
	{
		// if paddle is not touching the side of table we move it
		if (paddlePlayer.position.y > -fieldHeight * 0.45)
		{
			paddlePlayerDirY = - paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle to indicate we can't move
		else{
			paddlePlayerDirY = 0;
			paddlePlayer.scale.z += (10 - paddlePlayer.scale.z) * 0.2;
		}
	}
	// start ball
	else if (Key.isDown(Key.SPACE)){
		if(ballDirY==0 && ballDirX==0){
			ballDirY = 1;
			ballDirX = 1;
		}
	}
	// stop the paddle
	else{
		paddlePlayerDirY = 0;
	}
	
	// set paddle position and scale
	paddlePlayer.scale.y += (1 - paddlePlayer.scale.y) * 0.2;	
	paddlePlayer.scale.z += (1 - paddlePlayer.scale.z) * 0.2;	
	paddlePlayer.position.y += paddlePlayerDirY;
}

// function to change from automatic to human playing
function switchGameKey(){
	if(Key.isDown(Key.S)){
		switchGame = 0;
		resetAll();
	}
	
	if(Key.isDown(Key.W)){
		if(switchLevel == 1){
			nextLevel();
			switchLevel = 0;
		}
	}

	if(!(Key.isDown(Key.W))){
		switchLevel = 1;
	}
}

// function to understand if the ball hit a block
function destroyBlock(positionX, positionY){
	
	// retrieve the block from the matrix
	var appBlock = matrixBlock[positionX][positionY];

	// if the block is not already hit	
	if(appBlock != null){

		// check if double hit is needed
		if(matrixBlockHit[positionX][positionY] == 1){
			// update number of hit
			matrixBlockHit[positionX][positionY] = 0;
			//update color block
			appBlock.material.color.setHex(0x00FF9D);
		}
		else{

			// remove the block from the scene
			scene.remove(appBlock);

			// update the matrix cell
			matrixBlock[positionX][positionY] = null;
		}

		return true;
	}
	
	return false;
}

// function to check if in this position there is a block
function findBlock(positionX, positionY){
	
	// retrieve the block from the matrix
	var appBlock = matrixBlock[positionX][positionY];

	// if the block is not already hit	
	if(appBlock != null){
		return true;
	}
	
	return false;
}

// function to update the score
function updateScore(point){
	score += point;
	document.getElementById("scores").innerHTML = "Level: "+level+ " &nbsp; 		&nbsp;   &nbsp; Score: "+score;
	stopGame();
}

// function to stop the game
function stopGame(){
	if(destroyBricks == totalBricks ){

		if(level == maxLevel){
			ballDirY = 0;
			ballDirX = 0;
			document.getElementById("scores").innerHTML = "WINNER  -  Score: " + score;
		}
		else{
			resetBall(0);
			document.getElementById("scores").innerHTML = "LEVEL " + level;
		}
	}
	
} 

// function to reset game
function resetAll(){
	
	score = 0;
	level = 0;
	for(var j=0;j<numBlock;j++){
		for(i=0;i<dimensionMatrixBlock;i++){
			scene.remove(matrixBlock[i][j]);
		}
	}
	resetBall(0);
	
	document.getElementById("scores").innerHTML = "Level: "+level+ " &nbsp; 		&nbsp;   &nbsp; Score: "+score;

}

// function to change level
function nextLevel(){
	
	score = 0;
	for(var j=0;j<numBlock;j++){
		for(i=0;i<dimensionMatrixBlock;i++){
			scene.remove(matrixBlock[i][j]);
		}
	}
	resetBall(0);
	
	document.getElementById("scores").innerHTML = "Level: "+level+ " &nbsp; 		&nbsp;   &nbsp; Score: "+score;

}


