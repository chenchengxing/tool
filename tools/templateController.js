
var fs = require("fs");
var path = require("path");
var sourceFileTemplate = require("./sourceFileTemplate");



/* create new template,including create css,js,html,json
  * ====================== */
exports.getTemplateList = function (req, res) {
    var appName = req.param("appName");
    var templateList = fs.readdirSync(path.join(__dirname, "..", "public", "app", appName, "template"));
    var formattedList = [];
    for (var i = 0; i < templateList.length; i ++) {
        var temp = templateList[i];
        formattedList.push({
            "url" : temp,
            "name" : getTemplateName(temp)
        });
    }
    res.send(formattedList);
}




/* create new template,including create css,js,html,json
  * ====================== */
exports.newTemplate = function (req, res) {
    var appName = req.param("appName");
    var templateName = req.param("templateName");
    var appDir = path.join(__dirname, "..", "public", "app", appName);//target app dir
    var publicSourceDir = path.join(__dirname, "..", "public");//source needed,which pre-store in /public/js /public/css 

    fs.writeFile(path.join(appDir, "css", templateName + ".css"), sourceFileTemplate.templateCssTemplate());
    fs.writeFile(path.join(appDir, "js", templateName + ".js"), sourceFileTemplate.templateJsTemplate(templateName));
    fs.writeFile(path.join(appDir, "data", templateName + ".json"), sourceFileTemplate.templateDataTemplate());
    fs.writeFile(path.join(appDir, "template", templateName + ".html"),
        sourceFileTemplate.templateHtmlTemplate(templateName),
        function () {
            res.send("successfully created " + templateName);
        }
    );

};

 /* merge the target template to js/tpls.js
  * ====================== */
exports.mergeTemplate = function (req, res) {
    var appName = req.param("appName");
    var templateName = req.param("templateName");
    var appDir = path.join(__dirname, "..", "public", "app", appName);//target app dir

    fs.readFile(path.join(appDir, "template", templateName + ".html"), "utf-8",
        function (err, data) {
            if (err) throw err;
            var cheerio = require('cheerio'),
            $ = cheerio.load(data);
            var templateContent = $("#" + templateName).html();
            
            fs.readFile(path.join(appDir, "js", "tpls.js"), "utf-8",
                function (err, data) {
                    if (err) throw err;
                    var jsObject = {};
                    //deal with empty
                    if (data.length > 0) jsObject = JSON.parse(getDefineJsonString(data));
                    jsObject[templateName] = templateContent;
                    fs.writeFile(path.join(appDir, "js", "tpls.js"), 'define(' + JSON.stringify(jsObject) + ');');
                }
            );
            
            res.send("suc, merge!");
        }
    );
};


function transform(str) {
    return str.replace(/"/g, "\\\"");
}

function getDefineJsonString(data) {
    // body...
    return data.substr(7, data.length - 9);
}

function getTemplateName(fileName) {
    return fileName.substr(0, fileName.indexOf("."));
}