/**
 * @module personalCenter
 * 
 * @name 个人中心 正在学习的课程
 * @version 1.0.0
 */



define(['tpls', 'urlParser', 'pagination', 'urls', 'personalCenterLearningLearningInfo'], 
    function(_tpl, _urlParser, _page, _urls, personalCenterLearningLearningInfo) {
    var urlObj = $.extend({}, _urlParser);
    var tpl = _tpl.personalCenterLearningCourseList;
    // var testUrl = "datas/courseList.json";
    var dataItem = null;
    var cache = {};
    // $(".gbtn").live("click", function () {
    //     dataItem = $.tmplItem(this);
    //     console.log(dataItem.data);
    //     return false;
    // });

    $(".personal-center-course-list-close").live("click", function  () {
        
        //get index of current click li
        var index = $("#personalCenterLearningCourseList li").index($(this).parent().parent().parent().parent());
        var courseId = cache.data.result[index].id;
        //sender ajax delete this course
        console.log(courseId);
    });

    return {
        render: function (){
            urlObj.type = 1;
            $.ajax({
                url : _urls.personalCenterLearning + '?' + $.param(urlObj),
                dataType : 'json',
                success : function (response) {
                    cache = response;
                    $.tmpl(tpl, response.data.page.result, {"defaultImage" : _urls.defaultImage}).wrap("<ul />").appendTo("#personalCenterLearningCourseList");
                    personalCenterLearningLearningInfo.doInit(response.data);
                    urlObj.totalPages = response.data.page.totalPages;
                    _page.doInit(urlObj);
                }
            });
            
        },
        doInit: function (){
            this.render();
        }
    }
});
