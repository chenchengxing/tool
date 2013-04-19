/**
 * @module groupTalkList
 * 
 * @name 可选课程
 * @version 1.0.0
 */



define(["urls", "tpls" ,'jquery.tmpl'], function(_urls, _tpls) {
    
    var dataUrl = _urls["groupTalkList"];
    var tpl = _tpls.groupTalkList;
    var $el = {};

    function encodestr(str){
        return encodeURIComponent(str);
    };
    var substrByByte = function(source){
        if(source.replace(/[^\x00-\xff]/g,'aa').length > 34){
            return (source+'').substr(0,34).replace(/([^\x00-\xff])/g,'$1 ').substr(0,34).replace(/([^\x00-\xff]) /g,'$1')+"...";
        }else {
            return source;
        }
    };
    return {
        render : function () {
            $el = $("#groupTalkList");
            $el.addClass("loading");
            $.ajax({
                url: dataUrl,
                type : "get",
                dataType: "json",
                data: {count:6},
                success: function(result){
                    $el.removeClass("loading");
                    if(result.code === 200){
                        $.tmpl(tpl, result,{encodestr:encodestr,substrByByte:substrByByte}).appendTo($el);
                    }else{
                        $el.html(result.message);
                    }
                }
            });
        },
        doInit : function (){
            this.render();
        }
    };
});