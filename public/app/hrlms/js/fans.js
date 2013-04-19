/**
 * @module fans
 * 
 * @name 个人粉丝
 * @version 1.0.0
 */



define(['urls', 'tpls', 'userPopup', 'jquery.tmpl'], function(_urls, _tpl, userPopup) {

    var tpl = _tpl.fans;
    var dataUrl = _urls.userFans;
    var $el = $("#fans");
    
    return {
        render: function (userId){
            $el.addClass("loading");
            
            userPopup.doInit("#fans");
            $.ajax({
                url: dataUrl,
                type: "post",
                data: {"userId": userId, "pageNo": 1, "pageSize":5},
                success: function (msg){
                    $el.removeClass("loading");
                    if(msg.code == 200){
                        $.tmpl(tpl, msg.data, {"defaultImage" : _urls.defaultImage}).appendTo("#fans");
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