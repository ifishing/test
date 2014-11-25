/*
 *  updated at 2008-10-13 10:38:31 by zqm @ 对联分开时关闭也分开
 *  Modified by Harry Zhang 2013/8/27 flash广告遮罩
 *
 */
if(ADM_INCLUDED!==1){
    var FULL_TIME;
	//(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length)
	var _SoAD_E=isIE=isCSS3()?0:1,_S1,_S2,_S3,_S4,_S5,_S6,_S7,_S8,_A=_B=_X=_Y=0,_C,_D,_E,_F,_G,_H,_V,_W,_I=(isIE)?1:0.75,_J=(isIE)?"px":"pt",_SoAD_h=_K="<script type='text/javascript'",_SoAD_t=_L="</script>",_SoAD_Load=_N=false,_SoAD_S=_SoAD_R=_O=_P=new Array(),_SoAD_N="ADAREA",_SoAD_d=_M=(document.compatMode=="CSS1Compat")?document.documentElement:document.body,_R="http://images.sohu.com/cs/jsfile/img/",_S=_R+"bg.jpg",_T=_R+"r2.jpg",_U=_R+"r1.jpg";
    var _TFTright, _TFLright, _TFTleft, _TFLleft;// 触发式悬停漂浮
	function IsBig(){
		return (_M.clientWidth-cWidth)>240;
	}
	function IsPan(){
		return (screen.width-cWidth)>240;
	}
	function IsDe(a){
		return !(typeof(a)=="undefined");
	}
	function GetID(a){
		if(document.getElementById&&document.getElementById(a)){
			return document.getElementById(a);
		}else {
			if(document.all&&document.all(a)){
				return document.all(a);
			}else {
				if(document.layers&&document.layers[a]){
					return document.layers[a];
				}
			}
		}
	}
	function _SoAD_Paraminit(){
		switch(document.compatMode){
			case "BackCompat":_M=document.body;
			break;
			case "CSS1Compat":_M=document.documentElement;
			break;
			default:_M=document.body;
		}
	}
	function _SoAD_init(){
		if(!_M){
			_SoAD_Paraminit();
		}if(_N){
			return ;
		}
		_N=!_N;
		_O.sort(function (a,b){
			return (a.p>b.p)?1:((a.p==b.p)?0:-1);
		});//order by priority
		DoSchedule();
	}
	function _SoAD_exec(o){
		if(eval("typeof("+o.t+"_main)")=="function"){
			eval(o.t+"_main(o)");
		}
	}
	function AddSchedule(o){
		if(o&&o instanceof ADM){
			switch(o.t){
				case "FULL":case "POPUNDER":case "BEITOU":
					if(o.src.length>0){
						_O.push(o);
					}
					break;
				case "FLOAT":case "BOOKTURN":case "TFLOAT":
					if(o.src||o.src2){
						_O.push(o);
					}
					break;
				case "LIUMEITI":
					if(o.src){
					_O.push(o);
					}
					break;
				case "COUPLET":
					if(o.src.length>0||o.src2.length>0){
					_O.push(o);
					}
					break;
				default:_O.push(o);
			}
		}
		if(!isIE){
			document.write(_K+">function _"+o.id+"_DoFSCommand(command,args){_SoAD_DoFSCommand(command,args);}"+_L);
		}
		if(!isIE&&!IsPan()){
			document.write(_K+">function _"+o.id+"TG_DoFSCommand(command,args){_SoAD_DoFSCommand(command,args);}"+_L);
		}
		if(!isIE&&IsDe(o.src2)){
			document.write(_K+">function _"+o.id+"2_DoFSCommand(command,args){_SoAD_DoFSCommand(command,args);}"+_L);
		}
		if(!isIE&&IsDe(o.src2)&&!IsPan()){
			document.write(_K+">function _"+o.id+"2TG_DoFSCommand(command,args){_SoAD_DoFSCommand(command,args);}"+_L);
		}
	}
	function ADM(a,b){
		this.t=a;//type
		this.p=b;//priority
		this.s=0;//stop
		this.style="position:absolute;";
		this.id=a;//default id
		this.id2=a+"2";// default id2
	}

	function DoSchedule(){
		var p=-1;
		for(var i=0;i<_O.length;i++){
			switch(_O[i].s){
				case 0:
					if(p==-1){
						p=_O[i].p;
					}
					if(p==_O[i].p){
						_O[i].s=1;
						_SoAD_exec(_O[i]);
						break;
					}
				case 1:
					setTimeout(arguments.callee,400);
					return ;
				default:
			}
		}
	}

	function WriteAd(s){
		var a=document.createElement("div");
		with(GetID(_SoAD_N)){
			if(isIE){
				insertAdjacentElement("afterBegin",a);
			}else {
				appendChild(a);
			}
		}a.innerHTML=s;
		a=null;
	}
	function _SoAD_Media(o,i,a,w,h,u,m,f){
		var s="";
		if(/\.(swf)/i.test(a)){
			if(!/(BOOKTURN)/i.test(i) && f!='N') {
				s+="<div class='ad_flash' style='width:"+w+"px;'>";
			}
			if(isIE){
				s+="<object id='"+((o.noDiv)?"":"_")+i+"' width='"+w+"' height='"+h+"'"+((o.noDiv)?"style="+o.style:"");
				s+=" classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' ";
				s+="codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=";
				s+=IsDe(o.ver)?o.ver:"7,0,0,0";
				s+="'><param name='movie' value='"+a+"'>";
				if(IsDe(o.wmode)){
					s+="<param name='wmode' value='"+o.wmode+"'>";
				}if(IsDe(o.loop)){
					s+="<param name='loop' value='"+o.loop+"'>";
				}
				var arr=[];
				s+="<param name='quality' value='autohigh' LiveConnect='true'>";
				if (IsDe(m) && m!="" || u!="" ) {
					s+="<param name='flashvars' value='";
					if (u!="") {
						arr.push("clickthru="+u+"&gourl="+u);
					}
					if (IsDe(m) && m!="") {
						arr.push("src="+m);
					}
					s+=arr.join('&') + "'>";
				}
				s+="<param name='allowScriptAccess' value='always'></object>";
			}else {
				s+="<embed id='"+((o.noDiv)?"":"_")+i+"' name='_"+i+"' "+((o.noDiv)?"style="+o.style:"")+"src='"+a+"'"+" quality='autohigh'  allowScriptAccess='always'";
				s+="' width='"+w+"' height='"+h+"' ";
				if(IsDe(o.wmode)){
					s+=" wmode='"+o.wmode+"'";
				}if(IsDe(o.loop)){
					s+=" loop='"+o.loop+"'";
				}
				var arr=[];
				if (IsDe(m) && m!="" || u!="" ) {
					s+=" flashvars='";
					if (u!="") {
						arr.push("clickthru="+u+"&gourl="+u);
					}
					if (IsDe(m) && m!="") {
						arr.push("src="+m);
					}
					s+=arr.join('&') + "'";
				}
				s+=" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' swLiveConnect='true'></embed>";
			}

			if(!/(BOOKTURN)/i.test(i) && f!='N') {
				s+="<a href='"+decodeURIComponent(u)+"' target='_blank' style='cursor:pointer;display:block;width:"+w+"px;height:"+h+"px;position:absolute;left:0px;top:0px;background:#000;filter:alpha(opacity=0);opacity:0;'></a></div>";
			}
		}else {
			if(/\.(jpe?g|png|gif)$/i.test(a)){
				if(u!=""){
					s="<a href='"+((u==null)?"":u)+"' target='_blank'><img src='"+a+"' border='0' width='"+w+"' height='"+h+"'></a>";
				}else {
					s="<img src='"+a+"' border='0' width='"+w+"' height='"+h+"'>";
				}
			}
		}return s;
	}
	function ADM_Check(o,a,e){
		var n,v;
		var f=IsDe(e)?e:((o.CookieHour)?o.CookieHour:24);
		var b=IsDe(a)?a:((o.CookieNum)?o.CookieNum:Number.MAX_VALUE);
		var c=IsDe(a)?"_"+o.id:o.id;
		n=(o.CookieName)?(c+o.CookieName):c;
		v=(o.CookieDomain)?new ADCookie(document,n,f,"/",o.CookieDomain):new ADCookie(document,n,f);
		v.load();
		if(v.w==null){
			v.w=0;
		}
		v.w++;
		if(v.w<=b){
			v.store();
			return false;
		}
		return true;
	}
	function _SoAD_DoFSCommand(a,b){
		var c=null;
		if(a&&(eval("typeof(_SoAD_"+a+")")!="function")){
			return ;
		}if(_SoAD_DoFSCommand.caller){
			c=_SoAD_DoFSCommand.caller.toString ();
			c=c.substring(9,c.indexOf("(")).replace("_DoFSCommand","");
		}if(c=="anonymous"){
			c=b;
		}if(!c&&isIE){
			return ;
		}if(a=="quit"){
			return ;
		}if(a&&a!=""&&eval("typeof(_SoAD_"+a+")")=="function"){
			eval("_SoAD_"+a+"('"+b+"')");
		}else {
			_SoAD_hide(c);
		}
	}
	function isOver(a){
		for(var b=0;b<_O.length;b++){
			if(_O[b].id==a){
				_O[b].s=2;
				return ;
			}
		}
	}
	function _SoAD_hide(a){

		if(!GetID(a)){
			return ;
		}
		GetID(a).style.display="none";
		if(a=="fullscreenad"){
			if(!isIE){
				GetID(a).style.display="none";
			}a="FULL";
		}
		for(var b=0;b<_O.length;b++){
			if(_O[b].id==a){
				if(IsDe(_O[b].ret)){
					clearTimeout(_O[b].ret);
				}
				_O[b].s=2;
				return ;
			}
		}
	}
	function _SoAD_quit(a){
		if(!GetID(a)){
			return ;
		}
	}
	function _SoAD_show(a){
		if(!GetID(a)){
			return ;
		}if(a=="FLOAT"&&!IsPan()&&_A==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_E=setTimeout("_SoAD_hide('"+a+"');_A=1;",8000);
		}if(a=="FLOAT2"&&!IsPan()&&_B==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_F=setTimeout("_SoAD_hide('"+a+"');_A=1;",8000);
		}if(a=="COUPLET"&&!IsPan()&&_X==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_V=setTimeout("_SoAD_hide('"+a+"');_X = 1;",15000);
		}if(a=="COUPLET2"&&!IsPan()&&_Y==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_W=setTimeout("_SoAD_hide('"+a+"');_Y = 1;",15000);
		}if(a=="COUPLET2" && GetID('COUPLET1')) {
			var b =	'COUPLET1';
			if (GetID(b+"TG")) {
				GetID(b+"TG").style.display="block";
			}
			_V=setTimeout("_SoAD_hide('"+b+"');_X = 1;",15000);
			if (GetID(b)) {
				GetID(b).style.display="block";
			}
		}
		GetID(a).style.display="block";
		// wangwei add
		if(a=="COUPLET" && GetID("DUILIAN")){
			_SoAD_show1("DUILIAN");
		}
		if(a=="COUPLET2" && GetID("DUILIAN2")){
			_SoAD_show1("DUILIAN2");
		}
	}
	function _SoAD_show1(a){
		if(a=="DUILIAN"&&!IsPan()&&_X==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_V=setTimeout("_SoAD_hide('"+a+"');_X = 1;",15000);

		}if(a=="DUILIAN2"&&!IsPan()&&_Y==0&&(GetID(a+"TG")!=null)){
			GetID(a+"TG").style.display="block";
			_W=setTimeout("_SoAD_hide('"+a+"');_Y = 1;",15000);
		}
		GetID(a).style.display="block";
	}

	function _SoAD_play(a){
		if(GetID(a)){
			GetID("_"+a).Play();
		}
	}
	function _SoAD_replay(a){//     修改  2013-11-13   lizhonghao
		if(!GetID(a)){
			return ;
		}
		var top = 0;
		if(a.indexOf(a)!=-1){
			for(var i=0;i<_O.length;i++){
				if(_O[i].id==a){
					var p,l;
					if(_O[i].topOld){  //流媒体中添加此属性
						top = _O[i].topOld;
					}
					p=_M.scrollTop+_O[i].top;
					l=_M.scrollLeft+_O[i].left;
					if(_O[i].position=="absolute"){
						p=_O[i].top;
						l=_O[i].left;
					}
					p=parseInt(p);
					l=parseInt(l);
					p=parseInt(_I*p)+_J;
					l=parseInt(_I*l)+_J;
					if(IsDe(_O[i].ret)){
						clearTimeout(_O[i].ret);
					}if(_O[i].timeout!="MAX"){
						if(IsDe(_O[i].control)){
							_O[i].ret=setTimeout(_O[i].op,IsDe(_O[i].timeout)?parseInt(_O[i].timeout):8000);
						}else {
							_O[i].ret=setTimeout("_SoAD_hide('"+a+"')",IsDe(_O[i].timeout)?parseInt(_O[i].timeout):8000);
						}
					}if(isIE){
						GetID(a).innerHTML=_O[i].code;
					}
				}
			}
		}
		p=parseInt(p);
		l=parseInt(l);
		if(p){
			if(top){
				GetID(a).style.top = getScroll().top + top + 'px';
			}else{
				GetID(a).style.top=parseInt(_I*(p)) + _J;
			}

		}
		if(l){
			//lilei 2014.07.22 广告弹出左定位；
			var _w = ($(window).width() - $('#LIUMEITI_LEFT').width())/2;
			GetID(a).style.left = _w + 'px';
			//GetID(a).style.left=parseInt(_I*(l)) + _J;//by swh
		}
		GetID("_"+a) ? GetID("_"+a).style.display="block": null;
		GetID(a).style.display="block";
	}
	function _SoAD_FSCommand(I){
		if(isIE){
			return _K+" for='_"+I+"' event='FSCommand(command,args)'>var _s"+I+"='_"+I+"';_SoAD_DoFSCommand(command,((args&&args!=''&&eval(\"typeof(_SoAD_\"+command+\")\")==\"function\")?args:_s"+I+"));"+_L;
		}return "";
	}
	function FLOAT2_DoFSCommand(a,b){
		_SoAD_DoFSCommand(a,b);
	}
	function BOOKTURN2_DoFSCommand(c,a){
		_SoAD_DoFSCommand(c,a);
	}
	function FULL_main(o){
		if(ADM_Check(o)){
			o.s=2;
			return ;
		}
		var a=false;
		o.width=IsDe(o.width)?o.width:cWidth;
		o.height=IsDe(o.height)?o.height:480;
		o.insight=IsDe(o.insight)?o.insight:false;
		o.delay=IsDe(o.delay)?o.delay:0;
		if(o.src.length==o.href.length){
			for(var i=0;i<o.src.length;i++){
				var b=GetID("FULL");
				if (b==null) {b = document.createElement('div');b.style.width=cWidth+'px';b.style.display='none';b.id='FULL';document.body.insertBefore(b,document.body.firstChild);}
				if(b!=null){
					if(o.insight){
						self.scroll(0,0);
					}b.style.display="block";
					o.src=o.src[i];
					o.href=o.href[i];
					b.innerHTML="<div id="+o.id+">"+_SoAD_Media(o,o.id,o.src,o.width,o.height,o.href,"",o.mask)+"</div>";
					a=!a;
					//setTimeout("_SoAD_hide('FULL')",IsDe(o.timeout)?o.timeout:7000);
                    FULL_TIME = setTimeout("_SoAD_hide('FULL')",IsDe(o.timeout)?o.timeout:7000);
					return ;
				}else {
					o.s=2;
					return ;
				}
			}if(!a){
				_SoAD_hide("FULL");
			}
		}
	}
	function POP_STRUCT(o){
		var i,h,l,t;
		o.delay=IsDe(o.delay)?o.delay:0;
		setTimeout("isOver('"+o.id+"')",o.delay);
		i=(o.superad)?(screen.width-9):((IsDe(o.width)?o.width:350)-4);
		h=(o.superad)?(screen.height-56):((IsDe(o.height)?o.height:250)-4);
		l=screen.width+10;
		t=screen.height+10;
		try{
		return window.open("about:blank","","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width="+i+",height="+h+",top="+t+",left="+l);
		}catch(exception){}
	}
	function POP_WINDOW(o){
		var a="<html><head><meta http-equiv='content-type' content='text/html; charset=gb2312'><title>";
		a+=(o.title)?o.title:((o.superad)?("FOCUS.cn \u80cc\u6295\u5e7f\u544a"):("FOCUS.cn "+o.t+" Ad"));
		a+="</title>";
		a+=_K+">";
		a+=_L;
		a+="</head><body scroll=no style='margin:0;border:none'>";
		a+="<iframe id='iFrame' ";
		a+=" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no width=100% height=100% src='"+o.src+"'>wait</iframe>";
		a+="</body></html>";
		return a;
	}
	function POPUNDER_main(o){
		var i=getSrcIdx(o.id,o.turns);
		o.src=o.src[i];
		if(IsDe(o.src)){
			var a=POP_STRUCT(o);
			if(a){
				if(isIE){
					a.blur();
				}else {
					a.opener.focus();
				}
				a.moveTo((IsDe(o.left)?o.left:0),(IsDe(o.top)?o.top:0));
				a.document.write(POP_WINDOW(o));
			}
		}else {
			o.s=2;
		}
	}
	function BEITOU_main(o){
		o.superad=true;
		POPUNDER_main(o);
	}


	function FLOAT_main(o){
		if (!(/IE 6\.0/.test(navigator.userAgent)) && o.fixed) {
			o.style = 'position:fixed;';
		}
		if(ADM_Check(o)){
			o.s=2;
			return ;
		}var a=false,b=false;
		for(var i=0;i<_O.length;i++){
			switch(_O[i].t){
				case "BOOKTURN":a=!a;
				break;
				case "COUPLET":b=!b;
				break;
				default:break;
			}
		}if(!o.href){
			o.href="";
		}if(!o.href2){
			o.href2="";
		}o.wmode="opaque";
		o.wmode2="opaque";
		tmp=(a&&b)?0:20;
		o.width=IsDe(o.width)?o.width:100;
		o.height=IsDe(o.height)?o.height:100;
		o.top=IsDe(o.top)?o.top-_M.clientHeight:(-tmp-o.width-20);
		o.width2=IsDe(o.width2)?o.width2:100;
		o.height2=IsDe(o.height2)?o.height2:100;
		o.top2=IsDe(o.top2)?o.top2-_M.clientHeight:(-tmp-o.height2-20);
		o.delay=IsDe(o.delay)?o.delay:0;
		var d="",e="",f="",g="";
		if(o.replay){
			var c=o.replay.split(";");
			if(c.length>1){
				d=c[0].split(":")[0];
				e=c[0].split(":")[1];
				f=c[1].split(":")[0];
				g=c[1].split(":")[1];
			}else {
				d=c[0].split(":")[0];
				e=c[0].split(":")[1];
				f=c[0].split(":")[0];
				g=c[0].split(":")[1];
			}
		}if(!IsPan()&&IsDe(o.tag)){
			o.tag=(o.tag!="")?o.tag:(d=="LEFT"?_U:_T);
		}if(!IsPan()&&IsDe(o.tag2)){
			o.tag2=(o.tag2!="")?o.tag2:(d=="RIGHT"?_U:_T);
		}o.framestyle=(o.framestyle)?o.framestyle:o.style;
		o.framestyle2=(o.framestyle2)?o.framestyle2:o.style;
		o.txtButton=IsDe(o.txtButton)?o.txtButton:true;
		o.txtButton2=IsDe(o.txtButton2)?o.txtButton2:true;
		var s="";
		if(o.src&&o.src!=""){
			if(o.txtButton){
				s+=TxtShow(o,o.id,o.src,o.width,o.height,o.href,o.framestyle,"left",d,"float_replay('"+e+"','"+o.id+"','"+d+"')","close_float('"+o.id+"')",o.mask);
			}else {
				s+="<div style=\""+o.framestyle+"z-index:10;\" id="+o.id+">"+_SoAD_Media(o,o.id,o.src,o.width,o.height,o.href,"",o.mask)+"</div>";
			}if(!IsPan()&&IsDe(o.tag)){
				if(d!="LEFT"){
					_E=setTimeout("_SoAD_hide('"+o.id+"');_A=1;",8000);
				}o.wmode="transparent";
				if(d=="LEFT"){
					s1="float_replay('"+e+"','"+o.id+"','"+d+"')";
				}else {
					s1="_SoAD_show('"+o.id+"');clearTimeout(_G);_A=2;";
				}s+="<div onclick=\"javascript:"+s1+"\" style=\""+o.framestyle+"z-index:0;\" id="+o.id+"TG>"+_SoAD_Media(o,o.id+"TG",o.tag,20,o.height,"","",o.mask)+"</div>";
				o.wmode=null;
			}
		}if(o.src2&&o.src2!=""){
			if(o.txtButton2){
				s+=TxtShow(o,o.id2,o.src2,o.width2,o.height2,o.href2,o.framestyle2,"right",f,"float_replay('"+g+"','"+o.id2+"','"+f+"')","close_float('"+o.id2+"')",o.mask2);
			}else {
				s+="<div style=\""+o.framestyle2+"z-index:10;\" id="+o.id2+">"+_SoAD_Media(o,o.id2,o.src2,o.width2,o.height2,o.href2,"",o.mask2)+"</div>";
			}if(!IsPan()&&IsDe(o.tag2)){
				if(f!="RIGHT"){
					_F=setTimeout("_SoAD_hide('"+o.id2+"');_B=1;",8000);
				}o.wmode="transparent";
				if(f=="RIGHT"){
					s1="float_replay('"+g+"','"+o.id2+"','"+f+"')";
				}else {
					s1="_SoAD_show('"+o.id2+"');clearTimeout(_H);_B=2;";
				}s+="<div onclick=\"javascript:"+s1+"\" style=\""+o.framestyle2+"z-index:0;\" id="+o.id2+"TG>"+_SoAD_Media(o,o.id2+"TG",o.tag2,20,o.height2,"","",o.mask2)+"</div>";
				o.wmode=null;
			}
		}if(!o.txtButton){
			s+=_SoAD_FSCommand(o.id);
		}if(!o.txtButton2){
			s+=_SoAD_FSCommand(o.id2);
		}if(s!=""){
			WriteAd(s);
			if(!IsPan()&&o.src&&IsDe(o.tag)){
				AttachEvent(GetID(o.id+"TG"),"mouseover",function (){
					_G=setTimeout("if(_A!=2){_SoAD_show('"+o.id+"');_A=2;}",3000);
				});
			}if(!IsPan()&&o.src2&&IsDe(o.tag2)){
				AttachEvent(GetID(o.id2+"TG"),"mouseover",function (){
					_H=setTimeout("if(_B!=2){_SoAD_show('"+o.id2+"');_B=2;}",3000);
				});
			}
			_S1=GetID(o.id);
			_S2=GetID(o.id2);
			_S3=GetID(o.id+"TG");
			_S4=GetID(o.id2+"TG");
			if (!(/IE 6\.0/.test(navigator.userAgent)) && o.fixed == true ) {
				window.setTimeout("FLOAT_position("+o.top+","+(IsDe(o.left)?o.left:0)+","+o.top2+","+(IsDe(o.left2)?o.left2:-o.width2)+","+o.width+")",400);
			}
			else {
				window.setInterval("FLOAT_position("+o.top+","+(IsDe(o.left)?o.left:0)+","+o.top2+","+(IsDe(o.left2)?o.left2:-o.width2)+","+o.width+")",400);
			}
		}
		setTimeout("isOver('"+o.id+"')",o.delay);
	}
	function close_float(a){
		if(a=="FLOAT"){
			clearTimeout(_E);
			clearTimeout(_G);
			_A=3;
		}if(a=="FLOAT2"){
			clearTimeout(_F);
			clearTimeout(_H);
			_B=3;
		}_SoAD_hide(a);
	}
	function float_replay(a,b,c){
		_SoAD_hide(b);
		_SoAD_replay(a);
		if(!IsPan()&&(GetID(b+"TG")!=null)){
			_SoAD_hide(b+"TG");
			if(c=="LEFT"){
				clearTimeout(_G);
				clearTimeout(_E);
				_A=0;
			}if(c=="RIGHT"){
				clearTimeout(_H);
				clearTimeout(_F);
				_B=0;
			}
		}
	}
	function scroll(){
		if(_S1!=null){
			if(!IsPan()&&(_A==1)){
				if(_M.scrollTop>120){
					_S1.style.display="block";
				}else {
					_S1.style.display="none";
				}
			}
		}if(_S2!=null){
			if(!IsPan()&&(_B==1)){
				if(_M.scrollTop>120){
					_S2.style.display="block";
				}else {
					_S2.style.display="none";
				}
			}
		}
	}window.onscroll=scroll;
	function FLOAT_position(a,b,c,d,e){
		var f=parseInt((_M.clientWidth-cWidth-20)/2),g=(IsBig())?(f-e):b,_c=(IsBig())?-f:d;
        //edit by jihui start
        g=b;
        _c=d;
        //edit by jihui end
		if(_S1!=null){
			_S1.style.top=parseInt(_I*(_M.scrollTop+_M.clientHeight+a))+_J;
			_S1.style.left=parseInt(_I*(_M.scrollLeft+g))+_J;
		}if(_S2!=null){
			_S2.style.top=parseInt(_I*(_M.scrollTop+_M.clientHeight+c))+_J;
			_S2.style.left=parseInt(_I*(_M.scrollLeft+_M.clientWidth+_c))+_J;
		}if(_S3!=null){
			_S3.style.top=parseInt(_I*(_M.scrollTop+_M.clientHeight+a))+_J;
			_S3.style.left=parseInt(_I*(_M.scrollLeft+g))+_J;
		}if(_S4!=null){
			_S4.style.top=parseInt(_I*(_M.scrollTop+_M.clientHeight+c))+_J;
			_S4.style.left=parseInt(_I*(_M.scrollLeft+_M.clientWidth+_c+80))+_J;
		}
	}
	function LIUMEITI_main(o){
		o.timeout=IsDe(o.timeout)?o.timeout:8000;
		o.delay=IsDe(o.delay)?o.delay:0;
		o.txtButton=IsDe(o.txtButton)?o.txtButton:true;
		o.op="_SoAD_hide('"+o.id+"');";
		if(o.control){
			var a,b,c,d,e,f;
			a=o.control.split(";");
			b=a[0].split(":")[0];
			c=a[0].split(":")[1];
			d=a[1].split(":")[0];
			e=a[1].split(":")[1];
			if(a[1].split(":").length<3){
				o.op="_SoAD_DoFSCommand('"+b+"','"+c+"'); _SoAD_DoFSCommand('"+d+"','"+e+"');";
			}else {
				f=a[1].split(":")[2];
				o.op="_SoAD_DoFSCommand('"+b+"','"+c+"'); _SoAD_DoFSCommand('"+d+"','"+e+"'),_SoAD_DoFSCommand('"+d+"','"+f+"')";
			}if(o.timeout!="MAX"){
				o.ret=setTimeout(o.op,o.timeout);
			}else {
				setTimeout("isOver('"+o.id+"')",o.delay);
			}
		}o.width=IsDe(o.width)?o.width:200;
		o.height=IsDe(o.height)?o.height:150;
		o.top=IsDe(o.top)?o.top:(_M.clientHeight-o.height)/2;
		o.topOld = o.top;   //复用值
		if(sys.chrome || sys.safari){//兼容chrome和safari   //add 2013-11-13 lizhonghao
			o.top=IsDe(o.top)?o.top + getScroll().top:(_M.clientHeight-o.height)/2;
		}


		o.left=IsDe(o.left)?_M.clientWidth/2+o.left:(_M.clientWidth-o.width)/2;
		if(ADM_Check(o)){
			o.s=2;
			o.style+="display:none;z-index:10000;";
			var s="";
			if(o.txtButton){
				s=TxtShow(o,o.id,o.src,o.width,o.height,o.href,o.style,"right","","",o.op,o.mask);
			}else {
				o.code=_SoAD_Media(o,o.id,o.src,o.width,o.height,o.href,"",o.mask);
				s=(o.noDiv)?o.code:"<div "+((o.style)?" style="+o.style:"")+" id="+o.id+">"+o.code+"</div>";
				s+=_SoAD_FSCommand(o.id);
			}WriteAd(s);
			if(o.control){
				if(a[1].split(":").length<3){
					_SoAD_show(e);
				}else {
					_SoAD_show(e);
					_SoAD_show(f);
				}
			}return ;

		}if(o.src&&o.src!=""){
			if(o.position=="absolute"){
				o.style+="top:"+parseInt(_I*o.top)+_J;
				o.style+=";left:"+parseInt(_I*o.left)+_J;
			}else {
				o.style+="top:"+parseInt(_I*(_M.scrollTop+o.top))+_J;
				o.style+=";left:"+parseInt(_I*(_M.scrollLeft+o.left))+_J;
			}_P[_P.length]="onresizeADLMT('"+o.id+"',"+o.left+")";

			if(o.txtButton){
				s=TxtShow(o,o.id,o.src,o.width,o.height,o.href,o.style,"right","","",o.op,o.mask);
			}else {
				o.code=_SoAD_Media(o,o.id,o.src,o.width,o.height,o.href,"",o.mask);
				s=(o.noDiv)?o.code:"<div "+((o.style)?" style="+o.style:"")+" id="+o.id+">"+o.code+"</div>";
				s+=_SoAD_FSCommand(o.id);
			}WriteAd(s);
			if(!o.control){
				if(o.timeout!="MAX"){
					o.ret=setTimeout("_SoAD_hide('"+o.id+"')",o.timeout);
				}else {
					setTimeout("isOver('"+o.id+"')",o.delay);
				}
			}
		}if(o.isfloat&&GetID(o.id)){
			window.setInterval("LMT_FLOAT('"+o.id+"',"+o.top+","+o.left+")",400);
		}
	}
	function onresizeADLMT(a,b){
		var c=GetID(a);
		if(c){
			c.style.left=_I*(_M.scrollLeft+((b<0)?_M.clientWidth:0)+b)+_J;
		}
	}
	function LMT_FLOAT(i,a,b){
		with(GetID(i)){
			style.top=parseInt(_I*(_M.scrollTop+a))+_J;
			style.left=parseInt(_I*(_M.scrollLeft+b))+_J;
		}
	}
	function BOOKTURN_main(o){
		if(ADM_Check(o)){
			o.s=2;
			return ;
		}if(!IsPan()&&IsDe(o.tag)){
			o.src2=o.tag;
			o.width2=IsDe(o.tagw)?IsDe(o.tagw):20;
			o.height2=IsDe(o.tagw)?IsDe(o.tagw):100;
		}if(!o.loop){
			o.loop=false;
		}if(!o.loop2){
			o.loop2=true;
		}o.width=IsDe(o.width)?o.width:350;
		o.height=IsDe(o.height)?o.height:250;
		o.top=IsDe(o.top)?o.top:0;
		var a=parseInt((_M.clientWidth-cWidth-240)/2);
		o.left=IsDe(o.left)?o.left:-o.width;
		//o.tl=(IsBig())?(-o.width-a):o.left;
        o.tl=o.left;
		o.width2=IsDe(o.width2)?o.width2:80;
		o.height2=IsDe(o.height2)?o.height2:80;
		o.top2=IsDe(o.top2)?o.top2:0;
		o.left2=IsDe(o.left2)?o.left2:-o.width2;
		//o.tr=(IsBig())?(-o.width2-a):o.left2;
        o.tr=o.left2;
		o.insight=IsDe(o.insight)?o.insight:false;
		o.delay=IsDe(o.delay)?o.delay:0;
		var s="",c=(ADM_Check(o,1,1));
		if(o.src){
			o.style+="z-index:10000;";
			//if ( o.delay >0 ){
			setTimeout("_SoAD_www();isOver('"+o.id+"')",o.delay);
			o.style+="visibility:hidden;";
			/*add by zqm at 2008.07.23*/
			//	}
			//else {
			//	if(c){setTimeout("isOver('"+o.id+"')",o.delay);o.style+="visibility:hidden;";}
			//}
			o.style+="border-width:0px;";
			o.style+="top:"+parseInt(_I*o.top)+_J;
			o.style+=";left:"+parseInt(_I*(_M.scrollLeft+((o.tl<0)?_M.clientWidth:0)+o.tl))+_J;
			s="<div "+((o.style)?" style=\""+o.style:"")+"\" id="+o.id+">"+_SoAD_Media(o,o.id,o.template,o.width,o.height,o.href,o.src,o.mask)+"</div>";
			s+=_SoAD_FSCommand(o.id);
			if(!c){
				if(isIE){
					b=GetID("type");
					if(b!=null){
						b.style.visibility="hidden";
					}
				}setTimeout("_SoAD_dfasd()",IsDe(o.timeout)?o.timeout:8000);
			}_P[_P.length]="onresizeADTurn('"+o.id+"',"+o.left+","+o.width+")";
		}else {
			c=true;
		}if(o.src2){
			o.wmode=(o.wmode2)?o.wmode2:"";
			if(o.style.lastIndexOf("z-index:10000;")>0){
				o.style=o.style.substring(0,o.style.lastIndexOf("z-index:10000;"));
			}if(!c){
				o.style+="visibility:hidden;";
			}o.style+="z-index:11;";
			o.style+="top:"+parseInt(_I*o.top2)+_J;
			o.style+=";left:"+parseInt(_I*(_M.scrollLeft+((o.tr<0)?_M.clientWidth:0)+o.tr))+_J;
			o.loop=o.loop2;
			o.style+=";border-width:0px;";
			s+="<div "+((o.style)?" style=\""+o.style:"")+"\" id="+o.id2+">"+_SoAD_Media(o,o.id2,o.src2,o.width2,o.height2,"","",o.mask2)+"</div>";
			_P[_P.length]="onresizeADTurn('"+o.id2+"',"+o.left2+","+o.width2+")";
			s+=_SoAD_FSCommand(o.id2);
		}if(o.insight&&!c){
			self.scroll(0,0);
		}WriteAd(s);
		if(!(o.src&&o.src2)){
			o.s=2;
		}
	}
	function onresizeADTurn(a,b,c){
		var e,f,g;
		e=GetID(a);
		f=parseInt((_M.clientWidth-cWidth-240)/2);
		g=((IsBig())?-f-c:b);
		if(e){
			e.style.left=_I*(_M.scrollLeft+((g<0)?_M.clientWidth:0)+g)+_J;
		}
	}
	function _SoAD_www(){
		var b=GetID("BOOKTURN");
		GetID("BOOKTURN2").style.visibility="hidden";
		if(b!=null){
			b.style.visibility="visible";
			b.style.display="block";
			GetID("_BOOKTURN").Play();
		}if(isIE){
			b=GetID("type");
			if(b!=null){
				b.style.visibility="hidden";
			}
		}
	}
	function _SoAD_dfasd(){
		isOver("BOOKTURN");
		GetID("BOOKTURN").style.visibility="hidden";
		var b=GetID("BOOKTURN2");
		if(b!=null){
			b.style.visibility="visible";
			b.style.display="block";
			GetID("_BOOKTURN2").Play();
		}if(isIE){
			b=GetID("type");
			if(b!=null){
				b.style.visibility="visible";
			}
		}
	}
	//========================新增公用方法end=========================================================================
	//以下3个方法兼容ff的onmouseover
	function contains(parentNode, childNode) {
	    if (parentNode.contains) {
	        return parentNode != childNode && parentNode.contains(childNode);
	    } else {
	        return !!(parentNode.compareDocumentPosition(childNode) & 16);
	    }
	}
	function checkHover(e,target){
	    if (getEvent(e).type=="mouseover")  {
	        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
	    } else {
	        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
	    }
	}

	function getInner() {
		return {
			width : _M.scrollWidth,
			height : _M.scrollWidth
		};
	}

	function getEvent(e){
	    return e||window.event;
	}

	function insertAfterBody(attr, html){
		var divCouplet = document.createElement('div');
		divCouplet.id 			= attr.id;
		divCouplet.style.width	= attr.width;
		divCouplet.style.height	= attr.height;
		divCouplet.style.position	= attr.position;
		divCouplet.style.top	= attr.top;
		divCouplet.style.zIndex = attr.zIndex ? attr.zIndex : 9999;
		divCouplet.style.textAlign = attr.textAlign ? attr.textAlign : 'right';  //by swh add
		divCouplet.style.backgroundImage = attr.backgroundImage ? attr.backgroundImage: '';  //by swh add
		if(attr.left){
			divCouplet.style.left	= attr.left;
		}
		if(attr.right){
			divCouplet.style.right	= attr.right;
		}
		divCouplet.style.display= attr.display;
		divCouplet.innerHTML	= html;
		document.getElementsByTagName('body')[0].appendChild(divCouplet);
	}

	function getScroll() {
		return {
			top : document.documentElement.scrollTop || document.body.scrollTop,
			left : document.documentElement.scrollLeft || document.body.scrollLeft
		};
	}

		//跨浏览器获取Style
	function getStyle(element, attr) {
		var value;
		if (typeof window.getComputedStyle != 'undefined') {//W3C
			value = window.getComputedStyle(element, null)[attr];
		} else if (typeof element.currentStyle != 'undeinfed') {//IE
			value = element.currentStyle[attr];
		}
		return value;
	}

	//设置动画
	function animate(obj,element) {
			var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
						   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
						   obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';
			var start = obj['start'] != undefined ? obj['start'] :
							attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 :
													   parseInt(getStyle(element, attr));

			var t = obj['t'] != undefined ? obj['t'] : 10;
			var step = obj['step'] != undefined ? obj['step'] : 20;

			var alter = obj['alter'];
			var target = obj['target'];
			var mul = obj['mul'];

			var speed = obj['speed'] != undefined ? obj['speed'] : 6;
			var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';


			if (alter != undefined && target == undefined) {
				target = alter + start;
			} else if (alter == undefined && target == undefined && mul == undefined) {
				throw new Error('alter增量或target目标量必须传一个！');
			}

			if (start > target) step = -step;

			if (attr == 'opacity') {
				element.style.opacity = parseInt(start) / 100;
				element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
			} else {
				//element.style[attr] = start + 'px';
			}

			if (mul == undefined) {
				mul = {};
				mul[attr] = target;
			}

			clearInterval(element.timer);
			element.timer = setInterval(function () {

				var flag = true;

				for (var i in mul) {
					attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
					target = mul[i];


					if (type == 'buffer') {
						step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
															 (target - parseInt(getStyle(element, attr))) / speed;
						step = step > 0 ? Math.ceil(step) : Math.floor(step);
					}

					if (attr == 'opacity') {
						if (step == 0) {
							setOpacity();
						} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
							setOpacity();
						} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
							setOpacity();
						} else {
							var temp = parseFloat(getStyle(element, attr)) * 100;
							element.style.opacity = parseInt(temp + step) / 100;
							element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
						}

						if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;

					} else {
						if (step == 0) {
							setTarget();
						} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
							setTarget();
						} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
							setTarget();
						} else {
							element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
						}

						if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
					}
				}

				if (flag) {
					clearInterval(element.timer);
					if (obj.fn != undefined) obj.fn();
				}

			}, t);

			function setTarget() {
				element.style[attr] = target + 'px';
			}

			function setOpacity() {
				element.style.opacity = parseInt(target) / 100;
				element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
			}
	}

	function getClass(className, parentNode) {
		var node = null;
		var temps = [];
		if (parentNode != undefined) {
			node = parentNode;
		} else {
			node = document;
		}
		var all = node.getElementsByTagName('*');
		for (var i = 0; i < all.length; i ++) {
			if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
				temps.push(all[i]);
			}
		}
		return temps;
	}

	function addEvent(obj, type, fn) {
		if (typeof obj.addEventListener != 'undefined') {
			obj.addEventListener(type, fn, false);
		} else {
			if (!obj.events) obj.events = {};
			if (!obj.events[type]) {
				obj.events[type] = [];
				if (obj['on' + type]) obj.events[type][0] = fn;
			} else {
				if (addEvent.equal(obj.events[type], fn)) return false;
			}
			obj.events[type][addEvent.ID++] = fn;
			obj['on' + type] = addEvent.exec;
		}
	}

	addEvent.ID = 1;
	addEvent.exec = function (event) {
		var e = event || addEvent.fixEvent(window.event);
		var es = this.events[e.type];
		for (var i in es) {
			es[i].call(this, e);
		}
	};

	addEvent.equal = function (es, fn) {
		for (var i in es) {
			if (es[i] == fn){
				return true;
			}
		}
		return false;
	};

	addEvent.fixEvent = function (event) {
		event.preventDefault = addEvent.fixEvent.preventDefault;
		event.stopPropagation = addEvent.fixEvent.stopPropagation;
		event.target = event.srcElement;
		return event;
	};

	addEvent.fixEvent.preventDefault = function () {
		this.returnValue = false;
	};

	addEvent.fixEvent.stopPropagation = function () {
		this.cancelBubble = true;
	};

	(function () {
		window.sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
		(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

		if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
	})();

	//======================新增公用方法end=================================================================




	//==================================重写对联============================================================

	function COUPLET_main(o){

		o.timeout 		= o.timeout ? o.timeout : 8000;
		o.timeout2 		= o.timeout2 ? o.timeout2 : 8000;
		o.width			= o.width ? o.width : 100;
		o.widthSmall	= o.widthSmall ? o.widthSmall : 25;
		o.height		= o.height ? o.height : 270;
		o.heightSmall	= o.heightSmall ? o.heightSmall : 270;
		o.left			= o.left ? o.left : 0;
		o.left2			= o.left2 ? o.left2 : 0;
		o.mask			= o.mask ? o.mask : o.href ? "Y" : "N";
		o.mask2			= o.mask2 ? o.mask2 : o.href2 ? "Y" : "N";
		o.shift			= o.shift ? o.shift : false;
		o.shiftSpeed	= o.shiftSpeed ? o.shiftSpeed : 50;
		o.zIndex		= o.zIndex ? o.zIndex : 1001;
		o.wmode			="transparent";

		function getTop(){
			if(o.id.toUpperCase() == "DUILIAN" || o.id.toUpperCase() == "DUILIAN1"){
				o.top = (document.documentElement.clientHeight - o.height - 38);
				o.top2 = (document.documentElement.clientHeight - o.heightSmall - 38);
			}else{
				o.top			= o.top ? o.top : 0;
				o.top2			= o.top2 ? o.top2 : 0;
			}
			return {
				top:o.top,
				top2:o.top2
			};
		}

		if(o.srcBig){
			divLeftBig	= _SoAD_Media(o,o.id,o.srcBig,o.width,o.height,o.href,"",o.mask) ;
			divLeftSmall= _SoAD_Media(o,o.id,o.srcSmall,o.widthSmall,o.height,o.href,"",o.mask);
			insertAfterBody({zIndex:o.zIndex,id:o.id + "leftbig",width:o.width+'px',height:o.height+'px',position:"fixed",display:"block",top:getScroll().top + getTop().top+'px',left:o.left+"px"},divLeftBig);
			insertAfterBody({zIndex:o.zIndex,id:o.id + "leftsmall",width:o.widthSmall+'px',height:o.heightSmall+'px',position:"fixed",display:"none",top:getScroll().top + getTop().top+'px',left:o.left+"px"},divLeftSmall);
		}
		if(o.srcBig2 ){
			divRightBig	 =  _SoAD_Media(o,o.id2,o.srcBig2,o.width,o.height,o.href2,"",o.mask2);
			divRightSmall=  _SoAD_Media(o,o.id2,o.srcSmall2,o.widthSmall,o.height,o.href2,"",o.mask2);
			insertAfterBody({zIndex:o.zIndex,id:o.id + "rightbig",width:o.width+'px',height:o.height+'px',position:"fixed",display:"block",top:getScroll().top + getTop().top2 + "px",right:o.left2 + "px"},divRightBig);
			insertAfterBody({zIndex:o.zIndex,id:o.id + "rightsmall",width:o.widthSmall+'px',height:o.heightSmall+'px',position:"fixed",display:"none",top:getScroll().top + getTop().top2 + "px",right:o.left2 + "px"},divRightSmall);
		}


		var small 	= GetID(o.id + 'leftsmall');
		var small2 	= GetID(o.id + 'rightsmall');
		var big		= GetID(o.id + 'leftbig');
		var big2	= GetID(o.id + 'rightbig');

		//上下移动
		if(o.shift){
			//左边
			if(o.srcBig){
				small.style.position 	= "absolute";
				big.style.position 		= "absolute";

				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop().top,
						t:o.shiftSpeed
					},small);
				});

				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop().top,
						t:o.shiftSpeed
					},big);
				});

			}
			//右边
			if(o.srcBig2){
				small2.style.position 	= "absolute";
				big2.style.position 	= "absolute";
				AttachEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop().top2,
						t:o.shiftSpeed
					},big2);
				});

				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop().top2,
						t:o.shiftSpeed
					},small2);
				});
			}
		}

		//第二对联注册resize事件
		if(o.id.toUpperCase() == "DUILIAN" || o.id.toUpperCase() == "DUILIAN1" ){  //第二对联
			addEvent(window,'resize',function(){
				animate({
					attr:'y',
					target:getScroll().top + getTop().top,
					t:o.shiftSpeed
				},big);
			});

			addEvent(window,'resize',function(){
				animate({
					attr:'y',
					target:getScroll().top + getTop().top,
					t:o.shiftSpeed
				},small);
			});

			addEvent(window,'resize',function(){
				animate({
					attr:'y',
					target:getScroll().top + getTop().top2,
					t:o.shiftSpeed
				},big2);
			});

			addEvent(window,'resize',function(){
				animate({
					attr:'y',
					target:getScroll().top + getTop().top2,
					t:o.shiftSpeed
				},small2);
			});

		}

		//显示隐藏
		function hiddenDiv(){
			if(big != undefined  && (o.id.toUpperCase() == "COUPLET" || o.id.toUpperCase() == "SHUBIAN" || o.id.toUpperCase() == "DUILIAN")){	//第一 、第二对联
				big.style.display   = "none";
				big2.style.display  = "none";
				small.style.display = "block";
				small2.style.display= "block";
				big.onmouseout = big2.onmouseout = function(e){
					if(checkHover(e,this)){
						setTimeout(hiddenDiv,100);
					}
				};
			}
			if(big != undefined && (o.id.toUpperCase() == "COUPLET1" || o.id.toUpperCase() == "SHUBIAN1" || o.id.toUpperCase() == "DUILIAN1")){	//第一、第二挂旗左
				big.style.display   = "none";
				small.style.display = "block";

				big.onmouseout = function(e){
					if(checkHover(e,this)){
						setTimeout(hiddenDiv,100);
					}
				};
			}
			if(big2 != undefined  && (o.id2.toUpperCase() == "COUPLET12" || o.id2.toUpperCase() == "SHUBIAN12" || o.id2.toUpperCase() == "DUILIAN12")){//第一、第二挂旗右
				big2.style.display  = "none";
				small2.style.display= "block";

				big2.onmouseout = function(e){
					if(checkHover(e,this)){
						setTimeout(hiddenDiv,100);
					}
				};
			}
			isOver(o.id);
		}
		setTimeout(hiddenDiv,o.timeout);

		if(big2 != undefined  && (o.id.toUpperCase() == "COUPLET" || o.id.toUpperCase() == "SHUBIAN" || o.id.toUpperCase() == "DUILIAN")){	//第一、第二对联
			small2.onmouseover = small.onmouseover = function(e){
				if(checkHover(e,this)){
					small.style.display 		= "none";
					small2.style.display	= "none";
					big.style.display  = 'block';
					big2.style.display = 'block';
				}
			};
		}
		if(big != undefined  && (o.id.toUpperCase() == "COUPLET1" || o.id.toUpperCase() == "SHUBIAN1" || o.id.toUpperCase() == "DUILIAN1")){	//第一、第二挂旗左
			small.onmouseover = function(e){
				if(checkHover(e,this)){
					this.style.display 		= "none";
					big.style.display  = 'block';
				}
			};
		}
		if(big2 != undefined  && (o.id2.toUpperCase() == "COUPLET12"  || o.id2.toUpperCase() == "SHUBIAN12" || o.id2.toUpperCase() == "DUILIAN12")){ //第一、第二挂旗右边
			small2.onmouseover = function(e){
				if(checkHover(e,this)){
					this.style.display 		= "none";
					big2.style.display  = 'block';
				}
			};
		}

	}

	function COUPLET1_main(o){
		COUPLET_main(o);
	}
	//==============================第二对联start=====================================================
	function DUILIAN_main(o){
		COUPLET_main(o);
	}
	function DUILIAN1_main(o){
		COUPLET_main(o);
	}
//=============================第二对联end==========================================================
//======================================触发式左右竖边sart========================================================
	function SHUBIAN_main(o){
		COUPLET_main(o);
	}
	function SHUBIAN1_main(o){
		COUPLET_main(o);
	}
//======================================触发式左右竖边end========================================================
//==================================================炫景start==================================================
	// 炫景
	function XUANJING_main(o){
		if(o.srcTl == undefined || o.srcLeft == undefined || o.srcRight == undefined || o.srcBtn == undefined){
			return;
		}
		o.widthTl 	  = o.widthTl ? o.widthTl : 1002;
		o.widthLeft   = o.widthLeft ? o.widthLeft : 146;
		o.widthRight  = o.widthRight ? o.widthRight : 146;
		o.heightTl 	  = o.heightTl ? o.heightTl : 60;
		o.heightLeft  = o.heightLeft ? o.heightLeft : 500;
		o.heightRight = o.heightRight ? o.heightRight : 500;
		o.timeout 	  = o.timeout ? o.timeout : 8000;
		o.speed		  = o.speed ? o.speed : 2000;
		o.offsetL	  = o.offsetL ? o.offsetL : o.widthLeft;
		o.offsetR	  = o.offsetR ? o.offsetR : o.widthRight;
		o.mask	  	  = o.mask ? o.mask : (o.hrefTl ? 'Y' : "N");
		o.mask2	  	  = o.mask2 ? o.mask2 : (o.hrefLeft ? 'Y' : "N");
		o.step		  = o.step ? o.step : 10;
		o.interval	  = o.interval ? o.interval : 50;
		o.heightBtn	  = o.heightBtn ? o.heightBtn : 60;
		o.widthBtn	  = o.widthBtn ? o.widthBtn : 20;
		o.wmode		  = "transparent";

		var styleLeft = "overflow:hidden;background-color:#fff;width:"+ o.widthLeft +"px;height:"+ o.heightLeft +"px; position: absolute; top: 0px; left: -"+o.offsetL+"px; ";
		var styleRight= "overflow:hidden;background-color:#fff;width:"+ o.widthRight +"px;height:"+ o.heightRight +"px; position: absolute; top: 0px; right: -"+o.offsetR+"px;";

		var divTl	  = _SoAD_Media(o,o.id+'tll',o.srcTl,o.widthTl,o.heightTl,o.hrefTl,"",o.mask);
		var divLeft   = '<div id="'+o.id+'Left" style="'+ styleLeft +'">'+_SoAD_Media(o,o.id+'leftt',o.srcLeft,o.widthLeft,o.heightLeft,o.hrefLeft,"",o.mask2)+"</div>";
		var divRight  = '<div id="'+o.id+'Right" style="' + styleRight + '">'+_SoAD_Media(o,o.id+'rightt',o.srcRight,o.widthRight,o.heightRight,o.hrefRight,"",o.mask2)+"</div>";
		var txtButton = '<div id="xuanjingbtn" style="display:none;width: '+ o.widthBtn +'px;height:'+o.heightBtn+'px;  position: absolute; right: -'+ (o.widthBtn+1) +'px; top: 0px;"><img src="'+o.srcBtn+'" ></div>';
		var s = divTl + divLeft + divRight + txtButton ;

		var div = document.createElement('div');
		div.id = o.id+'Tl';
		div.style.width    = o.widthTl + "px";
		div.style.height   = o.heightTl +"px";
		div.style.position = 'relative';
		div.style.margin   = "0 auto";
		div.style.zIndex   = "10";
		div.innerHTML = s;

		//document.body.insertBefore(div,document.body.firstChild);//旧方法
		//by swh 2014/7/1   强制位置再头部导航下面
		var reforeNode = document.getElementById("XUANJING");
		document.body.insertBefore(div, reforeNode);

		var oBtn   = GetID('xuanjingbtn');
		var oLeft  = GetID(o.id+'Left');
		var oRight = GetID(o.id+'Right');

		//定时消失两边图片
		function hiddenDiv(){
			setTimeout(function(){
				animate({
					attr : 'h',
					target : 0,
					t : o.interval,
					speed : o.step
				},oLeft);

				animate({
					attr : 'h',
					target : 0,
					t : o.interval,
					speed : o.step,
					fn:function(){
						oBtn.style.display = "block";
						isOver(o.id);
					}
				},oRight);

			},o.timeout);
		}
		hiddenDiv();

		//注册事件
		oBtn.onmouseover =function(e){
			if(checkHover(e,this)){
				oBtn.style.display = "none";
				animate({
					attr : 'h',
					t : o.interval,
					speed : o.step,
					target:o.heightLeft
				},oLeft);
				animate({
					attr : 'h',
					t : o.interval,
					speed : o.step,
					target:o.heightRight,
					fn:function(){
						hiddenDiv();
					}
				},oRight);
			}
		};
	}

//=========================================炫景end================================================================
//========================================贯穿炫景start=================================================================
	// 贯穿炫景
	function GUANCHUAN_main(o){
		o.s = 2;
		if(o.srcTl == undefined || o.srcLeft == undefined || o.srcRight == undefined || o.srcBtn == undefined){
			return;
		}
		o.widthTl 	  = o.widthTl ? o.widthTl : 1002;
		o.widthLeft   = o.widthLeft ? o.widthLeft : 205;
		o.widthRight  = o.widthRight ? o.widthRight : 205;
		o.heightTl 	  = o.heightTl ? o.heightTl : 110;
		o.heightLeft  = o.heightLeft ? o.heightLeft : 6894;
		o.heightRight = o.heightRight ? o.heightRight : 6894;
		o.offsetL	  = o.offsetL ? o.offsetL : o.widthLeft;
		o.offsetR	  = o.offsetR ? o.offsetR : o.widthRight;
		o.mask	  	  = o.mask ? o.mask : (o.hrefTl ? 'Y' : "N");
		o.mask2	  	  = o.mask2 ? o.mask2 : (o.hrefLeft ? 'Y' : "N");
		o.heightBtn	  = o.heightBtn ? o.heightBtn : 60;
		o.widthBtn	  = o.widthBtn ? o.widthBtn : 20;
		o.wmode		  = "transparent";

		var styleLeft = "overflow:hidden;background-color:#fff;width:"+ o.widthLeft +"px;height:"+ o.heightLeft +"px; position: absolute; top: 0px; left: -"+o.offsetL+"px; ";
		var styleRight= "overflow:hidden;background-color:#fff;width:"+ o.widthRight +"px;height:"+ o.heightRight +"px; position: absolute; top: 0px; right: -"+o.offsetR+"px;";
		var divTl	  = _SoAD_Media(o,o.id+'tll',o.srcTl,o.widthTl,o.heightTl,o.hrefTl,"",o.mask);
		var divLeft   = '<div id="'+o.id+'Left" style="'+ styleLeft +'">'+_SoAD_Media(o,o.id+'leftt',o.srcLeft,o.widthLeft,o.heightLeft,o.hrefLeft,"",o.mask2)+"</div>";
		var divRight  = '<div id="'+o.id+'Right" style="' + styleRight + '">'+_SoAD_Media(o,o.id+'rightt',o.srcRight,o.widthRight,o.heightRight,o.hrefRight,"",o.mask2)+"</div>";
		var txtButton = '<div id="'+ o.id +'Btn" style="display:block;cursor:pointer;width: '+ o.widthBtn +'px;height:'+o.heightBtn+'px;  position: absolute; right: -'+ (o.widthBtn+1) +'px; top: 0px;"><img src="'+o.srcBtn+'" ></div>';
		var s = divTl + divLeft + divRight + txtButton ;

		var div = document.createElement('div');
		div.id = o.id+'Tl';
		div.style.width    = o.widthTl + "px";
		div.style.height   = o.heightTl +"px";
		div.style.position = 'relative';
		div.style.margin   = "0 auto";
		div.style.zIndex   = "10";
		div.innerHTML = s;
		document.body.insertBefore(div,document.body.firstChild);

		var oBtn   = GetID(o.id + 'Btn');
		if(oBtn){
			addEvent(oBtn,'click',function(){
				document.body.removeChild(div);
			});
		}
	}
	//GUANCHUAN_main(o);
//========================================贯穿炫景end===================================================================
	function onresizeADCP(a,b,c,d){
      return false;
		var e,f,g;
		e=GetID(a);
		f=parseInt((_M.clientWidth-cWidth)/2);
		g=(d==0)?((IsBig())?(f-c):b):((IsBig())?-f:b);
		if(e){
			e.style.left=_I*(_M.scrollLeft+((g<0)?_M.clientWidth:0)+g)+_J;
		}
	}
	function TxtShow(o,a,b,c,d,e,f,g,h,i,j,m){
		var k="";
		if(h=="RIGHT"&&g=="right"){
			k="<a style='cursor:pointer;border-bottom:1px solid #000000' onclick=\"javascript:"+i+";\"><font color=#000000>\u91cd\u64ad</font></a>|";
		}if(h=="LEFT"&&g=="left"){
			k="<a style='cursor:pointer;border-bottom:1px solid #000000' onclick=\"javascript:"+i+";\"><font color=#000000>\u91cd\u64ad</font></a>|";
		}o.code="<table style='margin:0' border=0 cellpadding=0 cellspacing=0><tr><td height="+d+" valign=top align=left>";
		o.code+=_SoAD_Media(o,a,b,c,d,e,"",m);
		o.code+="</td></tr><tr><td background="+_S+" width="+c+" height=20 align="+g+">"+k;
		o.code+="<a style='cursor:pointer;border-bottom:1px solid #000000' onclick=\"javascript:"+j+";\"><font color=#000000>\u5173\u95ed</font></a></td></tr></table>";
		return "<DIV id='"+a+"' style='"+f+";z-index:1000'>"+o.code+"</DIV>";
	}

  function TFLOAT_main(o){
	 o.s=2;
     o.width=IsDe(o.width)?o.width:100;
     o.height=IsDe(o.height)?o.height:100;
     o.width2=IsDe(o.width2)?o.width2:200;
     o.height2=IsDe(o.height2)?o.height2:200;
     o.top=IsDe(o.top)?o.top:20;
     o.left=IsDe(o.left)?o.left:10;
     o.top2=IsDe(o.top2)?o.top2:o.top;
     o.left2=IsDe(o.left2)?o.left2:o.left;
     o.direction = o.direction == 'right' ? 'right' : 'left';
     o.id = IsDe(o.id)?o.id : 'TFloat'+o.direction;
     if (!IsDe(o.src)) return ;
     if (o.direction == 'left'){
          o.left1 = (_SoAD_d.clientWidth - cWidth)/2 - o.width - o.left;
          o.left2 = (_SoAD_d.clientWidth - cWidth)/2 - o.width - o.left2;
          if (o.left1 < 0  ) {
              o.left1 = o.left2 = 0;
          }
      }
      else {
          o.left1 = (_SoAD_d.clientWidth + cWidth)/2  + o.left;
          o.left2 = (_SoAD_d.clientWidth + cWidth)/2 + o.width - o.width2 +  o.left2;
          if (o.left1 > _SoAD_d.clientWidth - o.width ) {
              o.left1 = _SoAD_d.clientWidth - o.width ;
              o.left2 = _SoAD_d.clientWidth - o.width2;
          }
      }
      o.top1 = o.height  + o.top;
      o.top2 = o.height2 + o.top2;
      o.framestyle  ='position:absolute;display:none;';
      o.framestyle1 = 'position:relative;left:0;visibility:visible;';
      o.framestyle2 = 'display:none;position:relative;left:0';
      var s = '';
      s+="<div id=\""+o.id+"_out\" style=\""+o.framestyle+" z-index:10\">";
      s+="<div style=\""+o.framestyle1+"\" id=\""+o.id+"_small\">"+_SoAD_Media(o,o.id,o.src,o.width,o.height,o.href,"",o.mask)+"</div>";
      s+="<div style=\""+o.framestyle2+"\" id=\""+o.id+"_large\">"+_SoAD_Media(o,o.id,o.src2,o.width2,o.height2,o.href2,"",o.mask2)+"</div>";
      s+="</div>";
      WriteAd(s);
      setTimeout(function(){showTFloat(o.id,o.left1,o.left2,o.top1,o.top2,o.direction);},100);
      eval("_TFT"+o.direction+"="+o.top1);
      eval("_TFL"+o.direction+"="+o.left1);
  }
  function showTFloat(id,left1,left2,top1,top2,direction) {
       var outfloatdiv = GetID(id+'_out');
       var bigfloatdiv = GetID(id+'_large');
       var smallfloatdiv = GetID(id+'_small');
       eval ("var ft = _TFT" + direction );
       eval ("var fl = _TFL" + direction );
      if (outfloatdiv){
          if (isIE){
              outfloatdiv.style.top = parseInt(_I*(_SoAD_d.scrollTop+_SoAD_d.offsetHeight - ft)) + _J ;
          } else {
              outfloatdiv.style.top = parseInt(_I*(window.innerHeight+window.pageYOffset - ft)) + _J ;
          }
          eval("outfloatdiv.style.left=parseInt(_I*(_TFL"+direction+")) + _J");
          outfloatdiv.style.display='block';
          AttachEvent(smallfloatdiv,'mouseover',function(){showTFloatLarge(id,left2,top2,direction);});
          AttachEvent(bigfloatdiv,'mouseout',function(){showTFloatSmall(id,left1,top1,direction);});
          TFloatMove(id,direction);
      }
  }
  function showTFloatLarge(id,l,t,direction) {
       var bigfloatdiv = GetID(id+'_large');
       var smallfloatdiv = GetID(id+'_small');
       var outfloatdiv = GetID(id+'_out');
       eval ("_TFL" + direction + "="+l);
       eval ("_TFT"  + direction + "="+t);
       eval ("var ft = _TFT" + direction );
       eval ("var fl = _TFL" + direction );
      if (bigfloatdiv.style.display=='none') {
          bigfloatdiv.style.display='block';
          smallfloatdiv.style.display='none';
      }
      if (outfloatdiv){
          if (isIE){
              outfloatdiv.style.top = parseInt(_I*(_SoAD_d.scrollTop+_SoAD_d.offsetHeight - ft))+_J ;
          } else {
              outfloatdiv.style.top = parseInt(_I*(window.innerHeight+window.pageYOffset - ft))+_J;
          }
          outfloatdiv.style.left = parseInt(_I*(fl))+_J;
      }
  }
  function showTFloatSmall(id,l,t,direction) {
       var bigfloatdiv = GetID(id+'_large');
       var smallfloatdiv = GetID(id+'_small');
       var outfloatdiv = GetID(id+'_out');
       eval ("_TFL" + direction + "="+l);
       eval ("_TFT"  + direction + "="+t);
       eval ("var ft = _TFT" + direction );
       eval ("var fl = _TFL" + direction );
       if (bigfloatdiv.style.display=='block') {
          bigfloatdiv.style.display='none';
          smallfloatdiv.style.display='block';
       }
       if (outfloatdiv){
          if (isIE){
              outfloatdiv.style.top = parseInt(_I*(_SoAD_d.scrollTop+_SoAD_d.offsetHeight - ft))+_J;
          } else {
              outfloatdiv.style.top = parseInt(_I*(window.innerHeight+window.pageYOffset - ft))+_J;
          }
          outfloatdiv.style.left = parseInt(_I*(fl))+_J;
       }
  }
  function TFloatMove(id,direction){
      var outfloatdiv = GetID(id+'_out');
       eval ("var ft = _TFT" + direction );
       eval ("var fl = _TFL" + direction );
      if (outfloatdiv){
          if (isIE){
              outfloatdiv.style.top = parseInt(_I*(_SoAD_d.scrollTop+_SoAD_d.offsetHeight - ft)) + _J;
          } else {
              outfloatdiv.style.top = parseInt(_I*(window.innerHeight+window.pageYOffset - ft))+_J;
          }
          outfloatdiv.style.left = parseInt(_I*(fl))+_J;
          setTimeout(function(){TFloatMove(id,direction);},15);
      }
  }
	function getSrcIdx(a,b){
		var c=new ADCookie(document,a+"Index",24);
		c.load();
		c.x=(c.x==null)?parseInt(Math.random()*b):c.x;
		var d=parseInt(c.x);
		c.x++;
		c.x=(c.x>(b-1))?0:c.x;
		c.store();
		return d;
	}
	//建议使用addEvent
	function AttachEvent(a,b,c){
		if(isIE){
			a.attachEvent("on"+b,c);
		}else {
			a.addEventListener(b,c,false);
		}
	}
	function DetachEvent(a,b,c){
		if(isIE){
			a.detachEvent("on"+b,c);
		}else {
			a.removeEventListener(b,c,false);
		}
	}
	document.write("<div id='"+_SoAD_N+"'></div>");
	window.onresize=function (){
		for(var i=0;i<_P.length;i++){
			eval(_P[i]);
		}
	};
	setTimeout("_SoAD_init()",2000);
}
var ADM_INCLUDED=1;



function bannerBox(obj,oid,t,ch){
	var h = 0;
	if (ch==1) { h=40;}
	else{ h=80;}
	var o 		 = {};
	o.wmode		 = "transparent";
	var divSmall = [];
	var divBig	 = [];
	var banner	 = GetID(oid);
	if(!banner) return;
	banner.style.marginTop = '10px';
	var enToNum	 = {'one':1,'two':2,'third':3,'four':4};
	var NumToEn	 = {1:'one',2:'two',3:"third",4:'four'};
	for(var i in obj){
		divSmall[i] = [];
		divBig[i]	= [];
		for(var j=0; j<obj[i]['swfsmall'].length;j++){
			divSmall[i].push ( _SoAD_Media(o,'bannerinner_'+ enToNum[i] + '_' + (j+1),obj[i]['swfsmall'][j],157,h,obj[i]['hrefsmall'][j],'',obj[i]['hrefsmall'][j]? 'Y':'N'));
		}

		for(var j=0; j<obj[i]['swfbig'].length;j++){
			divBig[i].push ( _SoAD_Media(o,'bannerinner_'+ enToNum[i] + '_' + (j+1)+'_big',obj[i]['swfbig'][j],1002,60,obj[i]['hrefbig'][j],'',obj[i]['hrefbig'][j]? 'Y':'N'));
		}
	}
	var d = 0;
	for(var i in divSmall){
		d++;
	}
	for(var i in divSmall){
		var temp			= document.createElement('div');
		temp.id 			= 'banner'+oid+'_'+ enToNum[i];
		temp.style.width	= '1002px';
		var tempDiv	= document.createElement('div');
		tempDiv.style.height = h+10+'px';			// 间距控制之一，非ie
		if(enToNum[i] == d){
			tempDiv.style.height = h+'px';
		}

		for(var j = 0;j<divSmall[i].length; j++){
			var bannerDiv			= document.createElement('div');

			bannerDiv.style.styleFloat 	= 'left';
			bannerDiv.style.cssFloat 	= 'left';
			bannerDiv.style.width 	= '157px';
			bannerDiv.style.height 	= h+'px';
			bannerDiv.style.display 	= 'inline-block';
			bannerDiv.className	 	= 'banner'+oid+'_'+enToNum[i];
			bannerDiv.id		 	= 'banner'+oid+'_'+enToNum[i]+'_'+(j+1);
			if(!sys.ie){
				bannerDiv.style.marginBottom	= '10px';	//非ie
			}

			if(j<divSmall[i].length-1){
				bannerDiv.style.marginRight		= '12px';
			}

			bannerDiv.innerHTML = divSmall[i][j];
			tempDiv.appendChild(bannerDiv);
		}
		temp.appendChild(tempDiv);
		var bigDiv	= document.createElement('div');
		bigDiv.id	= 'banner'+oid+'_'+enToNum[i]+'_big';
		bigDiv.style.height	= '60px';
		bigDiv.style.width	= '1002px';
		bigDiv.style.clear	= 'both';
		bigDiv.style.display= 'none';
		if((sys.ie <9 ) && d!= enToNum[i]){
			bigDiv.style.marginBottom= '10px';		//ie9以下
		}
		temp.appendChild(bigDiv);
		banner.appendChild(temp);
	}
	var timer = null;
	for(var  i in divSmall){
		var className = getClass('banner'+oid+'_'+enToNum[i],banner);
		for(var j = 0;j<className.length;j++){
			className[j].i = i;
			addEvent(className[j],'mouseover',function(){
				clearTimeout(timer);

				if(GetID('banner'+oid+'_'+d+'_big')){
					GetID('banner'+oid+'_'+d+'_1').parentNode.style.height = h+'px';
				}

				for(var x in divSmall){
					GetID('banner'+oid+'_'+enToNum[x]+'_big').innerHTML = '';
					GetID('banner'+oid+'_'+enToNum[x]+'_big').style.display = 'none';
				}
				var position = this.id.split('_');
				if(enToNum[this.i] == d ){
					this.parentNode.style.height = h+10+'px';
				}
				GetID('banner'+oid+'_'+enToNum[this.i]+'_big').style.display = 'block';
				GetID('banner'+oid+'_'+enToNum[this.i]+'_big').innerHTML	  = divBig[NumToEn[position[1]]][position[2]-1];
				if(GetID('banner'+oid+'_'+(enToNum[this.i] +1)+'_big')){
					for(var k =0; k<getClass('banner'+oid+'_'+(enToNum[this.i] +1),banner).length;k++){
						if(!sys.ie || sys.ie >= 9){
							getClass('banner'+oid+'_'+(enToNum[this.i] +1),banner)[k].style.marginTop = '10px';
						}
					}
				}
			});
			addEvent(className[j],'mouseout',function(){
				var _this = this;
				timer = setTimeout(function(){
					if(enToNum[_this.i] == d ){
						_this.parentNode.style.height = h+'px';
					}
					GetID('banner'+oid+'_'+enToNum[_this.i]+'_big').style.display = 'none';
					if(GetID('banner'+oid+'_'+(enToNum[_this.i] +1)+'_big')){
						for(var k =0; k<getClass('banner'+oid+'_'+(enToNum[_this.i] +1),banner).length;k++){
							if(!sys.ie ||  sys.ie >= 9){
								getClass('banner'+oid+'_'+(enToNum[_this.i] +1),banner)[k].style.marginTop = '0px';
							}
						}
					}
				},t);
			});
		}

		addEvent(GetID('banner'+oid+'_'+enToNum[i]+'_big'),'mouseover',function(){
			clearTimeout(timer);
		});
		addEvent(GetID('banner'+oid+'_'+enToNum[i]+'_big'),'mouseout',function(){
			for(var x in divSmall){
				GetID('banner'+oid+'_'+enToNum[x]+'_big').innerHTML = '';
				GetID('banner'+oid+'_'+enToNum[x]+'_big').style.display = 'none';
				if(GetID('banner'+oid+'_'+(enToNum[x] +1)+'_big')){
					for(var k =0; k<getClass('banner'+oid+'_'+(enToNum[x] +1),banner).length;k++){
						getClass('banner'+oid+'_'+(enToNum[x] +1),banner)[k].style.marginTop = '0px';
					}
				}else{
					if(GetID('banner'+oid+'_'+enToNum[x] + '_1')){
						GetID('banner'+oid+'_'+enToNum[x] + '_1').parentNode.style.height = h+'px';
					}
				}
			}
		});
	}
}

	//==================================触发式流媒体加左/右悬停=============================================

	function HLMTFLOAT_main(o){

		o.timeout 		= o.timeout ? o.timeout : 8000;
		o.width			= o.width ? o.width : 300;
		o.widthSmall	= o.widthSmall ? o.widthSmall : 100;
		o.height		= o.height ? o.height : 224;
		o.heightSmall	= o.heightSmall ? o.heightSmall : 100;
		o.left			= o.left ? o.left : 0;
		o.mask			= o.mask ? o.mask : o.href ? "Y" : "N";
		o.shift			= o.shift ? o.shift : false;
		o.shiftSpeed	= o.shiftSpeed ? o.shiftSpeed : 50;
		o.zIndex		= o.zIndex ? o.zIndex : 10000;
		o.wmode			= "transparent";
		o.position	    = o.position ? o.position : 'right';

		function getTop2(){

			o.top = (document.documentElement.clientHeight - o.height);
			o.top2 = (document.documentElement.clientHeight - o.heightSmall-20);
			o.top3 = (document.documentElement.clientHeight - 20);
			return {
				top:o.top,
				top2:o.top2,
				top3:o.top3
			};
		}

		if(o.srcBig){
			divLeftBig	= _SoAD_Media(o,o.id,o.srcBig,o.width,o.height,o.href,"",o.mask) ;
			divLeftSmall= _SoAD_Media(o,o.id,o.srcSmall,o.widthSmall,o.heightSmall,o.href,"",o.mask);

			if(o.position=='left'){
				insertAfterBody({zIndex:o.zIndex,id:o.id + "big",width:o.width+'px',height:o.height+'px',position:"fixed",display:"block",top:getScroll().top + getTop2().top+'px',left:o.left+"px"},divLeftBig);

				insertAfterBody({zIndex:o.zIndex,id:o.id + "small",width:o.widthSmall+'px',height:o.heightSmall+'px',position:"fixed",display:"none",top:getScroll().top + getTop2().top2+'px',left:o.left+"px"},divLeftSmall);

				insertAfterBody({zIndex:o.zIndex,id:o.id +'hclose',width:o.widthSmall+'px',height:'20px',position:"fixed",display:"none",top:getScroll().top + getTop2().top3+'px',left:o.left+"px",textAlign:"left",backgroundImage:"url(http://images.sohu.com/cs/jsfile/img/bg.jpg)"},'<a onclick="close_hlmtfloat(\''+o.id+'\');" style="cursor:pointer;border-bottom:1px solid #000000"><font color="#000000">关闭</font></a>');
			}else{
				insertAfterBody({zIndex:o.zIndex,id:o.id + "big",width:o.width+'px',height:o.height+'px',position:"fixed",display:"block",top:getScroll().top + getTop2().top+'px',right:o.left+"px"},divLeftBig);

				insertAfterBody({zIndex:o.zIndex,id:o.id + "small",width:o.widthSmall+'px',height:o.heightSmall+'px',position:"fixed",display:"none",top:getScroll().top + getTop2().top2+'px',right:o.left+"px"},divLeftSmall);

				insertAfterBody({zIndex:o.zIndex,id:o.id +'hclose',width:o.widthSmall+'px',height:'20px',position:"fixed",display:"none",top:getScroll().top + getTop2().top3+'px',right:o.left+"px",textAlign:"right",backgroundImage:"url(http://images.sohu.com/cs/jsfile/img/bg.jpg)"},'<a onclick="close_hlmtfloat(\''+o.id+'\');" style="cursor:pointer;border-bottom:1px solid #000000"><font color="#000000">关闭</font></a>');
			}
		}

		var small 	= GetID(o.id + 'small');
		var big		= GetID(o.id + 'big');
		var close	= GetID(o.id + 'hclose');

		//上下滚动
		if(o.shift){
			if(o.srcBig){
				small.style.position 	= "absolute";
				big.style.position 		= "absolute";
				close.style.position 	= "absolute";

				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop2().top2,
						t:o.shiftSpeed
					},small);
				});

				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop2().top,
						t:o.shiftSpeed
					},big);
				});
				addEvent(window,'scroll',function(){
					animate({
						attr:'y',
						target:getScroll().top + getTop2().top3,
						t:o.shiftSpeed
					},close);
				});

			}
		}


		//显示隐藏
		function hiddenDiv(){
			if(big != undefined && ( o.id.toUpperCase() == "HLMTFLOAT")){
				big.style.display   = "none";
				small.style.display = "block";
				close.style.display = "block";
				big.onmouseout = function(e){
					if(checkHover(e,this)){
						setTimeout(hiddenDiv,100);
					}
				};
			}

			isOver(o.id);
		}

		setTimeout(hiddenDiv,o.timeout);

		if(big != undefined  && (o.id.toUpperCase() == "HLMTFLOAT")){
			small.onmouseover = function(e){
				if(checkHover(e,this)){
					this.style.display 		= "none";
					close.style.display 	= "none";
					big.style.display       = 'block';
				}
			};
		}

	}

	function close_hlmtfloat(a){

			//GetID(a+'big').style.display="none";
			//GetID(a+'small').style.display="none";
			//GetID(a+'hclose').style.display="none";

			//_SoAD_hide(a+'big');
			//_SoAD_hide(a+'small');
			//_SoAD_hide(a+'hclose');

			GetID(a+'big').parentNode.removeChild(GetID(a+'big'));
			GetID(a+'small').parentNode.removeChild(GetID(a+'small'));
			GetID(a+'hclose').parentNode.removeChild(GetID(a+'hclose'));

	}

	//==================触发式流媒体加左/右悬停==========================

    //===============================全屏+通栏start======================
	function BIGFULL_main(o){
		o.ttime = o.ttime || 500;
		o.btime =  o.btime || 8000;
		o.tspeed = o.tspeed || 50;
		o.bspeed = o.bspeed || 8;
		o.twidth = o.twidth || 1002;
		o.theight = o.theight || 60;
		o.bwidth = o.bwidth || 1002;
		o.bheight = o.bheight || 480;
		o.mask = o.mask || 'Y';
        o.wmode	= "transparent";

		var s = '<div id="exfssmall" style="width:'+o.twidth+'px; height: '+o.theight+'px; overflow: hidden; position: relative; clear: both; margin-top:5px;"><div  style="width: '+o.twidth+'px; height: '+o.theight+'px; position: relative;">';
		s += _SoAD_Media(o,o.id,o.tsrc,o.twidth,o.theight,o.thref,"",o.mask) + '</div></div>';
		s += '<div id="exfsbig" style="width: '+o.bwidth+'px; height: 0px; overflow: hidden; clear: both; position: relative; display: block;"><a href="'+o.bhref+'" target="_blank"><img src="'+o.bsrc+'" style="border: none;"></a></div>';
		var bigfull = document.getElementById('BIGFULL');
		bigfull.innerHTML = s;
		var to = document.getElementById('exfssmall');
		var bo = document.getElementById('exfsbig');

		setTimeout(function(){
			var Timer = setInterval(function(){
				to.style.height = (parseInt(to.style.height) -5)+'px';
				if(parseInt(to.style.height) <= 0){
					clearInterval(Timer);
					setTimeout(function(){
						Timer = setInterval(function(){
							bo.style.height = (parseInt(bo.style.height) +5)+'px';
							if(parseInt(bo.style.height) >= o.bheight){
								clearInterval(Timer);
								setTimeout(function(){
									Timer = setInterval(function(){
										bo.style.height = (parseInt(bo.style.height) -5)+'px';
										if(parseInt(bo.style.height) <= 0){
											clearInterval(Timer);
											setTimeout(function(){
												Timer = setInterval(function(){
													to.style.height = (parseInt(to.style.height) +5)+'px';
													if(parseInt(to.style.height) >= o.theight){
														clearInterval(Timer);
														isOver(o.id);
													}
												},50);
											},100);
										}
									},o.bspeed);

								},o.btime);
							}
						},o.bspeed);
					},500);
				}
			},o.tspeed);
			if(parseInt(to.style.height) <= 0){
				clearInterval(Timer);
			}
		},o.ttime);

	}

//========================全屏+通栏end==================

	//lilei 20140725 IE10下bug临时处理↓
	function isCSS3(){
		if(window.addEventListener && navigator.userAgent.indexOf("MSIE 9.0")<0){
			return true;
		}else{
			return false;
		}
	}
	//lilei 20140725 IE10下bug临时处理↑