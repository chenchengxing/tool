
 /* NEW PAGE's TEMPLATE FOR CSS,JS,HTML
  * ====================== */
exports.pageCssTemplate = function () {
    return "";
};

//@pageName and @description are for comment
exports.pageJsTemplate = function (pageName, description) {
    //todo add js comments
    var jsContent = "";
    jsContent = 'define([],\n';
    jsContent += '    function() {\n';
    jsContent += '});';

    return jsContent;
};

//function(pageName, [withBaseCss]), if withBaseCss add,base css link to the html
exports.pageHtmlTemplate = function (pageName, withBaseCss) {
    var htmlContent = "";
    htmlContent = '<!DOCTYPE HTML>\n';
    htmlContent += '<html>\n';
    htmlContent += '<head>\n';
    htmlContent += '<meta charset="UTF-8">\n';
    htmlContent += '    <title></title>\n';
    if (withBaseCss) htmlContent += '    <link rel="stylesheet" type="text/css" href="css/base.css">\n';
    htmlContent += '    <link rel="stylesheet" type="text/css" href="css/' + pageName + '.css">\n';
    htmlContent += '</head>\n';
    htmlContent += '<body>\n';
    htmlContent += '    <script src="js/require-jquery.js"></script>\n';
    htmlContent += '    <script>\n';
    htmlContent += '        require.config({\n';
    htmlContent += '            baseUrl: "js",\n';
    htmlContent += '            paths: {\n';
    htmlContent += '                "' + pageName + '": "' + pageName + '"\n';
    htmlContent += '            },\n';
    htmlContent += '            shim: {\n';
    htmlContent += '                "jquery.tmpl": ["jquery"]\n';
    htmlContent += '            }\n';
    htmlContent += '        });\n';
    htmlContent += '        require(["' + pageName + '"]);\n';
    htmlContent += '    </script>\n';
    htmlContent += '</body>\n';
    htmlContent += '</html>\n';

    return htmlContent;
};





 /* NEW TEMPLATE's tmeplate FOR CSS,JS,HTML,DATA
  * ====================== */

exports.templateCssTemplate = function () {
    return "";
};

//@templateName and @description are for comment
exports.templateJsTemplate = function (templateName, description) {
    //todo add js comments
    var jsContent = "";
    jsContent = 'define(["tpls", "jquery.tmpl"], function(_tpls) {\n\n';
    jsContent += '    var tpl = _tpls.' + templateName + ';\n\n';
    jsContent += '    return {\n';
    jsContent += '        render: function () {\n';
    jsContent += '            $.get("data/' + templateName + '.json", function (response) {\n';
    jsContent += '                $.tmpl(tpl, response.data).appendTo("#' + templateName + '");\n';
    jsContent += '            });\n';
    jsContent += '        },\n';
    jsContent += '        doInit: function () {\n';
    jsContent += '            this.render();\n';
    jsContent += '        }\n';
    jsContent += '    };\n';
    jsContent += '});\n';

    return jsContent;
};

//
exports.templateHtmlTemplate = function (templateName) {
    var htmlContent = "";
    htmlContent = '<!DOCTYPE HTML>\n';
    htmlContent += '<html>\n';
    htmlContent += '<head>\n';
    htmlContent += '<meta charset="UTF-8">\n';
    htmlContent += '    <title></title>\n';
    htmlContent += '    <link rel="stylesheet" type="text/css" href="../css/base.css">\n';
    htmlContent += '    <link rel="stylesheet" type="text/css" href="../css/' + templateName + '.css">\n';
    htmlContent += '</head>\n';
    htmlContent += '<body>\n';
    htmlContent += '    <section id="' + templateName + '">\n';
    htmlContent += '    \n';
    htmlContent += '    </section>\n';
    htmlContent += '    <script type="text/javascript" src="../js/require-jquery.js"></script>\n';
    htmlContent += '    <script type="text/javascript" src="../js/jquery.tmpl.js"></script>\n';
    htmlContent += '    <script type="text/javascript">\n';
    htmlContent += '        $.get("../data/' + templateName + '.json",\n';
    htmlContent += '            function (response) {\n';
    htmlContent += '                $("#' + templateName + '").html($.tmpl($("#' + templateName + '").html(), response.data));\n';
    htmlContent += '            }\n';
    htmlContent += '        );\n';
    htmlContent += '    </script>\n';
    htmlContent += '</body>\n';
    htmlContent += '</html>\n';

    return htmlContent;
};

exports.templateDataTemplate = function () {
    var jsonContent = "";
    jsonContent = "{\n\n\n";
    jsonContent += "}";

    return jsonContent;
};