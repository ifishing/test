$(function(){
    ///////////////////控制弹框函数
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

    //调取爬房团申请弹窗
    function popupOneOpen(){
        var popupOne = $('#popup_one');

        popupOne.show(0, function() {
            setMask();
        });
    }

    //首页调用
    $(".sign_up_immediately").delegate('a','click',function() {
		$("#applyLineID").val($(this).parent("div").attr("attr"));
        popupOneOpen();
        return false;
    });

    //详情页调用
    $(".pft_lists_box .info .apply_btn,.apply_box02_bot a").click(function(){
        popupOneOpen();
        return false;
    })

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

    ///////////////////弹窗表单验证触发
    $('.popup_box3 input').click(function(){
		var line_id = $('#applyLineID').val();
		var city_id = $('#applyLineCity').val();
        var real_name = $("#applyForm").find('input[name=real_name]').val();
        var mobile = $("#applyForm").find('input[name=mobile]').val();
        var join_nums = $("#applyForm").find('input[name=join_nums]').val();
        var captcha = $("#applyForm").find('input[name=captcha]').val();
        var agree_declare = $("#applyForm").find('input:checkbox[name=agree_declare]:checked').val();

        if (!applyUtil.checkRealName(real_name)||!applyUtil.checkMobile(mobile)) {
            return false;
        }
        if (!applyUtil.checkJoinNums(join_nums)||!applyUtil.checkCaptcha(captcha)) {
            return false;
        }
        if ($(this).parents('.popup_bd').find('input[name=agree_declare]').parent().is(":visible") && !applyUtil.checkDeclare()) {
            return false;
        }
		
		var url         = '/api/lineuser/save';
        
		this.disabled=true;

		setTimeout(function(){$('#apply')[0].disabled=false},5000);
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
					$('#apply')[0].disabled=false;
                    if(data.e==9999)
                    {
                        //win.hide();
                        //win1.eq(0).show().siblings('.win1').hide(); 
                        //$('span[dataparam='+$('#applyLineID').val()+']').addClass('apply_apply').html('已报名');
                        //$('.message input[type=text]').val('');
						popupTwoOpen();
                    }else{
						popupCustomOpen(data.m);
					}
			}
		});

        //报名成功弹出的弹窗
        //popupTwoOpen();
    });

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

    //关于弹窗的点击事件
    $('.popup_box b').click(function(){
        $(this).hide();
        $(this).parent().children('input[type="text"]').focus();
    })

    $('.popup_box input[type="text"]').focus(function(){
        $(this).parent().children('b').hide();
    });

    $('.popup_box input[type="text"]').blur(function(){
        if ($(this).val() == '') {
            $(this).parent().children('b').show();
        }
    });

    //关于弹框报名的验证
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
     $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    $('form :input').keyup(function(){
        //验证姓名
        if($(this).is('.username1')){
            if(getBytesLength($(this).val()) > 12) {
                $(this).val($(this).val().substr(0,setBytesLength($(this).val(),12)));
            }
        }
        //验证手机
        if($(this).is('.phone')){
            var pos = $(this).getCursorPosition();
            this.value = this.value.replace(/\D/g,'')
            if($(this).val().length > 11) {
                $(this).val($(this).val().substr(0,11));
            }
            $(this).setCursorPosition(pos);
        }
        //验证人数
        if($(this).is('.num')){
            this.value = this.value.replace(/[^1-3]/g,'')
            if($(this).val().length > 1) {
                $(this).val($(this).val().substr(0,1));
            }
        }
    });
    var applyUtil ={
        checkRealName:function(real_name){
            real_name = $.trim(real_name);
            if(getBytesLength(real_name) > 12 || getBytesLength(real_name)<1) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写姓名</span>';
                $('.popup_box .username1').parent('.popup_box').append(errorMsg);
                $('.popup_box input[name=real_name]').focus();
                return false;
            }
            return true;
        },
        checkMobile:function(mobile){
            var regstr = /^1[3|3|5|8]\d{9}$/;
            mobile = $.trim(mobile);
            if (!mobile || !regstr.test(mobile)) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写手机号</span>';
                $('.popup_box .phone').parent('.popup_box').append(errorMsg);
                $('.popup_box input[name=mobile]').focus();
                return
            }

            if(mobile.length !=11 || isNaN(mobile)) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写手机号</span>';
                $('.popup_box .phone').parent('.popup_box').append(errorMsg);
                $('.popup_box input[name=mobile]').focus();
               return false;
            }
            return true;
        },
        checkJoinNums:function(join_nums){
            join_nums = $.trim(join_nums);
            if(isNaN(join_nums)|| join_nums >3 ||join_nums<=0) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写报名人数</span>';
                $('.popup_box .num').parent('.popup_box').append(errorMsg);
                $('.popup_box input[name=join_nums]').focus();
               return false;
            }
            return true;
        },
        checkCaptcha:function(captcha){
            captcha = $.trim(captcha);
            if(captcha.length !=4) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">请正确填写验证码</span>';
                $('.popup_box .yanzheng_text').parent('.popup_box').append(errorMsg);
                $('.popup_box input[name=captcha]').focus();
               return false;
            }
            return true;
        },
        checkDeclare:function(){
            var checked=$("#applyForm").find('input:checkbox[name=agree_declare]:checked').val();
            if(isNaN(checked)|| checked!=1) {
                $('.popup_box').find(".formtips").remove();
                var errorMsg = '<span class="formtips">选择免责声明</span>';
                $('.popup_box6 .focus_rule').parent('.popup_box6').append(errorMsg);
               return false;
            }
            return true;
        }
    };
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
});