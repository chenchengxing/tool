/**
 * @module user course
 * 
 * @name 可选课程
 * @version 1.0.0
 */



define(["urls", "tpls", "userPopup", "jquery.tmpl"], function(_urls, _tpls, userPopup) {

    var tpl = _tpls.userCenter;
    
    return {
        render : function (user) {
            $.tmpl(tpl, user.data, {"defaultImage" : _urls.defaultImage}).appendTo("#" + "userCenter");
        },
        doInit : function (user){
            this.render(user);
        }
    };
});