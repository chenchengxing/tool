/**
 * @module user
 * 
 * @name 获取用户信息
 * @version 1.0.0
 */



define(["urls"], function(_url) {
    
    var getUrl = _url["user"];
    var dataUrl = _url["getUserInfo"];
    
    return {
        doInit: function (fn){
            var dfd = $.Deferred();
            $.ajax({
                url: dataUrl + "?t="+new Date().getTime(),
                dataType: "json",
                success: function(result){
                    if(result.code == 200){
                        dfd.resolveWith(result);
                    }else{
                        dfd.rejectWith(result);
                    }
                },
                error: function (){
                    // location.href = "http://itebeta.baidu.com:8011/login?service="+encodeURIComponent(_url.snsServerPath+"/hrlms/j_spring_cas_security_check");
                }
            });
            
            return dfd.promise();
        }
    };
});