/**
 * @module tag
 * 
 * @name 标签页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'courseList'], function(user, top, hd, ft, cl) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
    });
    
    hd.doInit();
    
    ft.doInit();
    
    cl.doInit("courseList", true);
});