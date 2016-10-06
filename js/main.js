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

	grid: {},

	path: {
		fetch: function (config) {
			/** confirm config is defined **/
			if (!config || !config.path || !config.type) return false;
			/** set path search method default **/
			config.type = this.method[config.type] || this.method.dptp;
			/** set start tile object **/
			config.start = config.a || config.s || config.start || false;
			/** set target tile object **/
			config.target = config.b || config.t || config.target || false;
			/** confirm start and target was not defined **/
			if (!config.start || !config.target) return false;
			/** set tile for start **/
			config.start = config.path.getTile(config.start.column, config.start.row);
			/** set tile for target **/
			config.target = config.path.getTile(config.target.column, config.target.row);
			/** set path attempt to handler **/
			return config.type(config);
		},
		method: {
			direct: function (config) {
				  /*******************************************************************************************/
				 /** function will attempt to find path once from supplied start and target grid reference **/
				/*******************************************************************************************/
				/** confirm path requirement are defined **/
				if (!config.start || !config.target) return false;
				/** cache path **/
				var p = config.path;
				/** set start tile **/
				var s = config.start;
				/** set target tile **/
				var t = config.target;
				/** confirm whether both tiles found **/
				if (!s || !t) return false;
				/** fetch path from defined point to target **/
				return p.getPath(s, t);
			},
			adjustStart: function (config) {
				  /***********************************************************************************************/
				 /** function will try path to target from initial starting tile before changing starting tile **/
				/***********************************************************************************************/
				/** confirm path requirement are defined **/
				if (!config.start || !config.target) return false;
				/** cache path **/
				var p = config.path;
				/** set start tile **/
				var s = config.start;
				/** set target tile **/
				var t = config.target;
				/** set find path recursive caller **/
				var f = function (path, start, target) {
					/** confirm that start tile was found and that the recursion count has not reach the limit of available column rows **/
					if (start && ((start.row + 1) !== start.rows)) {
						/** attempt to find path and store result **/
						var r = path.getPath(start, target);
						/** return result or recursively call function, incrementing row by 1 for the starting position **/
						return r ? r : f(path, path.getTile(start.column, start.row + 1), target);
					}
				};
				/** fetch path from defined point to target **/
				return f(p, s, t);
			},
			adjustTarget: function (config) {
				  /*********************************************************************************************/
				 /** function will try path to target from initial starting tile before changing target tile **/
				/*********************************************************************************************/
				/** confirm path requirement are defined **/
				if (!config.start || !config.target) return false;
				/** cache path **/
				var p = config.path;
				/** set start tile **/
				var s = config.start;
				/** set target tile **/
				var t = config.target;
				/** set find path recursive caller **/
				var f = function (path, start, target) {
					/** confirm that start tile was found and that the recursion count has not reach the limit of available column rows **/
					if (target && ((target.row + 1) !== target.rows)) {
						/** attempt to find path and store result **/
						var r = path.getPath(start, target);
						/** return result or recursively call function, incrementing row by 1 for the starting position **/
						return r ? r : f(path, start, path.getTile(target.column, target.row + 1));
					}
				};
				/** fetch path from defined point to target **/
				return f(p, s, t);
			}
		}
	},
	
	draw: {
		path: function (config) {
			/** confirm config object has required attributes **/
			if (!config || !config.canvas || !config.path) return;
			/** set default drawing style if undefined **/
			config.style = config.style || { fillStyle: "rgba(255, 255, 0, 0.5)" };
			/** cache canvas **/
			var c = config.canvas;
			/** iterate over path **/
			for (var i = 0, len = config.path.length, tiles = config.path; i < len; i++) {
				/** cache tile **/
				var t = tiles[i];
				/** draw tile to supplied canvas **/
				c.drawGeometry("fill", t.x, t.y, t.width, t.height, config.style);
			}
			/** confirm that callback was supplied **/
			if (config.callback) config.callback();
		}
	}
};

var path = new Path(collisions.__this__());

var t = init.path.fetch({ path: path, type: "adjustTarget", s: { column: 0, row: 0 }, t: { column: 79, row: 0 } });

if (t) init.draw.path({ canvas: paths, path: t, style: { fillStyle: "rgba(255,255,0,0.5)" }})


/*
var path1 = init.path.random.get(new Path(collisions.__this__()), 0, (collisions.map.length - 1));

init.draw.path({ canvas: paths, path: path1, style: { fillStyle: "rgba(0, 0, 255, 1)" }});

var path2 = init.path.linear.get(new Path(collisions.__this__()), 0, 0, (collisions.map.length - 1), 0, collisions.map[0].length);

init.draw.path({ canvas: paths, path: path2, style: { fillStyle: "rgba(255, 0, 0, 1)" }});
*/

/*
var p = new Path(collisions.__this__());

var s = p.getTile(0, 0);
var t = p.getTile(79, 0);

var z = p.getPath(s, t);

if (z) init.draw.path({ canvas: paths, path: z });
*/
