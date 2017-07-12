/**
 * ladybug.js
 *
 * A tiny yet powerful (and beautiful) framework for JS applications
 *
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.0
 * @license  MIT
 */

if ( typeof Ladybug === 'undefined' ) { Ladybug = {}; }

(function(){
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	Ladybug.Class = function(){};
	// Create a new Class that inherits from this class
	Ladybug.Class.extend = function(prop) {
		var _super = this.prototype;
		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
						// Add a new ._super() method that is the same method but on the super-class
						this._super = _super[name];
						// The method only need to be bound temporarily, so we remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		// Populate our constructed prototype object
		Class.prototype = prototype;
		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;
		// And make this class extendable
		Class.extend = arguments.callee;
		return Class;
	};
})();
Ladybug.Utils = {
	compileTemplate: function(selector) {
		var markup = $(selector).html() || 'Template '+ selector +' not found';
		return _.template(markup);
	},
	titleCase: function (str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
};
Ladybug.Module = Ladybug.Class.extend({
	templates: null,
	partials: null,
	renderFlags: 1,
	init: function(options) {
		var obj = this,
			opts = $.extend(true, {
				onInit: obj.onInit,
				onRender: obj.onRender,
				onDomReady: obj.onDomReady,
				onTitleRequest: obj.onTitleRequest,
				onPrepareTemplates: obj.onPrepareTemplates,
				templates: {},
				partials: {}
			}, options);
		obj.onInit = opts.onInit;
		obj.onRender = opts.onRender;
		obj.onDomReady = opts.onDomReady;
		obj.onTitleRequest = opts.onTitleRequest;
		obj.onPrepareTemplates = opts.onPrepareTemplates;
		obj.templates = opts.templates;
		obj.partials = opts.partials;
	},
	title: function() {
		var obj = this;
		return obj.onTitleRequest();
	},
	render: function(params) {
		var obj = this;
		obj.onPrepareTemplates(params);
		obj.onRender(params);
		_.defer(function() {
			obj.onDomReady(params);
		});
	},
	onInit: function(options) {
		// Placeholder, override in your derived classes
	},
	onRender: function(params) {
		// Placeholder, override in your derived classes
	},
	onDomReady: function(params) {
		// Placeholder, override in your derived classes
	},
	onPrepareTemplates: function() {
		// Placeholder, override in your derived classes
	},
	onTitleRequest: function() {
		return false;
	}
});
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
Ladybug.FacebookApplication = Ladybug.Application.extend({
	onDomReady: function(options) {
		var obj = this;
		if ( typeof constants === 'undefined' || typeof constants.fbAppId === 'undefined' ) {
			console.error('Please define fbAppId in your global constants object');
		} else {
			// Set Facebook SDK callback
			window.fbAsyncInit = function() {
				FB.init({
					appId: constants.fbAppId,
					xfbml: true,
					version: constants.fbVersion || 'v2.7'
				});
				// Facebook is ready, run callback
				obj.onFacebookReady();
			};
			// Include Facebook SDK
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	},
	onFacebookReady: function() {
		// Placeholder, override in your derived classes
	}
});
