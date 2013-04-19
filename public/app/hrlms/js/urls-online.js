define({
    "path": "",
    "snsServerPath" : "http://learn.baidu.com",
    "user": "platform/rs/login/current",    //  获取当前用户  datas/user.json
    "getUserInfo": "/hrlms/rs/user/getUserInfo",
    "defaultImage" : function (type, subPath) {
        if (type == "family") {
            return "http://family.baidu.com:8083/images/userimages/" + subPath + ".jpg";
        } else if (type == "course.html") {
            return "platform" + subPath;//个人中心，人像默认图片
        } else if (type == "email") {
            return "http://family.baidu.com:8083/images/userimages/" + subPath.replace(/@.+m$/g,'')+".jpg";//名师推荐，达人
        } else if (type == "avatar") {
            return "images/48x48-p.png";//个人中心，人像默认图片
        } else if (type == "course") {
            return "images/220x140.png";//课程列表中的课程默认图片
        } else if (type == "group") {
            return "images/48x48-p.png";//小组的默认图片
        } else if (type == "courseBig") {
            return "images/cover-big.png";//课程中心课程大图默认
        } else if (type == "avatar") {
            return "images/48x48-p.png";
        } else if (type == "avatar") {
            return "images/48x48-p.png";
        } else if (type == "avatar") {
            return "images/48x48-p.png";
        }
        return "ccx";
    },
    "slide": "platform/rs/loop/getLoopList?pageNo=1&order=desc&pageSize=5",    //首页轮播  datas/slide.json
    "recomCourse": ["platform/rs/course/search?orderBy=2&pageSize=6", "platform/rs/course/search?orderBy=1&pageSize=6"],    //首页 推荐课程
    "originalCourse": "platform/rs/course/original?pageSize=18",    //首页 学员原创课程datas/originalCourse.json
    "elementView": function(courseId, elementId){
        // 保证课节查看信息
        
        //return "datas/elementView.json";
        return "platform/rs/course/elementview?courseId="+courseId+"&elementId="+elementId;
    },
    "liveLine": "platform/rs/livecourse/list?pageSize=6&status=1&pass=1",  //首页 直播课堂 datas/liveLine.json
    "tags": function (num){
        //首页 标签
        
        //return "datas/tags.json";
        return "platform/rs/tag/recommend?pageSize=" + num;
    },
    "tagTitle": function (id){
        //标签页 标签标题
        
        //return "datas/tagTitle.json";
        return "platform/rs/tag/detail/" + id;
    },
    "playTitle": function (id, eleId){
         //标签页 标签标题
        if (eleId == "playTitle") {
            //return "datas/playTitle.json";
            return "platform/rs/course/detail/" + id;
        } else if (eleId == "livePlayTitle") {
            return "platform/rs/livecourse/" + id;
        }
        return "";
    },
    "playBox": function (type, id, width, height){
        switch(type) {
            case 1:
                return "platform/document/wenkuPlay.html?id="+id+"&height="+ height + "&width=" + width;
                break;
            case 4:
                return "platform/document/wenkuPlay.html?id="+id+"&height="+ (height-3) + "&width=" + (width-4);
                break;
            default: 
                return "/platform/video/videoPlay.html?auto=1&id="+id+"&height="+ height + "&width=" + width;
        }
    },
    "livePlayBox" : function (type) {
        // body...
        switch(type) {
            case 1:
                return "platform/live/livePlay.html";
                break;
            case 2:
                return "platform/live/httpPlay.html";
                break;
            default:
                return "";
        }
    },
    "category": function (id){
        //分类导航
        //return "datas/category.json";
        
        return "platform/rs/node/detail?level=3&sourceId=" + id;
    },
    "learnDocs": function (id){
        //课程详情页 分类导航
        
        //return "datas/learnDocs.json";
        return "platform/rs/course/resources?id=" + id;
    },
    "onlineCourse": function (id){
        // 课程详情页 在线课程
        
        //return "datas/onlineCourse.json";
        return "platform/rs/course/elements/" + id;
    },
    "courseList": "platform/rs/course/search", //课程列表  datas/courseList.json
    "groupCourseList": "/platform/rs/course/group", //课程列表  platform/rs/course/search   datas/courseList.json
    "profileCourseList": "/platform/rs/course/others",  //他人课程
    "courseDetail": function (id){
        // 课程详情
        
        //return "datas/courseDetail.json";
        return "platform/rs/course/info?courseId=" + id;
    },
    "courseOwner": function (id){
        // 课程详情页  课程来源
        
        //return "datas/courseOwner.json";
        return "/sns/rs/user/detail?userId=" + id;
    },
    "recentStudent": function (id){
        //课程详情 最新加入学员datas/recentStudent.json
        
        //return "datas/recentStudent.json";
        return "platform/rs/course/viewlist?courseId="+id;
    },
    "relateCourse": function (id){
        //课程详情 最新加入学员datas/relateCourse.json
        
        //return "datas/relateCourse.json";
        return "platform/rs/course/related?courseId="+id;
    },
    "myApply": function (id){
        //直播课堂 我的开课申请
        
        //return "datas/myApply.json";
        return "platform/rs/livecourse/list?pageSize=10&creatorId="+id;
    },
    "myCourse": function (name){
        //直播课堂 我的开课申请
        
        //return "datas/myCourse.json";
        return "hrlms/rs/indvdlCntr/haveChooseList?pageNo=1&pageSize=10&username="+name;
    },
    "frontCover": "platform/rs/livecourse/frontCover",    //上传封面接口
    "frontcourseUpload": "/platform/rs/courseUpload/frontCourseCover",
    "updateLive": "platform/rs/livecourse/updateByCreator", //编辑直播
    "formLive": "platform/rs/livecourse/add",    // 创建直播课堂   现场直播
    "formBBB": "platform/rs/livecourse/bbbAdd",    // 创建直播课堂   现场直播
    "liveCourseInfo": function (id){
        //直播课堂详情页 课程介绍
        
        //return "datas/liveCourseInfo.json";
        return "platform/rs/livecourse/"+id;
    },
    "deleteLive": "platform/rs/livecourse/delete",//直播课堂详情页 删除课程  "datas/deleteLive.json";
    "groupBoard": function (groupId){
        //小组-详情页  小组介绍
        
        //return "datas/groupBoard.json";
        return "/sns/rs/group/"+groupId;
    },
    "publisher": "/sns/rs/notice/publish",   //发布评论  datas/publisher.json
    "liveTimeLine" : function (id) {
        if (id == "liveTimeLine") {
            return "platform/rs/livecourse/list";
        } else if (id == "personalCenterSelectableList") {
            return "hrlms/rs/indvdlCntr/toApprovalChooseList";//可選課表
        } else if (id == "personalCenterCalendarList") {
            return "hrlms/rs/indvdlCntr/haveChooseList";//我的選課日曆
        } else if (id == "personalCenterCompletedLessonList") {
            return "hrlms/rs/indvdlCntr/scoreList";//我完成的課節
        } else if (id == "personalCenterIndexList") {
            return "datas/courseInfoForCompleted.json";//個人中心首頁
        } else if (id == "personalCenterIndexList") {
            return "datas/courseInfoForCompleted.json";
        }
        return "";
    },
    "personCenterOnlineCourseAction" : "platform/rs/course/updatestatus",//发布、删除、取消发布课程接口
    "peixunClassroom" : "platform/rs/live/bbb",
    "personalCenterIndexLearning" : "platform/rs/course/person",//index在学的课程-个人中心
    "personalCenterMyCourse" : {"notyet" : "platform/rs/course/person", "already" : "platform/rs/course/person"},//我创建的课程-个人中心
    "personalCenterLearning" : "platform/rs/course/person",//在学的课程-个人中心
    "personalCenterLearnedCourseList" : "platform/rs/course/person",//已完成的课程-个人中心,
    "groupMemberPerson": "/sns/rs/group/members",//"datas/groupMemberPerson.json", //小组-成员页 成员 
    "groupTopicList": "/sns/rs/tag/group/list", //小组-话题页 话题列表 datas/groupTopicList.json
    "courseSignUp" : "hrlms/rs/indvdlCntr/userToApprovalChoose",//报名，课程报名
    "absentCourse" : "hrlms/rs/indvdlCntr/leaveCourse",//请假
    "quitCourse" : "hrlms/rs/indvdlCntr/quitCourse",//退课
    "personalCenterFriendList" : "/sns/rs/relation/subscribe/idols",
    "personalCenterFriendTab" : "datas/pcFriendTab.json",
    "personalCenterGroupTab" : "datas/pcGroupTab.json",
    "hotTalk": "/sns/rs/tag/top/group/",//"datas/hotTalk.json?", //小组 热门话题 
    "groupMemberQuit" : "/sns/rs/group/quit",//"datas/groupMemberQuitSuccess.json" //小组 成员管理 踢出小组成员 
    "tweetList" : "/sns/rs/timeline/group",//"datas/tweetList.json" //小组 详情页 微博列表 
    "repliesList" : "/sns/rs/notice/info/replies", //消息 评论列表 "datas/tweetReply.json"//
    "noticeCount" : "/sns/rs/group/noticeCount", //课程播放 评论数目
    "groupTalkList" : "/sns/rs/tag/group/latest",//"datas/groupTalkList.json", //首页 最新小组话题 
    "groupTopicHeader" : "/sns/rs/tag/detail", //话题详情 "datas/groupTopicHeader.json",//
    "groupTopicTimeline" : "/sns/rs/timeline/tag/group", //时间线 小组话题
    "courseCreate" : "/platform/rs/course/create",
    "organizeList" : "/platform/rs/organize/list",
    "createDocElement" : "/platform/rs/document/createDocElement",
    "courseUpload" : "/platform/rs/courseUpload/elementDocument",
    "videoUpload" : "/platform/rs/video/videoUpload",
    "videoGeneratePath" : "/platform/rs/video/generatePath",
    "createVideoElement" : "/platform/rs/video/add",
    "courseSearch" : function() {
        //小组课程 添加课程列表 groupAddCourse.html & courseOwnList.js
        //return "datas/courseOwnList.json";
        return "/platform/rs/course/search";
    },
    "coursegroupAdd" : function() {
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
    "coursegroupDelete":'/platform/rs/coursegroup/delete',//删除小组课程
    "userActivists" : function(id, count) {
        //活跃用户
        return "/sns/rs/user/activists?groupId=" + id + "&topCount=" + count;
    }
    ,"profileBoard" : function(userid) {
        //用户详情
        return "/sns/rs/user/detail?userId=" + userid;
        //return "datas/profileBoard.json";
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
    "userFans" : "/sns/rs/user/fans",
    "userIdols" : "/sns/rs/user/idols",
    "personalCenterFriendCount" : function (type) {
        if (type == "idols") {
            return "/sns/rs/user/idols/count";//我关注的人,数目
        } else if (type == "fans") {
            return "/sns/rs/user/fans/count";//我的粉丝,数目
        } else if (type == "mutual") {
            return "/sns/rs/user/mutual/count"; //相互关注的,数目
        }
        return "";
    },
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
    "personalCenterGroupCount" : function (type) {
        if (type == "joined") {
            return "/sns/rs/group/joined/count";//我加入的小组,数目
        } else if (type == "managed") {
            return "/sns/rs/group/managed/count";//我管理的小组,数目
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
    },
    "courseLinkToCMS" : function () {
        return "http://tms.baidu.com/student/course/viewCourse.do?isFamily=false&cId=";
    },
    "classifyDetail" : function(sourceId,level) {
        //创建课程  分类
        return "/platform/rs/node/detail?sourceId="+sourceId+"&level="+level;
        //return "datas/classifyCourse.json";
    },
    "indexNews" : function () {
        return "datas/indexNews.json";
    },
    "logout": ["/platform/rest/logout/postLogout","/sns/j_spring_cas_security_logout","/hrlms/j_spring_cas_security_logout"],
    "ownCourseList":"/platform/rs/course/list"
});
