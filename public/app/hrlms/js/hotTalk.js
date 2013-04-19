/**
 * @module hotTalk
 * 
 * @name 小组 热门话题
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl.hotTalk;
    var dataUrl = _url["hotTalk"];
    var $el = $("#hotTalk");
    
    function encodeStr(str){
        return encodeURIComponent(str);
    };
    return {
        render: function (topcount, groupid){
            $el.addClass("loading");
            var limitcount = topcount || 5;
            !!groupid ? (dataUrl+=groupid+'/'+limitcount):(dataUrl+=limitcount);
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (data){
                    $el.removeClass("loading");
                    if(data.code == 200){
                        $.tmpl(tpl, data, {encodeStr:encodeStr}).appendTo("#hotTalk");
                    } else {
                        $el.html(data.message);
                    }
                }
            });
        },
        doInit: function (topcount, groupid){
            this.render(topcount, groupid);
        }
    };
});