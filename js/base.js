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
				/** confirm that this key is array **/
				if (filter[key] instanceof Array) {
					/** enumerate over array of this key **/
					for (var i = 0, items = filter[key]; i < items.length; i++) {
						/** confirm that this key is a match **/
						if (config[key] === items[i]) return false;
					}
				}
				/** confirm that this key is object **/
				else if (filter[key] instanceof Object) {
					/** iterate over object key **/
					for (var prop in filter[key]) {
						/** confirm that this key is a match **/
						if (config[key] === filter[key][prop]) return false;
					}
				}
				/** confirm that this key is a match **/
				else if (config[key] === filter[key]) {
					return false;
				}
			}
		}
		return true;
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