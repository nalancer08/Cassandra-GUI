<%= app.partials.header() %>

	<div class="block-content">
		<section class="section section-fotos">
			<div class="inner boxfix-vert">

				<div class="contenido">
					<div class="titulo text-center">
						<?php if(!$site->cerrado): ?>
							<h2>¡VOTA POR TU FAVORITO! O <strong>PARTICIPA</strong></h2>
						<?php else: ?>
							<h2>¡Gracias por participar! El concurso ha terminado, espera los resultados.</h2>
						<?php endif; ?>
					</div>

					<div class="row row-md row-sm todos">
					</div>

				</div>

			</div>
		</section>

		<section class="section section-foto mfp-hide popup" id="foto">
			<div class="boxfix-vert">
				<div class="margins">
					<div class="row">
						<div class="col col-12">
							<img src="" class="img-responsive foto-mp" alt="">
							<h2 class="user user-mp">USER NAME</h2>
							<div class="info">
								<div class="votar cf">
									<div class="row row-md row-sm">
										<div class="col col-4 col-md-4 col-sm-4">
											<span class="votar-num"><i class="fa fa-thumbs-o-up likes"></i> <span class="votos-numero">0</span></span>
										</div>
										<div class="col col-4 col-md-4 col-sm-4">
											<a href="#" class="js-votar-mp">Votar</a>
										</div>
										<div class="col col-4 col-md-4 col-sm-4">
											<a href="#" class="votar-share"><i class="fa fa-facebook"></i> <span class="hide-mobile">Compartir en Facebook</span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

<%= app.partials.footer() %>