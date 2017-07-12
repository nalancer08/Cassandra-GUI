/**
 * utils.js
 *
 * Utility and helper functions
 *
 * @package  ladybug.js
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.0
 * @license  MIT
 */

Ladybug.Utils = {
	compileTemplate: function(selector) {
		var markup = $(selector).html() || 'Template '+ selector +' not found';
		return _.template(markup);
	},
	titleCase: function (str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
};