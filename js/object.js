class OBJECT {
	
	static trim (config, trim) {
		/** @description: cleans unwanted property from object if found **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} **/
		/** clone object **/
		config = OBJECT.create(config);
		/** enumerate over keys in trim **/
		for (var i = 0; i < trim.length; i++) {
			/** confirm key is own property and not prototype **/
			if (config.hasOwnProperty(trim[i])) {
				/** delete key **/
				delete config[trim[i]];			
			}
		}
		/** return edited clone **/
		return config;
	}

	static contains (config, filter) {
		/** @description: confirms if objects contains property **/
		/** @param: {config} is type {object} **/
		/** @param: {filter} is type {filter} **/
		/** @return: is type {boolean} **/
		/** handle arguments **/
		if (!config instanceof Object || !config instanceof Object) return false;
		/** iterate over object **/
		for (var key in filter) {
			/** confirm property is own type **/
			if (config.hasOwnProperty(key)) {
				/** filter type is an array **/
				if (filter[key] instanceof Array) {
					/** enumerate over array length **/
					for (var i = 0; i < filter[key].length; i++) {
						/** match filter array to config key array **/
						if (config[key] instanceof Array) {
							/** iterate over object **/
							for (var j = 0; j < config[key].length; j++) {
								/** confirm that object container item property **/
								if (config[key][j] === filter[key][i]) return true;
							}
						}
						/** match filter array to config object keys **/
						else if (config[key] instanceof Object) {
							/** iterate over object **/
							for (var prop in config[key]) {
								/** confirm that object container item property **/
								if (config[key][prop] === filter[key][i]) return true;
							}
						}
						/** match key to key **/
						else {
							/** confirm that object container item property **/
							if (config[key] === filter[key][i]) return true;
						}
					}
				}
				/** filter type is object **/
				else if (filter[key] instanceof Object) {
					/** iterate over object **/
					for (var filt in filter[key]) {
						/** match filter key to config array **/
						if (config[key] instanceof Array) {
							/** enumerate over array length **/
							for (var j = 0; j < config[key].length; j++) {
								/** confirm that object container item property **/
								if (config[key][j] === filter[key][filt]) return true;
							}
						}
						else if (config[key] instanceof Object) {
							/** iterate over object **/
							for (var prop in config[key]) {
								/** confirm that object container item property **/
								if (config[key][prop] === filter[key][filt]) return true;
							}
						}
						else {
							/** confirm that object container item property **/
							if (config[key] === filter[key][filt]) return true;
						}
					}
				}
				else {
					/** confirm that object container item property **/
					if (filter[key] === config[key]) return true;
				}
			}
		}
		return false;
	}

	static create (config) {
		/** @description: create copy of config object **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} or is type {class} **/
		/** set empty object to hold the clone keys **/
		var s = {};
		/** enumrate over keys in self **/
		for (var key in config) {
			/** confirm key is own property and not prototype **/
			if (config.hasOwnProperty(key)) {
				/** set s property to self key own property **/
				s[key] = config[key];
			}
		}
		/** set to class if provided **/
		if (config.__class__ && typeof config.__class__ === "function") s = new config.__class__(s);
		/** complete clone returned **/
		return s;
	}
}