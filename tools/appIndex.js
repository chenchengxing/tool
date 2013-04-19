
var fs = require("fs");
var path = require("path");
exports.render = function (req, res) {

    var appName = req.originalUrl.substr(1).split('/')[1];

    var templateList = fs.readdirSync(path.join(__dirname, "..", "public", "app", appName, "template"));

    var formattedList = [];
    for (var i = 0; i < templateList.length; i ++) {
        var temp = templateList[i];
        formattedList.push({
            "url" : temp,
            "name" : getTemplateName(temp)
        });
    }

    //read the app root dir,filtering leaving pages,like index.html || personalCenter.html
    var pageList = [];
    fs.readdir(path.join(__dirname, "..", "public", "app", appName), function (err, files) {
        for (var i = files.length - 1; i >= 0; i--) {
            var stats = fs.lstatSync(path.join(__dirname, "..", "public", "app", appName, files[i]));
            if (!stats.isDirectory()) {
                pageList.push(files[i]);
            }
        }
        //after get pageList and templateList,render to page
        res.render('appIndex', {
            "appName": appName,
            "templateList" : formattedList,
            "pageList" : pageList
        });
    });
    
};

function getTemplateName(fileName) {
    return fileName.substr(0, fileName.indexOf("."));
}