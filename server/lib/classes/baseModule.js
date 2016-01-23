'use strict';

var filesystem = require('fs'),
	path = require('path');

/**
 * Base class for modules
 * @class baseModule
 */
class baseModule {
	constructor() {
		this.logger = require('../logger');
		this.moduleLoader = require('../moduleLoader');
		this.db = require('../db');

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