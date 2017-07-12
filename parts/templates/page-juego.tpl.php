<%= app.partials.header() %>

	<div class="block-content">
		<section class="section section-juego">
			<div class="inner boxfix-vert">
				<form class="form-subir-foto" action="<?php $site->urlTo('/upload', true) ?>" method="post" enctype="multipart/form-data">

					<textarea name="imagen64" id="imagen64" class="hide"></textarea>

					<div class="row row-5">
						<div class="col col-7">
							<div class="subir-foto">
								<h2 class="texto-instrucciones">1. SUBE TU FOTO</h2>

								<div class="foto">
									<img src="<?php $site->img('sube-foto.png'); ?>" alt="" class="uploaded-foto img-responsive">
								</div>

								<div class="subir">
									<a class="button button-gillette-medium button-subir" href="">SUBIR FOTO</a>
									<input type="file" name="foto" class="input-image hide">
									<input type="hidden" name="marco" value="0">
								</div>

							</div>
						</div>

						<div class="col col-5">
							<div class="opciones">
								<div class="marco">
									<h2>2. ELIGE TU MARCO</h2>
									<div class="row">
										<div class="col col-6"><img data-marco="1" src="<?php $site->img('marcos/marco1.png'); ?>" class="img-responsive js-marco" id="marco1" alt=""></div>
										<div class="col col-6"><img data-marco="2" src="<?php $site->img('marcos/marco2.png'); ?>" class="img-responsive js-marco" id="marco2" alt=""></div>
									</div>

								</div>

								<div class="participa">
									<h2>3. PARTICIPA</h2>
									<!-- <a href="" class="button button-gillette button-block">CAMBIAR FOTO</a> -->
									<a href="#/comparte" class="button button-gillette button-block finalizar">FINALIZAR</a>
									<p>(Acepta términos y condiciones para continuar)</p>
								</div>
							</div>

						</div>
					</div>

					<div class="terminos text-center">
						<div class="fields">
							<div class="form-group">
								<label class="checkbox">
									<input id="aviso" class="aviso" type="checkbox" data-validate="required" name="aviso">
									<span><a href="#bases" data-popup="inline" >HE LEÍDO Y ACEPTO LOS TÉRMINOS Y CONDICIONES</a></span>
								</label>
							</div>
						</div>
					</div>
				</form>

			</div>
		</section>
	</div>

<%= app.partials.footer() %>