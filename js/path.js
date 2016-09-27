class Path extends Tiles {

	find (start, target) {
		var result = this.search(start, function (tile) {
			if (tile.x === target.x && target.y === tile.y) {
				return true;
			}
		});
		return result;
	}

	heuristic (start, target) {

	}

	search (index, callback) {
		/** base starting position added to call stack queue **/
		var queue = [index];
		/** visited tiles **/
		var visited = [index];
		/** process queue **/
		while (queue.length) {
			/** fetch tiles from queue tile reference **/
			var tiles = this.getAdjacentTiles(queue.shift());
			/** iterate over the collected tiles **/
			for (var i = 0, len = tiles.length; i < len; i++) {
				/** confirm that tile exists **/
				if (tiles[i] && tiles[i].canUseTile) {
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
								return visited;
							}
						}
					}
				}
			}
		}
		return false;
	}

	constructor (config) {
		super(config);
	}
}