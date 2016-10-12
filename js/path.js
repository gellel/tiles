class Path extends Graph {

	/** @description: obtain direction through grid based on inherited grid **/

	static manhattan (dx, dy) {
		/** @description: calculate sum of position x and y **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		return dx + dy;
	}

	static euclidean (dx, dy) {
		/** @description: calculates euclidean distance from x and y **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		return Math.sqrt(dx * dx + dy * dy);
	}

	static dijkstra () {
		/** @description: sets dijkstra heuristic **/
		/** @return: is type {integer} **/
		return 0;
	}

	backtrace (node) {
		/** @description: filters array by tracing parents of element back to path **/
		/** @param: {node} is type {object} **/
		/** @return: is type {array} **/
		/** set base path **/
		var path = [node];
		/** enumerate while node has parent **/
		while (node.parent) {
			/** set current node to previous nodes parent **/
			node = node.parent;
			/** append new current node to array **/
			path.push(node);
		}
		/** reverse path **/
		return path.reverse();
	}

	path (type, startColumn, startRow, endColumn, endRow) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {type} is type {string} **/
		/** @param: {type} @weight {integer} **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @return: is type {array} **/
		/** set heuristic calculation type **/
		var heuristic = Path[type];
		/** set weight of tiles **/
		var weight = 1;
		/** set start tile from grid **/
		var start = this.getTile(startColumn, startRow);
		/** set target tile from grid **/
		var target = this.getTile(endColumn, endRow);
		/** set maths absolute **/
		var abs = Math.abs;
		/** set math square root **/
		var SQRT2 = Math.SQRT2;
		/** set graph weight **/
		start.g = 0;
		/** set distanct weight **/
		start.f = 0;
		/** set tile to explored **/
		start.opened = true;
		/** enqueue tile for processing **/
		var queue = new Queue([start]);
		/** iterate over queue while items are to be processed **/
		while (queue.isPopulated()) {
			/** retrieve enqueued tile **/
			var node = queue.dequeue();
			/** set node to closed **/
			node.closed = true;
			/** confirm that node is the target and reduce **/
			if (node === target) return this.backtrace(target);
			/** collect node neighbours **/
			var neighbours = this.getAdjacentTiles(node);
			/** confirm neighbours found **/
			if (neighbours.length) {
				/** filter neighbours for usable **/
				neighbours = neighbours.filter(function (t) { return t && t.walkable ? t : false; });
				/** confirm neighbours remain **/
				if (neighbours.length) {
					/** enumerate over neighbour tiles **/
					for (var i = 0, len = neighbours.length; i < len; i++) {
						/** cache tile **/
						var neighbour = neighbours[i];
						/** confirm that this tile is not closed from previous evaluation **/
						if (!neighbour.closed) {
							/** set column reference for cached tile **/
							var column = neighbour.column;
							/** set row reference for cached tile **/
							var row = neighbour.row;
							/** set new graph weight for tile including the cost of movement to node **/
							var ng = node.g + ((column - node.column === 0 || row - node.row === 0) ? 1 : SQRT2) + node.cost;
							/** confirm that this neighbours is not opened or if the new graph weight is less than the current for this node **/
							if (!neighbour.opened || ng < neighbour.g) {
								/** update graph weight **/
								neighbour.g = ng;
								/** update heuristic cost using distance offset **/
								neighbour.h = neighbour.h || weight * heuristic(abs(column - endColumn), abs(row - endRow));
								/** update distant weight **/
								neighbour.f = neighbour.g + neighbour.h;
								/** set parent of this previously searched node to current from fetched **/
								neighbour.parent = node;
								/** confirm that this neighbour is not opened **/
								if (!neighbour.opened) {
									/** enqueue this neighbour **/
									queue.enqueue(neighbour);
									/** set neighbour to be opened for revision **/
									neighbour.opened = true;
								}
								else {
									/** update this in queue **/
									queue.update(neighbour);
								}
							}
						}
					}
				}
			}
		}
	}

	__path__ (config) {
		/** @description: initialised copied grid **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** set copied status **/
		config.__copy__ = config.__copy__ || false;
		/** copy grid **/
		if (config.__copy__) {
			/** set new grid reference **/
			var grid = [];
			/** enumerate over defined columns **/
			for (var i = 0; i < this.columns; i++) {
				/** set new column reference **/
				var column = [];
				/** enumerate over rows **/
				for (var j = 0; j < this.rows; j++) {
					/** append copy of tile object to row **/
					column.push(Graph.getTileCopy(this.grid, i, j));
				}
				/** apend column to grid **/
				grid.push(column);
			}
			/** reset measurements for class **/
			this.__graph__({ grid: grid });
		}
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied chaining to extended super method **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** call super **/
		super(config);
		/** set call to this definition handler **/
		this.__path__(config);
	}
}