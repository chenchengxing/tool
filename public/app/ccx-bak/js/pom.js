define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.pom;

    return {
        render: function () {
            $.get("data/pom.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#pom");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
