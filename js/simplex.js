class Simplex {

	dot2D (g, x, y) {
		return g[0] * x + g[1] * y;
	}

	dot3D (g, x, y, z) {
		return g[0] * x + g[1] * y + g[2] * z;
	}

	in2d (x, y) {
		/** @description: create simplex noise float/integer between min and max at the 2D coordinates based on supplied x and y integer **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @return: is type {float} **/
		var amplitude = this.amplitude;
		var frequency = this.frequency;
		var maxAmplitude = 0;
		var noise = 0;
		var persistence = this.persistence;

		for (var i = 0; i < this.octaves; i++) {
			noise = noise + this.raw2D(x * frequency, y * frequency) * amplitude;
			maxAmplitude = maxAmplitude + amplitude;
			amplitude = amplitude * persistence;
			frequency = frequency * 2;
		}

		return this.scale(noise / maxAmplitude);
	}

	raw2D (x, y) {
		var perm = this.perm;
		var permMod12 = this.permMod12;

		var n0;
		var n1;
		var n2; // Noise contributions from the three corners

		// Skew the input space to determine which simplex cell we're in
		var s = (x + y) * 0.5 * (Math.sqrt(3.0) - 1.0); // Hairy factor for 2D
		var i = Math.floor(x + s);
		var j = Math.floor(y + s);
		var t = (i + j) * this.G2;
		var X0 = i - t; /// Unskew the cell origin back to (x,y) space
		var Y0 = j - t;
		var x0 = x - X0; // The x,y distances from the cell origin
		var y0 = y - Y0;

		// For the 2D case, the simplex shape is an equilateral triangle.
		// Determine which simplex we are in.
		var i1;
		var j1; // Offsets for second (middle) corner of simplex in (i,j) coords
		if (x0 > y0) { // Lower triangle, XY order: (0,0)->(1,0)->(1,1)
			i1 = 1;
			j1 = 0;
		} 
		else { // Upper triangle, YX order: (0,0)->(0,1)->(1,1)
			i1 = 0;
			j1 = 1;
		}

		// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
		// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
		// c = (3 - sqrt(3)) / 6

		var x1 = x0 - i1 + this.G2; // Offsets for middle corner in (x,y) unskewed coords
		var y1 = y0 - j1 + this.G2;
		var x2 = x0 - 1.0 + 2.0 * this.G2; // Offsets for last corner in (x,y) unskewed coords
		var y2 = y0 - 1.0 + 2.0 * this.G2;

		// Work out the hashed gradient indices of the three simplex corners
		var ii = i & 255;
		var jj = j & 255;
		var gi0 = permMod12[ii + perm[jj]];
		var gi1 = permMod12[ii + i1 + perm[jj + j1]];
		var gi2 = permMod12[ii + 1 + perm[jj + 1]];

		// Calculate the contribution from the three corners
		var t0 = 0.5 - x0 * x0 - y0 * y0;
		if (t0 < 0) {
			n0 = 0.0;
		} 
		else {
			t0 = t0 * t0;
			// (x,y) of 3D gradient used for 2D gradient
			n0 = t0 * t0 * this.dot2D(this.GRAD3[gi0], x0, y0);
		}
		var t1 = 0.5 - x1 * x1 - y1 * y1;
		
		if (t1 < 0) {
			n1 = 0.0;
		} 
		else {
			t1 = t1 * t1;
			n1 = t1 * t1 * this.dot2D(this.GRAD3[gi1], x1, y1);
		}
		
		var t2 = 0.5 - x2 * x2 - y2 * y2;
		
		if (t2 < 0) {
			n2 = 0.0;
		} 
		else {
			t2 = t2 * t2;
			n2 = t2 * t2 * this.dot2D(this.GRAD3[gi2], x2, y2);
		}

		// Add contributions from each corner to get the final noise value.
		// The result is scaled to return values in the interval [-1, 1]
		return 70.14805770654148 * (n0 + n1 + n2);
	}

	noise (width, height) {
		/** @description: create 2d array of 2d simplex noise **/
		/** @param: {width} is type {integer} **/
		/** @param: {height} is type {height} **/
		/** @return: is type {array} **/
		/** handle arguments **/
		if (!width || !height) return [[]];
		/** set base array to contain width of array **/
		var grid = new Array(width);
		/** enumerate over the size of the array **/
		for (var i = 0; i < width; i++) {
			/** set base column from height **/
			grid[i] = new Array(height);
			/** enumerate over size of the column **/
			for (var j = 0; j < height; j++) {
				/** populate column row with simplex **/
				grid[i][j] = this.in2d(i, j);
			}
		}
		/** return empty or populated 2d array **/
		return grid;
	}

	process (x, y) {
		/** @description: create noise based on supplied x and y; assumed to integerate with other enumerated function **/
		/** @param: {x} is type {integer} **/
		/** @param: {y} is type {integer} **/
		/** @return: is type {float} **/
		return this.in2d(x, y);
	}

	scale (value) {
		/** @description: set the base scale for simplex noise generation **/
		/** @param: {value} is type {integer} **/
		/** @return: is type {float} **/
		return this.min + ((value + 1) / 2) * this.range;
	}

	__init__ () {
		/** set base requirements **/
		var i;
		var p = new Uint8Array(256);
		
		for (i = 0; i < 256; i++) {
			p[i] = i;
		}

		var n;
		var q;

		for (i = 255; i > 0; i--) {
			n = Math.floor((i + 1) * this.random());
			q = p[i];
			p[i] = p[n];
			p[n] = q;
		}

		// To remove the need for index wrapping, double the permutation table length
		this.perm = new Uint8Array(512);
		this.permMod12 = new Uint8Array(512);
		
		for (i = 0; i < 512; i++) {
			this.perm[i] = p[i & 255];
			this.permMod12[i] = this.perm[i] % 12;
		}
	}
	constructor (config) {
		/** @description: simplex noise function, based on https://github.com/joshforisha/fast-simplex-noise-js; reduced to handle 2d maps as classes **/
		/** @help: http://flafla2.github.io/2014/08/09/perlinnoise.html **/
		/** @param: {config} is type {object} **/
		/** set base config **/
		config = config || {};
		/** config.min must be less than config.max **/
		this.frequency = config.frequency || 1.0;
		/** set returned min **/
		this.min = parseFloat(config.min) || -1.0;
		/** set return max **/
		this.max = parseFloat(config.max) || 1.0;
		/** set noise variance **/
		this.octaves = parseInt(config.octaves || 1);
		/** set amplitude of variance **/
		this.amplitude = config.amplitude || 1.0;
		/** set frequency of distribution **/
		this.frequency = config.frequency || 1.0;
		/** set persitence **/
		this.persistence = config.persistence || 0.5;
		/** set random number generator function **/
		this.random = config.random || Math.random;
		/** set random range from defined min and max ranges **/
		this.range = this.max - this.min;
		/** set average between ranges **/
		this.average = this.min + this.max / 2;
		/** set simplex gradient for 2d geometry **/
		this.G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
		/** set the simplex gradient **/
		this.GRAD3 = [
			[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
			[1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
			[0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, -1]
		];
		/** set call to this definition handler **/
		this.__init__(config);
	}
}
