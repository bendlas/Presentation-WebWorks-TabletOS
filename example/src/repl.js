function eval_global() {
    return window.eval(arguments[0]);
}
$(function ($){
    window.hist = [];

    function layout(evt) {
	h = window.innerHeight;
	ph = $("#prompt").outerHeight(true);
	$("body").css("height", h);
	$("#echo").css({"height": h - ph,
			"bottom": ph});
	$("#prompt").css("bottom", 0);
	scrollToBottom();
//	if (evt) {evt.stopPropagation();}
//	return false;
    }

    function scrollToBottom() {
	echo = $("#echo");
	line = echo.find(".line").last();
	if (line.size() > 0) {
	    echo.scrollTop(echo.scrollTop() + line.offset().top);
	}
    }

    layout();
    $(window).resize(layout);

    var echo = $("#echo");
    var shell_locals = new Object();

    function eval_print(v){
	var hist_entry = {"in":v};
	var line = $("<div>").addClass("line ui-state-highlight");
	if (v.length > 0){
	    line.append($("<div>")
			.text("> " + v)
			.addClass("in"));
	    prompt.val("");
	    var resp = $("<pre>");
	    var resp_class = "";
	    var resp_text = "";
	    try{
		var r = eval_global(v);
		hist_entry.out = r;
		resp_text = prettyPrint(r, {
		    maxDepth:2
		});
		resp_class = "out";
	    } catch (err) {
		hist_entry.out = err;
		if (err.stack) { 
		    resp_text = err.stack;
		} else {
		    resp_text = err.message;
		}
		resp_class = "out ui-state-error";
	    }
	    line.append(resp.html(resp_text).addClass(resp_class));
	    hist.push(hist_entry);
	    echo.append(line.attr("id", "line_"+hist.length));
	    
	    scrollToBottom();
	}
    }

    var prompt_hist_pos, current_prompt_val;
    var prompt = $("#prompt")
	.blur(function(){
	    setTimeout(function(){prompt.focus()});
	})
	.focus()
        .bind("mousedown touchstart mousemove touchmove mouseup touchend", function(ev) {ev.stopPropagation();})
	.keydown(function(ev){
	    window.x = ev;
	    switch (ev.which) {
	    case 13: // enter
		eval_print(prompt.val());
		setTimeout(function(){current_prompt_val = prompt.val();});
		prompt_hist_pos = null;
		return false;
	    case 38: // arrow ^
		if (hist.length > 0) {
		    if (prompt_hist_pos === null) {
			prompt_hist_pos = hist.length - 1;
		    } else if (prompt_hist_pos > 0) {
			prompt_hist_pos -= 1;
		    }
		    prompt.val(hist[prompt_hist_pos]["in"]);		    
		}
		return false;
	    case 40: // arrow v
		if (prompt_hist_pos != null){
		    prompt_hist_pos += 1;
		    if (prompt_hist_pos >= hist.length){
			prompt_hist_pos = null;
			prompt.val(current_prompt_val);
		    } else {
			prompt.val(hist[prompt_hist_pos]["in"]);
		    }
		}
		return false;
	    default:
		setTimeout(function(){current_prompt_val = prompt.val();});
		prompt_hist_pos = null;
		return true;
	    }
	});
});