/**
 * @module groupTopicList
 * 
 * @name 小组-话题页 话题列表
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_url, _tpl, urlParser) {
    
    var tpl = _tpl.groupTopicList;
    var dataUrl = _url["groupTopicList"];
    var $el = $("#groupTopicList");
    var urlObj = urlParser;

    if(!urlObj.pageNo){
        urlObj.pageNo = 1;
    };
    if(!urlObj.pageSize){
        urlObj.pageSize = 10;
    };
    function encodeStr(str){
        return encodeURIComponent(str);
    };
    function formatT(str){
        return str.replace("T"," ").substr(0,16);
    };
    
    return {
        render: function (){
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl,
                type: "post",
                dataType: "json",
                data: urlObj,
                success: function (data){
                    $el.removeClass("loading");
                    if(data.code == 200){
                        $.tmpl(tpl, data.data,{encodeStr:encodeStr,formatT:formatT}).appendTo("#groupTopicList");
                    } else {
                        $el.html(data.message);
                    }
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});