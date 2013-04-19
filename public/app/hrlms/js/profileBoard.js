/**
 * @module profileBoard
 * 
 * @name 用户详情
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_urls, _tpl) {

    var tpl = _tpl.profileBoard;
    var dataUrl = _urls.profileBoard
    
    var hasAvatarImg = function (str){
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
        render: function (userId){
    
            $.ajax({
                url: dataUrl(userId),
                dataType: "json",
                type:"GET",
                success: function (result){
                    $.tmpl(tpl, result.data, {hasImg: hasAvatarImg}).appendTo("#profileBoard");
                    
                    var attation = $(".profileAttention");
                    var id = attation.attr("tid");
                    
                    $.post(_urls.subscribeRelation(), {another:id}, function(result) {
                        if (200 == result.code) {
                            switch(result.data){
                                case 'FOLLOW':
                                case 'MUTUAL':
                                    attation.attr("attation",'y');
                                    attation.text("取消关注");
                                    break;
                                default:
                                    attation.attr("attation",'n');
                                    attation.text("关注");
                            }
                        }
                    }, 'json');
                    
                    $(".profileAttention").click(function() {
                        var _this = $(this);
                        
                        var status = _this.attr("attation");
                        $.post((status =='n')?_urls.subscribeFollow():_urls.subscribeUnfollow(), {followee:id}, function(result) {
                            if (200 == result.code) {
                                if (status == 'n') {
                                    _this.text("取消关注");
                                    _this.attr("attation",'y');
                                } else {
                                    _this.text("关注");
                                    _this.attr("attation",'n');
                                }
                                alert("操作成功");
                            } else {
                                alert(result.message);
                            }
                        }, 'json');
                    });
                }
            });
        },
        doInit: function (userId){
            this.render(userId);
        }
    };
});