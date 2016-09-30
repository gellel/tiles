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


var numCharacters = 50;
var allCharacters = [];


for (var i = 0; i < numCharacters; i++) {

	var path = new Path(collisions.__this__());
	var start = path.getRandomTile();
	var target = path.getRandomTile();

	if (start && target) {

		var path_exists = path.find(start, target);

		if (path_exists) {

			var plotted = path.getPath(start, target);
			var character = new Character(Object.assign(path.__this__(), { column: start.column, row: start.row, speed: 2, plotted: plotted }));

			allCharacters.push({start: start, target: target, path: plotted, character: character});
		}
	}
}

for (var i = 0; i < allCharacters.length; i++) {

	paths.drawGeometry("fill", allCharacters[i].start.x, allCharacters[i].start.y, allCharacters[i].start.width, allCharacters[i].start.height, {fillStyle:"yellow"});
	paths.drawGeometry("fill", allCharacters[i].target.x, allCharacters[i].target.y, allCharacters[i].target.width, allCharacters[i].target.height, {fillStyle:"cyan"});
	for (var j = 0; j < allCharacters[i].path.length; j++) {
		paths.drawGeometry("fill", allCharacters[i].path[j].x, allCharacters[i].path[j].y, allCharacters[i].path[j].width, allCharacters[i].path[j].height, {fillStyle:"rgba(255,255,0,0.5)"})
	}
};

keyframe.start(function () {
	for (var i = 0; i < allCharacters.length; i++) {
		stage.drawGeometry("clear", allCharacters[i].character.x, allCharacters[i].character.y, allCharacters[i].character.width, allCharacters[i].character.height, {fillStyle:"orange"});
		allCharacters[i].character.c();
		stage.drawGeometry("fill", allCharacters[i].character.x, allCharacters[i].character.y, allCharacters[i].character.width, allCharacters[i].character.height, {fillStyle:"orange"});
	}
})
console.log(allCharacters)

/**
function fill_tiles () {
	if (asserted.length) {
		var t = asserted.shift();
		paths.drawGeometry("fill", t.x, t.y, t.width, t.height, {fillStyle: "gray"});
		paths.drawFillText(t.x, t.y + t.halfHeight, t.heuristic, "normal 10px/normal sans-serif", {fillStyle: "black"});
	    paths.drawGeometry("fill", s.x, s.y, s.width, s.height, {fillStyle: "rgba(255, 255, 0, 1)"});
		paths.drawGeometry("fill", e.x, e.y, e.width, e.height, {fillStyle: "rgba(0, 255, 255, 1)"});
	}
	else {
		clearInterval(fill_interval);
	}
}

var fill_interval = setInterval(function () { fill_tiles(); }, 100);
**/





