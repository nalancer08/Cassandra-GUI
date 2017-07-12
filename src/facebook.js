/**
 * facebook.js
 *
 * Facebook support module, uses the Facebook JavaScript SDK 2.0
 *
 * @package  ladybug.js
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @version  1.0
 * @license  MIT
 */

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
