'use strict';

import filesystem from 'fs';
import path from 'path';
import {db, logger, moduleLoader} from '..';

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
				filesystem.readFileSync(path.resolve(process.cwd(), 'app/lib/modules', this.moduleName, 'config.json'))
			);
		} catch (err) {}
	}

	init() {}
}

module.exports = baseModule;
