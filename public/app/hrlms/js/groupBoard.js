/**
 * @module groupBoard
 * 
 * @name 小组-详情页 小组介绍模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_urls, _tpl, _urlParser) {

    var substrByByte = function(source){
        if(source.length > 150){
            return (source+'').substr(0,150).replace(/([^\x00-\xff])/g,'$1 ').substr(0,150).replace(/([^\x00-\xff]) /g,'$1')+"...";
        }else {
            return source;
        }
    }
    var ifOverflow = function (str) {
        if (str.length > 150)
            return true;
        return false;
    }

    var tpl = _tpl.groupBoard;
    var dataUrl = _urls["groupBoard"];
    var cache = {};
    
    $("#groupBoard .view-more-description").live("click", function (e) {
        $(e.target).parent().html(cache.data.desc + '<a href="#" class="view-less-description">收起&lt;&lt;</a>').css("background", "#F6F6F6");
        return false;
    });

    $("#groupBoard .view-less-description").live("click", function (e) {
        $(e.target).parent().html(substrByByte(cache.data.desc) + '<a href="#" class="view-more-description">查看更多&gt;&gt;</a>').css("background", "none");
        return false;
    });

    $("#groupBoard .group-course-count").live("click", function () {
        if (parseInt($("#groupBoard .group-course-count").html()) != 0) {
            window.location.href = "groupCourse.html?groupId=" + _urlParser.groupId;
        }
    });

    $("#groupBoard .group-member-count").live("click", function () {
        window.location.href = "groupMember.html?groupId=" + _urlParser.groupId;
    });

    //join group btn click
    $("#groupBoard .group-join").live("click", function () {
        $.ajax({
            type : "post",
            url : _urls.groupJoin(),
            dataType : "json",
            data : {"groupId" : _urlParser.groupId},
            success : function (response) {
                if (response.code == 200) {
                    $("#groupBoard .group-join").replaceWith('<span class="gbtn bmin group-quit">退出小组</span>');
                }
            }
        });
    });

    //quit group btn click
    $("#groupBoard .group-quit").live("click", function () {
        $.ajax({
            type : "post",
            url : _urls.groupMemberQuit,
            dataType : "json",
            data : {"groupId" : _urlParser.groupId},
            success : function (response) {
                if (response.code == 200) {
                    $("#groupBoard .group-quit").replaceWith('<span class="gbtn bmin group-join">加入小组</span>');
                }
            }
        });
    });

    var ajaxRelation = function (anotherId) {
        $.ajax({
            type : "post",
            url : _urls.subscribeRelation(),
            dataType : "json",
            data : {"another" : anotherId},
            success : function (response) {
                // render 是否关注组长
                if (response.code == 200) {
                    if (response.data == "FOLLOW" || response.data == "MUTUAL") {
                        $("#groupBoard .snsbtn").html("取消关注").show();
                    } else {
                        $("#groupBoard .snsbtn").html("关注").show();
                    }
                }
                $("#groupBoard .snsbtn").click(function () {
                    if ($(this).html() == "关注") {
                        $.ajax({
                            type : "post",
                            url : _urls.subscribeFollow(),
                            dataType : "json",
                            data : {"followee" : anotherId},
                            success : function (response) {
                                if (response.code == 200) {
                                    $("#groupBoard .snsbtn").html("取消关注");
                                }
                            }
                        });
                    } else {
                        $.ajax({
                            type : "post",
                            url : _urls.subscribeUnfollow(),
                            dataType : "json",
                            data : {"followee" : anotherId},
                            success : function (response) {
                                // body...
                                if (response.code == 200) {
                                    $("#groupBoard .snsbtn").html("关注");
                                }
                            }
                        });
                    }
                });
            }
        });
    };
    var ajaxGroupCourse = function (groupId) {
        $.ajax({
            url : _urls.coursegroupCount(),
            dataType : "json",
            data : {"groupId" : groupId},
            success : function (response) {
                if (response.code == 200) {
                    $("#groupBoard .group-course-count").html(response.data);
                }
            },
            error : function (msg) {
                //console.log(msg);
            }
        });
    };

    return {
        render: function (id, user, flag, cbfn){
            var $el = $("#groupBoard");
            var userId = user.data.userId;
            var username = user.data.username;
            $el.addClass("loading");
            
            
            $.ajax({
                url: dataUrl(id),
                dataType : "json",
                data : {"groupId" : id},
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        cache = result;
                        result.data.flag = flag;
                        result.data.userId = userId;
                        result.data.username = username;
                        $.tmpl(tpl, result.data, {"substr" : substrByByte,"ifOverflow" : ifOverflow,"defaultImage" : _urls.defaultImage}).appendTo("#groupBoard");
                        
                        

                        // ajaxIsMember(userId, id);
                        //if not creator visit this page,get the relation between them
                        if (!(result.data.creator == userId)) {
                            ajaxRelation(result.data.creator);
                        }
                        
                        ajaxGroupCourse(id);
                        if(cbfn){
                            cbfn(result.data.creator);
                        }
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
        doInit: function (id, user, flag, cbfn){
            this.render(id, user, flag, cbfn);
        }
    };
});