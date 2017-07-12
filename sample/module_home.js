ModuleHome = Ladybug.Module.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj._super(options);
	},
	onDomReady: function(params) {
		// Bind events and stuff
	},
	onRender: function(params) {
		var obj = this;
		app.element.html( obj.templates.page() );
	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-home');
	}
});