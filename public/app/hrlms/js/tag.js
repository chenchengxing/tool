/**
 * @module tag
 * 
 * @name 标签页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'tagTitle', 'tags', 'tagCourseList'], function(user, top, hd, ft,tt, tag, tcl) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
    });
    
    hd.doInit();
    
    ft.doInit();
    
    tt.doInit();
    
    tag.doInit(1);
    
    tcl.doInit();
});