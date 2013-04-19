/**
 * @module personalCenter
 * 
 * @name 可选课
 * @version 1.0.0
 */



define(['liveTimeLine', 'pagination', 'urlParser'], function(ltl, page, urlParser) {
     // var urlObj = $.extend({}, urlParser);
    // var tpl = _tpl.liveTimeLine;
    // var testUrl = "datas/courseInfoForPersonalCenter.json";
    var dataItem = null;
    return {
        render: function (){
            // var dataUrl = _urls["liveTimeLine"](id);
            // $.ajax({
            //     url : dataUrl,
            //     dataType : 'json',
            //     success : function (response) {
            //         $.tmpl(tpl, response).appendTo("#personalCenterSelectableList");
            //         urlObj.totalPages = response.data.totalPages;
            //         page.doInit(urlObj);
            //     }
            // });
            
        },
        doInit: function (user){
            ltl.doInit(user, "personalCenterSelectableList");
        }
    }
});
