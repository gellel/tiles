class Simplex {

	static G2 () {
		/** @description: returns base expression gradient 2 **/
		/** @return: is type {float} **/
		return (3.0 - Math.sqrt(3.0)) / 6.0;
	}

	static G3 () {
		/** @description: returns base expression gradient 3 **/
		/** @return: is type {float} **/
		return 1.0 / 6.0;
	}

	static G4 () {
		/** @description: returns base expression for gradient 4 **/
		/** @return: is type {float} **/
		return (5.0 - Math.sqrt(5.0)) / 20.0;
	}

	static GRAD3 () {
		/** @description: holds 3d array for matrix **/
		/** @return: is type {array} **/
		return [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, -1]];
	}

	static GRAD4 () {
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

	static scale (min, value, range) {
		/** @description: scales perlin index **/
		/** @param: {min} is type {number} **/
		/** @param: {value} is type {number} **/
		/** @param: {range} is type {number} **/
		/** @return: is type {number} **/
		return min + ((value + 1) / 2) * range;
	}

	static bias (x1, y1, x2, y2, sx, sy) {
		/** @description: returns offset for noise **/
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
		sx = sx || 2;
		/** set base scale y **/
		sy = sy || 2;
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
		var fy = cy * sx - 1;
		/** return fall off **/
		return Math.max(Math.abs(fx), Math.abs(fy));
	}

	static soften (noise, range) {
		/** @description: scales and distributes noise by range **/
		/** @param: {noise} is type {number} **/
		/** @param: {range} is type {number} **/
		/** @return: is type {number} **/
		return noise * range / 2 + range / 2;
	}

	noise2d (x, y, bias, soft) {
		/** @description: generates a noise value for 2d simplex **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @param: {bias} is type {number} **/
		/** @param: {soft} is type {boolean} **/
		/** @return: is type {float} **/
		/** set range **/
		var range = this.max - this.min;
		/** set copy of base amplitude **/
		var amplitude = this.amplitude;
		/** set copy of base frequency **/
		var frequency = this.frequency;
		/** set copy of base persistence **/
		var persistence = this.persistence;
		/** set base noise value **/
		var noise = 0;
		/** set base max amplitude **/
		var maxAmplitude = 0;
		/** enumerate over config octaves **/
		for (var i = 0; i < this.octaves; i++) {
			/** scale x value by copied frequency **/
			var xf = x * frequency;
			/** scale y value by copied frequency **/
			var yf = y * frequency;
			/** set noise value and scale by copied amplitude **/
			noise = noise + this.rawNoise2d(xf, yf, bias) * amplitude;
			/** set new max amplitude **/
    		maxAmplitude = maxAmplitude + amplitude;
    		/** rescale amplitude **/
			amplitude = amplitude * persistence;
			/** rescale frequency **/
			frequency = frequency * 2;
		};
		/** distribute noise **/
		noise = noise / maxAmplitude;
		/** scale noise **/
		noise = this.scale(this.min, noise, range);
		/** soften noise **/
		if (soft) noise = noise * range / 2 + range / 2;
		/** retun scaled noise **/
  		return noise;
	}

	rawNoise2d (x, y, bias) {
		/** @description: generates a noise value for 2d simplex **/
		/** @param: {x} is type {number} **/
		/** @param: {y} is type {number} **/
		/** @param: {bias} is type {number} **/
		/** @return: is type {float} **/
		/** cache permanance **/
		var perm = this.perm;
		/** cache permance modulo **/
		var permMod12 = this.permMod12;
		/** cache G2 algorithm **/
		var G2 = Simplex.G2();
		/** cache G3 grid **/
		var GRAD3 = Simplex.GRAD3();
		/** cache DOT2D **/
		var dot2D = Simplex.DOT2D;
		/** cache bias **/

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

		if (t0 < 0) {
		    n0 = 0.0;
		} 
		else {
		    t0 *= t0;
		    n0 = t0 * t0 * dot2D(GRAD3[gi0], x0, y0);
		}

		var t1 = 0.5 - x1 * x1 - y1 * y1;

		if (t1 < 0) {
		    n1 = 0.0;
		} else {
		    t1 *= t1;
		    n1 = t1 * t1 * dot2D(GRAD3[gi1], x1, y1);
		}

		var t2 = 0.5 - x2 * x2 - y2 * y2;

		if (t2 < 0) {
		    n2 = 0.0;
		} else {
		    t2 *= t2;
		    n2 = t2 * t2 * dot2D(GRAD3[gi2], x2, y2);
		}

		/** add values from each corner to generate simplex noise value; values returned as interval between [-1, 1] **/
		return 70.14805770654148 * (n0 + n1 + n2) - (bias);
	}

	seed () {
		/** @description: generates random seeded points along calculation distance for smooth random distribution **/
		/** set seed **/
		var p = new Uint8Array(256);
		/** populate seeded **/
		for (var i = 0; i < 256; i++) {
			/** **/
			p[i] = i;
		}
		/** **/
		for (var i = 255; i > 0; i--) {
			/** set new random seeds for perlin noise **/
			var n = Math.floor((i + 1) * this.random());
			/** **/
			var q = p[i];
			/** **/
			p[i] = p[n];
			/** **/
			p[n] = q;
		}
		/** **/
		this.perm = new Uint8Array(512);
		/** **/
		this.permMod12 = new Uint8Array(512);
		/** **/
		for (var i = 0; i < 512; i++) {
			/** **/
			this.perm[i] = p[i & 255];
			/** **/
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
		return this.setScaleStep({ min: { min: this.min, max: this.max }, max: { min: this.min, max: this.max }, octaves: { min: 0, max: this.octaves }, frequency: { min: 0, max: this.frequency }, persistence: { min: 0, max: this.persistence } });
	}

	setScaleStep (config) {
		/** @description: sets the incriment step, min and max values for HTML5 range input **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} **/
		/** iterate over object **/
		for (var key in config) {
			/** confirm key is unique property **/
			if (config.hasOwnProperty(key)) {
				/** set the object key object to have an id **/
				config[key].id = key;
				/** set the step for next value to 1 if it is an integer otherwise use the lowest number of the float and set to 1 **/
				config[key].step = config[key].max % 1 ? parseFloat(config[key].max.toString().replace(/\d/g, '0').replace(/0$/, "1")) : 1;	
				/** set the value **/
				config[key].value = config[key].id === "min" ? config[key].min : this[key];					
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
		this.amplitude = 1;
		/** set base frequency for constructor **/
		this.frequency = config.frequency || 0.001;
		/** set base min for constructor **/
		this.min = !isNaN(config.min) ? config.min : -1.0;
		/** set base max for constructor **/
		this.max = !isNaN(config.max) ? config.max : 1.0;
		/** set base octaves for constructor **/
		this.octaves = parseInt(config.octaves) || 1;
		/** set base persistence for constructor **/
		this.persistence = config.persistence || 0.50;
		/** set base random calculator for constructor **/
		this.random = config.random || Math.random;
		/** set base scale for constructor **/
		this.scale = Simplex.scale;
		/** set base bias for constructor **/
		this.bias = config.bias || Simplex.bias;
		/** set base permutation **/
		this.seed();
	}
}


