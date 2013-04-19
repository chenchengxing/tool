/**
 * @module profile
 * 
 * @name 个人中心-sns
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