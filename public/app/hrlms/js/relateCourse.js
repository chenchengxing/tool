/**
 * @module relateCourse
 * 
 * @name 课程详情 推荐课程
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_urls, _tpl) {
    
    var tpl = _tpl.relateCourse;
    var dataUrl = _urls["relateCourse"];
    
    return {
        render: function (id){
            var $el = $("#relateCourse");
            
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl(id),
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200 && result.data){
                        //if (result.data.result.length != 0){
                            $.tmpl(tpl, result.data, {"defaultImage" : _urls.defaultImage}).appendTo("#relateCourse");
                        //}
                    } else {
                        $el.html("暂无数据！");
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