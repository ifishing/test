var isValid = (document.location.href.indexOf("sohu.com") >= 0) || (document.location.href.indexOf("focus.cn") >= 0);
var qt,imp,out,left,qtc;
var LF=0;
var RF=0;
var sovIsDisplay = true;
var sovObjTimer = null;
var sovTimeOutQuit	= 16000;
var sovO = null;
function MEDIA_main(o) {
    if (!isValid) {
        return;
    }
    if (ADM_Check(o)) {
        o.s = 2;
        return;
    }	
    o.width = IsDe(o.width) ? parseInt(o.width) : 324;
    o.height = IsDe(o.height) ? parseInt(o.height) : 319;
    o.out = IsDe(o.out) ? o.out: "";
    if (o.player.split("|").length > 1) {
        var _2 = o.player.split("|");
        var _3 = o.flv.split("|");
        var _4 = o.zip.split("|");
        var _5 = o.imp.split("|");
        var _6 = o.url.split("|");
        var _7 = o.out.split("|");
        o.x = getSrcIdx(o.id, _3.length);
        o.player = _2[o.x];
        o.flv = _3[o.x];
        o.zip = _4[o.x];
        o.imp = _5[o.x];
        o.url = _6[o.x];
        o.out = _7[o.x];
    }
    imp = o.imp;
    out = o.out;
    left = IsDe(o.left) ? o.left: -1;
	sovO = o;
    var p = document.createElement("div");
    var st = "position:absolute;left:0px;top:342px;visibility:hidden;border:0;z-index:10000;width:" + o.width + "px;height:" + o.height + "px;overflow:hidden;";
    p.setAttribute("id", "sov");
    p.setAttribute("style", st);
    p.style.cssText = st;
    document.body.appendChild(p);	
    var _b = new sohuFlash(o.player, "_wmID", o.width, o.height, "7");
    _b.addParam("quality", "high");
    _b.addParam("wmode", IsDe(o.wmode) ? o.wmode: "Opaque");
    _b.addParam("allowScriptAccess", "always");
    _b.addVariable("file", o.flv);
    _b.addVariable("player_url", o.url);
    _b.addVariable("player_down", o.zip);
    _b.addVariable("player_email", "mailto:?body=Hello! Wonderful video for you! Click " + o.zip + " to download it!");
    _b.write("sov");		

	if(IsDe(o.tag)) {
		var pt = document.createElement("div");
		var stt = "position:fixed;_position:absolute;right:0px;bottom:0px;visibility:hidden;border:0;z-index:10000;width:25px;height:161px;";
		pt.setAttribute("id", "sovTag");
		pt.setAttribute("class", "sovTag");
		pt.setAttribute("style", stt);
		pt.style.cssText = stt;
		pt.innerHTML = '<div><a href="' + o.url + '" target="_blank"><img src="' + o.tag + '" border="0" width="25" height="120"></a><a href="javascript:;" onclick="vExCommand(\'open\')"><img src="http://src.focus.cn/common/ad/ad_v_btn.gif" border="0" width="25" height="21"></a><a href="javascript:;" onclick="vRemove()"><img src="http://src.focus.cn/common/ad/ad_v_close.gif" border="0" width="25" height="20"></a></div>';
		document.body.appendChild(pt);
	}
	if (IsDe(imp) && imp != "") {
		new Image().src = o.imp + "?4";
	}
    isLoad(o);
}

function vQuit() {	
    if (qt) {
        window.clearTimeout(qt);
    }
    for (_i = 0; _i < _O.length; _i++) {
        if (_O[_i].t == "MEDIA") {
            _O[_i].s = 2;
            break;
        }
    }
}

function vOpen() {	
	vResize();
	GetID("sov").style.visibility='visible';
	window.setInterval("vResize()", 100);	
}

function Location() {
    if (GetID("sov")) {
        with(GetID("sov")) {
            style.top = _I * (_M.clientHeight + _M.scrollTop - parseInt(GetID("sov").style.height)) + _J;
            style.left = (left == -1) ? (_I * (((RF == 1) ? (_M.clientWidth + cWidth) / 2: _M.clientWidth) + _M.scrollLeft - parseInt(GetID("sov").style.width)) + _J) : ((LF == 1) ? (_I * (_M.clientWidth - cWidth) / 2 + _J) : 0);
            if (! (navigator.userAgent.indexOf("MSIE 6") > -1)) {
                style.top = _I * (_M.clientHeight - parseInt(GetID("sov").style.height)) + _J;
                style.position = "fixed";
                style._position = "absolute";
            }
        }
    }
}

function isLoad() {
    try {
        if (window.document._wmID.PercentLoaded() < 100) {
            window.setTimeout("isLoad()", 500);
        } else {
            vOpen();
            qt = window.setTimeout("vQuit();", sovTimeOutQuit);
        }
    } catch(ee) {
        window.status = "catch" + ee;
        vOpen();
        qt = window.setTimeout("vQuit();", sovTimeOutQuit);
    }
}

function vClose() {	
	vExCommand('close');
}

function vGet(movieName) {
	if (isIE) {
		return window[movieName];
	}else{
		return document[movieName];
	}	
}

function getNewFlash() {
	var p = GetID('sov');
	if(p && sovO) {
		var _b = new sohuFlash(sovO.player, "_wmID", sovO.width, sovO.height, "7");
		_b.addParam("quality", "high");
		_b.addParam("wmode", IsDe(sovO.wmode) ? sovO.wmode: "Opaque");
		_b.addParam("allowScriptAccess", "always");
		_b.addVariable("file", sovO.flv);
		_b.addVariable("player_url", sovO.url);
		_b.addVariable("player_down", sovO.zip);
		_b.addVariable("player_email", "mailto:?body=Hello! Wonderful video for you! Click " + sovO.zip + " to download it!");			
		_b.write("sov");			
	}
}

function vExCommand(cmd) {
	if(cmd=='open' && !sovIsDisplay) {
		getNewFlash();
		vSwitch('sov');
		sovObjTimer = window.setInterval('vMoveLeft()',50);
		sovIsDisplay = true;		

		//vGet('_wmID').replayMovie();
				
	} else if(cmd=='close' && sovIsDisplay) {
		vQuit();
		sovObjTimer = window.setInterval('vMoveRight()',50);
		sovIsDisplay = false;
		if(qtc) {
			window.clearTimeout(qtc);
		}
	}
}

function vSwitch(cmd) {
	if(cmd=='sovTag') {		
		GetID("sovTag").style.visibility='visible';
		GetID("sov").style.visibility='hidden';
	} else {		
		GetID("sovTag").style.visibility='hidden';
		GetID("sov").style.visibility='visible';		
	}
}

function vRemove() {
	GetID("sovTag").style.visibility='hidden';
	GetID("sov").style.visibility='hidden';
}

function vDoFSCommand(c, a) {
    if (c == "sohu") {
        switch (a) {
        case "first_play":
			if (IsDe(imp) && imp != "") {
            	new Image().src = imp + "?1";
		    }
			if (IsDe(out) && out != "") {
                new Image().src = out;
            }
            break;		
        case "movie_end":
			if (IsDe(imp) && imp != "") {
				new Image().src = imp + "?2";
			}
            break;
        case "restart":	
			if (IsDe(imp) && imp != "") {
				new Image().src = imp + "?3";
		    }
            break;
        case "down":
			if (IsDe(imp) && imp != "") {
				new Image().src = imp + "?5";
			}
            break;
        case "send":
			if (IsDe(imp) && imp != "") {
				new Image().src = imp + "?6";
			}
            break;
        case "click":
			if (IsDe(imp) && imp != "") {
				new Image().src = imp + "?7";
		    }
            break;
        case "close":
            vClose();
            break;
		case "timeout_close":
			window.setTimeout("vExCommand('close')", 2000);
		    //vExCommand('close');
			break;
        }
    }
}

function vMoveLeft() {

	var step = 20;

	var sovDivLefts = parseInt(GetID("sov").style.left); 
	var sovDivWidths = parseInt(GetID("sov").style.width);	

	if (304 - sovDivWidths < 50)
	{
		step = 304 - sovDivWidths;
		window.clearInterval(sovObjTimer);		
	}
	
	GetID("sov").style.left = (sovDivLefts - step) + "px"; 
	GetID("sov").style.width = (sovDivWidths + step) + "px";	
}

function vMoveRight() {
	
	var step = 20;

	var sovDivLefts = parseInt(GetID("sov").style.left);
	var sovDivWidths = parseInt(GetID("sov").style.width);	

	if (sovDivWidths <= 67)
	{
		//step = sovDivWidths - 17;
		step = sovDivWidths-1;
		window.clearInterval(sovObjTimer);
		vSwitch('sovTag');
	}

	GetID("sov").style.width = (sovDivWidths - step) + "px";
	GetID("sov").style.left = (sovDivLefts + step) + "px";	
}

function vResize() 
{
	if(!GetID("sov"))
	{
		return;
	}	

	var sovDivHeight = GetID("sov").offsetHeight;
	var sovDivWidth = GetID("sov").offsetWidth;
	var sovDocWidth = 0;
	var sovDocHeight = 0;
	var sovScrollLeft = 0;
	var sovScrollTop = 0;

	if(window.pageXOffset)
	{
		sovScrollLeft=window.pageXOffset;
	}
	else if(document.documentElement&&document.documentElement.scrollLeft)
	{
		sovScrollLeft=document.documentElement.scrollLeft;
	}
	else if(document.body)
	{
		sovScrollLeft=document.body.scrollLeft; 
	}

	if(window.pageYOffset)
	{
		sovScrollTop=window.pageYOffset;
	}
	else if(document.documentElement&&document.documentElement.scrollTop)
	{
		sovScrollTop=document.documentElement.scrollTop;
	}
	else if(document.body)
	{
		sovScrollTop=document.body.scrollTop;
	}

	if(window.innerWidth)
	{
		sovDocWidth=parseInt(window.innerWidth) - 17;
	}
	else if(document.documentElement&&document.documentElement.clientWidth)
	{ 
		sovDocWidth=document.documentElement.clientWidth;
	}
	else if(document.body)
	{
		sovDocWidth=document.body.clientWidth; 
	}

	if(window.innerHeight)
	{
		sovDocHeight=parseInt(window.innerHeight) - 17;
	}
	else if(document.documentElement&&document.documentElement.clientHeight)
	{ 
		sovDocHeight=document.documentElement.clientHeight; 
	}
	else if(document.body)
	{
		sovDocHeight=document.body.clientHeight;
	}
	
	GetID("sov").style.top = (parseInt(sovDocHeight) - parseInt(sovDivHeight) + parseInt(sovScrollTop)) + "px";
	GetID("sov").style.left = (parseInt(sovDocWidth) - parseInt(sovDivWidth) + parseInt(sovScrollLeft)) + "px";	
}

if (isIE) {
    document.write(_K + " for=\"_wmID\" event=\"fscommand(commands,args)\">vDoFSCommand(commands,args);" + _L);
} else {
    document.write(_K + ">function _wmID_DoFSCommand(command,args){vDoFSCommand(command, args)}" + _L);
}