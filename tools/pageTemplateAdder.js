
var fs = require("fs");
var path = require("path");
exports.add = function (req, res) {
    console.log("add template");

    var appName = "ccx";
    //target app dir
    var appDir = path.join(__dirname, "..", "public", "app", appName);

    var templateName = req.param("templateName");
    if (templateName == "") res.send("no such template");
    //import css
    fs.appendFile(path.join(appDir, "css", "index.css"), 
        "@import '" + templateName + ".css';",
        function (err) {
            if (err) throw err;
            console.log("success import template's css");
        });

    //doInit(); in js
    fs.readFile(path.join(appDir, "js", "index.js"), "utf-8", function (err, data) {
        if (err) throw err;
        var indexDefine = data.indexOf("define");
        var indexFunction = data.substr(indexDefine).indexOf("function") + indexDefine;
        var indexSquare = data.substr(indexDefine).indexOf("]") + indexDefine;
        var indexSquareLeft = data.substr(indexDefine).indexOf("[") + indexDefine;
        var indexParen = data.substr(indexDefine).indexOf(")") + indexDefine;
        var indexCurly = data.substr(indexDefine).indexOf("{") + indexDefine;

        var addedTemplateContent = "";
        if (indexSquare - indexSquareLeft == 1) {
            addedTemplateContent = data.substr(0, indexSquare) + "'top'" + data.substr(indexSquare, indexParen - indexSquare) +
            "top" + ") {\n    top.doInit();" + data.substr(indexCurly + 1);
        } else {
            addedTemplateContent = data.substr(0, indexSquare) + ", 'top'" + data.substr(indexSquare, indexParen - indexSquare) +
            ", top" + ") {\n    top.doInit();" + data.substr(indexCurly + 1);
        }
        fs.writeFile(path.join(appDir, "js", "index.js"), addedTemplateContent);
    });

    //template add in to tpls.js
    // fs.readFile(path.join(appDir, "js", "tpls.js"), "utf-8", function (err, data) {
    //     if (err) throw err;
    //     // console.log(data.substr(7).substr(0, data.length - 9));
    //     var jsObject = JSON.parse(data.substr(7).substr(0, data.length - 9));
    //     // console.log(jsObject.test1);
    // })
};
