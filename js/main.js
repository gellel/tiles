/** set base columns **/
const columns = 160;

/** set base rows **/
const rows = 60;

/** set base tile scale **/
const scale = 10;



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

var s = path.getRandomTile();
var e = path.getRandomTile();


if (s && e) {
	var path_to = path.getPath(s, e, true);

	if (path_to) {

		var search = path.search(e, function (tile) { if (tile.column === s.column && tile.row === s.row) return true; });

		function fill_tiles () {
			if (search.length) {
				var t = search.shift();
				paths.drawGeometry("fill", t.x, t.y, t.width, t.height, {fillStyle: "gray"});
				paths.drawFillText(t.x, t.y + t.halfHeight, t.heuristic, "normal 8px/normal sans-serif", {fillStyle: "black"});
			    paths.drawGeometry("fill", s.x, s.y, s.width, s.height, {fillStyle: "rgba(255, 255, 0, 1)"});
				paths.drawGeometry("fill", e.x, e.y, e.width, e.height, {fillStyle: "rgba(0, 255, 255, 1)"});
			}
			else {
				clearInterval(fill_interval);

				for (var i = 0; i < path_to.length; i++) {
					paths.drawGeometry("fill", path_to[i].x,  path_to[i].y,  path_to[i].width,  path_to[i].height, {fillStyle:"cyan"});
				}

				var character = new Character(Object.assign(path.__this__(), { column: s.column, row: s.row, speed: 2, plotted: path_to }));

				keyframe.start(function () {

					stage.drawGeometry("clear", character.x, character.y, character.width, character.height);

					character.c();

					stage.drawGeometry("fill", character.x, character.y, character.width, character.height, {fillStyle: "pink"});
				});
			}
		}
		var fill_interval = setInterval(function () { fill_tiles(); }, 20);

		
	}
}






