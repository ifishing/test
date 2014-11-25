$(function(){
	
	startclock();
    var timerID = null;
    var timerRunning = false;
    
    function showtime(datetime, Ele, EleBtn) {
        //分割时间戳
        if (datetime == null) {
        	return false;
        };
        
        var setDate = datetime.split(" ")[0];
        var setTimes = datetime.split(" ")[1];

        var Year = setDate.split("-")[0],
            Month = setDate.split("-")[1],
            Day = setDate.split("-")[2];

        var Hours = setTimes.split(":")[0],
            Minute = setTimes.split(":")[1],
            Second = setTimes.split(":")[2];

        Today = new Date();
        var NowHour = Today.getHours();
        var NowMinute = Today.getMinutes();
        var NowMonth = Today.getMonth();
        var NowDate = Today.getDate();
        var NowYear = Today.getYear();
        var NowSecond = Today.getSeconds();
        NowYear += (NowYear < 2000) ? 1900 : 0;
        /*if (NowYear < 2000)
            NowYear=1900+NowYear;*/
        Today = null;
        Hourleft = Hours - NowHour;
        Minuteleft = Minute - NowMinute;
        Secondleft = Second - NowSecond;
        Yearleft =  Year - NowYear;
        Monthleft = Month - NowMonth - 1;
        Dateleft = Day - NowDate;
        if (Secondleft<0)
        {
            Secondleft=60+Secondleft;
            Minuteleft=Minuteleft-1;
        }
        if (Minuteleft<0)
        {
            Minuteleft=60+Minuteleft;
            Hourleft=Hourleft-1;
        }
        if (Hourleft<0)
        {
            Hourleft=24+Hourleft;
            Dateleft=Dateleft-1;
        }
        if (Dateleft<0)
        {
            Dateleft=31+Dateleft;
            Monthleft=Monthleft-1;
        }
        if (Monthleft<0)
        {
            Monthleft=12+Monthleft;
            Yearleft=Yearleft-1;
        }
        if(Minuteleft<10)
        {
            Minuteleft="0"+Minuteleft;
        }
        if(Hourleft<10)
        {
            Hourleft="0"+Hourleft;
        }

        Monthleft += Yearleft * 12;
        Dateleft += Monthleft*30;

        //判断爬房团是否过期
		
        if($(EleBtn).attr('status')=="has_apply"){
			TempBtn = '<span>已报名</span>';
			Temp = Yearleft<0 ? 0+'天'+00+'时'+00+'分' : Dateleft+'天'+Hourleft+'时'+Minuteleft+'分';
		}else if(Yearleft<0){
            TempBtn = '<span>已结束</span>';
            Temp = 0+'天'+00+'时'+00+'分';
            
        }else if($(EleBtn).attr('status')=="full"){
			TempBtn = '<span>名额已满</span>';
			Temp = Dateleft+'天'+Hourleft+'时'+Minuteleft+'分';
		}else{
             TempBtn = '<a href="#">立即报名</a>';
             Temp = Dateleft+'天'+Hourleft+'时'+Minuteleft+'分';
        }

        Ele.innerHTML = Temp;
        EleBtn.html(TempBtn);

        timerID = setTimeout(function(){showtime(datetime, Ele, EleBtn);},1000*60);
        timerRunning = true;
    }
    var timerID = null;
    var timerRunning = false;
    function stopclock () {
        if(timerRunning)
            clearTimeout(timerID);
            timerRunning = false; 
    }
    function startclock () {
        stopclock();
        // showtime("2013-12-11 13:54:33", "form1");
        // showtime("2013-12-11 13:54:33", "form2");
        // showtime("2013-12-11 13:54:33", "form3");
        // showtime("2013-12-11 13:54:33", "form4");
        // showtime("2013-12-11 13:54:33", "form5");
        // showtime("2014-3-28 13:54:33", "form6");

        $(".countdowns").each(function(index){
	    	var $this = $(this);

	    	var datetime = $this.attr("data-datetime");

            var EleBtn = $this.parent().parent().parent().children('.sign_up_immediately');

	    	showtime(datetime, $this[0], EleBtn);
	    })
    }

    
})