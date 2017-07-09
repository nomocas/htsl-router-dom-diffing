/*
 * @Author: Gilles Coomans
 */

import difPragmas from 'htsl-dom-diffing-pragmatics';
import router from 'htsl-router-core';

difPragmas.renderActions.router = function($tag, lexem /* args : location, router, props */ , component, frag) {
	const matched = lexem.matched = router.matchRoute(lexem.args[0], lexem.args[1]);
	if (matched) {
		lexem.developed = matched.route.render(matched.params, lexem.args[2]);
		difPragmas.render($tag, lexem.developed, component, frag);
	}
	lexem.witness = document.createComment('router');
	$tag.appendChild(lexem.witness);
};

difPragmas.difActions.router = function($tag, lexem /* args : location, router, props */ , olexem, component) {
	const matched = lexem.matched = router.matchRoute(lexem.args[0], lexem.args[1]);
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

difPragmas.removeActions.router = function($tag, lexem /* args : location, router, props  */ , component) {
	if (lexem.developed)
		difPragmas.remove($tag, lexem.developed, component);
};

export default {
	difPragmas,
	router
};

/**
 ***************************** String Pragmas
 */

// stringPragmas.pragmas.router = function(descriptor, args /* location, router, props  */ , component) {
// 	const matched = router.matchRoute(args[0], args[1]);
// 	if (matched)
// 		stringPragmas.$output(descriptor, matched.route.render(matched.params), component);
// };

/**
 ***************************** Dom Pragmas
 */

// domPragmas.pragmas.router = function($tag, args /* location, router, props  */ , component) {
// 	const matched = router.matchRoute(args[0], args[1]);
// 	if (matched)
// 		domPragmas.$output($tag, matched.route.render(matched.params), component);
// };
