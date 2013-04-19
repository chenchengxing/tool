/**
 * @module groupTopic
 * 
 * @name 小组-详情页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'groupTopicList', 'groupBoard', 'activeUsers'], function(user, top, hd, ft, params, gtl, groupBoard, atu) {
    var groupId = params["groupId"];
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);

        var userId = this.data.userId;
        
        groupBoard.doInit(groupId, this, 2);
    });
    
    hd.doInit(3);
    
    ft.doInit();
    
    gtl.doInit();

    atu.doInit("activeUsers");
});