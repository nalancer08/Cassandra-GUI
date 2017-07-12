ModuleContact = Ladybug.Module.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj._super(options);
	},
	onDomReady: function(params) {
		// Bind events and stuff
		app.element.find('form').on('submit', function() {
			alert('Thanks for your comments');
			return false;
		});
	},
	onRender: function(params) {
		var obj = this;
		app.element.html( obj.templates.page() );
	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-contact');
		obj.partials.formContact = Ladybug.Utils.compileTemplate('#partial-form-contact');
	}
});