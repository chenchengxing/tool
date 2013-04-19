/**
 * @module tags
 * 
 * @name 标签模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl.tags;
    var dataUrl = _url["tags"];
    
    
    return {
        render: function (flag){
            var $el = $("#tags");
            var type = 0;
            
            $el.addClass("loading");
            
            if(flag) {
                type = 1;
                dataUrl = dataUrl(40);
            } else {
                dataUrl = dataUrl(10);
            }
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        var tempResult = result.data;
                        result.data = {};
                        result.data.flag = type;
                        result.data.result = tempResult;
                        $.tmpl(tpl, result.data).appendTo("#tags");
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
        doInit: function (flag){
            this.render(flag);
        }
    };
});