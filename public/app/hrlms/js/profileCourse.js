/**
 * @module profileCourse
 * 
 * @name 个人中心-sns课程
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'profileBoard', 'fans', 'attention', 'profileCourseList', 'urlParser'], function(user, top, hd, ft, pb, fans, attention, pcl, params) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
    });
    
    hd.doInit();
    ft.doInit();
    
    if (params) {
        var userId = params.userId;
        
        pb.doInit(userId);
        fans.doInit(userId);
        attention.doInit(userId);
        pcl.doInit(userId);
    }
});
