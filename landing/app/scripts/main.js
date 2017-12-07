$(document).ready(function() {
	$("#counter")
		.countdown("2018/01/08 19:30:00", function(event) {
			$(this).html(
				event.strftime(
					"<div><span class='value'>%-D</span><span class='blue-line'></span><span class='unit'>días</div>" +
						"<div><span class='value'>%-H</span><span class='blue-line'></span><span class='unit'>horas</div>" +
						"<div><span class='value'>%-M</span><span class='blue-line'></span><span class='unit'>minutos</div>" +
						"<div><span class='value'>%-S</span><span class='blue-line'></span><span class='unit'>segundos</div>"
				)
			);
		})
		.on("update.countdown", function(event) {})
		.on("finish.countdown", function(event) {});
});
