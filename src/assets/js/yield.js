function run_yields() {
	$("yield:not(.processed)").each(function() {
		var parent = $(this);
		var uri = parent.html();
		parent.html("");
		parent.addClass("processed");
		$.get(uri,function(data) {
			parent.html(data);
			run_yields();
		});
	});
}
run_yields();