'use strict';

var filesystem = require('fs'),
	path = require('path');

class baseModule {
	constructor() {
		this.moduleName = this.constructor.name;
		this.config = {};

		var configPath = path.resolve(__dirname, '../modules/' + this.moduleName + '/config.json');
		if (filesystem.existsSync(configPath)) {
			try {
				this.config = JSON.parse(
					filesystem.readFileSync(configPath)
				);
			} catch (e) {
				console.log('Error loading config.json', {moduleName: this.moduleName});
			}
		}

	}

	init() {}
}

module.exports = baseModule;