/**
 * @module liveCourseInfo
 * 
 * @name 直播课程详情页 课程介绍
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-2-27
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_url, _tpl, params) {
    
    var tpl = _tpl.liveCourseInfo;
    var $el = $("#liveCourseInfo");
    var courseId = params["courseId"];
    var dataUrl = _url["liveCourseInfo"](courseId);
    var deleteLive = _url["deleteLive"];
    
    var decode = function (str){
        return decodeURIComponent(str);
    }
    
    return {
        render: function (userId){
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200 && result.data){
                        result.data.curUser = userId;
                        $.tmpl(tpl, result.data, {"decode": decode}).appendTo("#liveCourseInfo");
                    }
                }
            });
            
            $el.on("click", ".delete", function (){
                if (confirm("确定删除？")){
                    $.ajax({
                        url: deleteLive,
                        type: "delete",
                        data: {"id": courseId},
                        success: function (msg){
                            if (msg.code = 200){
                                $el.html("删除成功，<a href='live.html'>点击返回直播课堂</a>")
                            }else{
                                alert("msg.message");
                            }
                        }
                    });
                }
            });
        },
        doInit: function (userId){
            this.render(userId);
        }
    }
});