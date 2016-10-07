/** set base columns **/
const columns = 80;

/** set base rows **/
const rows = 40;

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
const collisions = new Tiles(Object.assign(grid.__this__(), { class: MapTile, config: {} }));
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



function adjustStartRow (tiles, start, target) {

	var s = tiles.getTileDepthSearch(start.column, start.row);

	var t = tiles.getTile(target.column, target.row);

	if (!s || !t || !t.canUseTile) return false;

	var p = new Path(tiles.__this__());

	var r = p.dpath(s, t);

	if (r) return { path: r, class: p };

	return adjustStartRow(tiles, { column: s.column, row: s.row + 1 }, target);
}

function adjustTargetRow (tiles, start, target) {

	var s = tiles.getTile(start.column, start.row);

	var t = tiles.getTileDepthSearch(target.column, target.row);

	if (!t || !s || !s.canUseTile) return false;

	var p = new Path(tiles.__this__());

	var r = p.dpath(s, t);

	if (r) return { path: r, class: p };

	return adjustTargetRow(tiles, start,  { column: t.column, row: t.row + 1 });
}

function adjustBothRow (tiles, start, target) {

	var s = tiles.getTileDepthSearch(start.column, start.row);

	var t = tiles.getTileDepthSearch(target.column, target.row);

	if (!s || !t) return false;

	var p = new Path(tiles.__this__());

	var r = p.dpath(s, t);

	if (r) return { path: r, class: p };

	return adjustBothRow(tiles, { column: s.column, row: s.row + 1 }, { column: t.column, row: t.row + 1 });
}

function adjustStepPath (tiles, start, target, limit, count) {

	if (!isNaN(count)) count = 0;

	if (limit && limit === count) return false;

	var s = adjustStartRow(tiles, start, target);

	if (s) return s;

	var t = adjustTargetRow(tiles, start, target);

	if (t) return t;

	count = count + 1;

	return adjustStepPath(tiles, { column: start.column, row: start.row + 1 }, { column: target.column, row: target.row + 1 });
}


var sp = adjustStartRow(collisions, { column: 0, row: 0 }, { column: 79, row: 0 })


console.log(sp)

if (sp && sp.path) {

	new Queue(sp.path).process(function (t) {
		paths.drawGeometry("fill", t.x, t.y, t.width, t.height, {fillStyle: "yellow"})
	})
}
//console.log(sp)