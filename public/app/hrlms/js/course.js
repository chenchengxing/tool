/**
 * @module course
 * 
 * @name 课程中心
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'category', 'courseList'], function(user, top, hd, ft, cate, cl) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
    });
    
    hd.doInit(1);
    ft.doInit();
    
    cate.doInit();
    
    cl.doInit("courseList");
});