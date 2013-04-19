/**
 * @module top
 * 
 * @name 页面顶部
 * @version 1.0.0
 */



define(['tpls', 'urls', 'jquery.tmpl'], function(_tpl, _urls) {
    
    var tpl = _tpl.top;
    var logoutUrl = _urls["logout"];
    
    
    return {
        render: function (msg){
            $.tmpl(tpl, msg.data, {"defaultImage" : _urls.defaultImage}).appendTo("#top");
            
            // 这里是变态的退出
            $("#top").on("click", "a", function (e){
                if ($(this).text() == "退出"){
                    e.preventDefault();
                    $.each(logoutUrl, function (i, v){
                        $.get(v);
                    });
                    
                    setTimeout(function (){
                        location.href = logoutUrl[logoutUrl.length-1];
                    }, 2000);
                }
            });
        },
        doInit: function (user){
            this.render(user);
        }
    }
})