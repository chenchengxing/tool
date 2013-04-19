
var fs = require("fs");
var path = require("path");

exports.showDemoPage = function (req, res) {

    var appName = "ccx";
    
    res.render('demo', { "templateName": 'top', "appName" : appName});  
};
