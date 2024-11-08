var declared = [];
$(document).on("click","*",function() {
	var parent = $(this);
	var href = parent.attr("href");

	if( !href || !href.includes("controller://") )
		return;

	href = href.replace("controller://","");
	var data = href.split("/");
	var controller = data[0];
	var func = data[1];

	if( !declared.includes(controller) ){
		$.get(`controllers/${controller}.js`,function( code ) {
			eval( code );
			let interactor = undefined;
			eval(`interactor = ${controller}.${func};`);
			interactor( parent );
			declared.push(controller);
		});
	}else{
		let interactor = undefined;
		eval(`interactor = ${controller}.${func};`);
		interactor( parent );
	}
});