'use strict';
//https://github.com/walchko/nodescan/blob/master/lib/getHostName.js


var spawn = require('child_process');

var DEFAULTS = {
	command: 'arp-scan',
	args: ['-l'],
	parser: parse
};

function parse(out) {
	return function lineParser(line) {
		var chunks = line.split('\t');
		out.push({
			ip: chunks[0],
			mac: (chunks[1] || '').toUpperCase(),
			vendor: chunks[2],
			timestamp: Date.now()
		});
	}
}

var discover = function discover() {
	this.getDevices = function() {
		var devices = [];
		return new Promise(function(response, reject) {
			spawn.exec('arp-scan -l', function(err, stdout, stderr) {
				if (err) {
					console.log('child processes failed with error code: ' +
						err.code + stderr);
				}
				var net = stdout.split('\n');
				for (var i = 2; i < net.length - 4; i++) {
					var chunk = net[i].split('\t');
					devices.push({
						'ip': chunk[0],
						'mac': chunk[1].toUpperCase(),
						'vendor': chunk[2]
					});
				}

				response(devices);
			});
		});
	};

	this.getHostname = function(ip) {
		return new Promise(function(resolve, reject) {
			var hostname = '';
			spawn.exec('avahi-resolve-address ' + ip + " | awk '{print $2}'", function(err, stdout, stderr) {
				if (err) debug('[' + ip + ' hostname not found]: ' + stderr);
				else hostname = stdout;
				resolve(hostname);
			});

		});
	}
}

module.exports = discover;