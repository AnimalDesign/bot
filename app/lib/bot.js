import { version, description, homepage } from '../../package.json';
import { join } from 'path';
import { readFileSync } from 'fs';
import { db, moduleLoader } from '.';

/**
 * Main class of the ANIMAL bot.
 * @class bot
 */
class bot {
	constructor(settings) {
		let defaults = {};

		try {
			defaults = JSON.parse(
				readFileSync(join(process.cwd(), 'app', 'config.json'))
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

		const keepAlive = () => setTimeout(keepAlive, 1000);
		keepAlive();
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

		if (typeof process.env.NODE_ENV !== 'undefined') {
			process.stdout.write('  [' + process.env.NODE_ENV + ' mode]\n');
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

		const modules = moduleLoader.loadModules();

		db.createRelations();
		db.syncDatabase();
		process.stdout.write('  loaded ' + Object.keys(modules).length + ' modules.\n');
	}
}

module.exports = bot;
