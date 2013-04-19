/**
 * @module personalCenterLearnedCourseList
 * 
 * @name 已完成的课程 个人中心 
 * @version 1.0.0
 */



define(['tpls', 'urlParser', 'pagination', 'urls'], function(_tpl, _urlParser, _page, _urls) {
    var urlObj = $.extend({}, _urlParser);

    var cache = {};
    var tpl = _tpl.personalCenterLearnedCourseList,
        // testUrl = "datas/courseList.json",
        dataItem = null;
        $courseList = $("#personalCenterLearnedCourseList");


      $courseList.find(".delete").live("click", function  () {
        
        //get index of current click li
        var index = $("#personalCenterLearnedCourseList li").index($(this).parent());
        var courseId = cache.data.result[index].id;
        //sender ajax delete this course
        console.log(courseId);
    });
    return {
        render: function (){
            urlObj.type = 2;
            $.ajax({
                url : _urls.personalCenterLearnedCourseList  + '?' + $.param(urlObj),
                dataType : 'json',
                success : function (response) {
                    cache = response;
                    $.tmpl(tpl, response, {"defaultImage" : _urls.defaultImage}).appendTo($courseList);
                    urlObj.totalPages = response.data.totalPages;
                    _page.doInit(urlObj);

                }
            });
            
        },
        doInit: function (){
            this.render();
        }
    }
});
