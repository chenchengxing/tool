/**
 * @module tweetList
 * 
 * @name 消息列表
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'pagination', 'tweetReply', 'userPopup', 'jquery.tmpl'], function(_url, _tpl, urlParser, page, tr, userPopup) {
    
    var tpl = _tpl.tweetList;
    var dataUrl = _url["tweetList"];
    var urlObj = $.extend({}, urlParser);
    var $el = {},_groupId = 0, _viewType = 0, _eleId = "",_cbfn = null;

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

    if(!urlObj.pageNo){
        urlObj.pageNo = 1;
    };
    if(!urlObj.pageSize){
        urlObj.pageSize = 10;
    };
    if(!!urlObj.tag){
        urlObj.tag = decodeURIComponent(urlObj.tag);
    };

    return {
        refresh: function(strParameters){
            urlObj.pageNo = 1;
            $.ajax({
                url: _url[_eleId],
                type: "post",
                dataType: "json",
                data: !!strParameters?strParameters:urlObj,
                success: function (data){
                    if(data.code == 200){
                        $("#tweetList").empty();

                        if(_viewType === 0){
                            $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage}).appendTo($el);

                            page.doInit($.extend(urlObj,{pageNo:data.data.pageNo,pageSize:data.data.pageSize,totalPages:data.data.totalPages}));
                        }else{
                            var _tDom = $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage});
                            _tDom.find(".tweet-reply").remove();
                            _tDom.appendTo($el);
                        };
                        if(typeof _cbfn === "function"){
                            _cbfn(data);
                        };
                    } else {
                        $el.html(data.message);
                    }
                }
            }); 
        },
        render: function (groupId, eleId, viewType, cbfn){
            var _that = this;
            _groupId = groupId;
            _eleId = eleId;
            _cbfn = cbfn;
            var _that = this;
            if(!!viewType){
                _viewType = viewType;
            };
            $el = $("#tweetList");
            userPopup.doInit("#tweetList");
            if(_viewType === 0){
                $el.on("click", ".tweet-reply", function(){
                    var _tweet = $(this).closest(".tweet");
                    tr.doInit(_tweet, _tweet.attr("data-noticeId"), _tweet.attr("data-groupId"));
                    return false;
                });
            };
            $el.prepend('<div class="loading" style="height:5px;padding:15px 20px;"></div>');
            urlObj.groupId = _groupId;
            $.ajax({
                url: _url[_eleId],
                type: "post",
                dataType: "json",
                data: urlObj,
                success: function (data){
                    if(data.code == 200){
                        $("#tweetList").empty();
                        if(_viewType === 0){
                            $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage}).appendTo($el);

                            page.doInit($.extend({totalPages:data.data.totalPages}, urlObj),function(){
                                $("#pagination").on("click" ,"a" , function(e){
                                    _that.refresh($(this).attr("href").replace(/^\?/g,""));
                                    e.preventDefault();
                                });
                            });
                        }else{
                            var _tDom = $.tmpl(tpl, data.data, {formatS:formatStr,defaultImage:_url.defaultImage});
                            _tDom.find(".tweet-reply").remove();
                            _tDom.appendTo($el);
                        };
                        if(typeof _cbfn === "function"){
                            _cbfn(data);
                        };
                    } else {
                        $el.html(data.message);
                    }
                }
            });
        },
        doInit: function (groupId, eleId, viewType, cbfn){
            this.render(groupId, eleId, viewType, cbfn);
        }
    };
});