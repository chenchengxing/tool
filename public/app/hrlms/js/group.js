/**
 * @module group
 * 
 * @name 小组
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer','hotTalk'], function(user, top, hd, ft, ht) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
        if(this.data.isAdmin == 1){
        	$("#createGroup").css("visibility","visible");
        }
    });
    
    hd.doInit(3);
    
    ft.doInit();

    ht.doInit(5);
});