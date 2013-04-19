/**
 * @module personalCenterLearned
 * 
 * @name 个人中心-已完成课程
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'personalCenterLearnedCourseList'], function(user, top, hd, ft, pcn, pclcl) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        pcn.doInit(this, "learned");
        
        pclcl.doInit(this);
    });
    
});