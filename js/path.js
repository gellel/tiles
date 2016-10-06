class Path extends Tiles {

	/*
		* about class: create and check for paths between tiles on the grid map

		* constructor parameters:
			config: typeof Object {}
				required object origin: [Tiles].__this__();

		* example initialisation:
			config:
				var config = Object.assign(new Tiles().__this__());
			class:
				var path = new Path(config);
	*/

	getPath (start, target) {
		  /********************************************************************************/
	 	 /** function for getting precalculated path from start to target without noise **/
		/********************************************************************************/
		/** confirm both tiles are not in grid **/
		if (!start || !target) return false;
		/** confirm both tiles can be not be used **/
		if (!start.canUseTile || !target.canUseTile) return false;
		/** attempt to get heuristic path **/
		var collection = this.search(target, function (tile) { return tile.x === start.x && tile.y === start.y ? true : false });
		/** confirm that collection was populated and attempt to reduce array **/
		return collection && collection.length ? this.reduce(start, target) : false;
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
		this.asserted = this.calculate(target, start);
		/** return array of collected titles from heuristic calculation **/
		return this.asserted;
	}

	reduce (start, target) {
		  /*********************************************************************************************/
	 	 /** function for obtaining path to target tile; assumes heursitic calculation was completed **/
		/*********************************************************************************************/
		/** set path map for plotted path **/
		var plotted = [start];
		/** set queue for finding tiles **/
		var queue = [start];
		/** set visited tiles **/
		var visited = [];
		/** process queue **/
		while (queue.length) {
			/** dequeue tile **/
			var tile = queue.shift();
			/** collect tiles adjacent to tile **/
			var tiles = this.getAdjacentHeuristicTiles(tile);
			/** **/
			if (tiles && tiles.length) {
				/** reduce tile from minimum heuristic cost **/
				tile = tiles.reduce(function (p, c) { return p.heuristic < c.heuristic ? p : c; });
				/** confirm tile was found **/
				if (tile) {
					/** prevent stack overflow **/
					if (visited.indexOf(tile) === -1) {
						/** add plotted tile to array **/
						plotted.push(tile);
						/** prevent **/
						visited.push(tile);
						/** confirm tile heuristic is the target to break **/
						if (tile.heuristic === 0) break;
						/** enqueue tile for processing **/
						queue.push(tile);
					}
				}
			}
		}
		/** return array of plotted tiles **/
		return plotted;
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
		/** super will configure the matrix if not defined **/
		super(config);
	}
}