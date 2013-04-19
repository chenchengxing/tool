/**
 * @module group
 * 
 * @name 小组
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'pagination', 'jquery.tmpl'], function(_urls, _tpl, urlParser, _page) {
    var tpl = _tpl.personalCenterFriendList;
    var indexMap = ["idols", "fans", "mutual"];

    var urlObj = urlParser || {};

    var tabType = "";
    if (!urlObj || !urlObj.type) {
        tabType = indexMap[0];
    } else {
        tabType = urlObj.type;
    }
    
    var cache = {};
    var userId = "";
    //取消关注
    $(".actionCancel").live("click", function (e) {
        e.preventDefault();
        var thisLi = $(e.target).parent().parent().parent();
        var index = $("#personalCenterFriendList li").index(thisLi);
        $.ajax({
            type : "post",
            url : _urls.personalCenterFriend("disFollow"),
            data : {"followee" : cache.data.result[index].id},
            success : function (response) {
                if (response.code == 200) {
                    thisLi.remove();
                    $("#personalCenterFriendTab .idolsCount").html("(" + (parseInt($("#personalCenterFriendTab .idolsCount").html().substr(1)) - 1) + ")");
                }
            },
            error : function (msg) {
                // console.log(msg)
            }
        });
    });

    //添加关注
    $(".actionAdd").live("click", function (e) {
        e.preventDefault();
        var _this = $(this);
        var thisLi = $(e.target).parent().parent().parent();
        var index = $("#personalCenterFriendList li").index(thisLi);
        $.ajax({
            type : "post",
            url : _urls.personalCenterFriend("follow"),
            data : {"followee" : cache.data.result[index].id},
            success : function (response) {
                if (response.code == 200) {
                    // thisLi.remove();
                    _this.replaceWith('<span class="alreadyMutual">已相互关注</span>');
                    $("#personalCenterFriendTab .idolsCount").html("(" + (parseInt($("#personalCenterFriendTab .idolsCount").html().substr(1)) + 1) + ")");
                }
            },
            error : function (msg) {
                console.log(msg)
            }
        });
    });

    return {
        render: function (cbfn){
           
            $.ajax({
                type : "post",
                url: _urls.personalCenterFriend(tabType) + '?' + $.param(urlObj),
                dataType: "json",
                success: function(response){
                    if (response.code == 200) {
                        
                        //deal with mutual
                        if (tabType == "mutual") {
                            var tempResult = response.data
                            response.data = {};
                            response.data.result = tempResult;
                            response.data.template = tabType;
                            response.data.totalPages = 1;
                        } else {
                            response.data.template = tabType;
                        }
                        cache = response;
                        $.tmpl(tpl, response.data, {"defaultImage" : _urls.defaultImage}).appendTo("#personalCenterFriendList");
                        urlObj.totalPages = response.data.totalPages;
                        _page.doInit(urlObj);
                    }
                },
                error: function (msg){
                    // console.log(msg);
                }
            });
        },
        doInit: function (cbfn, user){
            userId = user.data.username;
            this.render(cbfn);
        }
    }
});