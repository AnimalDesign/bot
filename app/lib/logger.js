import winston from 'winston';

module.exports = exports = new winston.Logger({
	exitOnError: false,
	transports: [
		new winston.transports.File({
			name: 'file-info',
			filename: 'app/logs/info.log',
			level: process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'verbose' : 'info'
		}),
		new winston.transports.File({
			name: 'file-error',
			filename: 'app/logs/error.log',
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
