/**
 * @module index
 * 
 * @name 首页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'commentList', 'comment'], function(user, top, hd, ft, commentList, comment) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);

    });
    
    hd.doInit();
    
    ft.doInit();
    
    commentList.doInit();
    comment.doInit();
});