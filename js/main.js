/** set base columns **/
const columns = 80;

/** set base rows **/
const rows = 10;

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
			row: function (map, column) {
				/** attempt to find tile **/
				var t = map.getRandomRow(column);
				/** return the found tile if it is usable otherwise recall **/
				return t && t.canUseTile ? t : this.row(map, column);	
			}
		},
		linear: {
			row: function (map, column, row) {
				/** attempt to find tile **/
				var t = map.getTile(column, row);
				/** return if tile was returned as false (assumed out of length) **/
				if (!t) return false;
				/** return the found tile if it is usable otherwise recall **/
				return t && t.canUseTile ? t : this.row(map, column, (row + 1));	
			}
		}
	},
	path: {
		random: {
			attempts: 0,
			get: function (pathClass, startColumn, targetColumn, limit, attempts) {
				/** set base limit for limit break **/
				if (limit === undefined) limit = 5;
				/** confirm that limit was reached and exit recursion **/
				if (this.attempts === limit) return false;
				/** get tile from random row selection **/
				var s = init.tile.random.row(pathClass, startColumn);
				/** get tile from random row selection **/
				var t = init.tile.random.row(pathClass, targetColumn);
				/** attempt to get path from start to finish **/
				var p = pathClass.getPath(s, t);
				/** incriment attempt counter **/
				this.attempts = this.attempts + 1;
				/** print to console the attempt count for debugging */
				if (attempts) console.log(this.attempts);
				/** return path if found otherwise recall **/
				return p ? p : this.get(pathClass, startColumn, targetColumn, limit, attempts);
			}
		},
		linear: {
			attempts: 0,
			get: function (pathClass, startColumn, startRow, targetColumn, targetRow, limit) {
				/** set base limit for limit break **/
				if (limit === undefined) limit = 5;
				/** confirm that limit was reached and exit recursion **/
				if (this.attempts === limit) return false;
				/** get tile from linear row selection **/
				var s = init.tile.linear.row(pathClass, startColumn, startRow);
				/** return false if starting tile not found **/
				if (!s) return false;
				/** iterate over target column rows **/
				for (var i = targetRow, len = pathClass.map[targetColumn].length; i < len; i++) {
					/** get tile from linear row selection **/
					var t = init.tile.linear.row(pathClass, targetColumn, i);
					/** return false if target tile not found **/
					if (!t) return false;
					/** attempt to find path from map **/
					var x = pathClass.getPath(s, t);
					/** **/
					if (x) return x;
				}
				/** **/
				this.attempts = this.attempts + 1;
				/** **/
				this.get(pathClass, startColumn, s.row, targetColumn, targetRow, limit);
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

var path1 = init.path.random.get(new Path(collisions.__this__()), 0, (collisions.map.length - 1));

var path2 = init.path.linear.get(new Path(collisions.__this__()), 0, 0, (collisions.map.length - 1), 0, collisions.map[0].length);

init.draw.path(paths, path1, "rgba(0, 0, 255, 0.3)")

init.draw.path(paths, path2, "rgba(255, 0, 0, 0.3)")
