$(function(){
    var mainTop = $(".content").offset().top,
        mainBot = $(".kft_page").offset().top,
        rightHeight = $(".scroll_bar").height();
    
    
    $(window).scroll(function(){
        var docTop = $(document).scrollTop();
        var mainTop = $(".content").offset().top;
        var mainBot = $(".kft_page").offset().top;
        
        if((mainBot - mainTop) > rightHeight){
            setScrollBar(docTop);
        }
    });
    
    if((mainBot - mainTop) > rightHeight){
        setScrollBar($(document).scrollTop());
    }

    //滚动区间
    function setScrollBar(scrollHeight){
      
      if(scrollHeight >= (mainBot - $(".scroll_bar").height())){
        $(".scroll_bar").css({
          "top":mainBot - $(".scroll_bar").height() -150,
          "position":"absolute"
        });
        return false;
      } 
      
      //滚到目标高度
      if(scrollHeight > mainTop){
        //For IE6 fixed
        if ($.browser.msie && $.browser.version === "6.0"){
          $(".scroll_bar").css({
            "top":$(document).scrollTop(),
            "position":"absolute"
          });
          return false;
        }
        
        $(".scroll_bar").css({
          "top":"0",
          "position":"fixed"
        });
      }else{
        $(".scroll_bar").css({
          "top":"0",
          "position":"static"
        });
      }
    }
});