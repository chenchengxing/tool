/**
 * @module groupTopicInfo
 * 
 * @name 小组-话题详情页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'urlParser', 'hotTalk', 'groupTopicHeader', 'publisher', 'tweetList', 'groupBoard'], function(user, top, hd, ft, urlParser, ht, gth, pb, tl, groupBoard) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
        var userId = this.data.userId;
        
        groupBoard.doInit(urlParser.groupId, this, 2);
    });
    var _tag = !!urlParser.tag?decodeURIComponent(urlParser.tag):null;
    
    hd.doInit(3);
    
    ft.doInit();

    ht.doInit(5);

    pb.doInit(urlParser.groupId, tl.refresh, _tag);

    tl.doInit(urlParser.groupId, 'groupTopicTimeline');

    gth.doInit(urlParser.groupId, encodeURIComponent(_tag));
});