/**
 * @module myApply
 * 
 * @name 直播课堂 我的开课申请
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-2-27
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var dataUrl = _url["myApply"];
    var tpl = _tpl.myApply;
    var $el = $("#myApply");
    
    return {
        render: function (userId){
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl(userId),
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    if(result.code == 200 && result.data){
                        if (result.data.result.length != 0){
                            $.tmpl(tpl, result.data).appendTo("#myApply");
                        }
                    }
                }
            });
        },
        doInit: function (userId){
            this.render(userId);
        }
    }
});