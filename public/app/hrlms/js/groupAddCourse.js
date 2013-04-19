/**
 * @module groupAddCourse
 * 
 * @name 小组-添加课程
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'groupBoard', 'courseOwnList', 'activeUsers'], function(user, top, hd, ft, params, groupBoard, col, acu) {
    var groupId = params["groupId"];
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
        
        groupBoard.doInit(groupId, this, 1);
    });
    
    hd.doInit(3);
    
    ft.doInit();
    
    col.doInit(groupId);
    
    acu.doInit("activeUsers");
});