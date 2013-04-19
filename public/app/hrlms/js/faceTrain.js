/**
 * @module faceTrain
 * 
 * @name 课程中心-课程详情 面授培训
 * @version 1.0.0
 */



define(['tpls', 'jquery.tmpl'], function(_tpl) {
    
    var dataUrl  = "datas/faceTrain.json";
    var tpl = _tpl.faceTrain;
    
    var substrByByte = function(source, bl, el){
        return (source+'').substr(bl, el);
    }
    var istodayByByte = function(source, bl, el) {
        var date = substrByByte(source, bl, el);
        var now  = (new Date).getDate();
        if (now < 10) now = "0" + now;
        if (now == date) {
            return "今天";
        } else {
            return '';
        }
    }
    
    return {
        render: function (userInfo){
            $.ajax({
                url: dataUrl,
                dataType: "json",
                data:{"_":(new Date()).getTime()},
                success: function(result){
                    if (result.data.length > 0) {
                        $("#faceTrain").empty();
                        $.tmpl(tpl, result, {substr : substrByByte, istoday : istodayByByte}).appendTo("#faceTrain");
                    } else {
                        $("#faceTrain").html('暂无');
                    }
                }
            });
        },
        doInit: function (userInfo){
            this.render(userInfo);
        }
    }
});