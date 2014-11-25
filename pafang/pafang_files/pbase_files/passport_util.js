/*
* Passport 相关
 */
PassportSC.appid = 1028;
PassportSC.loginProtocal="http"; 
PassportSC.selectorTitle = "焦点用户请选择@focus.cn";
PassportSC.maxIntervalCount = 300;
PassportSC.registerUrl = "http://passport.sohu.com/web/reguser?appid=1028&ru=" + escape(window.location.href);
PassportSC.isSetFocus = !g_no_set_focus;
PassportSC.showMsg = function(msg) {
    // alert(msg);
    $('.login_msg').html(msg);
};

// 重写sohu函数，登录成功后调用
PassportSC.loginSuccessCall = function() {
    this.parsePassportCookie();
    if (!this.cookie || this.cookie.userid == '') {
        this.reportMsg("7");
        PassportSC.drawLoginForm();
        return;
    }
    var username = PassportSC.emailInput.value;
    var src = PassportFocus.url.login + "?time=" + (new Date()).getTime();

    PassportFocus.loadScript(src, function() {
        if (PassportFocus.reload) {
            window.location.reload();
            return;
        } else if (PassportFocus.return_url != "" && PassportFocus.return_url != "0") {
            window.location.href=PassportFocus.return_url;
            return; 
        }
        PassportSC.getBottomRow();
        PassportFocus.drawPanel();
    });
};

// 重写sohu函数，退出成功后调用
PassportSC.logoutSuccessCall = function() {
    this.parseLastDomain(this.domainList);
    this.cookie = false;
    if (PassportFocus.documentElement != PassportSC.rootElement) {
        PassportFocus.hideCard(); // 首页顶端形式的passport
    } else {
        this.drawLoginForm(); // 业主论坛卡片形式
    }
    var src = PassportFocus.url.logout + "?" + (new Date()).getTime();
    PassportFocus.loadScript(src, function(){
        if (PassportFocus.reload) {
            window.location.reload();
            return;
        } else if (typeof passportOnLogout == "function") {
            passportOnLogout();
        }
        PassportFocus.drawPanel();
    });
};

var PassportFocus = {
    reload: g_reload, // 登陆成功后是否重新加载页面
    return_url: g_return, // 登陆成功后要跳转的URL
    login_name: g_login_name ? g_login_name : '过客评论',
    url: {
        register: "http://passport.sohu.com/web/reguser",
        help: "http://passport.sohu.com/help/",
        login: "/api/login/success",
        logout: "/api/login/logout"
    },

    loadScript: function(src, callback) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        document.getElementsByTagName("head")[0].appendChild(script);
        if(document.all) {
            script.onreadystatechange = function() {
                if(this.readyState == 4 || this.readyState == 'complete' || this.readyState == 'loaded') {
                    if (callback) callback();
                }
            };
        } else {
            script.onload = function() {
                if (callback) callback();
            };
        }
    },

    // 初始化程序，页面载入时调用
    initPanel: function(oContainer,card) {
        this.documentElement = oContainer;
        //this.initDocumentElementHTML();
        PassportSC.init(card); // sohu的函数，初始化rootElement, sElement, cElement, 同时调用parsePassportCookie()
        this.drawPanel();
    },

    initDocumentElementHTML: function() {
        PassportFocus.documentElement.innerHTML = '<div class="body"></div><div class="passport_card"></div>';
        PassportFocus.body = PassportFocus.documentElement.firstChild;
        PassportFocus.card = PassportFocus.body.nextSibling;
    },

    hasLogin: function(bParseCookie) {
        PassportSC.parsePassportCookie();
        if (PassportSC.cookie && PassportSC.cookie['userid']) {
            if (!this.login_name || this.login_name == '过客评论') {
                this.login_name = PassportSC.cookie['userid'];
                this.login_name = this.login_name.replace(/@focus\.cn$/, '');
            }
            return true;
        }
        return false;
    },

    /* 页面加载时，initPanel 最后调用本函数
     * 如果有cookie，则处于登录状态，隐藏卡片
     * 如果无cookie，则提示登录
    */
    drawPanel: function() {
        if (this.hasLogin()) {
            this._drawPanelLogged();
        }
        PassportSC.drawLoginForm();
    },

    _drawPanelLogged: function() {
    },
    showCard: function(e) {
        var cardOpen = document.getElementById("pCardOpen");
        if (!cardOpen) return;
        cardOpen.className = "open hidden";
        document.getElementById("pCardClose").className = "close";
        PassportSC.cElement.className = "passportc";
        PassportSC.cElement.style.display = "block";
        PassportSC.drawPassportCard();
    },

    hideCard: function() {
        var cardOpen = document.getElementById("pCardOpen");
        if (!cardOpen) return;
        cardOpen.className = "open";
        document.getElementById("pCardClose").className = "close hidden";
        PassportSC.cElement.className = "";
        PassportSC.cElement.innerHTML = "";
    }
};
// 因为不是标准卡片登录，输入框不是PassportSC.cElement
PassportSC.drawLoginForm = function(){
    //this._drawLoginForm();
    this.cElement.className = "";
    var A = PassportFocus.documentElement.getElementsByTagName("input");
    for (var i = 0; i < A.length; i++) {
        if (A[i].name == "email") {
            this.emailInput = A[i];
        }
        if (A[i].name == "password") {
            this.passwdInput = A[i];
        }
        if (A[i].name == "persistentcookie") {
            this.pcInput = A[i];
        }
    }
    this.loginMsg = this.$getElementByClassName("error");
    this.bindSelector();
    this.autoFillUserId();
    var _this = this;
    if (this.emailInput.value == "") {
        if (this.isSetFocus) {
            setTimeout(function(){
                _this.emailInput.focus();
            }, 50);
        }
    } else {
        if (this.isSetFocus) {
            setTimeout(function(){
                _this.passwdInput.focus();
            }, 50);
        }
    }
}