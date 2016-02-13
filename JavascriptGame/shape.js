function RootShape(){}
RootShape.prototype.POSITION_X = 0;
RootShape.prototype.POSITION_Y = 1;
RootShape.prototype.TOTAL_BLOCKS_NUMBER = 4;

RootShape.prototype.SHAPE_FACE_EAST = 0;
RootShape.prototype.SHAPE_FACE_SOUTH = 1;
RootShape.prototype.SHAPE_FACE_WEST = 2;
RootShape.prototype.SHAPE_FACE_NORTH = 3;

RootShape.prototype.I_SHAPE_ID = 0;
RootShape.prototype.J_SHAPE_ID = 1;
RootShape.prototype.L_SHAPE_ID = 2;
RootShape.prototype.O_SHAPE_ID = 3;
RootShape.prototype.S_SHAPE_ID = 4;
RootShape.prototype.T_SHAPE_ID = 5;
RootShape.prototype.Z_SHAPE_ID = 6;
RootShape.prototype.SHAPE_TYPE_NUMBER = 7;

function RootShapeInitialize(rootShapeObj){
	rootShapeObj.centerBlockIndex = -1;
	rootShapeObj.shapePosition = new Array(RootShape.prototype.TOTAL_BLOCKS_NUMBER);
	for(var i=0;i<RootShape.prototype.TOTAL_BLOCKS_NUMBER;i++){
		rootShapeObj.shapePosition[i] = new Array(2);
	}
	rootShapeObj.shapeFaceTo = RootShape.prototype.SHAPE_FACE_EAST;
}






