
var fs = require("fs");
var path = require("path");
exports.savePage = function (req, res) {
    console.log(req.body.data);
    fs.readFile(path.join(__dirname, "..", "public", "app", "ccx", "index.html"), 'utf-8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);

      var cheerio = require('cheerio'),
        $ = cheerio.load(data);

        $('body').append(req.body.data);
        // $('body').append('<script type="javascript" src="/js/jquery.js"');
        // $('h2').addClass('welcome');

        console.log($.html());

        fs.writeFile(path.join(__dirname, "..", "public", "app", "ccx", "index.html"), $.html(), function (err) {
            if (err) {

            } else {
                console.log("write file success");
            }
        });
    });
    // var appName = req.originalUrl.substr(1).split('/')[1];
    
    // res.render('mocker', { "title": 'Express', "appName" : appName});  
};
