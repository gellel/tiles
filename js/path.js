class Path extends Tiles {

	find (start, target) {
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
		return this.calculate(target, start);
	}

	calculate (index) {
		/** set base heuristic **/
		index.heuristic = 0;
		/** base starting position added to call stack queue **/
		var queue = [index];
		/** visited tiles **/
		var visited = [index];
		/** process queue **/
		while (queue.length) {
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
		super(config);
	}
}