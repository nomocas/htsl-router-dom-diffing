# htsl-router

Router for [HTSL](https://github.com/nomocas/htsl-lexicon).

Only for dom-diffing for the moment.

work in progress.

## Routes Example


```javascript
import router from 'htsl-router';
import htmlLexicon from 'htsl-lexicon';

const h = htmlLexicon.initializer();

const routes = router.compil({
	'/': () => h.home(),
	'/admin/?:page': (props, params) => h.admin(props, params),
	'/reset-password': (props, params) => h.resetPassword(props, params),
	...
});


h.router(locationObject, routes, { myProps: 1 })...

```


## History Binding Example

```javascript
import createHistory from 'history/lib/createBrowserHistory';

const history = createHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
	// location is an object like window.location
	console.log(action, location.pathname, location.state)
})

// Use push, replace, and go to navigate around.
history.push('/home', { some: 'state' })

function render(location) {
	/* Render your app here */
}

render(history.location); // render the current URL

history.listen(render); // render subsequent URLs

// To stop listening, call the function returned from listen().
unlisten()
```

## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright 2017 (c) Gilles Coomans

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
