/** set base columns **/
const columns = 140;

/** set base rows **/
const rows = 80;

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


function set (grid, tile, start, target) {
	var t = { start: tile.getRandomRow(start), target: tile.getRandomRow(target) };
	if (!t.start || !t.target) set(grid, tile, start, target);
	var p = new Path(tile.__this__()).getPath(t.start, t.target);
	if (!p) return false;
	return new Character(Object.assign(grid.__this__(), { column: t.start.column, row: t.start.row, path: p, startTile: t.start, targetTile: t.target, speed: 1 }));
}

function draw (character) {
	for (var i = 0; i < character.path.length; i++) {
		paths.drawGeometry("fill", character.path[i].x, character.path[i].y, character.path[i].width, character.path[i].height, {fillStyle: character.tilePathColour})
	}
	paths.drawGeometry("fill", character.startTile.x, character.startTile.y, character.startTile.width, character.startTile.height, {fillStyle: character.tileStartColour });
	paths.drawGeometry("fill", character.targetTile.x, character.targetTile.y, character.targetTile.width, character.targetTile.height, {fillStyle: character.tileTargetColour });

}

var p = set(grid, collisions, 0, (collisions.map.length - 1));

if (p) {
	for (var i = 0; i < p.path.length; i++) {
		paths.drawGeometry("fill", p.path[i].x, p.path[i].y, p.path[i].width, p.path[i].height, {fillStyle: p.tilePathColour})
	}
	paths.drawGeometry("fill", p.startTile.x, p.startTile.y, p.startTile.width, p.startTile.height, {fillStyle: p.tileBaseColour});
	paths.drawGeometry("fill", p.targetTile.x, p.targetTile.y, p.targetTile.width, p.targetTile.height, {fillStyle: "rgb(255,100,0)"});

	keyframe.start(function () {
		stage.drawGeometry("clear", p.x, p.y, p.width, p.height);
		p.c();
		stage.drawGeometry("fill", p.x, p.y, p.width, p.height, {fillStyle: Canvas.RGB(Canvas.INT(), Canvas.INT(), Canvas.INT())});
		if (p.x === p.targetTile.x && p.y === p.targetTile.y) keyframe.abort = true;
	});
}
