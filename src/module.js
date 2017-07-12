/**
 * module.js
 *
 * Base module definition class, extend your modules from there
 *
 * @package  ladybug.js
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.0
 * @license  MIT
 */

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