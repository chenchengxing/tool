
var fs = require("fs");
var path = require("path");
exports.create = function (req, res) {
    console.log("创建目录：" + __dirname + "../public/" + req.param('appName'));

    //target app dir
    var appDir = path.join(__dirname, "..", "public", "app", req.param('appName'));
    //source needed,which pre-store in /public/js /public/css 
    var publicSourceDir = path.join(__dirname, "..", "public");

    fs.mkdir(appDir,  function (error) {
        if (error) throw error;
        //create img,js,css folders
        fs.mkdir(path.join(appDir, "img"));
        fs.mkdir(path.join(appDir, "js"), function (err) {
            if (error) throw error;
            //create index.js
            fs.writeFile(path.join(appDir, "js", "index.js"), "define([],\nfunction() {\n});", function (argument) {
                // body...
            });
            //create tpls.js
            fs.writeFile(path.join(appDir, "js", "tpls.js"), "", function (argument) {
                // body...
            });
            //copy  public/js/jquery.tmpl.js to public/app/js/jquery.tmpl.js
            fs.createReadStream(path.join(publicSourceDir, "js", "jquery.tmpl.js")).pipe(fs.createWriteStream(path.join(appDir, "js", "jquery.tmpl.js")));
            //copy  public/js/require-jquery.js to public/app/js/require-jquery.js
            fs.createReadStream(path.join(publicSourceDir, "js", "require-jquery.js")).pipe(fs.createWriteStream(path.join(appDir, "js", "require-jquery.js")));
        });
        fs.mkdir(path.join(appDir, "css"), function (error) {
            if (error) throw error;
            //copy  public/css/base.css to public/app/css/base.css
            fs.createReadStream(path.join(publicSourceDir, "css", "base.css")).pipe(fs.createWriteStream(path.join(appDir, "css", "base.css")));
            //create index.css
            fs.writeFile(path.join(appDir, "css", "index.css"), "", function (argument) {
                // body...
            });
        });
        fs.mkdir(path.join(appDir, "data"), function (err) {
            if (error) throw error;
             //copy  public/data/top.json to public/app/data/top.json
            // fs.createReadStream(path.join(publicSourceDir, "data", "top.json")).pipe(fs.createWriteStream(path.join(appDir, "data", "top.json")));
        });
        fs.mkdir(path.join(appDir, "template"));

        //create index.html
        fs.writeFile(path.join(appDir, "index.html"), '<!DOCTYPE HTML>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title></title>\n<link rel="stylesheet" type="text/css" href="/css/base.css">\n<link rel="stylesheet" type="text/css" href="css/index.css">\n</head>\n<body>\n    <script src="js/require-jquery.js"></script><script>require.config({baseUrl: "js",paths: {"index": "index"       },        shim: {     "jquery.tmpl": ["jquery"]            }        });        require(["index"]);    </script>\n</body>\n</html>');


        res.charset = 'utf-8';
        res.send("成功创建目录dfd");
    });
};
