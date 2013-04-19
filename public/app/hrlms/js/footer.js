/**
 * @module footer
 * 
 * @name 页面底部
 * @version 1.0.0
 */



define(['tpls'], function(_tpl) {
    
    var tpl = _tpl.footer;
    
    return {
        render: function (){
            $("#footer").html(tpl);
        },
        doInit: function (){
            this.render();
        }
    }
});