/**
 * @module personalCenter
 * 
 * @name 个人中心
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'personalCenterGroupList', 'personalCenterGroupTab'], 
    function(user, top, hd, ft,  personalCenterNav, personalCenterGroupList, personalCenterGroupTab) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
       	personalCenterNav.doInit(this, "group");
        
        var tabInit = personalCenterGroupTab.doInit("personalCenterGroupTab", this);

            personalCenterGroupList.doInit("personalCenterGroupList", this);
    });
    
});