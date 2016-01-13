var filesystem = require('fs'),
	resolve = require('path').resolve,
	join = require('path').join,
	cp = require('child_process');

var lib = resolve(__dirname, '../lib/modules/')
filesystem.readdirSync(lib)
	.forEach(function(mod) {
		var path = join(lib, mod);

		// Ensure path is a module and has a package.json
		if (!filesystem.existsSync(join(path, 'package.json'))) {
			return;
		}

		// Install dependencies for  module
		cp.spawn('npm', ['i'], {
			env: process.env,
			cwd: path,
			stdio: 'inherit'
		});
	});