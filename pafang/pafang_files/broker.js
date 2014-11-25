//jq重置
(function(){
    // remove layerX and layerY
    var all = $.event.props,
        len = all.length,
        res = [];
    while (len--) {
        var el = all[len];
        if (el != 'layerX' && el != 'layerY') res.push(el);
    }
    $.event.props = res;
}());

//页眉部分快速导航
function showQuick(aid,did){
    var obj = document.getElementById(aid);
    var divotherChannel=document.getElementById(did);
    obj.className = "menu_btn hover";
    divotherChannel.style.display = "block";
}
function hideQuick(aid,did){
    var divotherChannel=document.getElementById(did);
    var mydd=document.getElementById(aid);
    if(divotherChannel.style.display!="none"){
        divotherChannel.style.display="none";
        mydd.className="menu_btn";
    }
}

//切换城市
$(function(){
    $(".select_city em").toggle(

        function(event){
            //event.stopPropagation();
            var $cityArea = $(this).parent().parent().find(".cityArea_k");
            if(!$cityArea.is(":animated")){//判断是否处于动画
                $cityArea.fadeIn();
                $(this).addClass("selectIng");

            }
        },function(){
            var $cityArea = $(this).parent().parent().find(".cityArea_k");
            if(!$cityArea.is(":animated")){//判断是否处于动画
                $cityArea.fadeOut();
                $(this).removeClass("selectIng");
            }
        });

//	$(".cityArea_k p a").click(function(event){
//		$(".select_city b").html($(this).html());
//		$(".select_city em").click();
//		//$(".cityArea_k").fadeOut();
//		$(this).parent().children().removeClass("active");
//		$(this).addClass("active");
//		$(this).parent().parent().parent().children().find("em").removeClass("selectIng");
//		return false;
//	});
//
//	$(".cityArea_k").click(function(){
//		return false;
//	});
});

//处理文本域
/*
$(function(){
    $("form :input[type=text]").focus(function(){
        $(this).addClass("focus");
        if($(this).val() ==this.defaultValue){
            $(this).val("");
//            $(this).css("color","#333");
        }
    }).blur(function(){
            $(this).removeClass("focus");
            if ($(this).val() == '') {
                $(this).val(this.defaultValue);
//                $(this).css("color","#adadad");
            }
        });
})*/

//按钮
$(function(){
    $(".btn").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
});
//首页也有以上

//房源列表鼠标滑过
$(function(){
    $(".boxLClist").mouseenter(function(){
        $(this).addClass("boxLClistHover");
        $(this).prev().addClass("prevBoxLClist");
    });
    $(".boxLClist").mouseleave(function(){
        $(this).removeClass("boxLClistHover");
        $(this).prev().removeClass("prevBoxLClist");
    });
});

//经纪人精英团队鼠标滑过
$(function(){
    $(".box_LA_list").mouseenter(function(){
        $(this).addClass("box_LA_list_hover");
        $(this).prev().addClass("prev_box_LA_list");
    });
    $(".box_LA_list").mouseleave(function(){
        $(this).removeClass("box_LA_list_hover");
        $(this).prev().removeClass("prev_box_LA_list");
    });
});

//下拉选择层
$(function(){
    $(".item-drop-list").hide();
    $(".item-drop,.item-drop1,.item-drop2").hover(
        function(){
            if(!$(this).children(".item-drop-list").is(":animated")){//判断是否处于动画
                $(this).addClass("hover");
                $(this).children(".item-drop-list").show();
                $(".item-drop-list").not($(this).children(".item-drop-list")).hide(0);
                $(".txt").blur();
                return false;
            }
        },function(){
            if(!$(this).children(".item-drop-list").is(":animated")){//判断是否处于动画
                $(this).removeClass("hover");
                $(this).children(".item-drop-list").hide();
                //$(".item-drop-list").not($(this).children(".item-drop-list")).fadeIn(0);
                return false;
            }
        });

    $(".item-drop-list span a").click(function(event){
        $(this).parent().parent().parent().removeClass("hover");
        var text = $(this).text()
        var svalue = $(this).attr("src");
        $(this).parent().parent().parent().children("em").text(text);
        $(this).parent().parent().parent().children("input[type=hidden]").val(svalue);
        $(this).parent().parent().fadeOut();
        return false;
    });

    $(document).click(function(event){
        $(".item-drop-list").fadeOut(200);
        $(".item-drop-list").parent().removeClass("hover");
    });
});


//文本输入框
$(function(){
    $(".boxRD textarea").focus(function(){
        if($(this).val() ==this.defaultValue){
            $(this).val("");
            $(this).css("color","#333");
        }
    }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(this.defaultValue);
                $(this).css("color","#adadad");
            }
        });
})

function checkWord(theObj){
    var intLen = 145;
    var theVal = theObj.value;
    var theLen = theVal.length;
    var theLimitWord = intLen-parseInt(theLen);
    document.getElementById('limitWord').innerHTML = theLimitWord;
    if( theLen>intLen ){
        theVal = theVal.substring(0, intLen);
        theObj.value = theVal;
    }

}

function checkLast(){
    if( document.getElementById('theContent').value=='' ){
        alert('请输入反馈内容！');
        return false;
    }
}

//返回顶部
$(function(){
    var fixLine=160;

    function chgpot(){
        var scroH=$(window).scrollTop(),
            getH=$('.blockB').offset().top,
            ftLine=getH-$(window).height()-50,
            IE6 = $.browser.msie && ($.browser.version == '6.0');

        if (IE6){
            var scroH=$(window).scrollTop(),
                getH=$('.blockB').offset().top,
                wheight = $(window).height();
            ftLine=getH-wheight-50;

            if (scroH>=fixLine){
                if (scroH<=ftLine){
                    $("#toTop").css({'position':"absolute",'top':wheight+scroH-100+'px','display':"block",'bottom':"auto"});
                }else{
                    $("#toTop").css({'position':"absolute",'top':getH-70+"px",'display':"block",'bottom':"auto"});
                }
            }else{
                $("#toTop").css({'display':"none",'position':"absolute",'bottom':"auto",'top':"1000px"});
            }
        }else{
            if (scroH>=fixLine){
                if (scroH<=ftLine){
                    $("#toTop").css({'position':"fixed",'bottom':"50px",'display':"block",'top':"auto"});
                }else{
                    $("#toTop").css({'position':"absolute",'top':getH-70+"px",'display':"block",'bottom':"auto"});
                }
            }else{
                $("#toTop").css({'display':"none",'position':"absolute",'bottom':"auto",'top':"1000px"});
            }
        }
    };
    function toTopReveal(){
        var $viewWidth = $(window).width();

        if($viewWidth>1150){
            $(".toolBar").css({"right":"50%","marginRight":"-590px"});  
            $("#toTop").css({"right":"50%","marginRight":"-590px"});    
        }
        else
        {
            $(".toolBar").css({"right":"10px","marginRight":"0px"});
            $("#toTop").css({"right":"10px","marginRight":"0px"});
        }
    };
    $(window).bind("scroll",function(){
        chgpot();
        toTopReveal();
    })
    $(window).bind("resize",function(){
        chgpot();
        toTopReveal();
    })
});

/*精品房源效果*/
$(function(){
    var len  = $("#J_num span").length;
    var index = 0;
    var adTimer;
    $("#J_num span").mouseover(function(){
        index  =   $("#J_num span").index(this);
        showImg(index);
        showUnit(index);
    }).eq(0).mouseover();
    //滑入 停止动画，滑出开始动画.
    $('#J_boutique').hover(function(){
        clearInterval(adTimer);
    },function(){
        adTimer = setInterval(function(){
            showImg(index);
            showUnit(index);
            index++;
            if(index==len){index=0;}
        } , 3000);
    }).trigger("mouseleave");
})
// 通过控制left ，来显示不同的幻灯片
function showImg(index){
    var adWidth = $("#J_boutique").width();
    $("#J_boutique ul").stop(true,false).animate({left : -adWidth*index},1000);
    $("#J_num span").removeClass("active")
        .eq(index).addClass("active");
}
function showUnit(index){
    var unit = recommendUnit[index];
    var output = '';
    output  = '<h1><a href="'+unit.url+'" target="_blank">'+unit.title+'</a></h1>';
    output += '<ul>';
    output += '	<li><span class="wid_one">售价：'+unit.price+'</span><span>面积：'+unit.area+'</span></li>';
    output += '	<li><span class="wid_one">户型：'+unit.room+'</span><span>装修：'+unit.fitment+'</span></li>';
    output += '	<li>朝向：'+unit.exposure+'</li>';
    output += '	<li>楼层：'+unit.floor+'</li>';
    output += '	<li>物业：'+unit.live_type+'</li>';
    output += '	<li>小区：<a href="/xiaoqu/'+unit.house_id+'/" target="_blank">'+unit.house_name+'</a></li>';
    output += '	<li>地址：'+unit.address+'</li>';
    output += '</ul>';
    $('#J_unit').html(output);
}
