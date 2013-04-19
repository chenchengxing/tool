/**
 * @module groupTopicHeader
 * 
 * @name 话题详情
 * @version 1.0.0
 */



define(["urls", "tpls" ,'jquery.tmpl'], function(_urls, _tpls) {
    
    var dataUrl = _urls["groupTopicHeader"];
    var tpl = _tpls.groupTopicHeader;
    var $el = {};

    return {
        render : function (groupId, tag) {
            var $el = $("#groupTopicHeader");
            $.ajax({
                type : "get",
                url: dataUrl,
                dataType: "json",
                data: {groupId:groupId,tag:tag},
                success: function(result){
                    if(result.code === 200){
                        $.tmpl(tpl, result.data).appendTo($el);
                    }else{
                        $el.html(result.message);
                    }
                }
            });
        },
        doInit : function (groupId, tag){
            this.render(groupId, tag);
        }
    };
});