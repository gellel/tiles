class Path extends Tiles {

	getPath (start, target) {
		  /********************************************************************************/
	 	 /** function for getting precalculated path from start to target without noise **/
		/********************************************************************************/
		/** attempt to get heuristic path **/
		var path = this.find(start, target);
		/** confirm path was found **/
		if (path) {
			/** set heuristic **/
			this.assert(start, target);
			/** set path map for plotted path **/
			var plotted = [];
			/** set queue for finding tiles **/
			var queue = [start];
			/** **/
			while (queue.length) {
				/** fetch tiles from queue tile reference **/
				var tiles = this.getAdjacentFilteredTiles(queue.shift());
				/** reduce heuristic value **/
				var res = Math.min.apply(Math, tiles.map(function(i){ return i.heuristic; }))
				/** reduce tiles from heuristic **/
				var tile = tiles.find(function(i) { return i.heuristic === res; });
				/** **/
				if (!tile || tile.heuristic === 0) {
					/** append last tile to stack **/
					plotted.push(target);
					/** return plotted path **/
					return plotted;	
				}			
				/** add plotted tile to array **/
				plotted.push(tile);
				/** enqueue tile for processing **/
				queue.push(tile);
			}
		}
	}

	find (start, target) {
		  /************************************************************************************************/
	 	 /** function for confirming whether a path to the target tile exists from starting destination **/
		/************************************************************************************************/
		/** if start object or target object not provided exit function **/
		if (!start || !target) return false;
		/** attempt to calculate a path and break if target was found **/
		var result = this.search(start, function (tile) {
			/** confirm this tiles coordinates are to that of the requested tile **/
			if (tile.x === target.x && target.y === tile.y) {
				/** break handler for search **/
				return true;
			}
		});
		/** return result of find attempt **/
		return result;
	}

	assert (start, target) {
		  /******************************************************************************************/
	 	 /** function for obtaining path to target tile from supplied using heursitic calculation **/
		/******************************************************************************************/
		/** return array of collected titles from heuristic calculation **/
		return this.calculate(target, start);
	}

	calculate (index) {
		  /************************************************************************/
	 	 /** function for obtaining tiles heursitic distance from supplied tile **/
		/************************************************************************/
		/** set base heuristic **/
		index.heuristic = 0;
		/** base starting position added to call stack queue **/
		var queue = [index];
		/** visited tiles **/
		var visited = [index];
		/** process queue **/
		while (queue.length) {
			/** extract tile from queue **/
			var tile = queue.shift();
			/** fetch tiles from queue tile reference **/
			var tiles = this.getAdjacentFilteredTiles(tile);
			/** confirm that tiles are not empty **/
			if (tiles.length) {
				/** iterate over the collected tiles **/
				for (var i = 0, len = tiles.length; i < len; i++) {
					/** confirm that array does not container this tile square instance **/
					if (visited.indexOf(tiles[i]) === -1) {
						/** calculate heuristic distance from position index **/
						tiles[i].heuristic = tile.heuristic + 1;
						/** enqueue task **/
						queue.push(tiles[i]);
						/** prevent revising **/
						visited.push(tiles[i]);
					}
				}
			}
		}
		/** exit **/
		return visited;
	}

	search (index, callback) {
		  /*********************************************************/
	 	 /** function for searching for path to tile within grid **/
		/*********************************************************/
		/** set base heuristic **/
		index.heuristic = 0;
		/** base starting position added to call stack queue **/
		var queue = [index];
		/** visited tiles **/
		var visited = [index];
		/** process queue **/
		while (queue.length) {
			/** fetch tiles from queue tile reference **/
			var tiles = this.getAdjacentFilteredTiles(queue.shift());
			/** confirm that tiles are not empty **/
			if (tiles.length) {
				/** iterate over the collected tiles **/
				for (var i = 0, len = tiles.length; i < len; i++) {
					/** confirm that array does not container this tile square instance **/
					if (visited.indexOf(tiles[i]) === -1) {
						/** enqueue task **/
						queue.push(tiles[i]);
						/** prevent revising **/
						visited.push(tiles[i]);
						/** callback **/
						if (callback) {
							/** optional kill **/
							if (callback(tiles[i])) {
								/** return calculated nodes **/
								return visited;
							}
						}
					}
				}
			}
		}
		/** exit **/
		return false;
	}

	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		super(config);
	}
}