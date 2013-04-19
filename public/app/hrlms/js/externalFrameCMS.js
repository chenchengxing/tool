/**
 * @module index
 * 
 * @name 首页
 * @version 1.0.0
 */



define(['urlParser', 'urls', "tpls", 'jquery.tmpl'], function(urlParser, urls, _tpls) {
    var tpl = _tpls.playTitle;
    $.tmpl(tpl, { "template": "externalCMSTitle", "name": "课程详细信息"}).appendTo($("#externalCMSTitle"));
    var h = $("#externalCMSTitle").parent().height() - 100;
    var w = 980;
    // console.log(urls.courseLinkToCMS + urlParser.cId);
    $("#iframeCMS").html('<iframe src="' + urls.courseLinkToCMS() + urlParser.cId + '" frameborder="0" height="'+h+'" width="'+w+'"></iframe>');

});