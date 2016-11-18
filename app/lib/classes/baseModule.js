import { readFileSync } from 'fs';
import { resolve } from 'path';
import { db, logger, moduleLoader } from '..';

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
				readFileSync(resolve(process.cwd(), 'app/modules', this.moduleName, 'config.json'))
			);
		} catch (err) {
			logger.log('verbose', err);
		}
	}

	init() {}
}

module.exports = baseModule;
