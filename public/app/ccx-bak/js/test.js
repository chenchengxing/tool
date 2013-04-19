define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.test;

    return {
        render: function () {
            $.get("data/test.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#test");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
