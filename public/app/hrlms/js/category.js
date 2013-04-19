/**
 * @module category
 * 
 * @name 课程中心  分类导航/课程体系 模块
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-3-1
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_url, _tpl, params) {
    
    var dataUrl = _url["category"];
    var tpl = _tpl.category;
    var $el = $("#category");
    var urlObj = params;
    
    return {
        render: function (){
            /*  desc: course
                sourceId:分类导航为1,课程体系为2
                level: 需要展示的节点树的层级,根节点不计入计算;
            */
            if(urlObj != undefined){
                if(urlObj.sourceId != undefined){
                    sourceId = urlObj.sourceId;
                }else{
                    sourceId = 1;
                }
            }else{
                sourceId = 1;
            }
            
            dataUrl = _url["category"](sourceId);
        
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function(result){
                    if(result.code == 200){
                        result.sourceId = sourceId;
                        if(urlObj != undefined && urlObj.nodeId != undefined){
                            result.data.curId = urlObj.nodeId;
                        } else {
                            result.data.curId = -1;
                        }
                        
                        $.tmpl(tpl, result.data).appendTo("#category");
                    }
                },
                error: function (){
                    
                }
            });
        },
        doInit: function (){
            this.render();
        }
    }
});