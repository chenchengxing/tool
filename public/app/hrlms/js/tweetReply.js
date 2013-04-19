/**
 * @module tweetReply
 * 
 * @name 消息回复
 * @version 1.0.0
 */



define(["urls", 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var dataUrl = _url["publisher"];
    var dataUrlReplyList = _url['repliesList'];
    var tpl = _tpl.tweetReply;

    function formatStr(originstr){
        return originstr.replace(/&lt;\/a&gt;/g, "</a>").replace(/&lt;a/g, "<a").replace(/&gt;#/g, ">#").replace(/&gt;@/g, ">@");
    };
    function hasAvatarImg(str){
        var imgUrl = "http://family.baidu.com:8083/images/userimages/"+str+".jpg";
        var img = new Image();
        
        img.src = imgUrl;
        if(img.complete){
            return imgUrl;
        } else {
            return "images/48x48-p.png";
        }
    };

    return {
        initReplyFun: function(ele,noticeId,groupId){
            var _that = this;
            ele.find(".tweet-reply-submit").click(function(){
                var _tweet = $(this).closest(".tweet"),
                    content = $.trim(_tweet.find(".publisher-reply").val()),
                    testcontent = $.trim(_tweet.find(".publisher-reply").val()).replace("回复@"+_tweet.find(".t-hd h5:eq(0)").text()+":","");
                    testcontent = $.trim(testcontent.replace(/#[^#]+#/g,""));
                if(!!content && testcontent.length > 0){
                    var _datas = {
                        content : content,
                        replyId : _tweet.attr("data-noticeId"),
                        groupId : _tweet.attr("data-groupId")
                    };
                    $.ajax({
                        url: _url["publisher"],
                        dataType: "json",
                        type: "post",
                        data: _datas,
                        success: function(result){
                            _that.refresh(ele, noticeId, groupId);
                        }
                    });
                };
                return false;
            });
        },
        refresh: function(ele, noticeId, groupId){
            var _that = this;
            $.ajax({
                url: dataUrlReplyList,
                type: "post",
                dataType: "json",
                data: {noticeId:noticeId,pageNo:1,pageSize:10},
                success: function (data){
                    if(data.code == 200){
                        ele.find("#tweetReply").remove();
                        data.data.name = ele.find(".t-hd h5").text();
                        ele.find(".t-ft a").text("评论("+data.data.totalCount+")");
                        $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage}).appendTo(ele);
                        ele.find("#tweetReply").show();
                        _that.initReplyFun(ele, noticeId, groupId);
                    } else {
                        alert(data.message);
                    }
                }
            });
        },
        render: function (ele, noticeId, groupId){
            if(ele.find("#tweetReply").length === 0){
                var _that = this;
                ele.append('<div class="loading"></div>');
                $.ajax({
                    url: dataUrlReplyList,
                    type: "post",
                    dataType: "json",
                    data: {noticeId:noticeId,pageNo:1,pageSize:10},
                    success: function (data){
                        if(data.code == 200){
                            ele.find(".loading").remove();
                            data.data.name = ele.find(".t-hd h5").text();
                            ele.find(".t-ft a").text("评论("+data.data.totalCount+")");
                            $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage}).appendTo(ele);
                            ele.find("#tweetReply").slideDown("fast");
                            _that.initReplyFun(ele, noticeId, groupId);
                        } else {
                            alert(data.message);
                        }
                    }
                });
            }else{
               ele.find("#tweetReply").remove(); 
            }
        },
        doInit: function (ele, noticeId, groupId){
            this.render(ele, noticeId, groupId);
        }
    };
});