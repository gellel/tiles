class Heap {

    push (x) {
    	/** @description: function to add item to this queue based on the clamp defined within constructor **/
    	/** @param: {x} is type {*} **/
    	/** @return: is type {*} **/
        return this.heapPush(this.nodes, x, this.clamp);
    }

    pop () {
    	/** @description: function to remove item from this queue based on priority **/
        return this.heapPop(this.nodes, this.clamp);
    }

    peek () {
    	/** @description: function view first item in heap **/
        return this.nodes[0];
    }

    contains (x) {
    	/** @description: function to confirm that this heap contains the supplied item **/
    	/** @param: {x} is type {*} **/
    	/** @return: is type {boolean} **/
        return this.nodes.indexOf(x) !== -1 ? true : false;
    }

    replace (x) {
    	/** @description: function to substitute item in array with supplied value based on clamp **/
    	/** @param: {x} is type {*} **/
        return this.heapReplace(this.nodes, x, this.clamp);
    }

    pushPop (x) {
    	/** @description: function to add item to heap with the clamp determining its use within queue **/
        return this.heapPushPop(this.nodes, x, this.clamp);
    }

    heapify () {
    	/** @description: function to convert array into heap **/
        return this.__heapify__(this.nodes, this.clamp);
    }

    update (x) {
    	/** @description: function for updating the instance of item with new value in heap based on priority **/
        return this.__update__(this.nodes, x, this.clamp);
    }

    shift () {
	 	/** @description: function for deqeuing supplied FIFO **/
	 	/** @return: is type {*} **/
		/** remove first item from array and return contained item **/
		return this.nodes.splice(0, 1)[0];
    }

    clear () {
    	/** @description: function to clean heap **/
        return this.nodes = [];
    }

    empty () {
    	/** @description: function to confirm heap is empty **/
        return this.nodes.length === 0;
    }

    size () {
    	/** @description: function for checking the size of the heap **/
        return this.nodes.length;
    }

	defaultClamp (x, y) {
		/** @description: set method for determining what item array is to be clamped **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @return: is type {integer} **/
       return y > x ? -1 : x > y ? 1 : 0;
   }
 
    toArray () {
    	/** @description: convert heap array to array copy **/
        return this.nodes.slice(0);
    }

	insort (array, x, low, high, clamp) {
		/** @description: sort the array heap based on its priority using clamp **/
		/** @param: {array} is type {array} **/
		/** @param: {x} is type {*} **/
		/** @param: {low} is type {integer} **/
		/** @param: {high} is type {integer} **/
		/** @param: {clamp} is type {function} **/
		/** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** confirm low is not integer and set base **/
        if (isNaN(low)) low = 0;
        /** cofirm that low is not a positive integer and handle exeception **/
        if (low < 0) throw new Error('variable: low: must be a non-negative integer.');
       	/** set base high variable **/
        if (isNaN(high)) high = array.length;
       	/** process lowest is less than highest **/
        while (low < high) {
        	/** set mid range **/
            var mid = Math.floor((low + high) / 2);
            /** apply clamp to array **/
            if (clamp(x, array[mid]) < 0) {
            	/** set new highest **/
                high = mid;
            } 
            else {
            	/** set new lowest range **/
                low = mid + 1;
            };
        }
        /** return filtered array **/
        return ([].splice.apply(array, [low, low - low].concat(x)), x);
    }

    heapPush (array, item, clamp) {
    	/** @description: add item within heap but set is position based on clamped value **/
    	/** @param: {array} is type {array} **/
    	/** @param: {item} is type {*} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: type is {*} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** add item to array **/
        array.push(item);
        /** shift elements based on their clamp **/
        return this.__siftdown__(array, 0, array.length - 1, clamp);
    }

    heapPop (array, clamp) {
    	/** @description: **/
    	/** @param: {} is type {} **/
    	/** @param: {} is type {} **/
    	/** @param: {} is type {} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** set base reference to last item in array and remove it **/
        var lastelt = array.pop();
        /** set base item to be returned **/
        var returnitem;
       	/** confirm array has length **/
        if (array.length) {
        	/** set to first instance in array **/
            returnitem = array[0];
            /** reset last reference **/
            array[0] = lastelt;
            /** shift elements down **/
            this.__siftup__(array, 0, clamp);
        } 
        else {
        	/** set the returned item to be the last item found in array absed on clamp **/
            returnitem = lastelt;
        }
        /** return found item **/
        return returnitem;
    }

    heapReplace (array, item, clamp) {
    	/** @description: **/
    	/** @param: {array} is type {array} **/
    	/** @param: {item} is type {*} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: type is {*} **/
        var returnitem;
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** **/
        returnitem = array[0];
        /** **/
        array[0] = item;
        /** **/
        this.__siftup__(array, 0, clamp);
        /** **/
        return returnitem;
    }

    heapPushPop (array, item, clamp) {
    	/** @description: **/
    	/** @param: {array} is type {array} **/
    	/** @param: {item} is type {*} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: type is {*} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** confirm that array has length and that clamp returned items **/
        if (array.length && clamp(array[0], item) < 0) {
        	/** set base reference **/
            var reference = [array[0], item];
            /** update item to new reference **/
            item = reference[0];
            /** set first item array to found reference **/
            array[0] = reference[1];
            /** shift up array element in clamp range **/
            this.__siftup__(array, 0, clamp);
        }
        /** return new item **/
        return item;
    }

    __heapify__ (array, clamp) {
    	/** @description: **/
    	/** @param: {array} is type {array} **/
    	/** @param: {clamp} is type {function} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** set reference array **/
        var base = (function() {
        	/** set first results container **/
            var results = [];
            /** enumerate over base array **/
            for (var i = 0, ref = Math.floor(array.length / 2); 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--) {
                /** append item to array **/
                results.push(i);
            }
            /** return constructed array **/
            return results;
            /** **/
        }).apply(this).reverse();
        /** set results container **/
        var results = [];
        /** **/
        for (var i = 0, len = base.length; i < len; i++) {
            /** filter result **/
            results.push(this.__siftup__(array, base[i], clamp));
        }
        /** return heap **/
        return results;
    }

    __update__ (array, item, clamp) {
    	/** @description: **/
    	/** @param: {array} is type {array} **/
    	/** @param: {item} is type {*} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: is type {*} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** set position of item within supplied array **/
		var pos = array.indexOf(item);
		/** confirm that element was not found **/
        if (pos === -1) return false;
        /** shift elements down **/
        this.__siftdown__(array, 0, pos, clamp);
        /** shift elements up **/
        return this.__siftup__(array, pos, clamp);
    }

    nthLargest (array, n, clamp) {
    	/** @description: find the largest items in dataset based on clamp **/
    	/** @param: {array} is type {array} **/
    	/** @param: {n} is type {integer} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: is type {array} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** extract array from start to supplied length **/
        var result = array.slice(0, n);
        /** confirm that result was not extracted **/
        if (!result.length) {
        	/** return outcome **/
            return result;
        }
        /** convert sliced array into heap **/
        this.__heapify__(result, clamp);
        /** set reference to array position slice **/
        var reference = array.slice(n);
        for (var i = 0, len = ref.length; i < len; i++) {
        	/** set instance of array **/
            var elemenet = ref[i];
            /** set result array to reorder based on size **/
            this.heapPushPop(result, elem, clamp);
        }
        /** return filtered array **/
        return result.sort(clamp).reverse();
    };

    nthSmallest  (array, n, clamp) {
    	/** @description: finding the smallest elements in the dataset based on clamp **/
    	/** @param: {array} is type {array} **/
    	/** @param: {n} is type {integer} **/
    	/** @param: {clamp} is type {function} **/
    	/** @return: is type {array} **/
        var elem, i, los, result, _i, _j, _len, reference, _ref1;
        /** set base clamp **/
	    clamp = clamp ? clamp : this.defaultClamp; 
	    /** confirm binary heap leap **/
        if (n * 10 <= array.length) {
            result = array.slice(0, n).sort(clamp);
            if (!result.length) {
                return result;
            }
            los = result[result.length - 1];
            reference = array.slice(n);
            for (_i = 0, _len = reference.length; _i < _len; _i++) {
                elem = reference[_i];
                if (clamp(elem, los) < 0) {
                    this.insort(result, elem, 0, null, clamp);
                    result.pop();
                    los = result[result.length - 1];
                }
            }
            return result;
        }
        /** convert supplied array into binary heap using clamp for arrangement **/
        this.__heapify__(array, clamp);
        /** set empty results array **/
        var results = [];
        /** enumerate over array while instance os less than reference **/
        for (i = _j = 0, _ref1 = Math.min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            /** add item to array **/
            results.push(this.heapPop(array, clamp));
        }
        /** return ordered results array **/
        return results;
    }

    __siftdown__ (array, startpos, pos, clamp) {
    	/** @description: **/
    	/** @param: {array} is type {array} **/
    	/** @param: {startpos} is type {integer} **/
    	/** @param: {pos} is type {integer} **/
    	/** @param: {clamp} is type {function} **/
        /** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** set new item for processing **/
        var newitem = array[pos];
        /** process while position is greater than starting **/
        while (pos > startpos) {
        	/** set instance for lookup **/
            var parentpos = (pos - 1) >> 1;
            /** retrieve item from supplied array **/
            var parent = array[parentpos];
            /** apply clamp to item in array **/
            if (clamp(newitem, parent) < 0) {
            	/** set array item position to element position **/
                array[pos] = parent;
                /** set new position **/
                pos = parentpos;
                /** remaing processing **/
                continue;
            }
            /** exit **/
            break;
        }
        /** **/
        return array[pos] = newitem;
    }

    __siftup__ (array, pos, clamp) {
    	/** @description: **/
    	/** set base clamp **/
    	clamp = clamp ? clamp : this.defaultClamp;
    	/** set end position based on total size of array **/
        var endpos = array.length;
        /** **/
        var startpos = pos;
        /** **/
        var newitem = array[pos];
        /** **/
        var childpos = 2 * pos + 1;
        /** **/
        while (childpos < endpos) {
        	/** **/
            var rightpos = childpos + 1;
            /** **/
            if ((rightpos < endpos) && !(clamp(array[childpos], array[rightpos]) < 0)) {
            	/** **/
                childpos = rightpos;
            }
            /** **/
            array[pos] = array[childpos];
            /** **/
            pos = childpos;
            /** **/
            childpos = 2 * pos + 1;
        };
        /** **/
        array[pos] = newitem;
        /** **/
        return this.__siftdown__(array, startpos, pos, clamp);
    }

	constructor (clamp) {
		/** @description: class constructor **/
		/** @param: {clamp} is type {function} **/
		/** set base clamping method of select default **/
		this.clamp = clamp ? clamp : this.defaultClamp;
		/** set empty array for calculation queue **/
		this.nodes = [];
	}
}
