var APP = {
	/**
	 * Holds data from the JSON config file
	 */
	ID: null,
	VERSION: null,
	LEGAL: {
		COPYRIGHT: null,
		TOS: null,
		PRIVACY: null,
	},
	COMPANY: "Appcelerator",
	TITLE: "",
	Settings: null,
	/**
	 * Setup the main content database
	 * @type {Object}
	 */
	MainWindow: null,
	/**
	 * Initialize the application
	 * NOTE: This should only be fired in index controller file and only once.
	 * @type {Function}
	 */
	init: function() {
		// TODO: Sanity Check to make sure globals are set properly
		// Global system Events
		Ti.Network.addEventListener('change', _.bind(this.networkObserverUpdate, this));
		Ti.App.addEventListener('pause', _.bind(this.exit, this));
		Ti.App.addEventListener('close', _.bind(this.exit, this));
		Ti.App.addEventListener('resume', _.bind(this.resume, this));
	},
	/**
	 * Global network event handler
	 * @param {Object} _event Standard Ti callback
	 */
	networkObserverUpdate: function(_event) {
		this.log('debug', 'APP.networkObserverUpdate');
	},
	/**
	 * Exit event observer
	 */
	exit: function() {
		this.log('debug', 'APP.exit');
	},
	/**
	 * Resume event observer
	 */
	resume: function() {
		this.log('debug', 'APP.resume');
	},
	/**
	 * Pause event observer
	 */
	pause: function() {
		this.log('debug', 'APP.pause');
	},
	/**
	 * Logger utility for console data
	 */
	log: function(_serverity, _msg) {
		switch(_serverity.toLowerCase()) {
			case 'debug':
				Ti.API.info(_msg);
				break;
			case 'error':
				Ti.API.error(_msg);
				break;
			case 'info':
				Ti.API.info(_msg);
				break;
			case 'log':
				Ti.API.log(_msg);
				break;
			case 'trace':
				Ti.API.trace(_msg);
				break;
			case 'warn':
				Ti.API.warn(_msg);
				break;
		}
	}
};

Alloy.Globals.formatDate = function(date) {
	var moment = require("alloy/moment");
	return moment(date).format("MM-DD-YYYY");
}
