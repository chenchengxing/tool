/**
 * @module groupCourseList
 * 
 * @name 小组 课程列表模块
 * @author hi:yuebin_felix <v_lebin@baidu.com>
 * @version 2013-3-17
 */



define(['courseList', 'urls'], function(cl, _url) {

    var $el = $("#courseList");
    var dataUrl = _url.coursegroupDelete;

    return {
        render: function (userId, groupId, creatorId){
            if (creatorId) {
                if(userId == creatorId){
                    // num = 1 为小组下管理员
                    cl.doInit("courseList", 2, 1);
                    
                    $el.on("click", ".groupCourseDel",function (){
                        if (confirm('确定要删除此课程吗？')) {
                            var _this = $(this),
                                tid = _this.attr('tid');
                                
                            $.post(dataUrl, {"courseId":tid, "groupId":groupId}, function (result){
                                if (200 == result.code) {
                                    alert('删除成功！');
                                    //_this.closest('li.cl').remove();
                                    location.reload();  //二者任选其一
                                } else {
                                    alert(result.message);
                                }
                            });
                        }
                    });
                }else{
                    // num = 2 为小组下非管理员
                    cl.doInit("courseList", 2, 2);
                }
            }
        },
        doInit: function (userId, groupId, creatorId){
            this.render(userId, groupId, creatorId);
        }
    }
});