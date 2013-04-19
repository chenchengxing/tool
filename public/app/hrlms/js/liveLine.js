/**
 * @module liveLine
 * 
 * @name 首页 直播课堂模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl.liveLine;
    var dataUrl = _url["liveLine"];
    var $el = $("#liveLine");
    
    
    // 2013-02-26 13:50:00    to     02-26
    var toMon = function (str){
        return str.substring(5,10);
    }
    
    var toHour = function (str){
        return str.substring(11,16);
    }
    
    return {
        render: function (){
            $el.addClass("loading");
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    if(result.code == 200 && result.data){
                        if (result.data.result.length != 0){
                            $.tmpl(tpl, result.data, {toMon: toMon, toHour: toHour}).appendTo("#liveLine");
                        }
                    } else {
                        $el.html("暂无直播！");
                    }
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});