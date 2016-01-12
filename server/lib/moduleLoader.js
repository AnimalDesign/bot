// 'use strict';

var filesystem = require('fs'),
	modules = {},
	actions = {},
	tasks = {},
	events = {},
	commands = {};

var moduleLoader = function moduleLoader() {

	this.loadModules = function() {
		var path = 'server/lib/modules/'
			self = this;

		filesystem.readdirSync(path).forEach(function(moduleName) {
			if (!filesystem.existsSync(path + moduleName + '/module.js')) {
				return;
			}

			modules[moduleName] = require('./modules/' + moduleName + '/module');
			
			self._registerActions(moduleName, []);
			self._registerTasks(moduleName, []);
			self._registerEvents(moduleName, []);
			self._registerCommands(moduleName, []);

		});

		console.log('> Loaded modules', modules);
		return modules;
	}

	/**
	 * Registers actions
	 * @private
	 */
	this._registerActions = function(moduleName, actions) {

	};

	/**
	 * Registers recurring tasks
	 * @private
	 */
	this._registerTasks = function(moduleName, tasks) {

	};
	
	/**
	 * Registers events
	 * @private
	 */
	this._registerEvents = function(moduleName, events) {

	};

	/**
	 * Registers commands
	 * @private
	 */
	this._registerCommands = function(commands) {

	};

	if (moduleLoader.caller != moduleLoader.getInstance) {
		throw new Error('This object cannot be instanciated');
	}
}

moduleLoader.instance = null;
moduleLoader.getInstance = function() {
	if (this.instance === null) {
		this.instance = new moduleLoader();
	}
	return this.instance;
}

module.exports = moduleLoader.getInstance();