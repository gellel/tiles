class Base {

	/** @description: base type of class to extend shared child classes **/

	static __random__ (min, max, enumerable) {
		/** @description: create random number using range **/
		/** @param: min @type: {integer} **/
		/** @param: max @type: {integer} **/
		/** @param: enumerable @optional @type: {array} **/
		/** @return: s @type: {integer} or @type: {object} **/
		var result = Math.floor(Math.random() * (max - min + 1)) + min;
		/** return result **/
		return enumerable ? enumerable[result] : result;
	}

	static __object__ (config) {
		/** @description: create copy of config object **/
		/** @param: config @type: {object} **/
		/** @return: s @type: {object} or @type {class} **/
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
		/** @param: void **/
		/** @return: s @type: {object}
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
		/** @param: {config} @type: {object} **/
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
		/** @param: {config} @type: {object} **/
		/** confirm that config exists, is object type and has __init__ key then initialise with self **/
		if (config && config instanceof Object && config.__init__) this.__init__(config);
	}
}