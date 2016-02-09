var GAME_MANU = 0;
var GAME_PLAYING = 1;
var GAME_PAUSED = 2;
var GAME_OVER = 3;
var BLOCK_SIZE = 24;

var Game = function(){
	this.state = 0;
	this.score = 0;
	this.width = 12;
	this.height = 20;
	this.next_i = 0;
	this.current_i = 0;
	this.pos_x = 4;
	this.pos_y = 0;
	this.faster = 1000;
	
	this.current_color_i = 0;
	this.color = ['cell',
		'cell-white',
		'cell-red',
		'cell-blue',
		'cell-orange',
		'cell-yellow',
		'cell-purple',
		'cell-green',
		'cell',
		'cell-white',
		'cell-red',
		'cell-blue',
		'cell-orange',
		'cell-yellow',
		'cell-purple',
		'cell-green'];
		
	// grid
	this.grid = new Array(this.width*this.height);
	for(var i=0;i<this.grid.length;i++){
		this.grid[i] = 0;
	}
	// shapes
	this.shapes = new Array(
	[1,1,1,  // J
	 0,0,1,
	 0,0,0],
	 
	[1,1,1,  // L
	 1,0,0,
	 0,0,0],
	 
	[1,1,0,  // 0
	 1,1,0,
	 0,0,0], 
	 
	[0,1,0,  // I
	 0,1,0,
	 0,1,0],
	 
	[1,1,0,  // Z
	 0,1,1,
	 0,0,0],
	 
	[0,1,1,  // S
	 1,1,0,
	 0,0,0],
	 
	[0,1,0,  // T
	 1,1,1,
	 0,0,0]);
	 
	this.current_shape = [0,0,0,
  0,0,0,
  0,0,0];
	// collision		  
	this.collision = function(){
		
	};
	
	// copy from shape into current_shape
	this.copy = function(shape_index){
		for(var i=0;i<9;i++) this.current_shape[i] = this.shapes[shape_index][i];
	};
	
	this.past = function(){
		
	};
	
	this.rotate_left = function(){
		
	};
	
	this.rotate_right = function(){
		
	};
	
	// initialize
	this.inialize = function(){
		$("#Screen").css({
				"width":this.width * BLOCK_SIZE + "px",
				"height":this.height * BLOCK_SIZE + "px" 
			}
		);
		this.grid = new Array(this.width* this.height);
		for(var i=0;i<this.grid.length;i++){
			this.grid[i] = 0;
		}
		var str="";
		for(var i=0;i<this.grid.length;i++){
			str+="<div id='cell"+i+"' class='cell'></div>";
		}
		$("#Screen").html(str);
		this.state = GAME_MENU;
		$("#Menu").show();
		$("#Paused").hide();
		$("#GameOver").hide();
	};
	
	this.draw_frame = function(){
		if(this.state == GAME_MENU){
			$("#Paused, #GameOver").hide();
			$("#Menu").show();
		}else if(this.state == GAME_PLAYING){
			$("#Menu, #Paused, #GameOver").hide();
		}else if(this.state == GAME_PAUSED){
			$("#Menu, #GameOver").hide();
			$("#Paused").show();
		}else if(this.state == GAME_OVER){
			$("#Menu, #Paused").hide();
			$("#GameOver").show();
		}
		
	};
	this.next = function(){
		
	};
	this.pause = function(){
		this.state = GAME_PAUSED;
	};
	this.unpause = function(){
		this.state = GAME_PLAYING;
	};
};

var g = new Game();

$(document).ready(function(){
	g.inialize();
});

