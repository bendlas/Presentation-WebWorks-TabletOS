try{
    (function($) {
	var displayed = 0;
	var current;
	var pages = $(".page")
	    .each(function(i, page) {
		var left;
		if (i < displayed) {
		    left = "-100%";
		} else if (i > displayed) {
		    left = "100%";
		} else {
		    left = "0%";
		    current = $(page);
		}
		$(page).css("left", left);
	    });

	// delay animating so that positioning can happen
	setTimeout(function(){
	    pages.addClass("slide");
	});

	var grabX0;
	var grabX;
	function grab(pageX) {
	    if( ! grabX0) {
		grabX0 = pageX;
		grabX = pageX;
		pages.removeClass("slide");
	    }
	}
	function move(pageX) {
	    if(grabX0) {
		var diff = pageX-grabX0;
		grabX = pageX;
		current.css("left", diff);

		current.next().css("left", window.innerWidth+diff);
		current.prev().css("left", -window.innerWidth+diff);
	    }
	}
	function release() {
	    if (grabX0) {
		pages.addClass("slide");
		setTimeout(function(){
		    var w = window.innerWidth / 2;
		    var diff = grabX0-grabX;
		    var next = current.next();
		    var prev = current.prev();
		    next.css("left", window.innerWidth);
		    prev.css("left", -window.innerWidth);
		    if(diff > w && next.length > 0) {
			current.css("left", -window.innerWidth);
			current = next;
		    } else if (-diff > w && prev.length > 0) {
			current.css("left", window.innerWidth);
			current = prev;
		    }
		    current.css("left", 0);
		    grabX0 = undefined;
		    grabX = undefined;
		});
	    }
	}

	$("body")
	    .bind("mousedown", function(evt) {
		grab(evt.pageX);
		evt.preventDefault()
	    })
	    .bind("mouseup", function(evt) {
		release(evt.pageX);
		evt.preventDefault()
	    })
	    .bind("mousemove", function(evt) {
		move(evt.pageX);
		evt.preventDefault()
	    })    
	    .bind("touchstart", function(evt) {
		grab(evt.originalEvent.touches[0].pageX);
		evt.preventDefault()
	    })
	    .bind("touchend", function(evt) {
		release();
		evt.preventDefault()
	    })
	    .bind("touchmove", function(evt) {
		move(evt.originalEvent.touches[0].pageX);
		evt.preventDefault()
	    });
    })(jQuery);
} catch (e) {alert(e);}