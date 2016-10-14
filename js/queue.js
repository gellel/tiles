class Queue {

	/** @description: creates a function queue for while loop based functions **/

	clear () {
    	/** @description: function to clean queue **/
        return this.queue = [];
    }

    empty () {
    	/** @description: function to confirm heap is empty **/
        return this.queue.length === 0;
    }
	
	enqueue (item) {
	 	/** @description: function for incrementing FIFO **/
	 	/** @param: {item} is type {*} **/
	 	/** @return: is type {boolean} **/
		if (!item) return false;
		/** add item to the queue array **/
		this.queue.push(item);
		/** confirm enqueuing **/
		return true;
	}

	dequeue () {
	 	/** @description: function for deqeuing supplied FIFO **/
	 	/** @return: is type {*} **/
		/** confirm that queue is not empty before decoupling **/
		if (this.empty()) return false;
		/** remove first item from array and return contained item **/
		return this.queue.splice(0, 1)[0];
	}

	peek (offset) {
	 	/** @description: function for viewing queue without deqeue **/
	 	/** @param: {offset} {optional} is type {integer} **/
	 	/** @return: is type {*} or {boolean} **/
		if (!offset) return undefined;
		/** return this queues item from supplied offset **/
		return this.queue.length < offset ? this.queue[offset] : false;
	}

	pop () {
	 	/** @description: function for popping queue from base **/
	 	/** @return: is type {*} **/
		return this.queue.pop();
	}

	process (callback) {
	 	/** @description: function for dequeuing queue with callback handler **/
	 	/** @param: {callback} is type {function} **/
	 	/** @return: is type {boolean} or {*} **/
		/** exit queue handler if callback absent and empty queue **/
		if (!callback) {
			/** empty array **/
			this.empty();
			/** return false for handler **/
			return false;
		}
		/** process self **/
		while (!this.empty()) {
			/** dequeue self **/
			var item = this.dequeue();
			/** confirm item **/
			if (item) {
				/** handle item from queue using callback **/
				var result = callback(item);
				/** return if callback returns non falsey **/
				if (result) return result;
			}
		}
	}

	update (item) {
	 	/** @description: function for updating queued with supplied object **/
	 	/** @param: {item} is type {function} **/
		/** set reference **/
		var index = this.queue.indexOf(item);
		/** update item if not found in array **/
		if (index !== -1) this.queue[index] = item;
	}

	constructor (queue) {
	 	/** @description: function for class constructor **/
	 	/** @param: {queue} {optional} is type {array} **/
		/** set class base queue from argument or as empty array **/
		this.queue = queue || [];
	}
}


