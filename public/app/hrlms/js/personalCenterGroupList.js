/**
 * @module group
 * 
 * @name 小组
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_urls, _tpl, urlParser) {

    // var dataUrl  = _url["courseDetail"];
    var tpl = _tpl.personalCenterGroupList;
    var indexMap = ["joined", "managed"];
    var cache = {};
    var urlObj = urlParser;
    var userId = "";
    var tabType = "";
    if (!urlObj || !urlObj.type) {
        tabType = indexMap[0];
    } else {
        tabType = urlObj.type;
    }
    
    $("#personalCenterGroupList li").live("mouseover", function () {
        if (tabType == indexMap[0]) {
           $(this).find(".hover-quit").show();  
        }
    }).live("mouseout", function () {
        $(this).find(".hover-quit").hide();
    });

    //quit from this group
    $(".cross-quit").live("click", function (e) {
        var thisLi = $(this).parent().parent();
        var index = $("#personalCenterGroupList li").index(thisLi);
        $.ajax({
            type : "post",
            url : _urls.personalCenterGroup("quit"),
            data : {"groupId" : cache.data[index].id,
                    "userId" : userId},
            success : function (response) {
                 if (response.code == 200) {
                    thisLi.remove();
                }
            },
            error : function (msg) {
                // console.log(msg)
            }
        });
    });

    return {
        render: function (cbfn, user){
            userId = user.data.userId;
            $.ajax({
                type : "get",
                url : _urls.personalCenterGroup(tabType),
                dataType : "json",
                data : {"userId" : userId},
                success: function (response) {
                    cache = response;
                    $.tmpl(tpl, response, {"defaultImage" : _urls.defaultImage}).appendTo("#personalCenterGroupList");
                   
                },
                error: function (msg){
                    $("#personalCenterGroupList").append(msg);
                }
            });
        },
        doInit: function (cbfn, user){
            this.render(cbfn, user);
        }
    }
});