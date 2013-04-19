/**
 * @module liveInfo
 * 
 * @name 直播课程详情
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'liveCourseInfo', 'myCourse', 'myApply'], function(user, top, hd, ft, lci, mcs, mal) {
    var userInit = user.doInit();
    
    hd.doInit(2);
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        
        
        mcs.doInit(this.data.username);
        
        mal.doInit(this.data.userId);
        
        lci.doInit(this.data.userId);
    });
    
});