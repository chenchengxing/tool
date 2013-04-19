/**
 * @module personalCenterMyCourseList
 * 
 * @name 我创建的课程
 * @version 1.0.0
 */



define(['tpls', 'urlParser', 'pagination', 'urls'], function(_tpl, _urlParser, _page, _urls) {
    var urlObj = $.extend({}, _urlParser);
    var tpl = _tpl.personalCenterMyCourseList;
    // var testUrl = "datas/courseList.json";
    var dataItem = null;
    //cache data from ajax
    var cache = {};
    var toggleType = ["notyet", "already", ""];
    //get the section element
    var $el = $("#personalCenterMyCourseList");

    var ajaxSender = {
        ajaxNotyet : function (username) {
            urlObj.type = "3";
            urlObj.status = 2;
            $.ajax({
                url : _urls.personalCenterMyCourse.notyet  + '?' + $.param(urlObj),
                dataType : 'json',
                async : false,
                success : function (response) {
                    if (response.code == 200) {
                        cache = response;
                        toggleType[2] = toggleType[0];
                        urlObj.totalPages = response.data.totalPages;
                        _page.doInit(urlObj);
                        $el.removeClass("loading");
                     } else {
                        $el.html(response.message);
                    }
                },
                error : function (msg) {
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        },
        ajaxAlready : function (username) {
            urlObj.type = "3";
            urlObj.status = 1;
             $.ajax({
                url : _urls.personalCenterMyCourse.already  + '?' + $.param(urlObj),
                dataType : 'json',
                async : false,
                success : function (response) {
                    if (response.code == 200) {
                        cache = response;
                        toggleType[2] = toggleType[1];
                        urlObj.totalPages = response.data.totalPages;
                        _page.doInit(urlObj);
                        $el.removeClass("loading");
                    } else {
                        $el.html(response.message);
                    }
                },
                error : function (msg) {
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        }
    };

    function initList (index) {
        $("#personalCenterMyCourseList").empty();
        $.tmpl(tpl, cache, {"defaultImage" : _urls.defaultImage}).appendTo($el);
        toggleTab(index);
    }

    function toggleTab (type) {
        // type 1,已发布
        if (type == "1") {
            toggleType[2] = toggleType[1];
            $(".publish-tab").addClass("publish-tab-oppo");
            $(".bbtn").show();
            $(".rbtn").hide();
            $(".operations").hide();
        } else {
            toggleType[2] = toggleType[0];
            $(".publish-tab").removeClass("publish-tab-oppo");
            $(".bbtn").hide();
            $(".rbtn").show();
            $(".operations").show();
        }
    }

    $("#personalCenterMyCourseList").live("click", function (event) {
        
        if ($(event.target).hasClass("bbtn")) {
            //cancel publish
            var index = $("#personalCenterMyCourseList li.list-content-li").index($(event.target).parent().parent().parent("li"));
            var courseId = cache.data.result[index].id;
            var dePublishParam = {};
            dePublishParam.status = 2;
            dePublishParam.courseId = courseId;
            $.ajax({
                url : _urls.personCenterOnlineCourseAction  + '?' + $.param(dePublishParam),
                dataType : 'json',
                success : function (response) {
                    console.log(response);
                    if (response.code == 200) {
                        window.location.reload();
                    }
                }
            });
        } else if ($(event.target).hasClass("rbtn")) {
            //publish
            var index = $("#personalCenterMyCourseList li.list-content-li").index($(event.target).parent().parent().parent("li"));
            var courseId = cache.data.result[index].id;
            var publishParam = {};
            publishParam.status = 1;
            publishParam.courseId = courseId;
            $.ajax({
                url : _urls.personCenterOnlineCourseAction  + '?' + $.param(publishParam),
                dataType : 'json',
                success : function (response) {
                    console.log(response);
                    if (response.code == 200) {
                        window.location.reload();
                    }
                }
            });
        } else if ($(event.target).hasClass("gbtn")) {
            //new course
            // var index = $("#personalCenterMyCourseList li.list-content-li").index($(event.target).parent().parent().parent("li"));
            // var courseId = cache.data.result[index].idx;
            console.log("gbtn");
        } else if ($(event.target).hasClass("edit")) {
            //new course
            // var index = $("#personalCenterMyCourseList li.list-content-li").index($(event.target).parent().parent().parent("li"));
            // var courseId = cache.data.result[index].idx;
            console.log("edit");
        } else if ($(event.target).hasClass("delete")) {
            var confirmDelete = confirm("确认删除该课程？");
            if (confirmDelete) {
                 //delete
                var index = $("#personalCenterMyCourseList li.list-content-li").index($(event.target).parent().parent().parent().parent().parent("li"));
                var courseId = cache.data.result[index].id;
                var deleteParam = {};
                deleteParam.status = -1;
                deleteParam.courseId = courseId;
                $.ajax({
                    url : _urls.personCenterOnlineCourseAction  + '?' + $.param(deleteParam),
                    dataType : 'json',
                    success : function (response) {
                        console.log(response);
                        if (response.code == 200) {
                            window.location.reload();
                        }
                    }
                });   
            }
        } else if ($(event.target).hasClass("publish-tab")) {
            var offset = event.clientX - $(event.target).offset().left;
            if (offset > 128 && toggleType[1] != toggleType[2]) {
                window.location.href = "?status=1";
                // if (cache[1] == undefined) {
                //     ajaxSender.ajaxAlready();
                // }
                // toggleTab(toggleType[1]);
            } else if (offset < 128 && toggleType[0] != toggleType[2]) {
                window.location.href = "?status=2";
                // if (cache[0] == undefined) {
                //     ajaxSender.ajaxNotyet();
                // }
                // toggleTab(toggleType[0]);
            }
        }
    });


    return {
        render: function (userInfo){
            
            $el.addClass("loading");
            var type = urlObj.status;
            if (type == "1") {
               ajaxSender.ajaxAlready(userInfo.data.username);
               initList(1);
            } else {
               ajaxSender.ajaxNotyet(userInfo.data.username);
               initList(0);
            }
        },
        doInit: function (userInfo){
            this.render(userInfo);
        }
    }
});
