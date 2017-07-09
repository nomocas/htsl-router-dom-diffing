/*
* @Author: Gilles Coomans
* @Date:   2017-07-10 01:02:00
* @Last Modified by:   Gilles Coomans
* @Last Modified time: 2017-07-10 01:02:05
*/

'use strict';

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
	entry: 'src/index.js',
	plugins: [
		babel(babelrc()),
		nodeResolve(),
		commonjs()
	],
	external,
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

