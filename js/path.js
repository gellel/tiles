class Path extends Graph {

	/** @description: obtain direction through grid based on inherited grid **/

	static heuristic_manhattan (dx, dy) {
		/** @description: calculate sum of position x and y **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		return dx + dy;
	}

	static heuristic_euclidean (dx, dy) {
		/** @description: calculates euclidean distance from x and y **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		return Math.sqrt(dx * dx + dy * dy);
	}

	static heuristic_dijkstra () {
		/** @description: sets dijkstra heuristic **/
		/** @return: is type {integer} **/
		return 0;
	}

	static heuristic_octile (dx, dy) {
		/** @description: sets dijkstra heuristic **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		var F = Math.SQRT2 - 1;
		return (dx < dy) ? F * dx + dy : F * dy + dx;
	}

	static heuristic_bestfirst (dx, dy) {
		/** @description: sets best first search heuristic **/
		/** @param: {dx} is type {integer} **/
		/** @param: {dy} is type {integer} **/
		/** @return: is type {integer} **/
		return Path.heuristic_manhattan(dx, dy);
	}

	backtrace (node, target) {
		/** @description: filters array by tracing parents of element back to path **/
		/** @param: {node} is type {object} **/
		/** @param: {target} is type {object} **/
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
		/** add last tile to target **/
		path.unshift(target);
		/** reverse path **/
		return path.reverse();
	}

	astar (startColumn, startRow, endColumn, endRow, cost) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @param: {costs} is type {object} **/
		/** @return: is type {array} **/
		/** set base heuristic distance **/
		this.heuristic = Path.heuristic_manhattan;
		/** set base weight **/
		this.weight = 1;
		/** calculate path **/
		return this.path(startColumn, startRow, endColumn, endRow, cost);
	}

	dijkstra (startColumn, startRow, endColumn, endRow, cost) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @param: {costs} is type {object} **/
		/** @return: is type {array} **/
		/** set base heuristic distance **/
		this.heuristic = Path.heuristic_dijkstra;
		/** set base weight **/
		this.weight = 1;
		/** calculate path **/
		return this.path(startColumn, startRow, endColumn, endRow, cost);
	}

	bestfirst (startColumn, startRow, endColumn, endRow, cost) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @param: {costs} is type {object} **/
		/** @return: is type {array} **/
		/** set base heuristic distance **/
		this.heuristic = Path.heuristic_bestfirst;
		/** set base weight **/
		this.weight = 1;
		/** calculate path **/
		return this.path(startColumn, startRow, endColumn, endRow, cost);
	}

	breadthfirst (startColumn, startRow, endColumn, endRow, costs) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @param: {costs} is type {object} **/
		/** @return: is type {array} **/
		/** set base costs **/
		costs = costs || {};
		/** set weight of tiles **/
		var weight = this.weight;
		/** set start tile from grid **/
		var start = this.getTile(startColumn, startRow);
		/** set target tile from grid **/
		var target = this.getTile(endColumn, endRow);
		/** early exit if both paths are not walkable **/
		if (!start || !start.walkable || !target || !target.walkable) return false;
		/** set avoidance requirement **/
		var prohibited = costs.prohibited || false;
		/** set tile to explored **/
		start.opened = true;
		/** set queue calculations for processing **/
		var queue = new Queue();
		/** enqueue item **/
		queue.enqueue(start);
		/** set base count **/
		this.iterations = 0;
		/** set base visits **/
		this.checks = 0;
		/** iterate over heap while items are to be processed **/
		while (!queue.empty()) {
			/** set new calculation **/
			this.iterations = this.iterations + 1;
			/** retrieve tile **/
			var node = queue.dequeue();
			/** set node to closed **/
			node.closed = true;
			/** confirm that node is the target and reduce **/
			if (node === target) return this.backtrace(node, target);
			/** collect node neighbours **/
			var neighbours = this.getAdjacentTiles(node);
			/** confirm neighbours found **/
			if (neighbours.length) {
				/** filter unfound tiles **/
				neighbours = neighbours.filter(function (tile) { return tile ? tile : false });
				/** filter out unwanted **/
				if (prohibited) neighbours = neighbours.filter(function (tile) { return Base.__contains__(tile, prohibited) ? tile : false; });
				/** confirm neighbours remain **/
				if (neighbours && neighbours.length) {
					/** enumerate over neighbour tiles **/
					for (var i = 0, len = neighbours.length; i < len; i++) {
						/** set process visits **/
						this.checks = this.checks + 1;
						/** cache tile **/
						var neighbour = neighbours[i];
						/** confirm that this tile is not closed from previous evaluation **/
						if (!neighbour.opened) {
							/** close tile **/
							neighbour.opened = true;
							/** enqueue this neighbour **/
							queue.enqueue(neighbour);
							/** set parent of this previously searched node to current from fetched **/
							neighbour.parent = node;
						}
					}
				}
			}
		}
		return [];
	}

	path (startColumn, startRow, endColumn, endRow, costs) {
		/** @description: calculates path from startColumnY to endColumnY using tiles **/
		/** @param: {startColumn} is type {integer} **/
		/** @param: {startRow} is type {integer} **/
		/** @param: {endColumn} is type {integer} **/
		/** @param: {endRow} is type {integer} **/
		/** @param: {costs} is type {object} **/
		/** @return: is type {array} **/
		/** set base costs **/
		costs = costs || {};
		/** set heuristic calculation type **/
		var heuristic = this.heuristic;
		/** set weight of tiles **/
		var weight = this.weight;
		/** set start tile from grid **/
		var start = this.getTile(startColumn, startRow);
		/** set target tile from grid **/
		var target = this.getTile(endColumn, endRow);
		/** early exit if both paths are not walkable **/
		if (!start || !start.walkable || !target || !target.walkable) return false;
		/** set maths absolute **/
		var abs = Math.abs;
		/** set math square root **/
		var SQRT2 = Math.SQRT2;
		/** set avoidance requirement **/
		var prohibited = costs.prohibited || false;
		/** set include tiles **/
		var allowed = costs.allowed || false;
		/** set graph weight **/
		start.g = 0;
		/** set distanct weight **/
		start.f = 0;
		/** set tile to explored **/
		start.opened = true;
		/** set heap calculations for processing **/
		var heap = new Heap(function (nodeA, nodeB) { return nodeA.f - nodeB.f; });
		/** enqueue heap item **/
		heap.push(start);
		/** set base count **/
		this.iterations = 0;
		/** set base visits **/
		this.checks = 0;
		/** iterate over heap while items are to be processed **/
		while (!heap.empty()) {
			/** set new calculation **/
			this.iterations = this.iterations + 1;
			/** retrieve tile **/
			var node = heap.pop();
			/** set node to closed **/
			node.closed = true;
			/** set node to include visited **/
			node.visited = true;
			/** confirm that node is the target and reduce **/
			if (node === target) return this.backtrace(node, target);
			/** collect node neighbours **/
			var neighbours = this.getAdjacentTiles(node);
			/** confirm neighbours found **/
			if (neighbours.length) {
				/** filter unfound tiles **/
				neighbours = neighbours.filter(function (tile) { return tile ? tile : false });
				/** filter out unwanted by matching that object does not contain listed types **/
				if (prohibited) neighbours = neighbours.filter(function (tile) { return !Base.__contains__(tile, prohibited) ? tile : false; });
				/** confirm neighbours remain **/
				if (neighbours && neighbours.length) {
					/** enumerate over neighbour tiles **/
					for (var i = 0, len = neighbours.length; i < len; i++) {
						/** set process visits **/
						this.checks = this.checks + 1;
						/** cache tile **/
						var neighbour = neighbours[i];
						/** confirm that this tile is not closed from previous evaluation **/
						if (!neighbour.closed) {
							/** set column reference for cached tile **/
							var column = neighbour.column;
							/** set row reference for cached tile **/
							var row = neighbour.row;
							/** confirm costs and costs has property types by matching if object exists **/
							if (Base.__contains__(neighbour, allowed)) {
								node.g = node.g + node.cost;
							}
							/** set new graph weight for tile including the cost of movement to node **/
							var ng = node.g + ((column - node.column === 0 || row - node.row === 0) ? 1 : SQRT2);
							/** confirm that this neighbours is not opened or if the new graph weight is less than the current for this node **/
							if (!neighbour.opened || ng < (neighbour.g || 0)) {
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
									/** enheap this neighbour **/
									heap.push(neighbour);
									/** set neighbour to be opened for revision **/
									neighbour.opened = true;
								}
								else {
									/** update this in heap **/
									heap.update(neighbour);
								}
							}
						}
					}
				}
			}
		}
		return [];
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