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

	dsearch (start, target) {
		  /**********************************************************************************/
		 /** function for searching for path using dijkstra's algorithm without reduction **/
		/**********************************************************************************/
		/** confirm that tiles are defined otherwise exit **/
		if (!start || !target) return false;
		/** attempt to find dijkstras path **/
		return this.dijkstra(target, function (tile) { return tile.x === start.x && tile.y === start.y ? true : false });
	}

	dpath (start, target) {
		  /****************************************************************/
		 /** function for searching for path using dijkstra's algorithm **/
		/****************************************************************/
		/** confirm that tiles are defined otherwise exit **/
		if (!start || !target) return false;
		/** attempt to find dijkstras path **/
		var result = this.dijkstra(target, function (tile) { return tile.x === start.x && tile.y === start.y ? true : false });
		/** confirm that path was plotted successfully and reduce otherwise exit **/
		return result ? this.dreduce(start, target) : false;
	}

	dreduce (start, target) {
		  /*****************************************************************************/
		 /** function for reducing array from calculation using dijkstra's algorithm **/
		/*****************************************************************************/
		/** confirm start and target tile were supplied **/
		if (!start || !start) return false;
		/** confirm that queue class is in window scope otherwise exit **/
		if (!Queue) return false;
		/** set highest heuristic **/
		var heuristic = start.heuristic;
		/** set path array for result **/
		var path = [];
		/** set queue instance for array processing **/
		var queue = new Queue();
		/** enqueue item for processing **/
		queue.enqueue(start);
		/** process queue **/
		while (queue.isPopulated()) {
			/** dequeue item from queue and collect adjacent tiles **/
			var tiles = this.getAdjacentHeuristicTiles(queue.dequeue());
			/** confirm adjacent tiles were found or break **/
			if (!tiles.length) break;
			/** reduce collection **/
			var tile = tiles.reduce(function (pt, ct) { return pt.heuristic < ct.heuristic ? pt : ct; });
			/** confirm tile was found otherwise break **/
			if (!tile) break;
			/** confirm tile is the target and break or confirm tile is greater than the previous neighbour and break **/
			if (tile.heuristic === 0 || tile.heuristic > heuristic) break;
			/** update heurstic to found **/
			heuristic = tile.heuristic;  
			/** add tile to found path **/
			path.push(tile);
			/** enqueue item for processing **/
			queue.enqueue(tile);
		}
		/** add start to path array **/
		path.unshift(start);
		/** add target to path array **/
		path.push(target);
		/** return completed path **/
		return path;
	}

	dijkstra (index, callback) {
		  /*************************************************************************/
		 /** function for setting heuristic distance from index tile in grid map **/
		/*************************************************************************/
		/** caveate: this method will not reset tilemap heuristics after iteration leading to errors when sharing path class for new path array **/
		/** solution: initialise new path per new calculation of path from adjust start to target **/
		/** confirm that queue class is in window scope and index tile object provided otherwise exit **/
		if (!Queue || !index) return false;
		/** set index tile heuristic distance **/
		index.heuristic = 0;
		/** set queue instance for array processing **/
		var queue = new Queue();
		/** enqueue item for processing **/
		queue.enqueue(index);
		/** process queue **/
		while (queue.isPopulated()) {
			/** dequeue item from queue **/
			var tile = queue.dequeue();
			/** break processor if tile not found **/
			if (!tile) break;
			/** collect tile neighbours that are not heuristic but usable **/
			var tiles = this.getAdjacentFilteredTiles(tile).filter(function (i) { return i.heuristic === undefined ? i : !1; });
			/** process tiles if tiles were found from neighbour **/
			if (tiles.length) {
				/** iterate over collection **/
				for (var i = 0, len = tiles.length; i < len; i++) {
					/** heuristically increment **/
					tiles[i].heuristic = tile.heuristic + 1;
					/** confirm callback and if true returned exit **/
					if (callback && callback(tiles[i], tile)) return true;
					/** enqueue this iteration tile to queue be calculated **/
					queue.enqueue(tiles[i]);
				}
			}
		}
	}

	constructor (config) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** super will configure the matrix if not defined **/
		super(config);
	}
}