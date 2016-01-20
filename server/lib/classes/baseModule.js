'use strict';

var filesystem = require('fs'),
	path = require('path');

/**
 * Base class for modules
 * @class baseModule
 */
class baseModule {
	constructor() {
		this.moduleName = this.constructor.name;
		this.config = {};

		try {
			this.config = JSON.parse(
				filesystem.readFileSync(path.resolve(process.cwd(), 'server/modules', this.moduleName, 'config.json'))
			);
		} catch (e) {
			console.log('Error loading config.json', {
				moduleName: this.moduleName
			});
		}
	}

	init() {}
}

module.exports = baseModule;