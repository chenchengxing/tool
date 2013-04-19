/**
 * @module tagTitle
 * 
 * @name 标签页  标签标题模块
 * @version 1.0.0
 */



define(['urls', 'urlParser'], function(_url, params) {
    var tagId = params["tagId"];
    
    var dataUrl = _url["tagTitle"](tagId);
    
    return {
        render: function (){
            var $el = $("#tagTitle");
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        if (result.data && result.data.name) {
                            $el.html("<h2>课程标签：" + result.data.name + "</h2>");
                        } else {
                            $el.html(result);
                        }
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