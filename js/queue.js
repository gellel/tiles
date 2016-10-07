class Queue {

	/*
		* about class: creates a function queue for while loop based functions

		* constructor parameters:
			config: typeof Object {}
				required object origin: null

		* example initialisation:
			config:
				var config = { queue: new Array() };
	*/

	empty () {
		  /*****************************************************/
	 	 /** function for emptying queue and clearing memory **/
		/*****************************************************/
		/** empty queue **/
		this.queue = [];
	}

	isPopulated () {
		  /*************************************************************/
	 	 /** function for confirming there are items to be processed **/
		/*************************************************************/
		/** confirm that queue is not empty **/
		return this.queue.length ? true : false;
	}

	isEmpty () {
		  /*********************************************************************/
	 	 /** function for confirming there are no more items to be processed **/
		/*********************************************************************/
		/** confirm that queue is out of index **/
		return !this.queue.length ? true : false;
	}

	enqueue (item) {
		  /************************************/
	 	 /** function for incrementing FIFO **/
		/************************************/
		if (!item) return false;
		/** add item to the queue array **/
		this.queue.push(item);
		/** confirm enqueuing **/
		return true;
	}

	dequeue () {
		  /*****************************************/
	 	 /** function for deqeuing supplied FIFO **/
		/*****************************************/
		/** confirm that queue is not empty before decoupling **/
		if (this.isEmpty()) return false;
		/** remove first item from array and return contained item **/
		return this.queue.splice(0, 1)[0];
	}

	peek (offset) {
		  /***********************************************/
	 	 /** function for viewing queue without deqeue **/
		/***********************************************/
		if (!offset) return undefined;
		/** return this queues item from supplied offset **/
		return this.queue.length < offset ? this.queue[offset] : false;
	}

	process (callback) {
		  /********************************************************/
	 	 /** function for dequeuing queue with callback handler **/
		/********************************************************/
		/** exit queue handler if callback absent and empty queue **/
		if (!callback) {
			/** empty array **/
			this.empty();
			/** return false for handler **/
			return false;
		}
		/** process self **/
		while (this.isPopulated()) {
			/** dequeue self **/
			var item = this.dequeue();
			/** handle item from queue using callback and return if callback returns non falsey **/
			if (callback(item)) return item;
		}
		/** return true for handler without callback returned **/
		return true;
	}

	constructor (queue) {
		  /************************************/
	 	 /** function for class constructor **/
		/************************************/
		/** set class base queue from argument or as empty array **/
		this.queue = queue || [];
	}
}


