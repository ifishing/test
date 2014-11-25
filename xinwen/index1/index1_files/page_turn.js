/**
 * @module focus.common
 *
 * 实现键盘翻页功能(PageUp/PageDown)
 *
 * @author J. Jiang <jiangjing@focus.cn>
 * @create 2006-6-15
 * @update 
 */
var re = /<a href=[\"\']?([-=\w\.\/\?]+)[\"\']?>[\[\(<]?上一页[\]\)>]?<\/a>/igm;
if (window.document.body.innerHTML.search(re) >= 0) {
	var PREVIOUS_PAGE = RegExp.$1;
}

var re = /<a href=[\"\']?([-=\w\.\/\?]+)[\"\']?>[\[\(<]?下一页[\]\)>]?<\/a>/igm;
if (window.document.body.innerHTML.search(re) >= 0) {
	var NEXT_PAGE = RegExp.$1;
}

if (typeof PREVIOUS_PAGE == "string" || typeof NEXT_PAGE == "string") {
	document.onkeydown = function(ev) {
		var ev=window.event||ev;
		var target=ev.srcElement||ev.target;
		switch (target.tagName) {
			case "INPUT":
			case "TEXTAREA":
			case "SELECT":
				break;
			default:
				if (ev.keyCode == 37 /* Arrow Left*/ && typeof PREVIOUS_PAGE == "string") {
					window.location.href = PREVIOUS_PAGE;
				}
				else if (ev.keyCode == 39 /* Arrow Right */ && typeof NEXT_PAGE == "string") {
					window.location.href = NEXT_PAGE;
				}
		}
	}
}
