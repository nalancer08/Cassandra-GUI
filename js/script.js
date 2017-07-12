// --------------------------------------------------------------------------------- webchimp -- //

DuApp = Ladybug.Application.extend({
	
	init: function(options) {

		var obj = this;
 		// Call parent's constructor
		obj.parent(options);
		obj.defaultRoute = '/login'; // Overriding home defualt route to login route
		obj.user = ( typeof user !== 'undefined' ) ? user : undefined;
		obj.bearer = ( typeof bearer !== 'undefined' ) ? bearer : undefined;
		if ( typeof initRedirect !== 'undefined' ) {
			obj.redirect = initRedirect;
			obj.defaultRoute = initRedirect;
			
		}
	},
	onDomReady: function() {
		var obj = this;
		// Start the router
		obj.partials.header = Ladybug.Utils.compileTemplate('#partial-header');
		obj.partials.footer = Ladybug.Utils.compileTemplate('#partial-footer');
		obj.router.start();
	},
	bindGlobals: function() {

		$('.open-menu').on('click', function(e){

			e.preventDefault();
			$('.sidenav-custom').css("width", "250px");
			$('.push-area').css("margin-left", "250px");
		});

		$('.close-menu').on('click', function(e){

			e.preventDefault();
			$('.sidenav-custom').css("width", "0px");
			$('.push-area').css("margin-left", "0px");
		});

		//MagnificPopup
		$('[data-popup=ajax]').magnificPopup({ type: 'ajax' });
		$('[data-popup=image]').magnificPopup({ type: 'image' });
		$('[data-popup=inline]').magnificPopup({ type: 'inline' });
		$('[data-popup=gallery]').magnificPopup({ type: 'gallery', gallery: { enabled: true } });

	},
	CryptoJSAesJson: {

		stringify: function (cipherParams) {

			var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
			if (cipherParams.iv) j.iv = cipherParams.iv.toString();
			if (cipherParams.salt) j.s = cipherParams.salt.toString();
			return JSON.stringify(j);
		},
		parse: function (jsonStr) {
			var j = JSON.parse(jsonStr);
			var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
			if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
			if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
			return cipherParams;
		}
	},
	inView: function(el) {

		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
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
	},
	checkLogin: function() {

		var obj = this;

		if ( this.user != undefined && this.bearer != undefined ) {
			return true;
		}
		return false;
	}
}); 


// --------------------------------------------------------------------------------- webchimp -- //

DuModule = Ladybug.Module.extend({

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

ModuleLogin = DuModule.extend({

	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {

		var obj = this;
		app.bindGlobals();

		if ( app.checkLogin() ) {
			$('body').removeClass('login'); // Fix to make it full screen, only in this module
			app.router.navigate('/home');
		}

		$('body').addClass('login'); // Fix to make it full screen, only in this module
		$('.button-login').on('click', function(e){

			e.preventDefault();

			var token = '20747630d1e1b9ffa4993a11a96d2c3e0f4f8fe6256d9f4c176b69a02481291b.be72d1a7d3f0b1c52d95089056f202fe';
			
			var user = $('.user').val();
			var pass = $('.pass').val();
			// pass = CryptoJS.AES.encrypt(pass, app.token, {format: app.CryptoJSAesJson});

			$.ajax({

				url: 'http://localhost/appbuilders/apis/du/login/?token=' + token,
				type: 'post',
				dataType: 'json',
				data: {
					user: user,
					pass: pass.toString()
				},
				success: function(response) {

					if ( response && response.result == 'success' ) {

						app.user = response.data.user;
						app.bearer = response.data.bearer;

						$('body').removeClass('login'); // Fix to make it full screen, only in this module
						app.router.navigate('/home');

					} else {
						$.alert(response.message || 'Ha ocurrio un error');
					}
				}
			});


			//$('body').removeClass('login'); // Fix to make it full screen, only in this module
			// app.redirect = '/home';
			//app.router.navigate('/home');

		});

	},
	onPrepareTemplates: function(params) {
		
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-login');
	}
});


ModuleHome = DuModule.extend({

	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {

		var obj = this;
		$('body').removeClass('login'); // Fix to make it full screen, only in this module
		app.bindGlobals();
		var flow = $('.projects_flow');

		if ( !app.checkLogin() ) {
			app.router.navigate('/login');
		
		} else {

			/** Asking for projects **/
			$.ajax({
				url: app.api + '/projects/' + app.user +  '?token=' + app.token,
				type: 'post',
				data: {
				dataType: 'json',
					bearer: app.bearer
				},
				success: function(response) {

					if ( response && response.result == 'success' ) {
						
						if ( response.result == "success" ) { // API respond correctly

							var projects = response.data;

							if ( projects.length <= 0 ) {
								$.alert("Tu no cuentas aún con proyectos, crea uno");
							}

							_.each(projects, function(project){

								flow.append( obj.partials.singleProject({ project:project }) );
							});
						}

					} else {
						$.alert(response.message || 'Ha ocurrio un error');
					}
				}
			});
		}


		// flow.masonry({

		// 	// columnWidth: 0,
		// 	percentPosition: true,
		// 	colomnWidth: '.col.col-2',
		// 	itemSelector: '.elemento'
		// });

		
		$('.projects_flow').on('click', '.navegate_task', function(e){

			e.preventDefault();

			var el = $(this);
			var project_id = el.data('project');
			app.actualProject = project_id;
			app.router.navigate('/tasks');
		});

		$('.button-new-project').on('click', function(e){

			e.preventDefault(); // Stoping routing

			var el = $(this);
			var name = $('.project-name').val();;
			var description = $('.project-description').val();;

			if ( name == "" || description == "" ) {

				$.alert("Amig@ necesitas darle un nombre y decirnos de que trata esta gran idea, para poder crearla");
				return;
			}
			$.magnificPopup.close(); // Closing the popup

			if ( app.user ) {

				$.post("http://localhost/appbuilders/apis/du/project/new", {

					user_id: app.user.id,
					name: name,
					description: description
				},

				function(data, status){

					if ( data.result == "success" ) { // API respond correctly

						$('.section-popup-new-project-form')[0].reset(); // Cleaning form
						var project = data.data;
						flow.append( obj.partials.singleProject({ project:project }) );
						
					} else {
						$.alert("Ha ocurrido un error creando tu proyecto, reintentalo porfavor");
					}
				});
			} else {
				$.alert("Debes iniciar sesion antes de crear un proyecto");
				app.router.navigate('/login');
			}
		});

	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-home');
		obj.partials.singleProject = Ladybug.Utils.compileTemplate('#partial-single-project');
	}
});


ModuleTasks = DuModule.extend({

	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {

		var obj = this;
		app.bindGlobals();

		// var tasks = $('.cbp_tmtimeline li');

		if ( !app.checkLogin() ) {
			app.router.navigate('/login');
		} else if ( app.actualProject != undefined ) {

			$.ajax({

				url: "http://localhost/appbuilders/apis/du/tasks/" + app.actualProject,
				success: function(data) {


					if ( data.result == "success" ) { // API respond correctly

						var tasks = data.data;
						var duration = (tasks.length > 12) ? 100 : 200;
						var iteration = 1;

						// console.log(tasks);
						// console.log("Template String: " + obj.partials.singleTask);

						_.each(tasks, function(task){

							var globalDate = task.modified;
							task.modified = globalDate.substring(0, 10);
							task.hour = globalDate.substring(11, 16);

							// console.log(task);
							$('.cbp_tmtimeline').append( obj.partials.singleTask({ task:task }) );

							$('.task-id-' + task.id).animate({
								left: "0px",
							}, {
								duration: duration * iteration, 
								easing: "linear"
							});

							iteration = iteration + 1;
						});
					
					} else {

						$.alert("No hay tareas que mostrar, crea una");
					}
					
				}
			});
		
		} else {
			app.router.navigate('/home');
		}


		$(document).keypress(function(e){
			if (e.which == 110) {
				$('.origin-new-task').trigger('click');
				$("input:text:visible:first").focus();
			}
		});


		/** Bindinds dinamically **/
		$('.cbp_tmtimeline').on('mouseover', '.cbp_tmicon-complete', function() {

			var el = $(this);
			var i = el.find('i');

			i.removeClass('fa-check');
			i.addClass('fa-times');
		});

		$('.cbp_tmtimeline').on('mouseout', '.cbp_tmicon-complete', function() {
			
			var el = $(this);
			var i = el.find('i');

			i.removeClass('fa-times');
			i.addClass('fa-check');
		});

		$('.cbp_tmtimeline').on('mouseover', '.cbp_tmicon-incomplete', function() {

			var el = $(this);
			var i = el.find('i');

			i.removeClass('fa-refresh');
			i.addClass('fa-check');
		});

		$('.cbp_tmtimeline').on('mouseout', '.cbp_tmicon-incomplete', function() {
			
			var el = $(this);
			var i = el.find('i');

			i.removeClass('fa-check');
			i.addClass('fa-refresh');
		});

		$('.cbp_tmtimeline').on('click', '.button-refresh-task-status', function(e){

			e.preventDefault();

			var el = $(this);
			var taskDiv = el.closest('li');
				var task_id = taskDiv.data('id');
			var parentDiv = el.closest('div');
				var i = parentDiv.find('i');
			var labelDiv = taskDiv.find('.cbp_tmlabel');

			$.ajax({
				url: "http://appbuilders.com.mx/apis/du/task/check/" + task_id, 
				success: function(data) {

					// console.log(data);

					if ( data.result == "success" ) { // API respond correctly

						var task = data.data;
						var previus_status = task.orginal_state;
						var status = task.complete;

						if ( parentDiv.hasClass('cbp_tmicon-complete') && previus_status == 1 ) { // It's complete

							parentDiv.removeClass('cbp_tmicon-complete');
							parentDiv.addClass('cbp_tmicon-incomplete');
							i.removeClass('fa-check');
							i.addClass('fa-times');
						
						} else if ( parentDiv.hasClass('cbp_tmicon-incomplete') && previus_status == 0 ) {

							parentDiv.removeClass('cbp_tmicon-incomplete');
							parentDiv.addClass('cbp_tmicon-complete');
							i.removeClass('fa-refresh');
							i.addClass('fa-check');
						}

						if ( labelDiv.hasClass('complete') && previus_status == 1 ) {
							labelDiv.removeClass('complete');
						} else {
							labelDiv.addClass('complete');
						}

					} else {
						alert(data.message);
					}
					
				}
			});
		});

		$('.button-new-task').on('click', function(e){

			e.preventDefault(); // Stoping routing

			var el = $(this);
			var text = $('.task-text').val();;

			if ( text == "" ) {

				$.alert("Amigo necesitas escribir algo en la tarea, si quieres crearla");
				return;
			}
			$.magnificPopup.close(); // Closing the popup

			$.post("http://localhost/appbuilders/apis/du/task/new", {

				project_id: app.actualProject,
				parent_task_id: 0,
				text: text
			},

			function(data, status){

				if ( data.result == "success" ) { // API respond correctly

					$('.section-popup-new-task-form')[0].reset(); // Cleaning form
					var task = data.data;
					var globalDate = task.modified;
						task.modified = globalDate.substring(0, 10);
						task.hour = globalDate.substring(11, 16);

					$('.cbp_tmtimeline').append( obj.partials.singleTask({ task:task }) );

					$('.task-id-' + task.id).animate({
						left: "0px",
					}, {
						duration: 150, 
						easing: "linear"
					});
					
				} else {
					$.alert("Ha ocurrido un error creando tu tarea");
				}
			});
		});


	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-tasks');
		obj.partials.singleTask = Ladybug.Utils.compileTemplate('#partial-single-task');
	}
});


// --------------------------------------------------------------------------------- webchimp -- //

ModuleFAQ = DuModule.extend({
	init: function(options) {
		var obj = this;
		// Call parent's constructor
		obj.parent(options);
	},
	onDomReady: function(params) {
		var obj = this;
		app.bindGlobals();
	},
	onPrepareTemplates: function(params) {
		var obj = this;
		obj.templates.page = Ladybug.Utils.compileTemplate('#page-faq');
	}
});

// --------------------------------------------------------------------------------- webchimp -- //

var app;

app = new DuApp({ element: '#ladybug-root' });

app.registerModule('login', new ModuleLogin);
app.registerModule('home', new ModuleHome);
app.registerModule('tasks', new ModuleTasks);

// app.registerModule('juego', new ModuleJuego);
// app.registerModule('comparte', new ModuleComparte);
// app.registerModule('todos', new ModuleTodos);
app.registerModule('faq', new ModuleFAQ);

// Api url
app.api = 'http://localhost/appbuilders/apis/du';
// Web token
app.token = '20747630d1e1b9ffa4993a11a96d2c3e0f4f8fe6256d9f4c176b69a02481291b.be72d1a7d3f0b1c52d95089056f202fe';

(function($) {
	$.extend(true, $.alert.defaults, {
		buttonMarkup: '<button class="button button-primary"></button>',
		buttons: [
			{ text: 'Aceptar', action: $.alert.close }
		]
	});
})(jQuery);

// --------------------------------------------------------------------------------- webchimp -- //