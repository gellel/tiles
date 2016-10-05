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


var init = {
	tile: {
		random: {
			attempts: 0,
			row: function (map, column, attempts) {
				/** incriment attempt counter **/
				this.attempts = this.attempts + 1;
				/** attempt to find tile **/
				var t = map.getRandomRow(column);
				/** print to console the attempt count for debugging */
				if (attempts) console.log(this.attempts);
				/** return the found tile if it is usable otherwise recall **/
				return t && t.canUseTile ? t : this.row(map, column);
			}
		},
		path: {
			attempts: 0,
			get: function (map, start, target, limit, attempts) {
				/** confirm that limit of checks has not been acheived **/
				if (this.attempts === (limit || 3)) return false;
				/** attempt to plot path **/
				var p = new Path(map.__this__()).getPath(init.tile.random.row(collisions, start), init.tile.random.row(collisions, target));
				/** incriment attempt counter **/
				this.attempts = this.attempts + 1;
				/** print to console the attempt count for debugging */
				if (attempts) console.log(this.attempts);
				/** return the found path if it was plotted **/
				if (p) return p;
				/** recall function if path not achieved **/
				this.get(map, start, target, limit, attempts);
			}
		}
	},
	draw: {
		path: function (canvas, path, fillStyle) {
			/** confirm that canvas and path were supplied **/
			if (!canvas || !path) return false;
			/** set base fill style for illustration **/
			if (!fillStyle) fillStyle = "rgba(255, 255, 0, 0.5)";
			/** iterate over path length until element is drawn **/
			for (var i = 0; i < path.length; i++) {
				/** draw tile to supplied canvas **/
				canvas.drawGeometry("fill", path[i].x, path[i].y, path[i].width, path[i].height, {fillStyle: fillStyle});
			}
		}
	}
};



init.draw.path(paths, init.tile.path.get(collisions, 0, collisions.map.length - 1, 3, true))
