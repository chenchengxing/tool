
var fs = require("fs");
var path = require("path");
var sourceFileTemplate = require("./sourceFileTemplate");

exports.newPage = function (req, res) {
    var appName = req.param("appName");
    var pageName = req.param("pageName");

    fs.writeFile(path.join(__dirname, "..", "public", "app", appName, pageName + ".html"),
        sourceFileTemplate.pageHtmlTemplate(pageName, true),
        function (err) {
            //write css file with template
            fs.writeFile(path.join(__dirname, "..", "public", "app", appName, "css", pageName + ".css"),
                sourceFileTemplate.pageCssTemplate());
            //write js file with template
            fs.writeFile(path.join(__dirname, "..", "public", "app", appName, "js", pageName + ".js"),
                sourceFileTemplate.pageJsTemplate());

            res.send("创建成功:" + path.join(__dirname, "..", "public", "app", appName, pageName + ".html"));
        });
};

exports.savePage = function (req, res) {
    var appName = req.body.appName;
    var pageName = req.body.page;
    // var appDir = 
    console.log(req.body.data);


};
