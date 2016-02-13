// Reference :https://www.youtube.com/watch?v=uj7GztZs6nY
//            http://jsfiddle.net/gregsidelnikov/q72d57cy/38/
//            http://jsfiddle.net/gregsidelnikov/f3ew7cpd/1/

var GAME_MENU = 0;
var GAME_PLAYING = 1;
var GAME_PAUSED = 2;
var GAME_OVER = 3;
var BLOCK_SIZE = 24;

var Game = function(){
	this.state = 0;
	this.score = 0;
	this.width = 12;
	this.height = 20;
	this.current_i = 0;
	this.pos_x = 4;
	this.pos_y = 0;
	this.faster = 1000;
	
	this.current_color_i = 0;
	this.colors = ['cell', 'cell-white','cell-red','cell-blue',
		'cell-orange','cell-yellow','cell-purple','cell-green',
		'cell','cell-white','cell-red','cell-blue',
		'cell-orange','cell-yellow','cell-purple','cell-green'];
		
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

	this.next_i = Math.floor(Math.random() * this.shapes.length);

	// collision
	this.left_allow = true;
	this.right_allow = true;

	this.collision = function(){
		var grid_index = this.width * this.pos_y + this.pos_x;
		for(var h=0;h<3;h++, grid_index+=this.width-3){	
			var ci =3*h	
			for(var w=0;w<3;w++, grid_index++){
				var state = this.current_shape[ci++];
				var solid = false;

				//
				this.grid[grid_index+this.width]==

				// hit the bottom
				if(state === 1 && grid_index >= (this.width* this.height)-this.width){
					this.paste(this.current_color_i +8);	
					this.pos_y = 0;
					this.pos_x = this.width/2;				
					return;
				}

				if(state ==i && solid){

				}
			}
		}
	};
	
	// copy from shape into current_shape
	this.copy = function(shape_index){
		for(var i=0;i<9;i++) this.current_shape[i] = this.shapes[shape_index][i];
	};
	
	this.paste = function(fill_value){
		var grid_index = this.width * this.pos_y + this.pos_x;

		for(var h=0;h<3;h++, grid_index+=this.width-3){	
			var ci =3*h	
			for(var w=0;w<3;w++, grid_index++){
				var solid = this.current_shape[ci++];
				if(solid === 1){
					this.grid[grid_index] = fill_value;
				}
			}
		}
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
	
	this.start_game = function(){
		this.grid = new Array(this.width* this.height);
		for(var i=0;i<this.grid.length;i++){
			this.grid[i] = 0;
		}
		this.score = 0;
		this.next();
	};

	this.draw_frame = function(){
		if(this.state == GAME_MENU){
			$("#Paused, #GameOver").hide();
			$("#Menu").show();
		}else if(this.state == GAME_PLAYING){
			$("#Menu, #Paused, #GameOver").hide();
			

			this.collision();
			for(var i=0;i<this.grid.length;i++){
				if(g.grid[i] >= 1 && this.grid[i] <=7){
					this.grid[i]=0;
				}
			}

			this.paste(this.current_color_i);

			for(var i=0;i<this.grid.length;i++){
				var ccix = this.grid[i];
				$("#cell"+i).attr("class",this.colors[ccix]);
			}

		}else if(this.state == GAME_PAUSED){
			$("#Menu, #GameOver").hide();
			$("#Paused").show();
		}else if(this.state == GAME_OVER){
			$("#Menu, #Paused").hide();
			$("#GameOver").show();
		}
		
	};
	this.next = function(){
		this.current_i = this.next_i;
		this.copy(this.current_i);
		this.next_i = Math.floor(Math.random() * this.shapes.length);
		this.pos_x = (this.width/2)-1;
		this.current_color_i = Math.floor(Math.random()*(this.colors.length/2));
		if(this.current_color_i == 0){
			this.current_color_i=1;
		}else if(this.current_color_i >= 7 ){
			this.current_color_i=7;
		}
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
	$("#play").on("click",function(){
		g.state = GAME_PLAYING;
		g.start_game();
	});
	g.inialize();
	setInterval(function(){
		if(g.state === GAME_PLAYING){
			g.pos_y++;
		}
	},300);

	setInterval(function(){
		g.draw_frame();
	},1);

});

