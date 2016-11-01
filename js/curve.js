class Curve {

	static linear (value) { 
		/** @description: create linear curvature **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value; 
	}

	static easeInQuad (value) { 
		/** @description: create curve accelerating from zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value * value;
	}

	static easeOutQuad (value) { 
		/** @description: create curve decelerating to zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value * (2 - value);
	}

	static easeInOutQuad (value) { 
		/** @description: create curve acceleration until halfway, then deceleration **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value <.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
	}

	static easeInCubic (value) { 
		/** @description: create curve accelerating from zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value * value * value; 
	}

	static easeOutCubic (value) { 
		/** @description: create curve decelerating to zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return (--value) * value * value + 1; 
	}

	static easeInOutCubic (value) { 
		/** @description: create curve acceleration until halfway, then deceleration **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value < .5 ? 4 * value * value * value : (value - 1) * (2 * value - 2) * (2 * value - 2) + 1;
	}

	static easeInQuart (value) { 
		/** @description: create curve accelerating from zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value * value * value * value; 
	}

	static easeOutQuart (value) {
		/** @description: create curve decelerating to zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/ 
		return 1 - (--value) * value * value * value;
	}

	static easeInOutQuart (value) { 
		/** @description: create curve acceleration until halfway, then deceleration **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value <.5 ? 8 * value * value * value * value : 1 - 8 * (--value) * value * value * value; 
	}

	static easeInQuint (value) { 
		/** @description: create curve accelerating from zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value * value * value * value * value; 
	}

	static easeOutQuint (value) { 
		/** @description: create curve decelerating to zero velocity **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return 1 + (--value) * value * value * value * value; 
	}

	static easeInOutQuint (value) { 
		/** @description: create curve acceleration until halfway, then deceleration **/
		/** @param: {value} is type {number} **/
		/** @return: is type {number} **/
		return value < .5 ? 16 * value * value * value * value * value : 1 + 16 * (--value) * value * value * value * value; 
	}

	static distance (x1, y1, x2, y2, sx, sy) {
		/** @description: returns falloff distance **/
		/** @param: {x1} is type {number} **/
		/** @param: {y1} is type {number} **/
		/** @param: {x2} is type {number} **/
		/** @param: {y2} is type {number} **/
		/** @param: {sx} is type {number} **/
		/** @param: {sy} is type {number} **/
		/** @return: is type {number} **/
		/** handle arguments **/
		if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return 0;
		/** set base scale x **/
		sx = typeof sx === "number" ? sx : 2;
		/** set base scale y **/
		sy = typeof sy === "number" ? sy : 2;
		/** set corner x **/
		var cx = x1 / parseFloat(x2);
		/** set corner y **/
		var cy = y1 / parseFloat(y2);
		/** set base cx if incorrect number **/
		if (!isFinite(cx) || isNaN(cx)) cx = 0;
		/** set base cy if incorrect number **/
		if (!isFinite(cy) || isNaN(cy)) cy = 0;
		/** scale fall off x **/
		var fx = cx * sx - 1;
		/** scale fall off y **/
		var fy = cy * sy - 1;
		/** return fall off **/
		return Math.max(Math.abs(fx), Math.abs(fy));
	}

	static sin (value, a, b) {
		/** @description: returns gradient sin wave for reducing falloff **/
		/** @param: {value} is type {number} **/
		/** @param: {a} is type {number} **/
		/** @param: {b} is type {number} **/
		/** @return: is type {number} **/
		/** set base a number for formula **/	
		a = !isNaN(a) ? a : 3;
		/** set base b number for formula **/
		b = !isNaN(b) ? b : 2.2;	
		/** return gradient **/
		return Math.pow(value, a) / (Math.pow(value, a) + Math.pow((b - b * value), a));
	}

	static arc (x1, y1, x2, y2, sx, sy, curve) {
		/** @description: returns falloff distance with smoothing **/
		/** @param: {x1} is type {number} **/
		/** @param: {y1} is type {number} **/
		/** @param: {x2} is type {number} **/
		/** @param: {y2} is type {number} **/
		/** @param: {sx} is type {number} **/
		/** @param: {sy} is type {number} **/
		/** @param: {curve} is type {function} or {string} **/
		/** @return: is type {number} **/
		/** handle arguments **/
		curve = typeof curve === "function" ? curve : typeof curve === "string" ? Curve[curve] : Curve.linear;
		/** return fall off **/
		return curve(Curve.distance(x1, y1, x2, y2, sx, sy));
	}

	constructor (config) {

	}
}