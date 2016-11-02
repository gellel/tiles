class MATH {
	
	static rint (min, max, enumerable) {
		/** @description: create random number using range **/
		/** @param: {min} is type {integer} **/
		/** @param: {max} is type {integer} **/
		/** @param: {enumerable} is type {array} and @optional **/
		/** @return: is type {integer} or is type {object} **/
		var result = Math.floor(Math.random() * (max - min + 1) + min);
		/** return result **/
		return enumerable && enumerable.length ? result === enumerable.length ? enumerable[result - 1] : enumerable[result] : result;
	}

	static rfloat (min, max, fixed) {
		/** @description: create random float using range **/
		/** @param: {min} is type {float} **/
		/** @param: {max} is type {float} **/
		/** @param: {fixed} is type {integer} **/
		/** @return: is type {integer} or is type {object} **/
		/** set base decimal **/
		fixed = !isNaN(fixed) ? fixed : 4;
		/** return float value **/
		return (Math.random() * (min - max) + max).toFixed(fixed);
	}

	static clip (number, min, max) {
		/** @description: clamps value between the min and max supplied numbers **/
		/** @param: {min} is type {number} **/
		/** @param: {max} is type {number} **/
		/** @param: {fixed} is type {number} **/
		/** @return: is type {number} **/
		return Math.max(min, Math.min(number, max));

	}
}