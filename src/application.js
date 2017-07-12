/**
 * app.js
 *
 * The application class, uses the router and optionally the Facebook support module
 *
 * @package  ladybug.js
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.0
 * @license  MIT
 */

Ladybug.Application = Ladybug.Class.extend({
	defaultRoute: null,
	element: null,
	modules: null,
	module: null,
	router: null,
	templates: {},
	partials: {},
	init: function(options) {
		var obj = this,
			opts = $.extend(true, {
				defaultRoute: '/home',
				element: '',
				onDomReady: obj.onDomReady
			}, options);
		obj.defaultRoute = opts.defaultRoute;
		obj.onDomReady = opts.onDomReady;
		obj.element = typeof opts.element === 'string' ? $(opts.element) : opts.element;
		obj.modules = {};
		jQuery(document).ready(function($) {
			obj.onDomReady.call(obj, obj.element);
		});
		obj.router = new Ladybug.Router({
			onRouteChange: function(params) {
				if ( params[0] ) {
					var module = obj.modules[ params[0] ] || null;
					if (module) {
						obj.module = module;
						obj.element.attr('class', 'client cf page-' + params[0]);
						obj.module.onInit();
						obj.module.render(params);
						var title = obj.module.title() || Ladybug.Utils.titleCase(params[0]);
						document.title = title;
					}
				} else {
					this.navigate(obj.defaultRoute);
				}
			}
		});
	},
	onDomReady: function() {
		// Placeholder, override in your derived classes
	},
	registerModule: function(name, module) {
		var obj = this;
		obj.modules[name] = module
	},
	apiCall: function(options) {
		var obj = this,
			opts = $.extend(true, {
				endpoint: '/status',
				method: 'get',
				data: {},
				success: $.noop,
				error: $.noop
			}, options);
		if ( typeof constants === 'undefined' || typeof constants.apiUrl === 'undefined' || typeof constants.apiToken === 'undefined' ) {
			console.error('Please define apiUrl and apiToken in your global constants object');
		} else {
			$.ajax({
				url: constants.apiUrl + opts.endpoint + '/?token=' + constants.apiToken,
				type: opts.method,
				dataType: 'json',
				data: opts.data,
				success: function(response) {
					if (response && response.result == 'success') {
						opts.success.call(obj, response.data || {}, response.extra || {});
					} else {
						opts.error.call(obj, response.message || 'An error has ocurred, please try again later');
					}
				},
				error: function(xhr, status, error) {
					console.error('An error has ocurred: ' + error);
				}
			});
		}
	}
});