/**
 * @module createCourseStep
 * 
 * @name 创建课程
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'createCourseSteps'], function(user, top, hd, ft, pcn, pcns) {
    var userInit = user.doInit();
    
    hd.doInit(1);
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        pcn.doInit(this, "index");
        
        pcns.doInit();
    });
    
});