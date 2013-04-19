/**
 * @module activeUser
 * 
 * @name 活跃用户
 * @version 1.0.0
 */



define(['tpls', 'jquery.tmpl', 'urls', 'urlParser', 'userPopup'], function(_tpl, _jq, _urls, urlParser, userPopup) {

    var tpl = _tpl.activeUsers;
    var $el = {};
    
    var groupId = urlParser.groupId;
    
    return {
        render: function (obj){
            $el = $("#"+obj);
            if (groupId) {
                $el.addClass("loading");
                userPopup.doInit("#activeUsers");
                $.ajax({
                    url: _urls.userActivists(groupId, 5),
                    dataType: "json",
                    data:"GET",
                    success: function (result){
                        if(result.code == 200){
                            $el.removeClass("loading");
                            $.tmpl(tpl, result, {"defaultImage" : _urls.defaultImage}).appendTo($el);
                        }else{
                            $el.html(result.message);
                        }
                    }
                });
            }
        },
        doInit: function (obj){
            this.render(obj);
        }
    };
});