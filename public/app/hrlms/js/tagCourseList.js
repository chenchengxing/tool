/**
 * @module tagCourseList
 * 
 * @name 标签页 课程列表模块
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2013-3-6
 */



define(['courseList'], function(cl) {
    
    var $el = $("#tagCourseList");

    return {
        render: function (){
            cl.doInit("tagCourseList");
        },
        doInit: function (){
            this.render();
        }
    }
});