class Path extends Tiles {

	heuristic (start, target) {
		/** set based heuristic **/
		start.heuristic = 0;
		/** **/
		var heuristic = 1;
		/** base starting position added to call stack queue **/
		var queue = [start];
		/** visited tiles **/
		var visited = [start];
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
						/** **/
						tiles[i].heuristic = heuristic;
						/** enqueue task **/
						queue.push(tiles[i]);
						/** prevent revising **/
						visited.push(tiles[i]);
						/** break case **/
						if (target.x === tiles[i].x && target.y === tiles[i].y) {
							/** returned visited **/
							return visited;
						}
					}	
				}
			}
		}
		return false;
	}

	find (start, target) {
		if (!start || !target) return false;
		var result = this.search(start, function (tile) {
			if (tile.x === target.x && target.y === tile.y) {
				return true;
			}
		});
		return result;
	}

	search (index, callback) {
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