/**
 * @module personalCenterLearned
 * 
 * @name 个人中心-已完成课程
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'liveTimeLine', "urls"], 
    function(user, top, hd, ft, pcn, ltl, urls) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        pcn.doInit(this, "calendar");
        
        ltl.doInit(this, "personalCenterCalendarList");

        var username = this.data.username;
        $("#personalCenterCalendarList").live("click", function (e) {
            if ($(e.target).hasClass("bbtn")) {
                //退課
                var cache = ltl.getCacheData();
                var index = $("#personalCenterCalendarList li").index($(e.target).parent().parent().parent());
                // console.log("tuike " + cache.data.result[index].id);
                var param = {};
                param.username = username;
                param.courseId = cache.data.result[index].id;
                $.ajax({
                    type : "post",
                    url: urls.quitCourse,
                    dataType: "json",
                    data : param,
                    success: function(result){
                        if (result.code == 200) {
                            alert("退课成功！");
                            window.location.reload();
                        }
                        
                    }
                });
            } else if ($(e.target).hasClass("gbtn")) {
                //请假
                var cache = ltl.getCacheData();
                var index = $("#personalCenterCalendarList li").index($(e.target).parent().parent().parent());
                // console.log("xuanke " + cache.data.result[index].id);

                var param = {};
                param.username = username;
                param.courseId = cache.data.result[index].id;
                $.ajax({
                    type : "post",
                    url: urls.absentCourse,
                    dataType: "json",
                    data : param,
                    success: function(result){
                         if (result.code == 200) {
                            alert("请假成功！");
                            window.location.reload();
                        }
                        
                    }
                });
            }
        });
    });
    
    

});