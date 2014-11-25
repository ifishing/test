/**
 * @author kuanluo
 */
(function ($, _win) {
    var selectCity = {
        init: function () {
            $(".cityAreaBox:last").css("border-bottom", "none");
            this.addEvent();
        },
        addEvent: function () {
            $(".item_cityArea em").click(function () {
                if (!$(this).parent().find(".cityArea_k").is(":animated")) {//判断是否处于动画
                    $(this).parent().find(".cityArea_k").fadeIn();
                    $(this).parent().children("i").fadeIn();


                    var $cityscroll = $(".cityArea_k .bot");
                    var $cityAE_h = $("#cityAE").height();
                    var $cityFJ_h = $("#cityFJ").height();
                    var $cityKP_h = $("#cityKP").height();
                    var $cityQW_h = $("#cityQW").height();
                    var $cityXZ_h = $("#cityXZ").height();

                    $('.city_a,.city_b,.city_c,.city_d,.city_e').click(function () { //向上按钮绑定单击事件
                        if (!$cityscroll.is(":animated")) {//判断是否处于动画
                            $cityscroll.animate({ scrollTop: 0}, 400);
                        }
                    })

                    $('.city_f,.city_g,.city_h,.city_i,.city_j').click(function () {
                        if (!$cityscroll.is(":animated")) {
                            $cityscroll.animate({ scrollTop: ($cityAE_h)}, 400);
                        }
                    })

                    $('.city_k,.city_l,.city_m,.city_n,.city_p').click(function () {
                        if (!$cityscroll.is(":animated")) {
                            $cityscroll.animate({ scrollTop: ($cityAE_h + $cityFJ_h)}, 400);
                        }
                    })

                    $('.city_q,.city_r,.city_s,.city_t,.city_w').click(function () {
                        if (!$cityscroll.is(":animated")) {
                            $cityscroll.animate({ scrollTop: ($cityAE_h + $cityFJ_h + $cityQW_h)}, 400);
                        }
                    })

                    $('.city_x,.city_y,.city_z').click(function () {
                        if (!$cityscroll.is(":animated")) {
                            $cityscroll.animate({ scrollTop: ($cityAE_h + $cityFJ_h + $cityKP_h + $cityQW_h)}, 400);
                        }
                    })
                    return false;
                }
            })
            $(".cityArea_k .tt a").click(function () {
                $(".item_cityArea .selectCity").html($(this).html());
                $(".cityArea_k").fadeOut();
                $(".item_cityArea i").fadeOut();
            })

            $(".cityArea_k .tt span").click(function () {
                $(".cityArea_k").fadeOut();
                $(".item_cityArea i").fadeOut();
                return false;
            });
        }
    }

    $('document').ready(function(){
        selectCity.init();
    });
})(jQuery, window);
