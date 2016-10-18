class Base {

	/** @description: base type of class to extend shared child classes **/

	static __random__ (min, max, enumerable) {
		/** @description: create random number using range **/
		/** @param: {min} is type {integer} **/
		/** @param: {max} is type {integer} **/
		/** @param: {enumerable} is type {array} and @optional **/
		/** @return: is type {integer} or is type {object} **/
		var result = Math.floor(Math.random() * (max - min + 1)) + min;
		/** return result **/
		return enumerable ? enumerable[result] : result;
	}

	static __trim__ (config, trim) {
		/** @description: cleans unwanted property from object if found **/
		/** @param: {config} is type {object} **/
		/** @return: is type {object} **/
		/** clone object **/
		config = Base.__object__(config);
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

	static __contains__ (config, filter) {
		if (!config instanceof Object || !config instanceof Object) return false;
		/** @description: confirms if objects contains property **/
		/** @param: {config} is type {object} **/
		/** @param: {filter} is type {filter} **/
		/** @return: is type {boolean} **/
		/** iterate over object **/
		for (var key in filter) {
			/** confirm property is own type **/
			if (config.hasOwnProperty(key)) {
				/** filter type is an array **/
				if (filter[key] instanceof Array) {
					for (var i = 0; i < filter[key].length; i++) {
						/** match filter array to config key array **/
						if (config[key] instanceof Array) {
							for (var j = 0; j < config[key].length; j++) {
								if (config[key][j] === filter[key][i]) return true;
							}
						}
						/** match filter array to config object keys **/
						else if (config[key] instanceof Object) {
							for (var prop in config[key]) {
								if (config[key][prop] === filter[key][i]) return true;
							}
						}
						/** match key to key **/
						else {
							if (config[key] === filter[key][i]) return true;
						}
					}
				}
				/** filter type is object **/
				else if (filter[key] instanceof Object) {
					for (var filt in filter[key]) {
						/** match filter key to config array **/
						if (config[key] instanceof Array) {
							for (var j = 0; j < config[key].length; j++) {
								if (config[key][j] === filter[key][filt]) return true;
							}
						}
						else if (config[key] instanceof Object) {
							for (var prop in config[key]) {
								if (config[key][prop] === filter[key][filt]) return true;
							}
						}
						else {
							if (config[key] === filter[key][filt]) return true;
						}
					}
				}
				else {
					if (filter[key] === config[key]) return true;
				}
			}
		}
		return false;
	}

	static __object__ (config) {
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
	
	__this__ () {
		/** @description: create copy of this self property with object from this keys **/
		/** @return: is type {object}
		/** clone object using this as its prototype **/
		var self = this;
		/** set empty object to hold the clones keys **/
		var s = {};
		/** enumerate over keys in self **/
		for (var key in self) {
			/** confirm key is own property and not prototype **/
			if (self.hasOwnProperty(key)) {
				/** set s property to self key own property **/
				s[key] = self[key];
			}
		};
		/** complete object returned **/
		return s;	
	}

	__init__ (config) {
		/** @description: process configuration object and set properties to this **/
		/** @param: {config} is type {object} **/
		/** set base object **/
		config = config || {};
		/** set base init key **/
		config.__init__ = config.__init__ || false;
		/** enumerate over keys in config **/
		for (var key in config) {
			/** confirm key is own property and not prototype **/
			if (config.hasOwnProperty(key)) {
				/** set this property to config key own property **/
				this[key] = config[key];
			}
		}
	}

	constructor (config) {
		/** @description: initialise object this property using config object if supplied **/
		/** @param: {config} is type {object} **/
		/** confirm that config exists, is object type and has __init__ key then initialise with self **/
		if (config && config instanceof Object && config.__init__) this.__init__(config);
	}
}