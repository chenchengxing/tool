/**
 * @module personalCenterMyCourse
 * 
 * @name 我创建的课程 ---- 个人中心
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer',  'personalCenterNav', 'personalCenterMyCourseList'], function(user, top, hd, ft,  pcn ,pcmcl) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
       	pcn.doInit(this, "myCourse");
        

        pcmcl.doInit(this);
    });
    
});