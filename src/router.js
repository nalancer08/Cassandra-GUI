/**
 * router.js
 *
 * Hash-based routing and navigation engine with fallback support for crappy browsers
 *
 * @package  ladybug.js
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.5
 * @license  MIT
 */

Ladybug.Router = Ladybug.Class.extend({
	callback: null,
	defaults: {
		onRouteChange: $.noop
	},
	init: function(options) {
		var obj = this,
			opts = $.extend(true, obj.defaults, options);
		//
		var cb = function() {
			var matches = location.hash.match(/([a-z0-9-_]+)/ig) || [],
				params = [];
			if (matches) {
				params.push(matches);
			}
			opts.onRouteChange.call(obj, matches);
		};
		var nativeSupport = (typeof Moderniz !== 'undefined' && Modernizr.hashchange) ? true : ('onhashchange' in window);
		if (nativeSupport) {
			// Natively supported
			if (window.addEventListener)
				window.addEventListener("hashchange", cb, false);
			else if (window.attachEvent)
				window.attachEvent("onhashchange", cb);
			else
				window.onhashchange = cb;
		} else {
			// Polyfill
			var hash = location.hash;
			var pf = function() {
				if (location.hash != hash) {
					hash = location.hash;
					cb();
				}
				setTimeout(pf, 200);
			};
			pf();
		}
		obj.callback = cb;
	},
	start: function() {
		this.callback.call();
	},
	navigate: function(route) {
		location.hash = '#' + route;
	}
});