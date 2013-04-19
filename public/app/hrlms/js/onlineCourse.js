/**
 * @module onlineCourse
 * 
 * @name 课程中心-课程详情 在线课程
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var dataUrl  = _url["onlineCourse"];
    var tpl = _tpl.onlineCourse;
    
    var getType = function (num){
        switch (num) {
            case 1:
                return "html-icon";
                break;
            case 4:
                return "doc-icon";
                break;
            default:
                return "open-icon";
        }
    }
    
    var substrByByte = function(source){
        if(source.length > 56){
            return (source+'').substr(0,56).replace(/([^\x00-\xff])/g,'$1 ').substr(0,56).replace(/([^\x00-\xff]) /g,'$1')+"...";
        }else {
            return source;
        }
    }
    
    return {
        render: function (courseId){
            var $el = $("#onlineCourse");
            
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl(courseId),
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        if (result.data.length != 0) {
                            $("#onlineCourse").empty();
                            
                            result.courseId = courseId;
                            $.tmpl(tpl, result, {"getType": getType, "substr": substrByByte}).appendTo("#onlineCourse");
                            
                            $el.find(".t-line").hover(function (){
                                $(this).addClass("hover");
                            }, function (){
                                $(this).removeClass("hover");
                            });
                        } else {
                            $el.html('暂无在线课程！');
                        }
                    }else{
                        $el.html(result.message);
                    }
                }
            });
        },
        doInit: function (courseId){
            this.render(courseId);
        }
    }
});