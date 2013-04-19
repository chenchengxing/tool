/**
 * @module livePlay
 * 
 * @name 直播播放页
 * @version 1.0.0
 */



define(['user', 'playTitle', 'playTab', 'livePlayBox'], 
    function(user, pt, ptab, livePlayBox) {
    var userInit = user.doInit();
    userInit.done(function (){
       
    });
    
    pt.doInit(function (data, index){

        livePlayBox.doInit(data);

    }, "livePlayTitle");
});