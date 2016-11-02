class Base {

	/** @description: base type of class to extend shared child classes **/
	
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
		if (config instanceof Object && config.__init__) this.__init__(config);
		/** set base class self method reference **/
		this.__self__ = this["__" + this.constructor.name.toLowerCase() + "__"];
	}
}