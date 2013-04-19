/**
 * @module createLiveTab
 * 
 * @name 直播课堂-创建直播课堂-tab切换
 * @version 1.0.0
 */



define(['tpls', 'jquery.tmpl'], function(_tpl) {
    
    var createLiveDetail = $(".createLiveDetail");
    
    return {
        render: function (){
            createLiveDetail.eq(0).css("display","block");
            $(".createLiveTabs").find("a").click(function() {
                var _this = $(this);
                _this.siblings().removeClass("cur").end().addClass("cur");
                if ("在线课堂" == $.trim(_this.text())) {
                    createLiveDetail.eq(0).css("display","block").end().eq(1).css("display","none");
                } else if ("现场直播" == $.trim(_this.text())) {
                    createLiveDetail.eq(0).css("display","none").end().eq(1).css("display","block");
                }
            });
        },
        doInit: function (){
            this.render();
        }
    }
});