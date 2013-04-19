/**
 * @module personalCenterIndexLearning
 * 
 * @name 个人中心 index页面顶部的信息
 * @version 1.0.0
 */



define(['urls', 'tpls'], function(_urls, _tpl) {
    
    var tpl = _tpl.personalCenterInfo;
    
    return {
        render: function (){
        	var dataUrl = _urls["personalCenterIndexLearning"];
            var urlObj = {};
            urlObj.type = 1;
            urlObj.pageNo = 1;
            urlObj.pageSize = 3;
            $.ajax({
                url: dataUrl + "?" + $.param(urlObj),
                dataType: "json",
                success: function(result){
                    $.tmpl(tpl, result.data, {"defaultImage" : _urls.defaultImage}).appendTo("#" + "personalCenterInfo");
                }
            });
            // $.tmpl(tpl, {}).appendTo("#personalCenterInfo");
        },
        doInit: function (){
            this.render();
        }
    }
});
