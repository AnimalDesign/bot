'use strict';

import { version, description, homepage } from '../../package.json';
import { join } from 'path';
import filesystem from 'fs';
import { db, logger, moduleLoader } from '.';

/**
 * Main class of the ANIMAL bot.
 * @class animalBot
 */
class animalBot {
	constructor(settings) {
		var defaults = {};

		try {
			defaults = JSON.parse(
				filesystem.readFileSync(join(process.cwd(), 'app', 'config.json'))
			);
		} catch (err) {
			console.log('Error loading config.json', err);
		}

		this.settings = Object.assign({}, defaults, settings);
	}

	/**
	 * Run the bot
	 */
	run() {
		this._welcome();
		this._connectDb();
		this._registerModules();

		var keepAlive = () => setTimeout(keepAlive, 1000);
	}

	_welcome() {
		process.stdout.write('\n' +
			'  ╔═╗╔╗╔╦╔╦╗╔═╗╦    ┌┐ ┌─┐┌┬┐\n' +
			'  ╠═╣║║║║║║║╠═╣║    ├┴┐│ │ │ \n' +
			'  ╩ ╩╝╚╝╩╩ ╩╩ ╩╩═╝  └─┘└─┘ ┴ v' + version + '\n'
		);

		process.stdout.write(
			'  ' + description + '\n' +
			'  ' + homepage + '\n\n'
		);

		if (process.env.NODE_ENV === 'development') {
			process.stdout.write('  [development mode]\n');
		}
	}

	/**
	 * Open connection to the database
	 */
	_connectDb() {
		db.connect({
			'dialect': 'sqlite',
			'storage': join(process.cwd(), this.settings.dbPath)
		});

		db.loadModels('models');
	}

	/**
	 * Autoloads modules
	 */
	_registerModules() {
		process.stdout.write('  - Loading Modules..');

		var modules = moduleLoader.loadModules();

		db.createRelations();
		db.syncDatabase();
		process.stdout.write('  loaded ' + Object.keys(modules).length + ' modules.\n');
	}
}

module.exports = animalBot;
