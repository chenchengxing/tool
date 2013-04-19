/**
 * @module group
 * 
 * @name tab签
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(urls, _tpl, urlParser) {
    // var dataUrl  = _url["courseDetail"];
    var tpl = _tpl.tabUlRed;
    var indexMap = ["idols", "fans", "mutual"];

    var urlObj = urlParser;

    var tabType = "";
    if (!urlObj || !urlObj.type) {
        tabType = indexMap[0];
    } else {
        tabType = urlObj.type;
    }
    
    return {
        render: function (eleId){
            $.ajax({
                url: urls.personalCenterFriendTab,
                dataType: "json",
                success: function(result){
                    var tabIndex = $.inArray(tabType, indexMap);
                    result.data.result[tabIndex].current = true;
                    
                    $.tmpl(tpl, result.data).appendTo("#" + eleId);
                    $.each(indexMap, function (i, v) {
                        var _value = v;
                        $.ajax({
                            url: urls.personalCenterFriendCount(_value),
                            dataType: "json",
                            success: function(response){
                                if (response.code == 200) {
                                   $("#" + eleId + " ." + _value + "Count").html("(" + response.data + ")"); 
                                }
                            }
                        });
                    });
                },
                error: function (){
                    
                }
            });

            $("#" + eleId).live("click", function (e) {
                if ($(e.target).is("li")) {
                    var liIndex = $("#" + eleId + " li").index($(e.target));
                    window.location.href = "?type=" + indexMap[liIndex];
                }
            });
        },
        doInit: function (eleId){
            this.render(eleId);
        }
    }
});