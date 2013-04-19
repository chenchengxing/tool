/**
 * @module live
 * 
 * @name 直播课堂
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'myCourse', 'myApply', 'liveTimeLine'], function(user, top, hd, ft, mcs, mal, ltl) {
    var userInit = user.doInit();
    
    hd.doInit(2);
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        mcs.doInit(this.data.username);
        
        mal.doInit(this.data.userId);
        
        ltl.doInit(this, "liveTimeLine", {"status" : 1, "pass" : 1});
    });
    
});