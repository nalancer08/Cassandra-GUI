AppSample = Ladybug.FacebookApplication.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj._super(options);
	},
	onFacebookReady: function() {
		var obj = this;
		obj.router.start();
		// Compile partials
		obj.partials.formContact = Ladybug.Utils.compileTemplate('#partial-form-contact');
	}
});