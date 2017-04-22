/*
 * @Author: Gilles Coomans
 */

import difPragmas from 'htsl-dom-diffing-pragmatics';
import routes from './routes';

import htmlLexicon from 'htsl-lexicon';
htmlLexicon.addAtoms(['router']);

// example : h.router(location, routes, ?props);

difPragmas.renderActions.router = function($tag, lexem /* args : location, routes, props */ , component, frag) {
	const matched = lexem.matched = routes.matchRoute(lexem.args[0], lexem.args[1]);
	if (matched) {
		lexem.developed = matched.route.render(matched.params, lexem.args[2]);
		difPragmas.render($tag, lexem.developed, component, frag);
	}
	lexem.witness = document.createComment('router');
	$tag.appendChild(lexem.witness);
};

difPragmas.difActions.router = function($tag, lexem /* args : location, routes, props */ , olexem, component) {
	const matched = lexem.matched = routes.matchRoute(lexem.args[0], lexem.args[1]);
	lexem.witness = olexem.witness;
	if (matched) {
		lexem.developed = matched.route.render(matched.params, lexem.args[2]);
		if (!olexem.matched || olexem.matched.route.path !== matched.route.path) {
			if (olexem.developed)
				difPragmas.remove($tag, olexem.developed, component);
			const frag = document.createDocumentFragment();
			difPragmas.render($tag, lexem.developed, component, frag);
			$tag.insertBefore(frag, lexem.witness);
		} else
			difPragmas.dif($tag, lexem.developed, olexem.developed, component);
	} else if (olexem.developed)
		difPragmas.remove($tag, olexem.developed, component);
};

difPragmas.removeActions.router = function($tag, lexem /* args : location, routes, props  */ , component) {
	if (lexem.developed)
		difPragmas.remove($tag, lexem.developed, component);
};

export default {
	difPragmas,
	routes
};

/**
 ***************************** String Pragmas
 */

// stringPragmas.pragmas.router = function(descriptor, args /* location, routes, props  */ , component) {
// 	const matched = routes.matchRoute(args[0], args[1]);
// 	if (matched)
// 		stringPragmas.$output(descriptor, matched.route.render(matched.params), component);
// };

/**
 ***************************** Dom Pragmas
 */

// domPragmas.pragmas.router = function($tag, args /* location, routes, props  */ , component) {
// 	const matched = routes.matchRoute(args[0], args[1]);
// 	if (matched)
// 		domPragmas.$output($tag, matched.route.render(matched.params), component);
// };
