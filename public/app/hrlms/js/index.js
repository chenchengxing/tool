/**
 * @module index
 * 
 * @name 首页
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'slide', 'recomCourse', 'originalCourse', 'liveLine', 'recomTeacher', 'learnerStar', 'tags', 'userCourse', 'userCenter', 'groupTalkList', 'indexNews'], 
    function(user, top, hd, ft, s, rc, oc, ll, rt, ls, tag, userCourse, userCenter, groupTalkList, indexNews) {
    // 获取用户信息
    var userInit = user.doInit();
    userInit.done(function (){
        // 顶部
        top.doInit(this);
        
        // 用户中心
        //uc.doInit(this);

        //可选课表
        userCourse.doInit(this);

        //index个人信息
        userCenter.doInit(this);
    });
    
    // 头部
    hd.doInit();
    
    // 尾部
    ft.doInit();
    
    // 轮播
    s.doInit();
    
    // 推荐课程
    rc.doInit();
    
    // 学员原创课程
    oc.doInit();
    
    // 最新小组话题
    //gp.doInit();
    
    // 培训小站
    //mns.doInit();
    
    // 直播课堂
    ll.doInit();
    
    // 名师推荐
    rt.doInit();
    
    // 学习达人
    ls.doInit();
    
    // 你可能感兴趣的标签
    tag.doInit();
    
    groupTalkList.doInit();

    //度学堂咨询
    indexNews.doInit();
});