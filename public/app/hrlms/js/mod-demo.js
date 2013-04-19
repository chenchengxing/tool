/**
 * @module mod-a
 * 
 * @name 模块a
 * @version 1.0.0
 */
 
 

define(['tpls', 'jquery.tmpl'], function(_tpl) {
    
    var tpl = _tpl["mod-aList"];
    var dataUrl = "datas/mod-aList.json"
    
    return {
        render: function (){
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function(data){
                    $(tpl).tmpl(data).appendTo("#mod-a tbody");
                }
            });
        },
        doInit: function (){
            this.render();
        }
    }
});