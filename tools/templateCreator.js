
var fs = require("fs");
var path = require("path");

exports.create = function (req, res) {
    var appName = "ccx";
    //target app dir
    var appDir = path.join(__dirname, "..", "public", "app", appName);

    //source needed,which pre-store in /public/js /public/css 
    var publicSourceDir = path.join(__dirname, "..", "public");

    
    // //copy  public/js/jquery.tmpl.js to public/app/js/jquery.tmpl.js
    // fs.createReadStream(path.join(publicSourceDir, "js", "top.js")).pipe(fs.createWriteStream(path.join(appDir, "js", "top.js")));
    // //copy  public/js/require-jquery.js to public/app/js/require-jquery.js
    // fs.createReadStream(path.join(publicSourceDir, "js", "tpls.js")).pipe(fs.createWriteStream(path.join(appDir, "js", "tpls.js")));

    // fs.createReadStream(path.join(publicSourceDir, "css", "top.css")).pipe(fs.createWriteStream(path.join(appDir, "css", "top.css")));


    fs.writeFile(path.join(appDir, "css", "top.css"), "");
    // fs.writeFile(path.join(publicSourceDir, "template", "top.html"), "");

    fs.readFile(path.join(publicSourceDir, "demo.html"), "utf-8", function (err, data) {
        var cheerio = require('cheerio'),
        $ = cheerio.load(data);
        $("head").append($("<link />").attr("href", "../css/top.css").attr("rel", "stylesheet").attr("type", "text/css"));
        fs.writeFile(path.join(appDir, "template", "top.html"), $.html());
    });

    res.send("ok");
};
