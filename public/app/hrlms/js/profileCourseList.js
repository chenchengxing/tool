/**
 * @module groupCourseList
 * 
 * @name 小组 课程列表模块
 * @author hi:yuebin_felix <v_lebin@baidu.com>
 * @version 2013-3-17
 */



define(['courseList', 'urlParser', 'urls'], function(cl, urlParser, _urls) {

    var $el = $("#courseList");

    return {
        render: function (userId){
            /*
            if (creatorId) {
                if(userId == creatorId){
                    // num = 1 为小组下管理员
                    cl.doInit("courseList", 2, 1);
                }else{
                    // num = 2 为小组下非管理员
                    cl.doInit("profileCourseList", 2, 2, userId);
                }
            }
            */
            //num = 2 为小组下非管理员
            cl.doInit("profileCourseList", 2, 2, userId);
        },
        doInit: function (userId){
            this.render(userId);
        }
    }
});