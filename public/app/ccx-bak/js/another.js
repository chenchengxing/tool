define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.undefined;

    return {
        render: function () {
            $.get("data/undefined.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#undefined");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
