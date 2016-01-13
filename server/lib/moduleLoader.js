'use strict';

var filesystem = require('fs'),
	modules = {},
	actions = {},
	tasks = {},
	events = {},
	commands = {};

var moduleLoader = function moduleLoader() {

	this.loadModules = function() {
		var path = 'server/lib/modules/',
			self = this;

		filesystem.readdirSync(path).forEach(function(moduleName) {
			if (!filesystem.existsSync(path + moduleName + '/module.js')) {
				return;
			}

			modules[moduleName] = require('./modules/' + moduleName + '/module');
			modules[moduleName].init();
		});

		console.log('> Loaded modules', modules);
		return modules;
	}

	/**
	 * Registers an action
	 */
	this.registerAction = function(moduleName, action) {

	};

	/**
	 * Registers a recurring task
	 */
	this.registerTask = function(moduleName, task) {

	};

	/**
	 * Registers event
	 */
	this.registerEvent = function(moduleName, event) {

	};

	/**
	 * Registers command
	 * @private
	 */
	this.registerCommand = function(moduleName, command) {

	};
}

module.exports = exports = new moduleLoader();