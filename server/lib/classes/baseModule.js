'use strict';

var filesystem = require('fs'),
	path = require('path'),
	logger = require('../logger'),
	db = require('../db'),
	moduleLoader = require('../moduleLoader');

/**
 * Base class for modules
 * @class baseModule
 */
class baseModule {
	constructor() {
		this.logger = logger;
		this.db = db;
		this.moduleLoader = moduleLoader;

		this.moduleName = this.constructor.name;
		this.config = {};

		try {
			this.config = JSON.parse(
				filesystem.readFileSync(path.resolve(process.cwd(), 'server/lib/modules', this.moduleName, 'config.json'))
			);
		} catch (err) {}
	}

	init() {}
}

module.exports = baseModule;