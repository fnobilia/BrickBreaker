// JavaScript Document

/**
 * Created by Silvia Fortunato, Nazzareno Marziale, Francesco Nobilia
 */

/**************************************************************************/
/**************************** GLOBAL VARIABLES ****************************/
/**************************************************************************/

// scene object variables
var renderer, scene, camera, pointLight, spotLight, spotLight2;

// Bricks matrix
var matrixBlock;

var switchGame = 1;

// field variables
var fieldWidth = 350, fieldHeight = 240;

// number of row that we draw
var dimensionMatrixBlock = 5;

// number of bricks inside a row
var numBlock = fieldHeight/20;
	
// total brick
var totalBricks = numBlock * dimensionMatrixBlock;

// set the initial value of width and height
// -20 and -10 is need because we put the block according to the centre coordination of a block
var initialWidth = (fieldWidth/2)-15;	
var initialHeight = ((fieldHeight/2)-10);

// set X position from which we can find the blocks
var limitX = (initialWidth+5)-(10*dimensionMatrixBlock);

// matrix to count hit
var matrixBlockHit;

// counter bricks destroyed
var destroyBricks = 0;

// set last line destroy
var lastLineDestroy = -1;

// current level
var level = 1;

// max level
var maxLevel = 6;

// flag to block switch level
var switchLevel = 1;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality, paddlePlayer;
var paddlePlayerDirY = 0;
// set the maximum value of a paddle move in each frame
var paddleSpeed = 5;

// ball variables
var ball;
var ballDirX = 1, ballDirY = 1, ballSpeed = 3;//= 3;
var radius = 5, segments = 6, rings = 6;
// lower 'segment' 'ring' and 'ballSpeed' values will increase performance

// score variables
var score = 0;

/**************************************************************************/
/************************** END GLOBAL VARIABLES **************************/
/**************************************************************************/


/**************************************************************************/
/***************************** GAME FUNCTIONS *****************************/
/**************************************************************************/

// function called from the index page during the load of play area
function setup()
{
	// set up all the 3D objects in the scene	
	createScene();
	
	// call draw function
	draw();
}

// function that instantiates all 3D object
function createScene()
{
	
	document.getElementById("scores").innerHTML = "Level: "+level+ " &nbsp; 		&nbsp;   &nbsp; Score: "+score;
	
	// set the scene size
	var WIDTH = 640, HEIGHT = 560;

	// set camera attributes
	// set the FOV (Field Of View), it's like the wide angle of camera lens.
	//It's like the dimension of cone coming out from the camera, we can see only the objects in this area.
	var VIEW_ANGLE = 50; 
	// set the dimension of the image like 16/9 or 4/3 of TV
	var ASPECT = WIDTH / HEIGHT; 
	// set the distance of closest object
	var NEAR = 0.5;
	// set the distance of the farthest object
	var FAR = 10000;

	// token the div with id gameCanvas
	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer and a scene
	renderer = new THREE.WebGLRenderer();

	// start the renderer according the view size
	renderer.setSize(WIDTH, HEIGHT);

	// to enable an optimization inside GPU to draw custom shadow that is an approximation of real shadow 
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	scene = new THREE.Scene();

	/***************************************************************** CAMERA *****************************************************************/
	// set up camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);	
	
	// set a default position for the camera
	camera.position.x = -300;
	camera.position.y = 0;
	camera.position.z = 400;
	
	// rotate to face towards the opponent
	camera.rotation.y = -30 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;

	// add the camera to the scene
	scene.add(camera);

	// attach the render to HTML document
	c.appendChild(renderer.domElement);
	/*************************************************************** END CAMERA ***************************************************************/
	/******************************************************************************************************************************************/
	/***************************************************************** PLANE ******************************************************************/
	// set up the playing surface plane 
	var planeWidth = fieldWidth, planeHeight = fieldHeight, planeQuality = 10;
		
	// create the plane's material	
	var planeMaterial = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('IMG/table.jpg') } );
		
	// create the playing surface plane
	// 95% of table width, since we want to show where the ball goes out-of-bounds
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth * 0.95,planeHeight,planeQuality,planeQuality),planeMaterial);
	
	// set plane shadow
	plane.castShadow = true;
	plane.receiveShadow = true;	

	// add the plane to the scane  	
	scene.add(plane);
	/*************************************************************** END PLANE ****************************************************************/
	/******************************************************************************************************************************************/
	/***************************************************************** TABLE ******************************************************************/
	// create the table's material
	var tableMaterial = new THREE.MeshLambertMaterial({color: 0x111111});

	// create table where we put the game plane
	// 1.05 is used to leave a margin between the table and the plane
	var table = new THREE.Mesh(new THREE.CubeGeometry(planeWidth * 1.05,planeHeight * 1.15,100,planeQuality,planeQuality,1),tableMaterial);

	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	table.position.z = -51;

	// set the shadow
	table.castShadow = true;
	table.receiveShadow = true;	

	// add table to the scene
	scene.add(table);
	/*************************************************************** END TABLE ****************************************************************/
	/******************************************************************************************************************************************/
	/****************************************************************** BALL ******************************************************************/
	// create the sphere's material
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xD43001});

	// Create a ball with sphere geometry
	ball = new THREE.Mesh(new THREE.SphereGeometry(radius,segments,rings),sphereMaterial);
	
	// set ball above the table surface
	ball.position.x = -((fieldWidth/2)-10);
	ball.position.y = 0;
	ball.position.z = radius;
	ball.castShadow = true;
	ball.receiveShadow = true;

    // add the sphere to the scene
	scene.add(ball);
	/**************************************************************** END BALL ****************************************************************/
	/******************************************************************************************************************************************/
	/***************************************************************** PADDLE *****************************************************************/
	// set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 60;
	paddleDepth = 10;
	paddleQuality = 1;

	// create the paddlePlayer's material
	//var paddlePlayerMaterial = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture('IMG/copper.jpg')});
	var paddlePlayerMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
		
	paddlePlayer = new THREE.Mesh(new THREE.CubeGeometry(paddleWidth,paddleHeight,paddleDepth,paddleQuality,paddleQuality,paddleQuality),paddlePlayerMaterial);

	// set shadow
    paddlePlayer.castShadow = true;
	paddlePlayer.receiveShadow = true;

    // set paddles on each side of the table
	paddlePlayer.position.x = -fieldWidth/2 + paddleWidth;
	
	// lift paddles over playing surface
	paddlePlayer.position.z = paddleDepth;
	
	// add paddle to the scene
	scene.add(paddlePlayer);	  
	/*************************************************************** END PADDLE ***************************************************************/
	/******************************************************************************************************************************************/
	/***************************************************************** GROUND *****************************************************************/
	// create the ground's material
	var groundMaterial = new THREE.MeshLambertMaterial({color: 0x401000});
	
	// finally we finish by adding a ground plane
	var ground = new THREE.Mesh(new THREE.CubeGeometry(1000,1000,3,1,1,1),groundMaterial);
    
    // set z position to show shadow
	ground.position.z = -132;
	ground.castShadow = true;
	ground.receiveShadow = true;	

	// add ground to the scene
	scene.add(ground);		
	/*************************************************************** END GROUND ***************************************************************/
	/******************************************************************************************************************************************/
	/************************************************************** CREATE LEVEL **************************************************************/
	//Create the bricks
	createLineLevel1();
	/************************************************************ END CREATE LEVEL ************************************************************/
	/******************************************************************************************************************************************/
	/****************************************************************** LIGHT *****************************************************************/
	createLight();
    /**************************************************************** END LIGHT ***************************************************************/
}

// function to create a line at depth avoid the index sent as parameters
function createLine(depth,emptyIndex,opposite,doubleHit){

	// index of first block that we don't draw
	var avoid = emptyIndex.shift();
	var doubleFlag;
	
	// set the distance between each block
	spaceBetweenBlock = 10;
	
	// initialization of line array
	matrixBlock[depth] = new Array(numBlock);
	matrixBlockHit[depth] = new Array(numBlock);
	
	for(i=0;i<numBlock;i++){
		doubleFlag = doubleHit.shift();
		
		var color = 0xFF00CD;

		if(i != avoid){
			if(i%2==0){
				if(opposite == 1){
					if(depth%2 != 0)	color = 0xFFF100;
					
				}
				else{
					if(depth%2 == 0)	color = 0xFFF100;
				}
			}
			else{
				if(opposite == 1){
					if(depth%2 == 0)	color = 0xFFF100;
				}
				else{
					if(depth%2 != 0)	color = 0xFFF100;
				}
			}

			if(doubleFlag == 1) color = 0x0022E8;
			
			block = createBlock(initialWidth-(spaceBetweenBlock*depth),initialHeight-(20*i),color);	
			matrixBlock[depth][i] = block;
			matrixBlockHit[depth][i] = doubleFlag;
			if(doubleFlag){
				totalBricks++;	
			}
			totalBricks++;
			scene.add(block);
		}
		else{
			avoid = emptyIndex.shift();
			matrixBlock[depth][i] = null;
			matrixBlockHit[depth][i] = 0;
		}
	}
}

// function to create a block
function createBlock(x,y,col){
	// set up block dimensions
	blockWidth = 10;
	blockHeight = 20;
	blockDepth = 10;
	blockQuality = 1;
	
	// set block material
	var blockMaterial = new THREE.MeshLambertMaterial({color: col});
	
	// create block
	block = new THREE.Mesh(new THREE.CubeGeometry(blockWidth,blockHeight,blockDepth,blockQuality,blockQuality,blockQuality),blockMaterial);
	
	// set block parameters
	block.castShadow = true;
	block.receiveShadow = true;	
	block.position.x = x;
	block.position.y = y;
	block.position.z = 10;
		  
	return block;
}

// function that draw everything
function draw()
{	
	// draw THREE.JS scene
	renderer.render(scene, camera);
	
	// logic of ball
	ballPhysics();

	// logic of paddle
	paddlePhysics();
	switchGameKey();
	paddleLogic(switchGame);

	// loop draw function call
	requestAnimationFrame(draw);
}

// function to reset the ball
function resetBall(loser){
	
	// position the ball in the centre of the table
	ball.position.x = -((fieldWidth/2)-20);
	ball.position.y = 0;
	
	// set the paddle in centre position
	paddlePlayer.position.y=0;
	
	// stop ball
	ballDirY = 0;
	ballDirX = 0;

	if(loser == 1){
		// update scare according to a penalty
		updateScore(-5);
	}
	//charge next level
	else{
		level++;

		if(level > maxLevel){
			level = 1;
		}

		switch(level){
			case 1:
					//Create the bricks
					createLineLevel1();
					break;
			case 2: 
					//Create the bricks
					createLineLevel2();
					break;
			case 3:
					createLineLevel3();
					break;
			case 4:
					createLineLevel4();
					break;
			case 5:
					createLineLevel5();
					break;
			case 6:
					createLineLevel6();
					break;
		}
	}
}

// find the corresponding block according the positions of the ball
function checkPositionBall(positionX, positionY){
	
	//console.log(lastLineDestroy);
	
	// return values
	var matrixX = -1;
	var matrixY = -1;
	var tempRadius = radius - 0.1;
	var flagCenter = false;

	// if the ball direction is positive we search for hit from the centre ball to left limit
	var positionX1 = positionX + tempRadius;
	var positionX2 = positionX - tempRadius;
	
	// if the ball direction is positive we search for hit from the centre ball to left limit
	var positionY1 = positionY + tempRadius;
	// if the ball direction is positive we search for hit from the centre ball to right limit
	var positionY2 = positionY - tempRadius;
	
	//console.log(positionX1 + " " +positionX2 );
	
	// if x position exceeds the limitX we compute the correct line	
	if(positionX1 >= limitX){
		
		
		for(i=1;i<dimensionMatrixBlock+1;i++){
			if(	(positionX1 < limitX+(10*i)) && (positionX1 >= limitX+(10*(i-1))) ||
				(positionX2 <= limitX+(10*i)) && (positionX2 > limitX+(10*(i-1)))
			){
				if((positionX < limitX+(10*i)) && (positionX >= limitX+(10*(i-1))))
					flagCenter = true;
				matrixX = dimensionMatrixBlock-i;
				//console.log(positionX1+"<"+(limitX+(10*i))+"&&"+positionX1+">="+(limitX+(10*(i-1))));
				break;
			}
		}
		

		// set limit Up and Down of line
		var limitLeft = fieldHeight/2, limitRight=limitLeft-20;
		
		for(var j=0;j<numBlock;j++){
			
			//console.log(positionY+" "+limitLeft+" "+limitRight);
			
			var mainCondition = false, condition2 = false, condition1 = false, bounce = false;
			//if(positionY>0){
				if(positionY <= limitLeft && positionY > limitRight) mainCondition = true;
				if(positionY2 <= limitRight) condition2 = true;
				if(positionY1 >= limitLeft) condition1 = true;
			//}
			/*else{
				if(positionY >= limitLeft && positionY < limitRight) mainCondition = true;
				if(positionY2 >= limitRight) condition2 = true;
				if(positionY1 <= limitLeft) condition1 = true;
			}*/
			

			if(mainCondition && matrixX != -1){
				matrixY=j;
				//console.log("MatrixX: "+matrixX);
				
				bounce = findBlock(matrixX,matrixY);
				
				if(bounce){
					break;
				}
				else{
					if(condition2){
						if(j<(numBlock-2)){
							//console.log(j);
							matrixY=j+1;
						}
						break;
					}
					else if(condition1){
						if(j>0){
							//console.log("second "+j);
							matrixY=j-1;
						}
						
						break;
					}
					
				}
				break;
			}
			else{
				// update limits
				limitRight -= 20;
				limitLeft -= 20;
			}
		}	
		
			
		if( matrixX!=-1 && matrixY !=-1 ){
			if(lastLineDestroy != matrixX){
				if (destroyBlock(matrixX, matrixY)){
					// update counter of destroyed blocks
					destroyBricks++;
					lastLineDestroy = matrixX;
					if((condition1)&&(!bounce)&&(flagCenter)){
						ballDirY = -ballDirY;
					}
					else if((condition2)&&(!bounce)&&(flagCenter)){
						ballDirY = -ballDirY;
					}
					else{
						ballDirX = -ballDirX;
					}
					return true;	
				}
			}
		}
	}
	
	lastLineDestroy = -1;

	return false;
	
}
