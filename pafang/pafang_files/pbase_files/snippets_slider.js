$(function(){
  //自动播放
  function autoPlay(){
    $(".kft_line_pic .next").trigger("click", ["007"]); //007 is a tag that click's event source
    timer = setTimeout(autoPlay, autoTime);
  }
  
  
  //TODO: 前后台开关
  if (!(typeof no_auto_play !== "undefined" && no_auto_play)){
    var speed = 200, //滑动速度
    
      itemIndex = itemIndex || [0,0,0,0,0,0,0], //要显示内容的index
      
      autoTime = 5000, //自动播放时间 ms
      
      timer;
  
    timer = setTimeout(autoPlay, autoTime);
  
    $(document).delegate("a.previous, a.next", "click", function(){
      clearTimeout(timer);
      timer = setTimeout(autoPlay, autoTime);
    });
    
    //鼠标悬浮，离开，自动暂停，播放
    $(document).delegate(".kft_line_btn a", "mouseover", function(){
      clearTimeout(timer);
    });
    $(document).delegate(".kft_line_btn a", "mouseleave", function(){
      timer = setTimeout(autoPlay, 1000);
    });
    
    
    $(".kft_line_btn").delegate("a", "mouseover", function(){
      
      var $btnArr = $(this).closest(".kft_line_btn").children("a"), //所有按钮
            
          $showContent = $(this).closest(".kft_line_bot").find(".kft_line_img").children('ul'), //内容主体
        
          itemWidth = $showContent.children("li").outerWidth(); //要显示内容的width
        
      var key = $(".kft_line_btn").index($(this).closest(".kft_line_btn")); 
      
      itemIndex[key] = $btnArr.index($(this)); //要显示内容的index

      $btnArr.removeClass("cur");
      $(this).addClass("cur");
      
      //移动
      var moveMX = itemWidth * itemIndex[key]; //移动像素
      if(!$showContent.is(":animated")){
        $showContent.stop().animate({"left" : -moveMX}, speed);
      }
    });
    
    //上下页按钮切换
    $(".kft_line_pic").delegate("a.previous, a.next", "click", function(event, eType){
      
      if(typeof eType == "undefined"){ //用户点击 触发暂停
        
      } else { //自动播放 不触发暂停
        event.stopPropagation(); 
      }
      
      var $btnArr = $(this).closest(".kft_line_bot").children(".kft_line_btn").children("a"), //所有按钮
        
          $showContent = $(this).closest(".kft_line_bot").find(".kft_line_img").children('ul'), //内容主体
        
          itemWidth = $showContent.children("li").outerWidth(); //要显示内容的width
      
      var key = $(".kft_line_bot").index($(this).closest(".kft_line_bot")); 
      
      if (this.className == "next") { //前进
        itemIndex[key]++;
      }
      
      if (this.className == "previous") { //后退
        itemIndex[key]--;
      }
      
      itemIndex[key] %=  $btnArr.length;    
      itemIndex[key] = +itemIndex[key] + (itemIndex[key] < 0 ? $btnArr.length : 0);
      
      $btnArr.removeClass("cur");
      $btnArr.eq(itemIndex[key]).addClass("cur");

      var moveMX = itemWidth * itemIndex[key]; //移动像素
      if(!$showContent.is(":animated")){
        $showContent.stop().animate({"left" : -moveMX}, speed);
      }
    });
  }
});