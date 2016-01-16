'use strict';

var util = require('util'),
	path = require('path'),
	fs = require('fs'),
	http = require('http'),
	EventEmitter = require('events').EventEmitter;

var db = require('./db');
var moduleLoader = require('./moduleLoader');

var AnimalBot = function Constructor(settings) {
	this.settings = settings;
	this.settings.name = this.settings.name || 'animalbot';
	this.dbPath = (settings.dbPath || path.resolve(process.cwd(), 'server/data', 'animalbot.db'));
};

util.inherits(AnimalBot, EventEmitter);

/**
 * Run the bot
 * @public
 */
AnimalBot.prototype.run = function() {
	AnimalBot.super_.call(this, this.settings);

	this._connectDb();
	this._registerModules();
	this._startInterface();
};

/**
 * Open connection to the db
 * Updating tables (if necessary)
 * @private
 */
AnimalBot.prototype._connectDb = function() {
	db.connect('', '', '', {
		'dialect': 'sqlite',
		'storage': this.dbPath
	});

	// db.loadModels('models');
};

/**
 * Autoloads modules
 * @private
 */
AnimalBot.prototype._registerModules = function() {
	var modules = moduleLoader.loadModules();
	for (var moduleName in modules) {
		db.loadModels('lib/modules/' + moduleName + '/models');
	}
	
	db.createRelations();
	db.syncDatabase();
}

/**
 * Starting webserver
 * @private
 */
AnimalBot.prototype._startInterface = function() {
	http.createServer(function(req, res) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.write('Nothing yet.')
		res.end();
	}).listen(8000);

	console.log('> AnimalBot interface running on port 8000');
};

module.exports = AnimalBot;