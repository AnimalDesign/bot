var filesystem = require('fs'),
	resolve = require('path').resolve,
	join = require('path').join,
	cp = require('child_process');

var lib = resolve(__dirname, '../app/modules/')
filesystem.readdirSync(lib)
	.forEach(function(mod) {
		var path = join(lib, mod);

		// Ensure path is a module and has a package.json
		if (!filesystem.existsSync(join(path, 'module.js')) || !filesystem.existsSync(join(path, 'package.json'))) {
			return;
		}

		// Create a symlink to the main node_modules folder
		// Workaround, as npm does not allow to specify a custom install folder
		filesystem.symlinkSync(join(process.cwd(), 'node_modules'), join(path, 'node_modules'));

		// Install dependencies for module
		cp.spawnSync('npm', ['i'], {
			env: process.env,
			cwd: path,
			stdio: 'inherit'
		});

		// Remove symlink
		filesystem.unlinkSync(join(path, 'node_modules'));
	});