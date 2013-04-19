/**
 * @module groupCreate
 * 
 * @name 申请创建小组
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'groupCreateDetail'], function(user, top, hd, ft, gcd) {
    var userInit = user.doInit();
    
    hd.doInit(3);
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        gcd.doInit();
    });
    
});