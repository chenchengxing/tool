/**
 * @module commentList
 * 
 * @name 评论列表模块
 * @version 1.0.0
 */



define(['pagination', 'tpls'], function(_pagination, _tpl) {
    
    var tpl = _tpl.commentList;
    var tplReply = _tpl.commentListReply;
    var dataUrl = "datas/comment.json";
    var cache = {};
    return {
        render: function (userId, type){
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (response){
                    var result = response;
                    // result.flag = "reply";
                    // result.username = response.result[0].user.realName;
                    $.tmpl(tpl, result).prependTo("#commentList");

                    $("#pagination").show();
                    _pagination.doInit(result.pageNo, result.totalPages);

                    $(".reply-form-text").live("focus", function () {
                        if ($(this).val() == "请输入评论内容") {
                            $(this).val("");
                        }
                    }).live("blur", function () {
                        if ($(this).val() == "") {
                            $(this).val("请输入评论内容");
                        }
                    });

                    $(".reply-btn").click(function () {
                        if ($(this).find(".reply-count").html() != '0') {

                            if ($(this).data("clicked")){
                                $(this).parent().siblings(".reply-box").toggle();
                                var dataItem = $.tmplItem($(this).parent().siblings(".reply-box"));
                                console.log(dataItem);
                            } else {
                                $(this).data("clicked", true);
                                var replyUrl = "datas/commentSub.json";
                                var _this = this;
                                 $.ajax({
                                    url: replyUrl,
                                    dataType: "json",
                                    data : {},
                                    success: function (response){
                                        var result = response;
                                        // result.flag = "reply";
                                        $.tmpl(tplReply, result).appendTo($(_this).parent().parent(".reply"));

                                        $(".reply-submit").click(function () {
                                            console.log($(this).siblings(".reply-form-text").val());
                                            console.log(userId);
                                            return false;
                                        });
                                    }
                                });

                            }

                        }
                        
                    });
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
            
        },
        doInit: function (userId, type){
            // 
            this.render(userId, type);
        }
    }
});
