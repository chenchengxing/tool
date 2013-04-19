/**
 * @module createLive
 * 
 * @name 创建直播课堂
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'createLiveForm'], function(user, top, hd, ft, clf) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
    });
    
    hd.doInit(2);
    
    ft.doInit();
    
    clf.doInit();
});