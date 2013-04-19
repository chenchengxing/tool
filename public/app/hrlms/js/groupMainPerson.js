/**
 * @module groupMainPerson
 * 
 * @name 小组 管理员详情
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_tpl) {
    
    var tpl = _tpl.groupMainPerson;
    var dataUrl = "datas/groupMainPerson.json";
    var $el = $("#groupMainPerson");
    
    return {
        render: function (){
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (data){
                    $.tmpl(tpl, data).appendTo("#groupMainPerson");
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});