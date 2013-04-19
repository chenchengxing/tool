/**
 * @module groupMember
 * 
 * @name 小组-成员页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'groupMemberPerson', 'groupBoard', 'activeUsers'], function(user, top, hd, ft, urlParser, gmember, groupBoard, atu) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);

        var userId = this.data.userId;
        
        groupBoard.doInit(urlParser.groupId, this, 3, function (creatorId){
            if(userId == creatorId){
            	gmember.doInit(true);
            }else{
            	gmember.doInit(false);
            }
        });
    });
    
    hd.doInit(3);
    
    ft.doInit();

    atu.doInit("activeUsers");
});