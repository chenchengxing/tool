define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.tmp2;

    return {
        render: function () {
            $.get("data/tmp2.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#tmp2");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
