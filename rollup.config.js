import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

export default {
	entry: 'src/dom-diffing-pragmas.js',
	plugins: [
		babel(babelrc()),
		nodeResolve(),
		commonjs({
			namedExports: {
				'path-to-regexp': ['pathToRegexp']
			}
		})
	],
	external:['babelute', 'htsl-dom-diffing-pragmatics'],
	targets: [{
		dest: pkg.main,
		format: 'cjs',
		sourceMap: true
	}, {
		dest: pkg.module,
		format: 'es',
		sourceMap: true
	}]
};

