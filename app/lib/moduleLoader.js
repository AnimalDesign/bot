import { readdirSync, existsSync } from 'fs';
import { isFunction } from 'util';
import schedule from 'node-schedule';
import { db, logger } from '.';

/**
 * Autoloader for ANIMAL bot modules
 * @class moduleLoader
 */
class moduleLoader {
	constructor() {
		this.modules = {};
		this.actions = {};
		this.tasks = {};
		this.commands = [];
	}

	/**
	 * Load all modules
	 * @returns {object}
	 */
	loadModules() {
		const path = 'app/modules/';
		const self = this;

		readdirSync(path).forEach(function(moduleName) {
			if (!existsSync(path + moduleName + '/module.js')) {
				return;
			}

			db.loadModels('modules/' + moduleName + '/models');

			self.modules[moduleName] = require('../modules/' + moduleName + '/module');
			self.modules[moduleName].init();
			// modules[moduleName] = new moduleClass();
			// modules[moduleName].init();
		});

		logger.info('Loaded modules %j', this.modules);
		return this.modules;
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
		if (!isFunction(action.callback)) {
			action.callback = this.modules[action.moduleName][action.callback];
		}

		if (!isFunction(action.matcher)) {
			action.matcher = this.modules[action.moduleName][action.matcher];
		}

		action.callback.bind(this.modules[action.moduleName]);
		action.matcher.bind(this.modules[action.moduleName]);

		this.actions[action.moduleName + '.' + action.name] = action;
	}

	/**
	 * Returns all registered actions
	 * @returns {object}
	 */
	getActions() {
		return this.actions;
	}

	/**
	 * Returns array of callbacks of matching actions
	 * @param {string} exp
	 * @returns {array}
	 */
	matchActions(exp) {
		const callbacks = [];

		for (const actionsName in actions) {
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

		if (!isFunction(task.callback)) {
			task.callback = this.modules[task.moduleName][task.callback];
		}

		task._job = schedule.scheduleJob(task.interval, task.callback.bind(this.modules[task.moduleName]));
		this.tasks[task.moduleName + '.' + task.name] = task;
	}

	/**
	 * Returns all registered tasks
	 * @returns {object}
	 */
	getTasks() {
		return this.tasks;
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

		this.commands.push(command);
	}

	/**
	 * Returns all registed commands
	 * @returns {array}
	 */
	getCommands() {
		return this.commands;
	}
}

module.exports = exports = new moduleLoader();
