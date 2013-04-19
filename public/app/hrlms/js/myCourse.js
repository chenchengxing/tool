/**
 * @module myCourse
 * 
 * @name 我的选课
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var dataUrl = _url["myCourse"];
    var tpl = _tpl.myCourse;
    var $el = $("#myCourse");
    
    return {
        render: function (username){
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl(username),
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200 && result.data){
                        if (result.data.result.length != 0){
                            $.tmpl(tpl, result.data).appendTo("#myCourse");
                        }
                    }
                }
            });
        },
        doInit: function (username){
            this.render(username);
        }
    }
});