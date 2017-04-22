/*
 * @Author: Gilles Coomans
 */

import pathToRegexp from 'path-to-regexp';

function compil(routes) {
	const arr = [];
	for (const path in routes) {
		const keys = [];
		arr.push({ keys, path, render: routes[path], pattern: pathToRegexp(path, keys) });
	}
	return arr;
}

function matchURI(route, uri) {
	const match = route.pattern.exec(uri);
	if (!match) return null;
	const params = Object.create(null);
	for (let i = 1; i < match.length; i++)
		params[route.keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined;
	return params;
}

function matchRoute(location, routes) {
	console.log('match route  : ', location);
	let found = null;
	routes.some((route) => {
		const uri = location.error ? '/error' : location.pathname;
		const params = matchURI(route, uri);
		return params && (found = { route, params });
	});
	console.log('route match ? : ', found);
	return found;
}

export default {
	compil,
	matchURI,
	matchRoute
};

