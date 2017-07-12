<%= app.partials.header() %>

	<div class="block-content">
		<section class="section section-home push-area">
			<!-- <div class="inner boxfix-vert"> -->
				<div class="row row-5">

					<div class="col col-3">

						<div class="options-side-panel">

							<div class="app-logo">
								<img class="img-responsive" src="<?php $site->img('/login/du_logo.png'); ?>" alt="">
							</div>

							<div class="content">

								<p>App Builders product</p>
							</div>


						</div>
						
						<!-- <aside class="admin-ui-sidebar">

							<div class="admin-ui-logo">
								<img class="img-responsive" src="<?php $site->img('/login/AB_negro.png'); ?>" alt="">
							</div>

							<a href="#" class="button-hamburger show-mobile-inline"><i class="fa fa-fw fa-bars"></i></a>
							<div class="sidebar-background"></div>

							<nav class="admin-ui-menu sidebar-menu">
								<ul class="menu">
									<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/"><i class="fa fa-fw fa-home"></i> Inicio</a></li>
									<li class="menu-divider"></li>

									
									<li class="menu-item">
										<a href="http://competencias.americantrust.com.mx/admin/usuarios"><i class="fa fa-fw fa-user"></i> Usuarios</a>
										<ul class="submenu">
											<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/usuarios/new"><i class="fa fa-fw fa-plus"></i> Nuevo Usuario</a></li>
											<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/usuarios"><i class="fa fa-fw fa-edit"></i> Editar Usuario</a></li>
										</ul>
									</li>

									
									<li class="menu-item">
										<a href="http://competencias.americantrust.com.mx/admin/empleados"><i class="fa fa-fw fa-briefcase"></i> Personal</a>
										<ul class="submenu">
											<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/empleados/new"><i class="fa fa-fw fa-plus"></i> Nuevo Personal</a></li>
											<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/empleados"><i class="fa fa-fw fa-edit"></i> Editar Personal</a></li>
										</ul>
									</li>

									<li class="menu-item"><a href="http://competencias.americantrust.com.mx/admin/logout"><i class="fa fa-fw fa-power-off"></i> Cerrar sesión</a></li>
								</ul>
							</nav>
						</aside> -->

					</div>

					<div class="col col-9">

						<div class="content-panel">

							<ul class="projects_flow row row-5">
								
								<!-- Here gonna go the projects <li> -->

							</ul>
						
						</div>
						
					</div>

				</div>


				<!-- Floating button  -->
				<div class="floating-button">
					<a href="#popup-new-project" data-popup="inline" class=""><i class="fa fa-plus"></i></a>
				</div>

			<!-- </div> -->
		</section>

		<section class="section section-popup-new-project mfp-hide popup" id="popup-new-project">

			<div class="boxfix-vert">
				<div class="margins">

					<h2 class="titulo-popup">Nuevo projecto</h2>
					<p class="text-center">Vamos a crear un projecto, cuentanos como se llama y de que va</p>

					<form action="#" class="section-popup-new-project-form">
						<div class="form-fields">
							<div class="form-group">
								<input id="project-name" class="form-control input-block project-name" type="text" placeholder="Como se llama?">
							</div>
							<div class="form-group">
								<input id="project-description" class="form-control input-block project-description" type="text" placeholder="De que se trata?">
							</div>
							<button class="button button-block button-new-project" type="submit">Crear</button>
						</div>
					</form>

				</div>
			</div>

		</section>

		<section class="section section-participa mfp-hide popup" id="participa">
			<div class="boxfix-vert">
				<div class="margins">
					<h2 class="titulo-popup">REGISTRO  CON FACEBOOK</h2>
					<p>JALANDO TODO BIEN</p>

					<form action="#/login" method="post">

						<div class="form-fields">
							<div class="form-group">
								<input id="user" class="form-control input-block" type="text" name="user" placeholder="User">
								<input id="pass" class="form-control input-block" type="password" name="pass" placeholder="Password">
							</div>
							<button class="button button-primary button-small" type="submit">Iniciar sesion</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>

<%= app.partials.footer() %>