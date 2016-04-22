'use strict';

import filesystem from 'fs';
import util from 'util';
import schedule from 'node-schedule';
import {db, logger} from '.';

var modules = {},
	actions = {},
	tasks = {},
	commands = [];

/**
 * Autoloader for ANIMAL bot modules
 * @class moduleLoader
 */
class moduleLoader {
	/**
	 * Load all modules
	 * @returns {object}
	 */
	loadModules() {
		var path = 'app/modules/',
			self = this;

		filesystem.readdirSync(path).forEach(function(moduleName) {
			if (!filesystem.existsSync(path + moduleName + '/module.js')) {
				return;
			}

			db.loadModels('modules/' + moduleName + '/models');

			modules[moduleName] = require('../modules/' + moduleName + '/module');
			modules[moduleName].init();
			// modules[moduleName] = new moduleClass();
			// modules[moduleName].init();
		});

		logger.info('Loaded modules %j', modules);
		return modules;
	}

	/**
	 * Registers an action
	 * @param {object} action
	 * @param {string} action.moduleName
	 * @param {string} action.name
	 * @param {(string|function)} action.matcher
	 * @param {(string|function)} action.callback
	 */
	registerAction(action) {
		if (!util.isFunction(action.callback)) {
			action.callback = modules[action.moduleName][action.callback];
		}

		if (!util.isFunction(action.matcher)) {
			action.matcher = modules[action.moduleName][action.matcher];
		}

		action.callback.bind(modules[action.moduleName]);
		action.matcher.bind(modules[action.moduleName]);

		actions[action.moduleName + '.' + action.name] = action;
	}

	/**
	 * Returns all registered actions
	 * @returns {object}
	 */
	getActions() {
		return actions;
	}

	/**
	 * Returns array of callbacks of matching actions
	 * @param {string} exp
	 * @returns {array}
	 */
	matchActions(exp) {
		var callbacks = [];

		for (var actionsName in actions) {
			if (actions[actionsName].matcher(exp)) {
				callbacks.push(actions[actionsName].callback(exp));
			}
		}

		return callbacks;
	}

	/**
	 * Register a new task
	 * @param {object} task
	 * @param {string} task.moduleName
	 * @param {string} task.name
	 * @param {*} task.interval
	 * @param {(string|function)} task.callback
	 */
	registerTask(task) {
		if (global.isCommandline) {
			return;
		}

		if (!util.isFunction(task.callback)) {
			task.callback = modules[task.moduleName][task.callback];
		}

		task._job = schedule.scheduleJob(task.interval, task.callback.bind(modules[task.moduleName]));
		tasks[task.moduleName + '.' + task.name] = task;
	}

	/**
	 * Returns all registered tasks
	 * @returns {object}
	 */
	getTasks() {
		return tasks;
	}

	/**
	 * Registers a command
	 * @param {object} command
	 * @param {string} command.moduleName
	 * @param {string} command.name
	 * @param {string} [command.description]
	 * @param {array} [command.attributes]
	 * @param {array} [command.options]
	 * @param {(string|function)} command.callback
	 */
	registerCommand(command) {
		if (!global.isCommandline) {
			return;
		}

		commands.push(command);
	}

	/**
	 * Returns all registed commands
	 * @returns {array}
	 */
	getCommands() {
		return commands;
	}
}

module.exports = exports = new moduleLoader();
