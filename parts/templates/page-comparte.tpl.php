<%= app.partials.header() %>

	<div class="block-content">
		<section class="section section-aviso">
			<div class="inner boxfix-vert aviso">
				<h2 class="text-center">¡TU FOTO YA ESTÁ PARTICIPANDO!</h2>
			</div>
		</section>

		<section class="section section-comparte">
			<div class="inner boxfix-vert">
				<div class="row row-5">
					<div class="col col-8">
						<div class="foto">
							<img src="<%= app.user.photo %>" alt="" class="img-responsive">
						</div>
					</div>

					<div class="col col-4">
						<div class="datos">
							<div class="fb">
								<p class="nombre"><i class="fa fa-facebook-square" aria-hidden="true"></i> <%= app.user.nicename %> </p>
							</div>

							<!--<div class="votos text-center">
								<h2 class="numero-votos">0 VOTOS</h2>
							</div>-->

							<div class="botones">
								<a href="#comparte" class="button button-gillette button-block" data-popup="inline">COMPARTE</a>
							</div>
						</div>
					</div>
				</div>

				<div class="todos text-center">
					<a href="#/todos" class="button button-gillette-medium">VER TODOS</a>
				</div>

			</div>
		</section>

		<section class="section section-comparte mfp-hide popup-fb" id="comparte">
			<div class="barra"><h2>Compartir</h2></div>
			<div class="boxfix-vert">
				<div class="margins">
					<h2 class="titulo-popup">¡Comparte para conseguir más votos!</h2>
					<div class="url-comparte">
						<div class="row">
							<div class="col col-6 col-offset-1">
								<p class="url"><%= constants.siteUrl + '/share?uid=' + app.user.id %></p>
							</div>
							<div class="col col-4">
								<a href="#" class="button button-default button-block button-copiar-url" data-clipboard-text="<%= constants.siteUrl + '/share?uid=' + app.user.id %>">Copiar URL</a>
							</div>
						</div>
					</div>
					<h2 class="titulo-popup">o comparte en:</h2>
					<div class="redes text-center">
						<p>
							<a href="#" class="red facebook-comparte"><i class="fa fa-facebook "></i></a>
							<a data-share="twitter" href="https://twitter.com/home?status=Gillette%20Prestobarba3%20me%20quiere%20llevar%20a%20Las%20Vegas,%20vota%20por%20mi%20y%20vete%20conmigo!%20%23GilletteVegas <%= constants.siteUrl + '/share?uid=' + app.user.id %>" target="_blank" class="red"><i class="fa fa-twitter"></i></a>
					<a data-share="google" href="https://plus.google.com/share?url=<%= constants.siteUrl + '/share?uid=' + app.user.id %>" target="_blank" class="red"><i class="fa fa-google-plus"></i></a>
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>

<%= app.partials.footer() %>