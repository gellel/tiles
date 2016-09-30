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

var path_to = path.getPath(s, e);

console.log(path_to);

if (path_to) {
	for (var i = 0; i < path_to.length; i++) {
		paths.drawGeometry("fill", path_to[i].x,  path_to[i].y,  path_to[i].width,  path_to[i].height, {fillStyle:"cyan"});
	}
}






