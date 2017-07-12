// --------------------------------------------------------------------------------- webchimp -- //

GilletteApp = Ladybug.FacebookApplication.extend({
	user: null,
	bearer: null,
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onFacebookReady: function() {
		var obj = this;
		// Partials
		obj.partials.header = Ladybug.Utils.compileTemplate('#partial-header');
		obj.partials.footer = Ladybug.Utils.compileTemplate('#partial-footer');

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				FB.api('/me', { fields: 'id, name, first_name, last_name, email' }, function(response) {
					$.ajax({
						url: constants.siteUrl + '/login',
						type: 'post',
						dataType: 'json',
						data: {
							fbid: response.id,
							email: response.email || response.id + '@facebook.com',
							nicename: response.name,
							first_name: response.first_name,
							last_name: response.last_name
						},
						success: function(response) {
							if ( response && response.result == 'success' ) {
								app.user = response.data.user;
								app.bearer = response.data.bearer;

								// Start the router
								obj.router.start();

							} else {
								$.alert(response.message || 'Ha ocurrio un error');
							}
						}
					})

					console.log(response);
				});
			} else {

				// Start the router
				obj.router.start();
			}
		});
	},
	ajaxCall: function(type, endpoint, data, complete, success, error) {
		var data = data || {},
			success = success || false,
			error = error || false,
			complete = complete || false,
			errorMsg = 'Ya votaste por esta foto previamente';
		//
		data.bearer = app.bearer || '';
		//
		$.ajax({
			url: constants.siteUrl + endpoint,
			type: type,
			data: data,
			dataType: 'json',
			success: function(response) {
				if (complete) {
					complete(response);
				}
				if (response && response.result == 'success') {
					if (success) {
						success(response.data);
					}
				} else {
					if (error) {
						error(response.message || errorMsg);
					} else {
						$.alert(response.message || errorMsg);
					}
				}
			}
		});
	},
	bindGlobals: function() {

		$('.site-header .hamburger').on('click', function(event) {
			event.preventDefault();
			$('.site-header .menu').slideToggle();
		});

		$('form[data-submit=validate]').on('submit', function() {
			var form = $(this);
			return form.validate({
				error: function(fields) {
					fields.each(function() {
						var field = $(this);
						field.closest('.form-group').addClass('has-error');
						field.on('focus', function() {
							field.closest('.form-group').removeClass('has-error');
							field.off('focus');
						});
					});
				}
			});
		});

		$('form[data-submit=ajax]').each(function() {
			var form = $(this);
			form.ajaxForm({
				dataType: 'json',
				beforeSubmit: function() {
					return form.validate({
						success: function() {
							form.find('input, select').prop({ disabled: true });
							form.find('button[type=submit]').prop({ disabled: true }).loading({ text: 'Enviando...' });
						},
						error: function(fields) {
							fields.each(function() {
								var field = $(this);
								field.closest('.form-group').addClass('has-error');
								field.on('focus', function() {
									field.closest('.form-group').removeClass('has-error');
									field.off('focus');
								});
							});
						}
					});
				},
				success: function(response) {
					form.clearForm();
					form.find('input, select').prop({ disabled: false });
					form.find('button[type=submit]').prop({ disabled: false }).loading('done');
					$.alert('Gracias por tus comentarios');
				}
			});
		});

		//MagnificPopup
		$('[data-popup=ajax]').magnificPopup({ type: 'ajax' });
		$('[data-popup=image]').magnificPopup({ type: 'image' });
		$('[data-popup=inline]').magnificPopup({ type: 'inline' });
		$('[data-popup=gallery]').magnificPopup({ type: 'gallery', gallery: { enabled: true } });

		// Compartir Promo
		$('.compaertir-promo').on('click', function(event) {
			event.preventDefault();

			FB.ui({
				method: 'share',
				display: 'popup',
				href: constants.siteUrl,
			}, function(response){});
		});
	},

	runVelocity: function(elements, complete) {
		var obj = this,
			complete = complete || $.noop,
			elements = elements || $('[data-animate=auto]'),
			pending = elements.length;
		elements.each(function() {
			var el = $(this),
				delay = el.data('delay') || 0,
				transition = el.data('transition') || 'transition.fadeIn';
			el.velocity(transition, {
				delay: delay,
				complete: function() {
					pending--;
					if (pending <= 0) {
						complete.call(obj);
					}
				}
			});
		});
	}
});

// --------------------------------------------------------------------------------- webchimp -- //

GilletteModule = Ladybug.Module.extend({
	onRender: function(params, callback) {
		var obj = this;
		app.element.html( obj.templates.page() );
		$('.block-content').velocity('transition.slideUpIn', {
			duration: 500,
			complete: function() {
				callback.call(obj);
			}
		});
	}
});

// --------------------------------------------------------------------------------- webchimp -- //

ModuleHome = GilletteModule.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {
		var obj = this;
		app.bindGlobals();

		// Jala las fotos del home
		app.ajaxCall('post', '/get_home_photos', {},
			function() {

			},
			function(response) {

				var num = 0;

				_.each(response, function(photo, k){
					if(!photo.user) return;
					if(num < 6) {
						$('.fotos .row').append('<div class="col col-4 col-md-6 col-sm-6 foto"><img class="img-responsive" src="'+ photo.photo +'" alt=""></div>');
						num++;
					}
				});
			}
		);

		$('.js-connect').on('click', function(event) {
			event.preventDefault();
			FB.login(function(response){
				if (response.authResponse) {
					FB.api('/me', { fields: 'id, name, first_name, last_name, email' }, function(response) {
						$.ajax({
							url: constants.siteUrl + '/login',
							type: 'post',
							dataType: 'json',
							data: {
								fbid: response.id,
								email: response.email || response.id + '@facebook.com',
								nicename: response.name,
								first_name: response.first_name,
								last_name: response.last_name
							},
							success: function(response) {
								if ( response && response.result == 'success' ) {
									app.user = response.data.user;
									app.bearer = response.data.bearer;


									if ( app.user && app.user.photo.length ) {
										app.router.navigate('/comparte');
									} else if ( app.user ) {
										app.router.navigate('/juego');
									}

								} else {
									$.alert(response.message || 'Ha ocurrio un error');
								}
							}
						});

						console.log(response);
					});
				} else {
					$.alert("Debes autorizar la aplicación la aplicación para poder continuar");
				}
			}, { scope: 'email' });
		});

	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-home');
	}
});

// --------------------------------------------------------------------------------- webchimp -- //

ModuleJuego = GilletteModule.extend({
	init: function(options) {
		var obj = this;

		// Call parent's constructor
		obj.parent(options);

	},
	onDomReady: function(params) {
		var obj = this;
		app.bindGlobals();
		$('[name=marco]').val('');

		//Seccion Juego
		var form_subir_foto = $('.form-subir-foto');

		var input_image = $('.input-image');
		var button_subir = $('.button-subir');
		var uploaded_foto = $('.uploaded-foto');

		var aviso = $('.aviso');
		var finalizar = $('.finalizar');

		button_subir.on('click', function(event) {
			event.preventDefault();
			var el = $(this);

			input_image.trigger('click');
		});

		input_image.change(function(){
			readImage(this);
			button_subir.text("CAMBIAR FOTO");
		});

		finalizar.on('click', function(event) {
			event.preventDefault();

			if(!$('[name=marco]').val()) {

				$.alert("Debes elegir un marco para continuar.");
				return false;
			}

			if ( !aviso.prop('checked') ) {

				$.alert("Debes aceptar los términos y condiciones para continuar.");
				return false;
			}

			if ( aviso.prop('checked') && $('[name=marco]').val() ) {
				form_subir_foto.ajaxSubmit({
					success: function(response) {
						if ( response && response.result == 'success' ) {

							app.user.photo = response.data.photo;
							app.router.navigate('/comparte');

						} else {
							$.alert(response.message || "Ha ocurrido un error");
						}
					}
				});
			} else {
				$.alert("Debes elegir un marco y aceptar términos y condiciones");
			}
		});

		$('.js-marco').on('click', function(event) {

			event.preventDefault();
			var el = $(this),
				marco = el.data('marco');

			$('.js-marco').removeClass('selected');
			el.addClass('selected');
			$('[name=marco]').val(marco);
		});


		function readImage(input) {
			if (input.files && input.files[0]) {

				var reader = new FileReader();
				reader.onload = function (e) {

					imagen64 = e.target.result;
					$('#imagen64').val(e.target.result);
					uploaded_foto.attr('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0]);
			}
		}


	},
	onRender: function(params, callback) {
		var obj = this;
		if (! app.user ) {
			app.router.navigate('/');
		} else if ( app.user && app.user.photo.length ) {
			app.router.navigate('/comparte');
		} else {
			obj.parent(params, callback);
		}

	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-juego');
	}
});


// --------------------------------------------------------------------------------- webchimp -- //

ModuleComparte = GilletteModule.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {
		var obj = this;
		app.bindGlobals();

		var button_fb_comparte = $('.facebook-comparte');
		var button_votar_foto = $('.boton-votar');

		button_fb_comparte.on('click', function(event) {
			event.preventDefault();

			FB.ui({
				method: 'share',
				display: 'popup',
				href: constants.siteUrl,
			}, function(response){});
		});

		// Jala las fotos del home
		app.ajaxCall('post', '/get_votes', {user_id:app.user.id},
			function() {

			},
			function(response) {
				$('.numero-votos').text(response.data.cuenta + ' VOTOS' );
				// console.log(response.data.cuenta);
			}
		);

		$('.button-copiar-url').on('click', function(event) {

			event.preventDefault();
			var clipboard = new Clipboard('.button-copiar-url');

			clipboard.on('success', function(e) {
				$.alert('Liga copiada');
				e.clearSelection();
			});
		});

		button_votar_foto.on('click', function(event) {
			event.preventDefault();

			$.ajax({
				url: constants.siteUrl + '/login',
				type: 'post',
				dataType: 'json',
				data: {
					fbid: response.id,
					email: response.email || response.id + '@facebook.com',
					nicename: response.name,
					first_name: response.first_name,
					last_name: response.last_name
				},
				success: function(response) {
					if ( response && response.result == 'success' ) {
						app.user = response.data.user;
						app.bearer = response.data.bearer;

						if ( app.user && app.user.photo ) {
							app.router.navigate('/comparte');
						} else if ( app.user ) {
							app.router.navigate('/juego');
						}

					} else {
						$.alert(response.message || 'Ha ocurrio un error');
					}
				}
			});


		});

	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-comparte');
	}
});


// --------------------------------------------------------------------------------- webchimp -- //

ModuleTodos = GilletteModule.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {
		var obj = this;
		var votoActual;
		app.bindGlobals();

		$('.js-votar-img').on('click', function(event) {
			event.preventDefault();
			var el = $(this);

			el.find('.js-votar').trigger('click');
		});

		$('.todos').on('click', '.js-votar', function(event) {
			event.preventDefault();
			var el = $(this),
				id = el.data('id'),
				src = el.data('src'),
				photo_id = el.data('photo-id'),
				votes = el.data('votes');
				nicename = el.data('nice');

			$.magnificPopup.open({
				items: [{ type: 'inline', src: '#foto' }],
				callbacks: {
					open: function() {
						$('.js-votar-mp').data('id', id);
						$('.js-votar-mp').data('photo-id', photo_id);
						$('.foto-mp').attr('src', src);
						$('.votar-share').data('share', src);

						$('.votos-numero').data('num-voto', photo_id);
						$('.votos-numero').attr('data-num-voto', photo_id);

						$('.votos-numero').html(votes);
						$('.user.user-mp').html(nicename);
					},
					close: function() {}
				 }
			});
		});

		$('.js-votar-mp').on('click', function(event) {
			event.preventDefault();
			var el = $(this),
				photo_id = el.data('photo-id');

			// Votamos
			app.ajaxCall('post', '/make_vote', { bearer:app.bearer, photo_id: photo_id },
				function() {
				},
				function(response) {
					console.log(response.cuenta);
					$.alert('Tu voto se ha registrado');
					$('[data-num-voto=' + photo_id + ']').text(response.cuenta);
				}
			);
		});

		//  Share de afuera
		$('body').on('click', '.votar-share', function(event) {
			event.preventDefault();

			var el = $(this);
			var liga = el.data('share');

			FB.ui({
				method: 'share',
				display: 'popup',
				href: liga,
			}, function(response){});
		});

		$('body').on('click', '.votar-share-out', function(event) {
			event.preventDefault();
			var el = $(this);
			var liga = el.data('share');

			FB.ui({
				method: 'share',
				display: 'popup',
				href: liga,
			}, function(response){});
		});

		// Jala las fotos del home
		app.ajaxCall('post', '/get_home_photos', {},
			function() {

			},
			function(response) {

				_.each(response, function(photo){

					if(!photo.user) return;
					$('.todos').append( obj.partials.singlePhoto({ photo:photo }) )
				});

			}
		);

		// $('.foto')

	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-todos');
		obj.partials.singlePhoto = Ladybug.Utils.compileTemplate('#partial-single-photo');
	}
});


// --------------------------------------------------------------------------------- webchimp -- //

var app;
app = new GilletteApp({
	element: '#ladybug-root'
});
app.registerModule('home', new ModuleHome);
app.registerModule('juego', new ModuleJuego);
app.registerModule('comparte', new ModuleComparte);
app.registerModule('todos', new ModuleTodos);

(function($) {
	$.extend(true, $.alert.defaults, {
		buttonMarkup: '<button class="button button-primary"></button>',
		buttons: [
			{ text: 'Aceptar', action: $.alert.close }
		]
	});
})(jQuery);

// --------------------------------------------------------------------------------- webchimp -- //