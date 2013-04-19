/**
 * @module user course
 * 
 * @name 新闻
 * @version 1.0.0
 */



define(["urls", "tpls" ,'jquery.tmpl'], function(_urls, _tpls) {
    
    var dataUrl = _urls["indexNews"]();
    var tpl = _tpls.indexNews;
    $("#indexNews .ucc-more").live("click", function () {
        if ($('#indexNews .ucc-list').attr('style') && $('#indexNews .ucc-list').attr('style') != '') {
            $('#indexNews .ucc-list').removeAttr('style');
            $("#indexNews .ucc-more span").css("background-position", "-103px -315px");
        } else {
            $('#indexNews .ucc-list').css('height','auto');
            $("#indexNews .ucc-more span").css("background-position", "-103px -335px");
        }
        
        return false;
    });
    return {
        render : function () {
            $.ajax({
                type : "get",
                url: dataUrl,
                dataType: "json",
                success: function(response){
                    if (response.data && response.data.result) {
                        if (response.data.result.length > 5) {
                            //cut the result to 5
                            response.data.result.splice(5);
                        }
                        $.tmpl(tpl, response.data).appendTo("#" + "indexNews");
                        if (response.data.result.length <= 2) {
                            $("#indexNews .ucc-more").remove();//hide expandCursor
                        }
                    }
                    
                }
            });
        },
        doInit : function (){
            this.render();
        }
    };
});