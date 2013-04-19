/**
 * @module user course
 * 
 * @name 可选课程
 * @version 1.0.0
 */



define(["urls", "tpls" ,'jquery.tmpl'], function(_urls, _tpls) {
    
    var dataUrl = _urls["liveTimeLine"]("personalCenterSelectableList");
    var tpl = _tpls.userCourse;
    $("#userCourse .ucc-more").live("click", function () {
        if ($('#userCourse .ucc-list').attr('style') && $('#userCourse .ucc-list').attr('style') != '') {
            $('#userCourse .ucc-list').removeAttr('style');
            $("#userCourse .ucc-more span").css("background-position", "-103px -315px");
        } else {
            $('#userCourse .ucc-list').css('height','auto');
            $("#userCourse .ucc-more span").css("background-position", "-103px -335px");
        }
        
        return false;
    });
    return {
        render : function (user) {
            var urlObj = {};
            urlObj.pageNo = 1;
            urlObj.pageSize = 10;
            urlObj.username = user.data.username;
            $.ajax({
                type : "get",
                url: dataUrl + '?' + $.param(urlObj),
                dataType: "json",
                success: function(response){
                    if (response.data && response.data.result) {
                        if (response.data.result.length > 5) {
                            //cut the result to 5
                            response.data.result.splice(5);
                        }

                        $.tmpl(tpl, response.data).appendTo("#" + "userCourse");

                        if (response.data.result.length <= 2) {
                            $("#userCourse .ucc-more").remove();//hide expandCursor
                        }
                    }
                }
            });
        },
        doInit : function (user){
            this.render(user);
        }
    };
});