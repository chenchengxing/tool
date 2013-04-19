
var fs = require("fs");
var path = require("path");
exports.mock = function (req, res) {
    var appName = req.params.appName;
    var page = req.param("page");
    res.render('mocker', { "title": 'Express', "appName" : appName, "page" : page});
};
