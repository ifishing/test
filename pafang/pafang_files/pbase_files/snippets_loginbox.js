$(function(){
    //关闭弹窗关闭
    function popupClose(){
        $('.popup').hide();
    }

    $('.close_ico').click(function(){
        popupClose();
        $('#apply_name').val('');
        $('#apply_mobile').val('');
        $('#apply_mobile').val('');
        $('#verify_code').val('');
        $('.popup_box').find(".formtips").remove();

    });
    //报名之后的弹窗,爬房团报名
    function popupTwoOpen(){
        var popupTwo = $('#popup_two');
        popupClose();
        popupTwo.show(0, function() {
            setMask();
        });
    }
    function popupCustomOpen(str){
        var popupCustom = $('#popup_custom');

        popupClose();

        popupCustom.show(0, function() {
            popupCustom.find('p').empty().append(str)
            setMask();
        });
    }
    //关于弹窗的部分
   function setMask(){
        function popupPos(){
          var oPopboxHeight1 = $('#popup_one .popBox').outerHeight(true),
              oPopboxHeight2 = $('#popup_two .popBox').outerHeight(true),
              oPopboxHeight3 = $('#popup_custom .popBox').outerHeight(true);
           
           var boserclienheight = $(window).height();
           var boserTop1 = (boserclienheight - oPopboxHeight1)/2,
               boserTop2 = (boserclienheight - oPopboxHeight2)/2,
               boserTop3 = (boserclienheight - oPopboxHeight3)/2;
              
           $('#popup_one .popBox').css({'top': boserTop1});
           $('#popup_two .popBox').css({'top': boserTop2});
           $('#popup_custom .popBox').css({'top': boserTop3});
        }
        popupPos();
         
         
        $(window).scroll(function() {
            popupPos();
        });
        $(window).resize(function() {
            popupPos();
        }); 
        
        var IE6 = $.browser.msie && ($.browser.version == '6.0');
            if (IE6) {
                function popupPosIe6(){
                  var oPopboxHeight1 = $('#popup_one .popBox').outerHeight(true),
                      oPopboxHeight2 = $('#popup_two .popBox').outerHeight(true),
                      oPopboxHeight3 = $('#popup_custom .popBox').outerHeight(true);
                 
                 var boserclienheight = $(window).height();
                 var scrollTop = $(window).scrollTop();
                 var boserTop1 = (boserclienheight - oPopboxHeight1)/2 + scrollTop,
                     boserTop2 = (boserclienheight - oPopboxHeight2)/2 + scrollTop,
                     boserTop3 = (boserclienheight - oPopboxHeight3)/2 + scrollTop;
                
                $('.mask').css({
                  'position' : 'absolute',
                  'height' : $(document).height()
                });
          
          
                $('#popup_one .popBox').css({'top': boserTop1,'position': 'absolute'});
                $('#popup_two .popBox').css({'top': boserTop2,'position': 'absolute'});
                $('#popup_custom .popBox').css({'top': boserTop3,'position': 'absolute'});
            }
          
          popupPosIe6();
          $(window).scroll(function() {
              popupPosIe6();
          });
          $(window).resize(function() {
            popupPosIe6();
          }); 
        }
    }
    //快速报名模块点击提示消失
    $('.apply_form_box em').click(function(){
        $(this).hide();
        $(this).parent().children('input[type="text"]').focus();
    });

    $('.apply_form_box input[type="text"]').focus(function(){
        $(this).parent().children('em').hide();
    });

    $('.apply_form_box input[type="text"]').blur(function(){
        if ($(this).val() == '') {
            $(this).parent().children('em').show();
        }
    });

    //快速报名模块触发按钮时间
    $(".apply_bix_btn").toggle(function(){
        var $applyBox = $(this).parent().find(".apply_box_bd");
        if(!$applyBox.is(":animated")){//判断是否处于动画
            $applyBox.show();
            $(this).addClass("apply_bix_btn_ed");
        }
    },function(){
        var $applyBox = $(this).parent().find(".apply_box_bd");
        if(!$applyBox.is(":animated")){//判断是否处于动画
            $applyBox.hide();
            $(this).removeClass("apply_bix_btn_ed");
            $("#apply_box").find('input[name=real_name_fast]').attr("value","");
            $("#apply_box").find('input[name=mobile_fast]').attr("value","");
            $("#apply_box").find('input[name=join_nums_fast]').attr("value","");
            $("#apply_box").find('input[name=captcha_fast]').attr("value","");
            $("#apply_box").find('input[type="text"]').parent().children('.formtips').hide();
            $('.apply_form_box em').show();
        }
    });
    //点击空白区域关闭快速报名框
    $(document).ready(function(){
       $(document).bind('click', Hide);
    });
    function Hide(e){
        if($(e.target).eq(0).is($(".popup_tips p")) || $(e.target).eq(0).is($(".popBox")) || $(e.target).eq(0).is($(".popup_tips")) || $(e.target).eq(0).is($(".mask")) || $(e.target).eq(0).is($("#popup_two")) || $(e.target).eq(0).is($(".close_ico")) || $(e.target).eq(0).is($("#popup_custom")) || $(e.target).eq(0).is($(".apply_box_bd")) || $(e.target).eq(0).is($(".apply_form_box em")) || $(e.target).eq(0).is($(".apply_line p")) || $(e.target).eq(0).is($("#popup_custom")) || $(e.target).eq(0).is($(".apply_form_box input")) || $(e.target).eq(0).is($(".apply_form_box6"))  || $(e.target).eq(0).is($(".apply_form_sub input")) || $(e.target).eq(0).is($(".apply_form")) || $(e.target).eq(0).is($(".apply_form_box")) || $(e.target).eq(0).is($(".apply_form_box6 input")) || $(e.target).eq(0).is($(".apply_form_box img")) || $(e.target).eq(0).is($(".apply_form_sub")) || $(e.target).eq(0).is($(".apply_line p input")) || $(e.target).eq(0).is($(".formtips"))){
           return; 
        }
        var $applyBox = $(".apply_box_bd");
        if($applyBox.css('display') == 'block'){
            $(".apply_bix_btn").trigger("click");
        }                      
    }

    $('.apply_form_sub input').click(function(){
		var line_id = $("input[name='focus_line']:checked").val();
		var city_id = $('#applyLineCity').val();
        var real_name = $("#apply_box").find('input[name=real_name_fast]').val();
        var mobile = $("#apply_box").find('input[name=mobile_fast]').val();
        var join_nums = $("#apply_box").find('input[name=join_nums_fast]').val();
        var captcha = $("#apply_box").find('input[name=captcha_fast]').val();
        var agree_declare = $("#apply_box").find('input:checkbox[name=agree_declare_fast]:checked').val();
        // return false;

        if (!applyForm.checkRealName(real_name)||!applyForm.checkMobile(mobile)) {
            return false;
        }

        if (!applyForm.checkJoinNums(join_nums)||!applyForm.checkCaptcha(captcha)) {
            return false;
        }
        if ($(this).parents('.apply_form').find('input[name=agree_declare]').parent().is(":visible") && !applyForm.checkDeclare(agree_declare)) {
            return false;
        }

        //此处触发ajax
		var url         = '/api/lineuser/save';
        //var sign = true;
        
		this.disabled=true;

		setTimeout(function(){$('.apply_form_sub input')[0].disabled=false},5000);
		$.ajax({
                type:'post',
                url:url,
                cache: false,
                data:{
					line_id:line_id,
                    real_name:real_name,
                    mobile:mobile,
                    //id_card:id_card,
                    join_nums:join_nums,
                    captcha:captcha,
                    //method:method,
                    city_id:city_id,
                    //item_ids:item_ids,
                    agree_declare:agree_declare
                },
                dataType: 'json',
                success:function(data){
					$('.apply_form_sub input')[0].disabled=false;
                    //if(data.e!=9999) sign = false;
					//alert(data.m);
                    if(data.e==9999)
                    {
                        //win.hide();
                        //win1.eq(0).show().siblings('.win1').hide(); 
                        //$('span[dataparam='+$('#applyLineID').val()+']').addClass('apply_apply').html('已报名');
                        //$('.message input[type=text]').val('');
                        $(".apply_bix_btn").trigger("click");
                        popupTwoOpen();
                    }else{
                        popupCustomOpen(data.m);
                    }
                    /*if(data.e==9999 || data.e==2118 || data.e==2103)
                    {
                        //win.hide();
                        //win1.eq(0).show().siblings('.win1').hide(); 
                        //$('span[dataparam='+$('#applyLineID').val()+']').addClass('apply_apply').html('已报名');
                        //$('.message input[type=text]').val('');
						//popupTwoOpen();
						$('.apply_bix_btn').removeClass('apply_bix_btn_ed');
						$('.apply_bix_btn').next('.apply_box_bd').hide();
						alert(data.m)
                    }else{
                        //$('.msg_btn').find(".formtips").remove();
                        //var errorMsg = '<span class="formtips">'+data.m+'</span>';
                        //$('.msg_btn').append(errorMsg);
						alert("报名失败，请重试！");
                    }*/
			}
		});
        //if(sign == false) return false;
        
        //报名成功关闭快速报名模块
        //$('.apply_bix_btn').removeClass('apply_bix_btn_ed');
        //$('.apply_bix_btn').next('.apply_box_bd').hide();
        //报名成功弹出的弹窗
        //popupTwoOpen();
    });

    var applyForm ={
        checkRealName:function(real_name){
            real_name = $.trim(real_name);
            if(getBytesLength(real_name) > 12 || getBytesLength(real_name)<1) {
                $('.apply_form_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写姓名</span>';
                $('.apply_form_box .username1').parent('.apply_form_box').append(errorMsg);
                $('.apply_form_box input[name=real_name_fast]').focus();
                return false;
            }
            return true;
        },
        checkMobile:function(mobile){
            var regstr = /^1[3|3|5|8]\d{9}$/;
            mobile = $.trim(mobile);
            if (!mobile || !regstr.test(mobile)) {
                $('.apply_form_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写手机号</span>';
                $('.apply_form_box .phone').parent('.apply_form_box').append(errorMsg);
                $('.apply_form_box input[name=mobile_fast]').focus();
                return
            }

            if(mobile.length !=11 || isNaN(mobile)) {
                $('.apply_form_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写手机号</span>';
                $('.apply_form_box .phone').parent('.apply_form_box').append(errorMsg);
                $('.apply_form_box input[name=mobile_fast]').focus();
               return false;
            }
            return true;
        },
        checkJoinNums:function(join_nums){
            join_nums = $.trim(join_nums);
            if(isNaN(join_nums)|| join_nums >3 ||join_nums<=0) {
                $('.apply_form_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写报名人数</span>';
                $('.apply_form_box .num').parent('.apply_form_box').append(errorMsg);
                $('.apply_form_box input[name=join_nums_fast]').focus();
               return false;
            }
            return true;
        },
        checkDeclare:function(agree_declare){
            //var checked=$('input[name=agree_declare]:checked').val();
			var checked=$("#apply_box").find('input:checkbox[name=agree_declare_fast]:checked').val();
            if(isNaN(checked)|| checked!=1) {
                $('.apply_form_box6').find(".formtips").remove();
                var errorMsg = '<span class="formtips">选择免责声明</span>';
                $('.apply_form_box6 .focus_rule').parent('.apply_form_box6').append(errorMsg);
               return false;
            }
            return true;
        },
		checkCaptcha:function(captcha){
            captcha = $.trim(captcha);
            if(captcha.length !=4) {
                $('.apply_form_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写验证码</span>';
                $('.apply_form_box input[name=captcha_fast]').parent('.apply_form_box').append(errorMsg);
                $('.apply_form_box input[name=captcha_fast]').focus();
               return false;
            }
            return true;
        }
    }
    //在GBK编码里，除了ASCII字符，其它都占两个字符宽
    function getBytesLength(str) {
        return str.replace(/[^\x00-\xff]/g, 'xx').length;
    };
    function setBytesLength(str,num){
        var len = 0;
        for(var i = 0; i < str.length; i++){
            if(str.charCodeAt(i) > 128){
                len = len + 2;
            }else{
                len = len +1;
            }
            if(len == num){
                i=i+1;
                return i;
            }
        }
    };
})
