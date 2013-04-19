/**
 * @module personalCenterNav
 * 
 * @name 个人中心左侧导航
 * @version 1.0.0
 */



define(['tpls', 'urls'], function(_tpl, _urls) {
    
    var tpl = _tpl.personalCenterNav;
    
    return {
        render: function (user, liActiveFlag){
            $.tmpl(tpl, user.data, {"defaultImage" : _urls.defaultImage}).appendTo("#personalCenterNav");
            var liIndex = -1;
            if (liActiveFlag == "index") {
                liIndex = -1;
            } else if(liActiveFlag == "learning") {
                liIndex = 0;
            } else if(liActiveFlag == "learned") {
                liIndex = 1;
            } else if(liActiveFlag == "myCourse") {
                liIndex = 2;
            } else if(liActiveFlag == "selectable") {
                liIndex = 3;
            } else if(liActiveFlag == "calendar") {
                liIndex = 4;
            } else if(liActiveFlag == "completed") {
                liIndex = 5;
            } else if(liActiveFlag == "friend") {
                liIndex = 6;
            } else if(liActiveFlag == "group") {
                liIndex = 7;
            } 
            
            //set active class to mark the current
            if (liIndex >= 0) {
                $("#personalCenterNav li:eq(" + liIndex + ")").addClass("active");
            }
        },
        doInit: function (user, liActiveFlag){
            this.render(user, liActiveFlag);
        }
    }
});
