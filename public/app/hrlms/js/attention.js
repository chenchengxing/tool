/**
 * @module attention
 * 
 * @name 个人关注
 * @version 1.0.0
 */



define(['urls', 'tpls', 'userPopup', 'jquery.tmpl'], function(_urls, _tpl, userPopup) {

    var tpl = _tpl.attention;
    var dataUrl = _urls.userIdols;
    var $el = $("#attention");
    
    return {
        render: function (userId){
            $el.addClass("loading");
            
            userPopup.doInit("#attention");
            $.ajax({
                url: dataUrl,
                type: "post",
                data: {"userId": userId, "pageNo": 1, "pageSize":5},
                success: function (msg){
                    $el.removeClass("loading");
                    if(msg.code == 200){
                        $.tmpl(tpl, msg.data, {"defaultImage" : _urls.defaultImage}).appendTo("#attention");
                    } else {
                        $el.html(msg.message);
                    }
                }
            });
        },
        doInit: function (userId){
            this.render(userId);
        }
    };
});