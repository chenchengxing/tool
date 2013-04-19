/**
 * @module personalCenter
 * 
 * @name 个人中心
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'personalCenterFriendList', 'personalCenterFriendTab'], 
    function(user, top, hd, ft,  personalCenterNav, personalCenterFriendList, personalCenterFriendTab) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
       	personalCenterNav.doInit(this, "friend");
        
        var tabInit = personalCenterFriendTab.doInit("personalCenterFriendTab");

        personalCenterFriendList.doInit("personalCenterFriendList", this);
    });
    
});