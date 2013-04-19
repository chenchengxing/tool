/**
 * @module personalCenterLearning
 * 
 * @name 个人中心 在学的课程页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'personalCenterLearningCourseList'], 
	function(user, top, hd, ft,  pcn, personalCenterLearningCourseList) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
       	pcn.doInit(this, "learning");
        
        // pcnlli.doInit(this);

        personalCenterLearningCourseList.doInit(this);
    });
    
});