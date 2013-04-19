/**
 * @module recentStudent
 * 
 * @name 课程详情 最近加入的学员模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'userPopup', 'jquery.tmpl'], function(_urls, _tpl, userPopup) {
    
    var tpl = _tpl.recentStudent;
    var dataUrl = _urls["recentStudent"];
    
    return {
        render: function (id){
            var $el = $("#recentStudent");
            userPopup.doInit("#recentStudent");
            $.ajax({
                url: dataUrl(id),
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        if (result.data && result.data.result) {
                            //cut the result to 6,要求只显示6个学员
                            result.data.result.splice(6);
                            //if (result.data.result.length != 0){
                            $.tmpl(tpl, result.data, {"defaultImage" : _urls.defaultImage}).appendTo("#recentStudent");
                            //}
                        }
                    } else {
                        $el.html(result.message);
                    }
                },
                error: function (msg){
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        },
        doInit: function (id){
            this.render(id);
        }
    };
});