/**
 * @module courseOwner
 * 
 * @name 课程详情页  课程来源
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-2-27
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl["courseOwner"];
    var dataUrl = _url["courseOwner"];
    var $el = $("#courseOwner");
    
    return {
        render: function (data){
            $el.addClass("loading");
            
            if(data.source != 0){
                $.tmpl(tpl, data).appendTo("#courseOwner")
                
                $el.removeClass("loading");
            }else{
            
                $.ajax({
                    url: dataUrl(data.creatorId),
                    dataType: "json",
                    success: function (result){
                        $el.removeClass("loading");
                        
                        if(result.code == 200 && result.data){
                            result.data.source = 0;
                            
                            $.tmpl(tpl, result.data).appendTo("#courseOwner");
                        } else {
                            $el.html("暂无来源信息！");
                        }
                    }
                });
            }
        },
        doInit: function (data){
            this.render(data);
        }
    }
});