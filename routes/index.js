
/*
 * GET home page.
 */

var fs = require("fs");
var path = require('path');
exports.index = function(req, res){
    //scan public dirs
    var appList = fs.readdirSync(path.join(__dirname, "..", "public", "app"));
    res.render('index', { "title": 'Express', "appList" : appList});  
};  