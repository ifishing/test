$(function(){
	//滚动
	var fixLine=160;
	function chgpot(){
		var scroH=$(window).scrollTop(),
			getH=$('#riskHint').offset().top,
			//getH=100,
			ftLine=getH-$(window).height()-50,
			IE6 = $.browser.msie && ($.browser.version == '6.0');	
		
			if (IE6){
				 var scroH=$(window).scrollTop(),
						getH=$('#riskHint').offset().top,
						//getH=100,
						wheight = $(window).height();
						ftLine=getH-wheight-50;
						
						if (scroH>=fixLine){
							if (scroH<=ftLine){
								$("#toTop").css({'display':"block",'bottom':"auto"});
								$(".quinckIcon").css({'position':"absolute",'top':wheight+scroH-400+'px','display':"block",'bottom':"auto"});
							}else{
								$("#toTop").css({'display':"block",'bottom':"auto"});
								$(".quinckIcon").css({'position':"absolute",'top':getH-370+"px",'display':"block",'bottom':"auto"});
							}
						 }else{
							$("#toTop").css({'display':"none",'bottom':"auto",'top':"1000px"});
							$(".quinckIcon").css({'position':"absolute",'top':wheight+scroH-256+'px','display':"block",'bottom':"auto"});
						 }
			}else{
				if (scroH>=fixLine){
					if (scroH<=ftLine){	
						$("#toTop").css({'display':"block",'top':"auto"});
						$(".quinckIcon").css({'position':"fixed",'bottom':"70px",'display':"block",'top':"auto"});
					}else{
						$("#toTop").css({'display':"block",'bottom':"auto"});
						$(".quinckIcon").css({'position':"absolute",'top':getH-138+"px",'display':"block",'bottom':"auto"});
					}	
				}else{
					$("#toTop").css({'display':"none",'bottom':"auto",'top':"1000px"});
					$(".quinckIcon").css({'position':"fixed",'bottom':"70px",'display':"block",'top':"auto"});
			   }	
			}	
	};
	
	function toTopReveal(){
		var $viewWidth = $(window).width();

		if($viewWidth>1150){
			$(".quinckIcon").css({"right":"50%","marginRight":"-590px"});	
		}
		else
		{
			$(".quinckIcon").css({"right":"10px","marginRight":"0px"});
		}
	};
	
	chgpot();
	toTopReveal();
	
	$(window).bind("scroll",function(){
		chgpot();
		toTopReveal();
	});
	$(window).bind("resize",function(){	
		chgpot();
		toTopReveal();
	});
	
	//click toTop
	$("#toTop").click(function(){
		 if ($.browser.msie && ($.browser.version === "6.0" || $.browser.version === "7.0")){
			window.scrollTo(0,0);
			return false;
		 }
		
		var top = $(document).scrollTop(),
			i = 1;
		var timer = setInterval(function(){
			if(top <= 0){
				clearInterval(timer);
			}
			
			i = i * 2;
			top = top - i;
			window.scrollTo(0,top);
		},10);
	});
});