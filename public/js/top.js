/**
 * @module top
 * 
 * @name 页面顶部
 * @version 1.0.0
 */



define(['tpls', 'jquery.tmpl'], function(_tpls) {

    var tpl = _tpls.top;

    return {
        render: function () {
            $.get("data/top.json", function (response) {
               $.tmpl(tpl, response.data).appendTo("#top");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});