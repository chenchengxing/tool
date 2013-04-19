define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.tmp1;

    return {
        render: function () {
            $.get("data/tmp1.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#tmp1");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
