<div class="col col-3 elemento">

	<div class="data">

		<% if ( project.image ) { %>
			<img class="img-responsive" src="<%= project.image %>" alt="">
		<% } else { %>
			<img class="img-responsive" src="<?php $site->img('/login/du_logo.png'); ?>" alt="">
		<% } %>
			
		<h2> <%= project.name %> </h2>
		<p> <%= project.description %> </p>
	</div>

	<div class="meta-data">
		<div class="row row-5">

			<div class="col col-5 created text-center divisor">
				<a class=""><i class="fa fa-clock-o" aria-hidden="true"></i> <%= project.days %> days</a>
			</div>
			<div class="col col-4 tasks text-center divisor">
				<a class=""><i class="fa fa-tasks" aria-hidden="true"></i> <%= project.tasks %> </a>
			</div>
			<div class="col col-3 navegate text-center">
				<a href="#" data-project="<%= project.id %>" class="navegate_task"><i class="fa fa-external-link-square" aria-hidden="true"></i> GO</a>
			</div>

		</div>
	</div>

</div>