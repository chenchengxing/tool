define(["tpls", "jquery.tmpl"], function(_tpls) {

    var tpl = _tpls.foot;

    return {
        render: function () {
            $.get("data/foot.json", function (response) {
                $.tmpl(tpl, response.data).appendTo("#foot");
            });
        },
        doInit: function () {
            this.render();
        }
    };
});
