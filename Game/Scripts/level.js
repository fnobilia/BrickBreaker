// JavaScript Document

/**
 * Created by Silvia Fortunato, Nazzareno Marziale, Francesco Nobilia
 */

// function to create a line at depth * block height for level 1
function createLineLevel1(){
	resetCounter(5);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){

		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		createLine(depth,new Array(0),0,new Array(0));
	}
}

// function to create a line at depth * block height for level 2
function createLineLevel2(){

	resetCounter(5);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){
	
		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		var arrayOdd = new Array(0);
		var arrayEven = new Array(0);

		for(var i=0; i<numBlock; i++){
			if(i%2 == 0)	arrayEven.push(i);
			else	arrayOdd.push(i);
		}

		if(depth % 2 == 0){
			createLine(depth,arrayOdd,0,new Array(0));
		}
		else{
			createLine(depth,arrayEven,1,new Array(0));	
		}

	}
}

// function to create a line at depth * block height for level 3
function createLineLevel3(){

	resetCounter(7);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){
	
		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		if((depth == 0) || (depth == (dimensionMatrixBlock-1))){
			createLine(depth,new Array(0),0,new Array(0));
		}
		else if((depth == 1) || (depth == (dimensionMatrixBlock-2))){
			var array = new Array(0);
			for(i=0;i<numBlock;i++)	if((i!=0) && (i!=(numBlock-1)))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}
		else{
			var array = new Array(0);
			for(i=0;i<numBlock;i++)	if((i==1) || (i==(numBlock-2)))	array.push(i);
			createLine(depth,array,0,new Array(0));	
		}

	}
}

// function to create a line at depth * block height for level 4
function createLineLevel4(){
	resetCounter(12);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){
	
		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		var array = new Array(0);

		if((depth == 0) || (depth == (dimensionMatrixBlock-1))){
			array.push(3);array.push(4);array.push(7);array.push(8);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 1) || (depth == (dimensionMatrixBlock-2))){
			array.push(2);array.push(3);array.push(5);array.push(6);array.push(8);array.push(9);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 2) || (depth == (dimensionMatrixBlock-3))){
			array.push(1);array.push(2);array.push(4);array.push(5);array.push(6);array.push(7);array.push(9);array.push(10);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 3) || (depth == (dimensionMatrixBlock-4))){
			for(i=0;i<numBlock;i++)	if((i!=2) && (i!=5) && (i!=6) && (i!=9))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 4) || (depth == (dimensionMatrixBlock-5))){
			for(i=0;i<numBlock;i++)	if((i!=1) && (i!=4) && (i!=7) && (i!=10))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 5) || (depth == (dimensionMatrixBlock-6))){
			for(i=0;i<numBlock;i++)	if((i!=0) && (i!=3) && (i!=5) && (i!=6) && (i!=8) && (i!=11))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}

	}
}

// function to create a line at depth * block height for level 5
function createLineLevel5(){
	resetCounter(12);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){
	
		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		var array = new Array(0);

		if((depth == 0) || (depth == (dimensionMatrixBlock-1))){
			for(i=0;i<numBlock;i++)	if((i!=3) && (i!=4) && (i!=7) && (i!=8))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 1) || (depth == (dimensionMatrixBlock-2))){
			for(i=0;i<numBlock;i++)	if((i!=2) && (i!=3) && (i!=5) && (i!=6) && (i!=8) && (i!=9))	array.push(i);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 2) || (depth == (dimensionMatrixBlock-3))){
			array.push(0);array.push(3);array.push(8);array.push(11);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 3) || (depth == (dimensionMatrixBlock-4))){
			array.push(2);array.push(5);array.push(6);array.push(9);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 4) || (depth == (dimensionMatrixBlock-5))){
			array.push(1);array.push(4);array.push(7);array.push(10);
			createLine(depth,array,0,new Array(0));
		}
		else if((depth == 5) || (depth == (dimensionMatrixBlock-6))){
			array.push(0);array.push(3);array.push(5);array.push(6);array.push(8);array.push(11);
			createLine(depth,array,0,new Array(0));
		}

	}
}

// function to create a line at depth * block height for level 6
function createLineLevel6(){

	resetCounter(12);

	for(var depth=0; depth<dimensionMatrixBlock; depth++){
	
		matrixBlock[depth] = new Array(numBlock);
		matrixBlockHit[depth] = new Array(numBlock);

		var array = new Array(0);

		if((depth == 0) || (depth == (dimensionMatrixBlock-1))){
			var arrayDouble = new Array(0);
			for(i=0;i<numBlock;i++){
				if((i!=3) && (i!=4) && (i!=7) && (i!=8)){
					array.push(i);
					arrayDouble.push(0);
				}
				else{
					arrayDouble.push(getRandomValue());
				}
				
			}
			createLine(depth,array,0,arrayDouble);
		}
		else if((depth == 1) || (depth == (dimensionMatrixBlock-2))){
			var arrayDouble = new Array(0);
			for(i=0;i<numBlock;i++){
				if((i!=2) && (i!=3) && (i!=5) && (i!=6) && (i!=8) && (i!=9)){
					array.push(i);
					arrayDouble.push(0);
				}
				else{
					arrayDouble.push(getRandomValue());
				}
			}	
			createLine(depth,array,0,arrayDouble);
		}
		else if((depth == 2) || (depth == (dimensionMatrixBlock-3))){
			array.push(0);array.push(3);array.push(8);array.push(11);
			var arrayDouble = new Array(0);
			for(i=0; i<numBlock; i++)	arrayDouble.push(getRandomValue());
			createLine(depth,array,0,arrayDouble);
		}
		else if((depth == 3) || (depth == (dimensionMatrixBlock-4))){
			array.push(2);array.push(5);array.push(6);array.push(9);
			var arrayDouble = new Array(0);
			for(i=0; i<numBlock; i++)	arrayDouble.push(getRandomValue());
			createLine(depth,array,0,arrayDouble);
		}
		else if((depth == 4) || (depth == (dimensionMatrixBlock-5))){
			array.push(1);array.push(4);array.push(7);array.push(10);
			var arrayDouble = new Array(0);
			for(i=0; i<numBlock; i++)	arrayDouble.push(getRandomValue());
			createLine(depth,array,0,arrayDouble);
		}
		else if((depth == 5) || (depth == (dimensionMatrixBlock-6))){
			array.push(0);array.push(3);array.push(5);array.push(6);array.push(8);array.push(11);
			var arrayDouble = new Array(0);
			for(i=0; i<numBlock; i++)	arrayDouble.push(getRandomValue());
			createLine(depth,array,0,arrayDouble);
		}

	}

}

