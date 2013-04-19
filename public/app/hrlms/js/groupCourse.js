/**
 * @module groupCourse
 * 
 * @name 小组-课程页面
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'groupBoard', 'groupCourseList', 'activeUsers'], function(user, top, hd, ft, urlParser, groupBoard, gcl, atu) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
        
        var groupId = urlParser["groupId"];
        var userId = this.data.userId;
        
        groupBoard.doInit(groupId, this, 1, function (creatorId){
            gcl.doInit(userId, groupId, creatorId);
        })
    });
    
    hd.doInit(3);
    
    ft.doInit();
    
    atu.doInit("activeUsers");
});