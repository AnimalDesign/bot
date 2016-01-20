'use strict';

var path = require('path'),
	filesystem = require('fs'),
	http = require('http');

var db = require('./db');
var moduleLoader = require('./moduleLoader');

/**
 * Main class of the ANIMAL bot.
 * @class animalBot
 */
class animalBot {
	constructor(settings) {
		var defaults = {};

		try {
			defaults = JSON.parse(
				filesystem.readFileSync(path.resolve(process.cwd(), 'server', 'config.json'))
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
		this._connectDb();
		this._registerModules();
		this._startInterface();
	}

	/**
	 * Open connection to the database
	 */
	_connectDb() {
		db.connect('', '', '', {
			'dialect': 'sqlite',
			'storage': this.dbPath
		});

		// db.loadModels('models');
	}

	/**
	 * Autoloads modules
	 */
	_registerModules() {
		var modules = moduleLoader.loadModules();
		for (var moduleName in modules) {
			db.loadModels('lib/modules/' + moduleName + '/models');
		}
	}

	/**
	 * Start webserver
	 */
	_startInterface() {
		http.createServer(function(req, res) {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.write('Nothing yet.')
			res.end();
		}).listen(8000);

		console.log('> AnimalBot interface running on port 8000');
	};
}

module.exports = animalBot;