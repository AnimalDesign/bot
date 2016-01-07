'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var db = require('./db');

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
	this._discoverHosts();
	this._startInterface();
};

/**
 * Open connection to the db
 * Updating tables (if necessary)
 * @private
 */
AnimalBot.prototype._connectDb = function() {
	db.setup('models', '', '', '', {
		'dialect': 'sqlite',
		'storage': this.dbPath
	});

	var sequelize = db.seq();
	sequelize
		.authenticate()
		.then(function() {
			console.info('> Connection has been established successfully.');
		}, function(err) {
			throw new Error(err);
		});

	sequelize
		.sync({
			force: true
		})
		.then(function() {
			console.info('> Database tables synced.');
		}, function(err) {
			throw new Error(err);
		});
};

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

/**
 * Discover devices inside the network
 * @private
 */
AnimalBot.prototype._discoverHosts = function() {
	// https://github.com/walchko/nodescan

	// sudo chmod u+s /usr/bin/arp-scan

	var Discover = require('./discover');
	var discover = new Discover();
	discover.getDevices().then(function(devices) {
		for (var key in devices) {
			var device = devices[key];
			console.log(device.ip);
			discover.getHostname(device.ip).then(function(hostname) {
				console.log(hostname);
			});
		}
	});
};

module.exports = AnimalBot;