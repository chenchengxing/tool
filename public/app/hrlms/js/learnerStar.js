/**
 * @module learnerStar
 * 
 * @name 首页 学习达人模块
 * @version 1.0.0
 */



define(['tpls', 'urls', 'userPopup', 'jquery.tmpl'], function(_tpl, _urls, userPopup) {
    
    var tpl = _tpl.learnerStar;
    var dataUrl = "datas/learnerStar.json";
    var $el = $("#learnerStar");
    
    return {
        render: function (){
            $el.removeClass("loading");
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    if(result.code == 200){
                        $.tmpl(tpl, result, {"defaultImage" : _urls.defaultImage}).appendTo("#learnerStar");
                        userPopup.doInit("#learnerStar");
                    } else {
                        $el.html(result.message);
                    }
                },
                error: function (msg){
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});