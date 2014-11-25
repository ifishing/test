$(function(){
	$.fn.fcAlert = function(){
		var $this = $(this);
		var wrapper = '';
		var href = $(this).attr("href");
		html = href.split('/');
		id = html[html.length-1].split('.');
		if(id.length ==2 && id[id.length-1] =='html' && !isNaN(id[0]))
		{
			$this.attr('p_id',id[0]);
			var num;
			$this.bind("mouseenter", function(){
				if($(this).find('div.new_tips').length < 1){
					$this.getProj();
				}else{
					$('a[data-tip]>div.new_tips').hide();
				    $(this).find('div.new_tips').show();
				}
				$(this).css({"z-index":+$(this).css("z-index")+1});
				num = $(this).css('z-index');
			});
			
			$this.bind("mouseleave", function(){
				$(this).find('div.new_tips').hide();
				$('.text p a').each(function(){
					$(this).css("z-index",num);
				})
			});
		}
		else{
			return false;
		}
	}
	
	$.fn.getProj = function(){
		var wrapper = '';
		var url = the_site_web_domain+'/common/modules/newscenter/news_2014/pro_info.php';
		var $this = $(this);
		$.ajax({
	        type: 'GET', 
	        url: url, 
	        data: 'id='+$this.attr('p_id'),    
	        dataType : 'jsonp',
	        async:false,
	        success: function(data){
	        	if(data){
	        		$this.append("<div class='new_tips'><div class='new_tips_cen'><s></s><div class='bd'><p class='tit'><a href='"+data.url+"' target='_blank'>"+data.title+"</a></p><a href='javascript:;' class='bd_txt' style='cursor:default;'><p>均价：<em>"+data.price+"</em></p><p>位置：<b>"+data.address+"</b></p><p>热线：<em>"+data.phone400+"</em></p></a><p><a href='"+data.url+"' target='_blank' class='go_info'>楼盘详情</a></p></div></div></div>");
	        	    $('a[data-tip]>div.new_tips').hide();
	        	    $this.find('div.new_tips').show();
	        	}
		    },
		    error:function(xhr,status,err){
		    	return false;
		    }
		});
	}
	
	$.each($("a[data-tip]"),function(){$(this).fcAlert();$(this).css({"z-index":1});});

	$('.recommend').last().css({'margin': 0});

});