define({
    "path": "",
    "user": "datas/user.json",     // 获取当前用户  platform/rs/login/current
    "slide": "datas/slide.json",    //首页 轮播  platform/rs/loop/getLoopList?pageNo=1&order=desc&pageSize=5
    //"recomCourse":["platform/rs/course/list?orderBy=2&order=desc&pageSize=6", "platform/rs/course/list?orderBy=1&order=desc&pageSize=6"],    //首页 推荐课程 
    "recomCourse":["datas/recomCourse.json", "datas/recomCourse1.json"],    //首页 推荐课程
    "originalCourse": "datas/originalCourse.json",    //首页 学员原创课程 datas/originalCourse.json
    "elementView": function(courseId, elementId){
        // 保证课节查看信息
        
        return "datas/elementView.json";
        //return "platform/rs/course/elementview?courseId="+courseId+"&elementId="+elementId;
    },
    "liveLine": "datas/liveLine.json",  //首页 直播课堂
    "tags": function(num){
        //首页 标签
        
        return "datas/tags.json";
        //return "platform/rs/tag/search?pageSize=" + num;
    },
    "tagTitle": function (id){
        //标签页 标签标题
        
        return "datas/tagTitle.json";
        //return "platform/rs/tag/detail/" + id;
    },
    "playTitle": function (id){
        //标签页 标签标题
        
        return "datas/playTitle.json";
        //return "platform/rs/course/detail/" + id;
    },
    "playBox": function (type, id, width, height){
        switch(type) {
            case 1:
                return "platform/document/wenkuPlay.html?id="+id+"&height="+ height + "&width=" + width;
                break;
            case 4:
                return "platform/document/wenkuPlay.html?id="+id+"&height="+ height + "&width=" + width;
                break;
            default: 
                return "platform/video/videoPlay.html?id="+id+"&height="+ height + "&width=" + width;
        }
    },
    "category": function (id){
        //课程中心 分类导航
        return "datas/category.json";
        
        //return "platform/rs/node/detail?level=3&sourceId=" + id;
    },
    "learnDocs": function (id){
        //课程详情页 分类导航
        
        return "datas/learnDocs.json";
        //return "platform/rs/course/resources?id=" + id;
    },
    "onlineCourse": function (id){
        // 课程详情页 在线课程
        
        return "datas/onlineCourse.json";
        //return "platform/rs/course/elements/" + id;
    },
    "groupCourseList": "/platform/rs/course/group", //课程列表  platform/rs/course/search   datas/courseList.json
    "courseList": "datas/courseList.json", //课程列表  platform/rs/course/search   
    "courseDetail": function (id){
        // 课程详情页  课程介绍
        return "datas/courseDetail.json";
        

        //return "platform/rs/course/info?courseId=" + id;

    },
    "courseOwner": function (){
        // 课程详情页  课程来源
        return "datas/courseOwner.json";
        
        //return "sns/rs/user/detail?userId=" + id;
    },
    "recentStudent": function (id){
        //课程详情 最新加入学员datas/recentStudent.json
        
        return "datas/recentStudent.json";
        //return "platform/rs/course/viewlist?courseId="+id;
    },
    "relateCourse": function (id){
        //课程详情 最新加入学员datas/relateCourse.json
        
        return "datas/relateCourse.json";
        //return "platform/rs/course/related?courseId="+id;
    },
    "myApply": function (id){
        //直播课堂 我的开课申请
        
        return "datas/myApply.json";
        //return "platform/rs/livecourse/list?pageSize=10&creatorId="+id;
    },
    "myCourse": function (name){
        //直播课堂 我的开课申请
        
        return "datas/myCourse.json";
        //return "/rs/indvdlCntr/haveChooseList?pageSize=10&username="+name;
    },
    "frontCover": "platform/rs/livecourse/frontCover",    //上传封面接口
    "frontcourseUpload": "/platform/rs/courseUpload/frontCourseCover",
    "updateLive": "platform/rs/livecourse/updateByCreator", //编辑直播
    "formLive": "platform/rs/livecourse/add",    // 创建直播课堂   现场直播
    "formBBB": "platform/rs/livecourse/bbbAdd",    // 创建直播课堂   现场直播
    "liveCourseInfo": function (id){
        //直播课堂详情页 课程介绍
        
        return "datas/liveCourseInfo.json";
        //return "platform/rs/livecourse/"+id;
    },
    "deleteLive": function (id){
        //直播课堂详情页 删除课程
        
        return "datas/deleteLive.json";
        //return "platform/rs/livecourse/delete?id="+id;
    },
    "groupBoard": function (groupId){
        //小组-详情页  小组介绍
        
        // return "datas/groupBoard.json";
        return "/sns/rs/group/" + groupId;
    },
    "publisher": "/sns/rs/notice/publish",   //发布评论  "datas/publisher.json",//
    "liveTimeLine" : function (id) {
        if (id == "liveTimeLine") {
            return "/platform/rs/livecourse/list";
        } else if (id == "personalCenterSelectableList") {
            return "/hrlms/rs/indvdlCntr/toApprovalChooseList";//可選課表
        } else if (id == "personalCenterCalendarList") {
            return "/hrlms/rs/indvdlCntr/haveChooseList";//我的選課日曆
        } else if (id == "personalCenterCompletedLessonList") {
            return "/hrlms/rs/indvdlCntr/scoreList";//我完成的課節
        } else if (id == "personalCenterIndexList") {
            return "datas/courseInfoForCompleted.json";//個人中心首頁
        } else if (id == "personalCenterIndexList") {
            return "datas/courseInfoForCompleted.json";
        }
        return "";
    },
    "peixunClassroom" : "platform/rs/live/bbb",
    "personalCenterIndexLearning" : "datas/personalCenterIndex.json",//index在学的课程-个人中心
    "personalCenterMyCourse" : {"notyet" : "datas/courseList.json", "already" : "datas/courseList.json"},//我创建的课程-个人中心
    "personalCenterLearning" : "datas/courseList.json",//在学的课程-个人中心
    "personalCenterLearnedCourseList" : "datas/courseList.json",//已完成的课程-个人中心,
    "groupMemberPerson": "/sns/rs/group/members",//"datas/groupMemberPerson.json", //小组-成员页 成员 
    "groupTopicList": "/sns/rs/tag/group/list",//"datas/groupTopicList.json", //小组-话题页 话题列表 
    "courseSignUp" : "hrlms/rs/indvdlCntr/userToApprovalChoose",//报名，课程报名
    "absentCourse" : "hrlms/rs/indvdlCntr/leaveCourse",//请假
    "quitCourse" : "hrlms/rs/indvdlCntr/quitCourse",//退课
    "personalCenterFriendList" : "datas/pcFriendList.json",
    "personalCenterFriendTab" : "datas/pcFriendTab.json",
    "personalCenterGroupTab" : "datas/pcGroupTab.json",
    "hotTalk": "/sns/rs/tag/top/group/",//"datas/hotTalk.json?", //小组 热门话题 
    "groupMemberQuit" : "/sns/rs/group/quit",//"datas/groupMemberQuitSuccess.json" //小组 成员管理 踢出小组成员 
    "tweetList" : "/sns/rs/timeline/group",//"datas/tweetList.json" //小组 详情页 微博列表 
    "repliesList" : "/sns/rs/notice/info/replies", //消息 评论列表 "datas/tweetReply.json"//
    "noticeCount" : "/sns/rs/group/noticeCount", //课程播放 评论数目
    "groupTalkList" : "/sns/rs/tag/latest",//"datas/groupTalkList.json", //首页 最新小组话题 
    "groupTopicHeader" : "/sns/rs/tag/detail", //话题详情 "datas/groupTopicHeader.json",//
    "groupTopicTimeline" : "/sns/rs/timeline/tag/group" //时间线 小组话题
    ,"courseCreate" : "/platform/rs/course/create"
    ,"organizeList" : "/platform/rs/organize/list"
    ,"createDocElement" : "/platform/rs/document/createDocElement"
    ,"courseUpload" : "/platform/rs/courseUpload/elementDocument"
    ,"videoUpload" : "/platform/rs/video/videoUpload"
    ,"videoGeneratePath" : "/platform/rs/video/generatePath"
    ,"createVideoElement" : "/platform/rs/video/add"
    ,"courseSearch" : function() {
        //小组课程 添加课程列表 groupAddCourse.html & courseOwnList.js
        //return "datas/courseOwnList.json";
        return "/platform/rs/course/search";
    }
    ,"coursegroupAdd" : function() {
        //小组课程 添加课程提交接口 groupAddCourse.html & courseOwnList.js
        return "/platform/rs/coursegroup/add";
    }
    ,"groupEdit" : function(id) {
        //创建小组页面 编辑小组 拿到小组基本信息   groupCreate.html groupCreateDetail.js
        return "/sns/rs/group/" + id;
    },
    "groupUpdate" :"/sns/rs/group/update",//创建小组页面 编辑小组 更新小组信息 groupCreate.html groupCreateDetail.js
    "groupSave" : "/sns/rs/group/save",//创建小组页面 创建小组信息 groupCreate.html groupCreateDetail.js
    "groupLogo" : "/sns/rs/group/logo", //创建小组页面 小组图片 groupCreate.html groupCreateDetail.js
    "coursegroupDelete" : '/platform/rs/coursegroup/delete',   //删除小组课程
    "userActivists" : function(id, count) {
        //活跃用户
        return "/sns/rs/user/activists?groupId=" + id + "&topCount=" + count;
    }
    ,"profileBoard" : function(userid) {
        //用户详情
        //return "/sns/rs/user/detail?userid=" + userid;
        return "datas/profileBoard.json";
    }
    ,"subscribeFollow" : function() {
        //用户详情 添加关注
        return "/sns/rs/relation/subscribe/follow";
    }
    ,"subscribeUnfollow" : function() {
        //用户详情 取消关注
        return "/sns/rs/relation/subscribe/unfollow";
    }
    ,"subscribeRelation" : function() {
        //用户详情 是否关注
        return '/sns/rs/relation/subscribe/relation';
    },
    "userFans" : "/sns/rs/user/fans",   //我的粉丝 datas/fans.json
    "userIdols" : "/sns/rs/user/idols", //我的关注 datas/attention.json
    "personalCenterFriend" : function (type) {
        if (type == "idols") {
            return "/sns/rs/user/idols";//我关注的人
        } else if (type == "fans") {
            return "/sns/rs/user/fans";//我的粉丝
        } else if (type == "mutual") {
            return "/sns/rs/user/mutual"; //相互关注的
        } else if (type == "follow") {
            return "/sns/rs/relation/subscribe/follow";//添加关注
        } else if (type == "disFollow") {
            return "/sns/rs/relation/subscribe/unfollow";//取消关注
        }
        return "";
    },
    "personalCenterGroup" : function (type) {
        if (type == "joined") {
            return "/sns/rs/group/joined";//我加入的小组
        } else if (type == "managed") {
            return "/sns/rs/group/managed";//我管理的小组
        } else if (type == "quit" ) {
            return "/sns/rs/group/quit"; //退出小组
        }
        return "";
    },
    "coursegroupCount" : function () {
        return "/platform/rs/coursegroup/count";
    },
    "groupIsMember" : function () {
        return "/sns/rs/group/ismember";
    },
    "groupJoin" : function () {
        return "/sns/rs/group/join";
    }
    ,"classifyDetail" : function(sourceId,level) {
        //创建课程  分类
        //return "/platform/rs/node/detail?sourceId="+sourceId+"&level="+level;
        return "datas/classifyCourse.json";
    },
    "courseLinkToCMS" : function () {
        return "http://m1-ite-dev01.m1.baidu.com:8090/student/course/viewCourse.do?isFamily=false&cId=";
    },
    "indexNews" : function () {
        return "datas/indexNews.json";
    }
});
















