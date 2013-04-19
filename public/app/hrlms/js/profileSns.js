/**
 * @module profileSns
 * 
 * @name 个人中心-sns粉丝关注
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer'], function(user, top, hd, ft) {
    var userInit = user.doInit();
    
    hd.doInit(2);
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
    });
    
});