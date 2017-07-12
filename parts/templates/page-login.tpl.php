	<div class="wrapper">
		<header class="site-header">
			<section class="section section-login">
				<!-- <img class="hide-mobile img-responsive" src="<?php //$site->img('gillette-header.jpg'); ?>" alt=""> -->

				<div class="block-content">
						
					<div class="admin-ui-metabox metabox-rounded login-box">

						<section class="metabox-content">

							<div class="login-logo">
								<img class="img-responsive" src="<?php $site->img('/login/du_logo.png'); ?>" alt="">
								<!-- <img class="hide-mobile img-responsive" src="<?php $site->img('/login/AB_negro.png'); ?>" alt=""> -->
							</div>

							<form method="post" action="">
								<div class="form-fields">
									<div class="form-group">
										<div tabindex="1" class="input-group login-user">
											<div class="input-group-addon"><i class="fa fa-fw fa-user"></i></div>
											<input placeholder="User" class="form-control input-block user" id="user" name="user" type="text">
										</div>
										<div class="input-group login-pass">
											<div class="input-group-addon"><i class="fa fa-fw fa-lock"></i></div>
											<input placeholder="Password" class="form-control input-block pass" id="pass" name="pass" type="password">
										</div>
									</div>
								</div>
								<div class="form-actions">

									<div class="row row-md row-sm">
										<div class="col col-md col-sm col-md-6 col-sm-6 col-6 forgot-password">
											<p><a href="http://competencias.americantrust.com.mx/admin/recover">Forgot password?</a></p>
										</div>
										<div class="col col-md col-sm col-md-6 col-sm-6 col-6 remember-me">
											<label for="remember-me">
												<input name="remember-me" id="remember-me" type="checkbox">
												<span>Remember me</span>
											</label>
										</div>
									</div>

									<button class="button button-primary button-block button-login" type="submit">Press for simply du</button>
								</div>
							</form>
						</section>
					</div>

				</div>		

			</section>
		</header>

<%= app.partials.footer() %>