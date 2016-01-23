'use strict';

var winston = require('winston');

module.exports = exports = new(winston.Logger)({
	exitOnError: false,
	transports: [
		new(winston.transports.File)({
			name: 'file-info',
			filename: 'server/logs/info.log',
			level: process.env.NODE_ENV || 'development' === 'development' ? 'verbose' : 'info'
		}),
		new(winston.transports.File)({
			name: 'file-error',
			filename: 'server/logs/error.log',
			level: 'error'
		}),
		new winston.transports.Console({
			level: 'warn',
			humanReadableUnhandledException: true,
			handleExceptions: true,
			colorize: true
		})
	]
});