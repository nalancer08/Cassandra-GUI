<div class="col col-4 col-md-6 col-sm-12">
	<div class="foto">
		<a class="js-votar" href="#" data-nice="<%= photo.user.nicename %>" data-votes="<%= photo.votes %>" data-photo-id="<%= photo.id %>" data-src="<%= photo.photo %>" data-id="<%= photo.user.id %>"><img class="img-responsive" src="<%= photo.photo %>" alt=""></a>
		<h2 class="user"><%= photo.user.nicename %></h2>
		<div class="info">
			<div class="votar cf">
				<span class="votar-num"><i class="fa fa-thumbs-o-up likes"></i> <span class="votos-numero-afuera" data-num-voto="<%= photo.id %>"><%= photo.votes %></span></span>
				<a href="#" data-share="<%= photo.photo %>" data-id="<%= photo.user.id %>" class="votar-share-out"><i class="fa fa-share-alt"></i></a>

				<?php if(!$site->cerrado): ?>
					<a href="#" data-nice="<%= photo.user.nicename %>" data-votes="<%= photo.votes %>" data-photo-id="<%= photo.id %>" data-src="<%= photo.photo %>" data-id="<%= photo.user.id %>" class="js-votar">Votar</a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>