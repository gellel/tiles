class Simplex {

	static get G2 () {
		/** @description: returns base expression gradient 2 **/
		/** @return: is type {float} **/
		return (3.0 - Math.sqrt(3.0)) / 6.0;
	}

	static get G3 () {
		/** @description: returns base expression gradient 3 **/
		/** @return: is type {float} **/
		return 1.0 / 6.0;
	}

	static get G4 () {
		/** @description: returns base expression for gradient 4 **/
		/** @return: is type {float} **/
		return (5.0 - Math.sqrt(5.0)) / 20.0;
	}

	static get GRAD3 () {
		/** @description: holds 3d array for matrix **/
		/** @return: is type {array} **/
		return [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, -1]];
	}

	static get GRAD4 () {
		/** @description: holds 4d array for matrix **/
		/** @return: is type {array} **/
		return [[0, 1, 1, 1], [0, 1, 1, -1], [0, 1, -1, 1], [0, 1, -1, -1], [0, -1, 1, 1], [0, -1, 1, -1], [0, -1, -1, 1], [0, -1, -1, -1], [1, 0, 1, 1], [1, 0, 1, -1], [1, 0, -1, 1], [1, 0, -1, -1], [-1, 0, 1, 1], [-1, 0, 1, -1], [-1, 0, -1, 1], [-1, 0, -1, -1], [1, 1, 0, 1], [1, 1, 0, -1], [1, -1, 0, 1], [1, -1, 0, -1], [-1, 1, 0, 1], [-1, 1, 0, -1], [-1, -1, 0, 1], [-1, -1, 0, -1], [1, 1, 1, 0], [1, 1, -1, 0], [1, -1, 1, 0], [1, -1, -1, 0], [-1, 1, 1, 0], [-1, 1, -1, 0], [-1, -1, 1, 0], [-1, -1, -1, 0]]
	}

	static DOT2D (g, x, y) {
		/** @description: calculates gradient from x & y **/
		/** @param: {g} is type {array} **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @return: is type {number} **/
		return g[0] * x + g[1] * y; 
	}

	static DOT3D (g, x, y, z) {
		/** @description: calculates gradient from x, y & z **/
		/** @param: {g} is type {array} **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @param: {z} is type {number} **/
		/** @return: is type {number} **/
		return g[0] * x + g[1] * y + g[2] * z;
	}

	static DOT4D (g, x, y, z, w) {
		/** @description: calculates gradient from x, y, z & w **/
		/** @param: {g} is type {array} **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @param: {z} is type {number} **/
		/** @param: {w} is type {number} **/
		/** @return: is type {number} **/
		return g[0] * x + g[1] * y + g[2] * z + g[3] * w;
	}

	static RAW2D (perm, permMod12, x, y) {
		/** @description: generates a noise value for 2d simplex **/
		/** @param: {perm} is type {Uint8Array} **/
		/** @param: {permMod12} is type {Uint8Array} **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @return: is type {float} **/
		/** cache G2 algorithm **/
		var G2 = Simplex.G2;
		/** cache G3 grid **/
		var GRAD3 = Simplex.GRAD3;
		/** set noise distribution from three corners within square **/
		var n0;
		/** **/
		var n1;
		/** **/ 
		var n2;
		/** skew geometry space to calculate the simplex cell **/
		var s = (x + y) * 0.5 * (Math.sqrt(3.0) - 1.0);
		/** set direction axis **/
		var i = Math.floor(x + s);
		/** set direction axis **/
		var j = Math.floor(y + s);
		/** **/
		var t = (i + j) * G2;
		/** reset corner to supplied x position **/
		var X0 = i - t;
		/** reset corner to supplied y position **/
		var Y0 = j - t;
		/** set the x distance from the origin square **/
		var x0 = x - X0;
		/** set the y distance from the origin square **/
		var y0 = y - Y0;
		/** set offset for second middle corner of simplex x **/
		var i1;
		/** set offset for second middle corner of simplex y **/
		var j1;
		/** confirm offsets for second (middle) corner of simplex in (i,j) coords **/
		if (x0 > y0) { 
			/** set lower triangle, XY order: (0, 0) -> (1, 0) -> (1, 1) **/
		    i1 = 1;
		    /** **/
		    j1 = 0;
		} 
		else { 
			/** set upper triangle, YX order: (0, 0) -> (0, 1) -> (1, 1) **/
		    i1 = 0;
		    /** **/
		    j1 = 1;
		}
		/** set offset for middle corner x as unskewed **/
		var x1 = x0 - i1 + G2;
		/** set offset for middle corner y as unskewed **/
		var y1 = y0 - j1 + G2;
		/** set offset for last corner x as skewed **/
		var x2 = x0 - 1.0 + 2.0 * G2;
		/** set offset for last corner y as skewed **/
		var y2 = y0 - 1.0 + 2.0 * G2;
		/** calculate hashed gradient indices of the three simplex corners from defined offsets **/
		var ii = i & 255;
		var jj = j & 255;
		var gi0 = permMod12[ii + perm[jj]];
		var gi1 = permMod12[ii + i1 + perm[jj + j1]];
		var gi2 = permMod12[ii + 1 + perm[jj + 1]];
		/** calculate the contribution from the three corners **/
		var t0 = 0.5 - x0 * x0 - y0 * y0;
		/** **/
		if (t0 < 0) {
		    n0 = 0.0;
		}
		/** **/
		else {
		    t0 = t0 * t0;
		    n0 = t0 * t0 * Simplex.DOT2D(GRAD3[gi0], x0, y0);
		}
		/** **/
		var t1 = 0.5 - x1 * x1 - y1 * y1;
		/** **/
		if (t1 < 0) {
		    n1 = 0.0;
		} else {
		    t1 = t1 * t1;
		    n1 = t1 * t1 * Simplex.DOT2D(GRAD3[gi1], x1, y1);
		}
		/** **/
		var t2 = 0.5 - x2 * x2 - y2 * y2;
		/** **/
		if (t2 < 0) {
		    n2 = 0.0;
		} else {
		    t2 = t2 * t2;
		    n2 = t2 * t2 * Simplex.DOT2D(GRAD3[gi2], x2, y2);
		}
		/** add values from each corner to generate simplex noise value; values returned as interval between [-1, 1] **/
		return 70.14805770654148 * (n0 + n1 + n2);
	}

	static N2D (perm, permMod12, x, y, amplitude, frequency, persistence, octaves, min, max, offsetX, offsetY, adjust, distribute, normalise) {
		/** @description: adjust base noise value for 2d noise **/
		/** @param: {perm} is type {Uint8Array} **/
		/** @param: {permMod12} is type {Uint8Array} **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @param: {amplitude} is type {number} **/
		/** @param: {persistence} is type {number} **/
		/** @param: {octaves} is type {integer} **/
		/** @param: {min} is type {number} **/
		/** @param: {max} is type {number} **/
		/** @param: {adjust} is type {function} **/
		/** @param: {distribute} is type {function} **/
		/** @param: {normalise} is type {function} **/
		/** @return: is type {number} **/
		/** set base adjust **/
		adjust = typeof adjust === "function" ? adjust : function (n) { return n };
		/** set base distribute **/
		distribute = typeof distribute === "function" ? distribute : function (n, a) { return n = n / a };
		/** set base scale **/
		normalise = typeof normalise === "function" ? normalise : function (n, min, max) { return min + ((n + 1) / 2) * (min - max); };
		/** set base octaves **/
		octaves = octaves === 0 ? 1 : octaves;
		/** set base amplitude adjustment **/
		amplitude = !isNaN(amplitude) ? amplitude : 1;
		/** set base frequency **/
		frequency = !isNaN(frequency) ? frequency : 0.5;
		/** set base min **/
		min = !isNaN(min) ? min : -1;
		/** set base max **/
		max = !isNaN(max) ? max : 1;
		/** set base offset x **/
		offsetX = !isNaN(offsetX) ? offsetX : 0;
		/** set base offset y **/
		offsetY = !isNaN(offsetY) ? offsetY : 0;
		/** set base amplitude **/
		var a = 1;
		/** set base noise value **/
		var noise = 0;
		/** set base max amplitude **/
		var maxAmplitude = 0;
		/** enumerate over config octaves **/
		for (var i = 0; i < octaves; i++) {
			/** scale x value by copied frequency (center scale using: x - width / 2) **/
			var xf = x * frequency + offsetX;
			/** scale y value by copied frequency (center scale using: y - height / 2) **/
			var yf = y * frequency + offsetY;
			/** get raw noise (with possible adjustment) **/
			var n = adjust(Simplex.RAW2D(perm, permMod12, xf, yf));
			/** set noise value and scale by copied amplitude **/
			noise = noise + n * a;
			/** set new max amplitude **/
    		maxAmplitude = (maxAmplitude + a) + amplitude;
    		/** rescale amplitude **/
			a = a * persistence;
			/** rescale frequency **/
			frequency = frequency * 2;
		};
		/** return scaled noise **/
  		return normalise(distribute(noise, maxAmplitude), min, max);
	}

	noise2d (x, y, adjust, distribute, normalise) {
		/** @description: adjust base noise value for 2d noise **/
		/** @param: {noise} is type {number} **/
		/** @param: {adjust} is type {function} **/
		/** @param: {distribute} is type {function} **/
		/** @param: {normalise} is type {function} **/
		/** @return: is type {number} **/
		return Simplex.N2D(this.perm, this.permMod12, x, y, this.amplitude, this.frequency, this.persistence, this.octaves, this.min, this.max, this.offsetX, this.offsetY, adjust, distribute, normalise);
	}

	seed () {
		/** @description: generates random seeded points along calculation distance for smooth random distribution **/
		/** set base permutation points **/
		this.points = new Uint8Array(256);
		/** set permutation container **/
		this.perm = new Uint8Array(512);
		/** set modulo permutation **/
		this.permMod12 = new Uint8Array(512);
		/** enumerate over points **/
		for (var i = 0; i < 256; i++) {
			/** set seed **/
			this.points[i] = this.random() * 256;
		}
		/** enumerate over bytes **/
		for (i = 0; i < 512; i++) {
			/** set int permutation **/
			this.perm[i] = this.points[i & 255];
			/** set modulus permutation **/
			this.permMod12[i] = this.perm[i] % 12;
		}
	}

	getAdjustable (config) {
		/** @description: creates formatted object for defining HTML5 range input **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} **/
		/** set base config **/
		config = config || {};
		/** assign scales to object **/
		return this.setScaleStep({ min: { min: this.min, max: this.max }, max: { min: this.min, max: this.max }, octaves: { min: 1, max: this.octaves }, amplitude: { min: 0, max: this.amplitude < 1 ? 1 : this.amplitude }, frequency: { min: 0, max: this.frequency < 1 ? 1 : this.frequency }, persistence: { min: 0, max: this.persistence < 1 ? 1 : this.persistence }, offsetX: { min: -1, max: 1, value: 0, step: 0.01 }, offsetY: { min: -1, max: 1, value: 0, step: 0.01 } });
	}

	setScaleStep (config) {
		/** @description: sets the incriment step, min and max values for HTML5 range input **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} **/
		/** iterate over object **/
		for (var key in config) {
			/** confirm key is unique property **/
			if (config.hasOwnProperty(key)) {
				/** set the step for next value to 1 if it is an integer otherwise use the lowest number of the float and set to 1 **/
				if (config[key].step === undefined) config[key].step = this[key] % 1 ? parseFloat(this[key].toString().replace(/\d/g, '0').replace(/0$/, "1")) : 1;	
				/** set the value **/
				if (config[key].value === undefined) config[key].value = key === "min" ? config[key].min : this[key];					
			}
		}
		/** return object **/
		return config;
	}

	constructor (config) {
		/** @params: {config.amplitude} is shifting impact for the gradient (scales the occurance of new items) **/
		/** @params: {config.frequency} is for the preveleance of the pattern (can also feel like the magnification) **/
		/** @params: {config.octaves} is for smoothness **/
		/** @params: {config.persistence} is for smoothness, but can produce more jaggedness of repetitions **/
		/** set base config **/
		config = config || {};
		/** set base amplitude for constructor **/
		this.amplitude = !isNaN(config.amplitude) ? config.amplitude : 0.001;
		/** set base frequency for constructor **/
		this.frequency = !isNaN(config.frequency) ? config.frequency : 0.001;
		/** set base min for constructor **/
		this.min = !isNaN(config.min) ? config.min : -1;
		/** set base max for constructor **/
		this.max = !isNaN(config.max) ? config.max : 1;
		/** set base octaves for constructor **/
		this.octaves = parseInt(config.octaves) || 1;
		/** set base persistence for constructor **/
		this.persistence = config.persistence || 0.50;
		/** set base random calculator for constructor **/
		this.random = config.random || Math.random;
		/** set base permutation **/
		this.seed();
	}
}


