/**
 * @module play
 * 
 * @name 课程播放
 * @version 1.0.0
 */



define(['user', 'playTitle', 'playCourseIntro', 'playTab', 'playBox'], function(user, pt, pci, ptab, pb) {
    var userInit = user.doInit();
    userInit.done(function (){
       
    });
    
    pt.doInit(function (data, index){
        pci.doInit(data);
        
        ptab.doInit(data, index);
        
        pb.doInit(data, index);
    }, "playTitle");
});