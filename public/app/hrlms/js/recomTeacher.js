/**
 * @module recomTeacher
 * 
 * @name 首页 名师推荐模块
 * @version 1.0.0
 */



define(['tpls', 'urls', 'userPopup', 'jquery.tmpl'], function(_tpl, _urls, userPopup) {
    
    var tpl = _tpl.recomTeacher;
    var dataUrl = "datas/recomTeacher.json";
    var $el = $("#recomTeacher");
    
    return {
        render: function (){
            $el.removeClass("loading");
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    if(result.code == 200){
                        $.tmpl(tpl, result, {"defaultImage" : _urls.defaultImage}).appendTo("#recomTeacher");
                        userPopup.doInit("#recomTeacher");
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