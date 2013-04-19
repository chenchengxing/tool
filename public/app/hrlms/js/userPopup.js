/**
 * @module userPopup
 * 
 * @name 用户浮层效果
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-2-27
 */



define(["urls", "tpls"], function(_url, _tpl) {
    var tpl = _tpl["userPopup"];
    var userDateUrl = _url["profileBoard"];
    var relationUrl = _url["subscribeRelation"]();
    var unfollowUrl = _url["subscribeUnfollow"]();
    var followUrl = _url["subscribeFollow"]();
    var cache = [];
    var timer = null;
    
    return {
        render: function (el){
            
            $(el).on("mouseenter", "a[data-id],div[data-id],img[data-id],h5[data-id],span[data-id]", function (){
                var $this = $(this);
                var userId = $this.attr("data-id");
                var wpTpl = '<div id="userPopup" class="user-popup"></div>';
                
                if(!userId){
                    return;
                }
                
                if($(this).next("#userPopup").length == 0){
                    
                    $("body").append(wpTpl);
                    
                    var $pop = $("body").find("#userPopup");
                    
                    $pop.off("mouseleave");
                    $pop.mouseleave(function (){
                        $pop.remove();
                    });
                    
                    $pop.off("mouseenter");
                    $pop.mouseenter(function (){
                        if(timer){
                            clearTimeout(timer);
                        }
                    });
                    
                    $this.off("mouseleave");
                    $this.mouseleave(function (){
                        timer = setTimeout(function (){
                            $pop.remove();
                        }, 500);
                    });
                    
                    var setPos = function (){
                        $pop.css({
                            "top": $this.offset().top + $this.height() - 10,
                            "left": $this.offset().left - 150 + $this.width()/2
                        }).show();
                    }
                    
                    $pop.on("click", "a", function (e){
                        var $this = $(this);
                        
                        if($this.attr("id") != "closeUserPopup"){
                            //这些关注和取消关注操作
                            if($.trim($this.text()) == "关注"){
                                e.preventDefault();
                                $.ajax({
                                    url: followUrl,
                                    type: "post",
                                    data: {"followee": userId},
                                    success: function (msg){
                                        if(msg.code == 200){
                                            $this.removeClass("bmplus");
                                            $this.text("取消关注");
                                            alert("关注成功！")
                                        }else {
                                            $this.text(msg.message);
                                        }
                                    }
                                });
                            }
                            if($.trim($this.text()) == "取消关注"){
                                e.preventDefault();
                                $.ajax({
                                    url: unfollowUrl,
                                    type: "post",
                                    data: {"followee": userId},
                                    success: function (msg){
                                        if(msg.code == 200){
                                            $this.addClass("bmplus");
                                            $this.text("关注");
                                            alert("取消关注成功！")
                                        }else {
                                            $this.text(msg.message);
                                        }
                                    }
                                });
                            }
                        } else {
                            e.preventDefault();
                            $pop.remove()
                        }
                        
                    });
                    
                    //if(cache["_"+userId] != undefined){
                    //    $pop.empty();
                    //    $.tmpl(tpl, cache["_"+userId]).appendTo("#userPopup");
                        
                    //    setPos();
                    //} else {
                        
                        // 获取用户关系状态
                        $.ajax({
                            url: relationUrl,
                            type: "post",
                            data: {"another": userId},
                            success: function (response){
                                // 获取用户信息
                                $.ajax({
                                    url: userDateUrl(userId),
                                    dataType: "json",
                                    success: function (msg){
                                        if(msg.code == 200){
                                            msg.data.followStatus = response.data;
                                            
                                            cache["_"+userId] = msg.data;
                                            
                                            $pop.empty();
                                            $.tmpl(tpl, msg.data).appendTo("#userPopup");
                                            
                                            setPos();
                                        }
                                    }
                                });
                            }
                        });
                        
                    //}
                }else{
                    $("body").find("#userPopup").remove();
                }
                
            });
        },
        doInit: function (el){
            this.render(el);
        }
    };
});