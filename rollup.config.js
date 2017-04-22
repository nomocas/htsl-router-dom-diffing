import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

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
  // external: external,
  targets: [{
    dest: pkg.main,
    format: 'umd',
    moduleName: '__MY__PROJECT__',
    sourceMap: true
  }, {
    dest: pkg.module,
    format: 'es',
    sourceMap: true
  }]
};

