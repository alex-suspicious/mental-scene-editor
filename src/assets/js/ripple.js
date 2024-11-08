var CurrentMouseXPostion;
var CurrentMouseYPostion;

$(document).mousemove(function(event) {
    CurrentMouseXPostion = event.pageX;
    CurrentMouseYPostion = event.pageY;
});


$(document).on("click",".btn",function( event ) {
	var me = $(this);
	var ripple_container = $("<div></div>").appendTo(me.parent());

	var size = [me.outerWidth(),me.outerHeight()];

	ripple_container.css("position","absolute");
	ripple_container.width(size[0]);
	ripple_container.height(size[1]);

	var ripple_size = size[0];
	if( size[1] > size[0] )
		ripple_size = size[1]

	//ripple_container.css("background-color","red");

	var position = me.position();
	var gposition = me.offset();
	ripple_container.css("top",position.top);
	ripple_container.css("left",position.left);

	ripple_container.css("margin",me.css("margin"));
	ripple_container.css("margin-top",me.css("margin-top"));
	ripple_container.css("margin-left",me.css("margin-left"));
	ripple_container.css("margin-bottom",me.css("margin-bottom"));
	ripple_container.css("margin-right",me.css("margin-right"));

	ripple_container.css('border-radius', me.css('border-radius'));
	ripple_container.css('overflow', 'hidden');
	ripple_container.css('pointer-events', 'none');

	var ripple = $("<div></div>").appendTo(ripple_container);
	ripple.css('pointer-events', 'none');
	ripple.css('position', 'absolute');
	ripple.css('border-radius', '100%');
	ripple.css('width', '10px');
	ripple.css('height', '10px');
	ripple.css('background-color', 'white');
	ripple.css('transform-origin', 'center');
	ripple.css('transform', 'translate(-50%, -50%) scale(1)');
	ripple.css('opacity', '0.8');
	ripple.css("top",CurrentMouseYPostion - gposition.top);
	ripple.css("left",CurrentMouseXPostion - gposition.left);
	ripple.css('transition', 'all 0.7s');

	setTimeout(function() {
		ripple.css('transform', 'translate(-50%, -50%) scale('+(ripple_size/3.0)+')');
		ripple.css('opacity', '0');
	},10)

	setTimeout(function() {
		var position = me.position();
		ripple_container.css("top",position.top);
		ripple_container.css("left",position.left);

		ripple_container.width(me.outerWidth());
		ripple_container.height(me.outerHeight());
	},150)

	setTimeout(function() {
		ripple.remove();
		ripple_container.remove();
	},500)
});