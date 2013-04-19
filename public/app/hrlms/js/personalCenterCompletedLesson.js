/**
 * @module personalCenterCompletedLesson
 * 
 * @name 已完成的课节（个人中心）
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'liveTimeLine'], function(user, top, hd, ft, pcn, ltl) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        pcn.doInit(this, "completed");
        
        ltl.doInit(this, "personalCenterCompletedLessonList");
    });
    
});