/**
 * @module groupInfo
 * 
 * @name 小组-详情页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'groupBoard', 'publisher', 'tweetList', 'activeUsers'], function(user, top, hd, ft, params, groupBoard, pb, tl, atu) {
    var groupId = params["groupId"];
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);

        var userId = this.data.userId;
        
        groupBoard.doInit(groupId, this);
    });
    
    hd.doInit(3);
    
    ft.doInit();
    
    tl.doInit(groupId, 'tweetList');

    pb.doInit(groupId, tl.refresh);

    atu.doInit("activeUsers");
});