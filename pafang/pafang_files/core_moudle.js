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
  
//去除左侧列表下边虚线
$(function(){
    $('.pft_lists_box').last().css('border-bottom','none');
})

$(function(){
  // 返回顶部
  (function() {
    var backtop = $(".backtop"),
      floating = $('.floating'),
    bowserHeight = $(window).height(),
    oFlotingHeight = floating.outerHeight(true),
    IE6 = $.browser.msie && ($.browser.version == '6.0');
  
  if(IE6){  
    floating.css({
      'top': bowserHeight - oFlotingHeight - 20,
      'position': 'absolute'
    });
  };
  
    $(window).on("scroll", function() {
        var top = $(document).scrollTop();
    var IE6 = $.browser.msie && ($.browser.version == '6.0'); 
    
    if(IE6){
      var bowserHeight = $(window).height(),
        browserScrollTop = $(window).scrollTop(),
        oFlotingHeight = floating.outerHeight(true);
        
      floating.css({
        'top': bowserHeight + browserScrollTop - oFlotingHeight - 160,
        'position': 'absolute'
      });
    };

        if (top > 280) {
            backtop.show();
        } else {
            backtop.hide();
        }
    });

    backtop.on("click", function() {
        $("html, body").animate({
            scrollTop : 0
        }, 10);
        return false;
    });
  })();
  
})