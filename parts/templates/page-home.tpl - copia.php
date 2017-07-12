<%= app.partials.header() %>

	<div class="block-content">
		<section class="section section-dinamica">
			<div class="inner boxfix-vert">
				<div class="row row-5">
					<div class="col col-7">
						<div class="instrucciones">
							<h2 class="texto-instrucciones">instrucciones</h2>

							<div class="paso paso1">
								<div class="numero">1</div>

								<div class="contenido">
									<p>Prepara tu mejor selfie rasurado, queremos verte sin barba y bigote.</p>
								</div>
							</div>

							<div class="paso paso2">
								<div class="numero">2</div>

								<div class="contenido">
									<p>Sube la foto con la que participarás.</p>
								</div>
							</div>

							<div class="paso paso3">
								<div class="numero">3</div>

								<div class="contenido">
									<p>Elige el marco de Gillette que más te guste.</p>
								</div>
							</div>

							<div class="paso paso4">
								<div class="numero">4</div>
								<div class="contenido">
									<p>Comparte tu foto.</p>
								</div>
							</div>

							<div class="paso paso5">
								<div class="numero">5</div>
								<div class="contenido">
									<p>¡Consigue todos los likes que puedas! La foto más likeada será la ganadora</p>
								</div>
							</div>

						</div>
					</div>
					<div class="col col-5">
						<div class="registro">

							<?php if(!$site->cerrado): ?>

								<% if ( app.user && app.user.photo.length ) { %>
								<a href="#/comparte" class="button button-block margin-button button-success-sesion">YA ESTAS PARTICIPANDO</a>
								<a href="#/todos" class="button button-block button-gillette">VOTA</a>
								<% } else if ( app.user && !app.user.photo.length ) { %>
								<a href="#/juego" class="button button-block button-gillette">SUBE TU FOTO</a>
								<a href="#/todos" class="button button-block button-gillette">VOTA</a>
								<% } else { %>
								<a href="#" class="button button-block button-gillette js-connect">PARTICIPA SUBIENDO TU FOTO</a>
								<a href="#" class="button button-block button-gillette js-connect-voto">CONECTATE PARA VOTAR</a>
								<% } %>

							<?php else: ?>
								<h2>¡Gracias por participar! El concurso ha terminado, espera los resultados.</h2>
							<?php endif; ?>

							<div class="fotos-recientes">
								<h2>FOTOS RECIENTES</h2>
								<div class="fotos">
									<div class="row row-md row-sm">
										<!-- -->
									</div>
								</div>
							</div>

							<br>
							<% if ( app.user ) { %>
							<a href="#/todos" class="button button-block button-gillette">VER TODOS</a>
							<% } %>
							<br>
							<p>Es indispensable, revisar bases, términos y condiciones para participar.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="section section-terminos mfp-hide popup" id="terminos">
			<div class="boxfix-vert">
				<div class="margins">
					<h2 class="titulo-popup">TÉRMINOS Y CONDICIONES</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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