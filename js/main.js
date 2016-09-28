/** set base columns **/
const columns = 60;

/** set base rows **/
const rows = 20;

/** set base tile scale **/
const scale = 20;



/** set grid base **/
const grid = new Grid({ columns: columns, rows: rows, scale: scale });

/** set map environment **/
const base = new Canvas(Object.assign(grid.__this__(), { attr: { id: "map", style: "position: absolute; z-index: 0;"} }));

/** set collision environment **/
const objects = new Canvas(Object.assign(grid.__this__(), { attr: { id: "objects", style: "position: absolute; z-index: 1;"} }));

/** set path environment **/
const paths = new Canvas(Object.assign(grid.__this__(), { attr: { id: "paths", style: "position: absolute; z-index: 2;"} }));

/** set stage environment **/
const stage = new Canvas(Object.assign(grid.__this__(), { attr: { id: "stage", style: "position: absolute; z-index: 3;"} }));


/** set map tiles **/
const map = new Tiles(Object.assign(grid.__this__(), { class: MapTile }));
/** get map tiles **/
map.getTiles(function (tile) {
	/** get all quarters **/
	var quarters = tile.getOutsideQuarters();
	/** draw quarter tiles **/
	base.drawGeometry("fill", quarters.q1.left, quarters.q1.top, quarters.q1.width, quarters.q1.height, { fillStyle: Canvas.RGB(Canvas.INT(80, 100), Canvas.INT(180, 200), Canvas.INT(80, 100)) })
	base.drawGeometry("fill", quarters.q2.left, quarters.q2.top, quarters.q2.width, quarters.q2.height, { fillStyle: Canvas.RGB(Canvas.INT(80, 100), Canvas.INT(180, 200), Canvas.INT(80, 100)) })
	base.drawGeometry("fill", quarters.q3.left, quarters.q3.top, quarters.q3.width, quarters.q3.height, { fillStyle: Canvas.RGB(Canvas.INT(80, 100), Canvas.INT(180, 200), Canvas.INT(80, 100)) })
	base.drawGeometry("fill", quarters.q4.left, quarters.q4.top, quarters.q4.width, quarters.q4.height, { fillStyle: Canvas.RGB(Canvas.INT(80, 100), Canvas.INT(180, 200), Canvas.INT(80, 100)) })
});


/** set collision tiles **/
const collisions = new Tiles(Object.assign(grid.__this__(), { class: MapTile, config: {  } }));
/** get collision tiles **/
collisions.getTiles(function (tile) {
	/** confirm that tile can be used **/
	if (!tile.canUseTile) {
		/** get all quarters **/
		var quarters = tile.getOutsideQuarters();
		/** draw quarter tiles **/
		objects.drawGeometry("fill", quarters.q1.left, quarters.q1.top, quarters.q1.width, quarters.q1.height, { fillStyle: Canvas.RGB(Canvas.INT(190, 220), Canvas.INT(80, 110), Canvas.INT(80, 110)) })
		objects.drawGeometry("fill", quarters.q2.left, quarters.q2.top, quarters.q2.width, quarters.q2.height, { fillStyle: Canvas.RGB(Canvas.INT(190, 220), Canvas.INT(80, 110), Canvas.INT(80, 110)) })
		objects.drawGeometry("fill", quarters.q3.left, quarters.q3.top, quarters.q3.width, quarters.q3.height, { fillStyle: Canvas.RGB(Canvas.INT(190, 220), Canvas.INT(80, 110), Canvas.INT(80, 110)) })
		objects.drawGeometry("fill", quarters.q4.left, quarters.q4.top, quarters.q4.width, quarters.q4.height, { fillStyle: Canvas.RGB(Canvas.INT(190, 220), Canvas.INT(80, 110), Canvas.INT(80, 110)) })
	}
});









/*** SOMETIMES YOU ARE SEEING A FALSE NEGATIVE . FETCH TILES CAN BE SET TO USED TILES THEREFORE RETURNING NO PATH **/
var path = new Path(collisions.__this__());

var s = path.getTile(0, 0);
var e = path.getTile(59, 5);


/** path needs to be asserted **/


var p = path.assert(s, e);

if (p) {
	var myVar = setInterval(function(){ myTimer() }, 00);
	function myTimer() {
	    if (p.length) {
	    	var t = p.shift();

	    	paths.drawGeometry("fill", t.x, t.y, t.width, t.height, {fillStyle: "gray"});

			paths.drawFillText(t.x, t.y + t.halfHeight, t.heuristic, "normal 10px/normal sans-serif", {fillStyle: "black"});

			
		    paths.drawGeometry("fill", s.x, s.y, s.width, s.height, {fillStyle: "rgba(255, 255, 0, 1)"});

			paths.drawGeometry("fill", e.x, e.y, e.width, e.height, {fillStyle: "rgba(0, 255, 255, 1)"});


	    }
	    else {
	    	clearTimer(myVar);
	    }
	}
	function clearTimer (instance) {
	    clearInterval(instance);

	    var character = new Character(Object.assign(path.__this__(), { column: 0, row: 0 }))

		keyframe.start(function () {

		stage.drawGeometry("clear", character.x, character.y, character.width, character.height)
	
		character.p(path)

		stage.drawGeometry("fill", character.x, character.y, character.width, character.height, {fillStyle: "pink"})

});


	}
}






