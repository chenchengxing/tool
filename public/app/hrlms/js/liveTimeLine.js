/**
 * @module liveTimeLine
 * 
 * @name 直播课堂时间线
 * @version 1.0.0
 */



define(['urls', 'tpls', 'pagination', 'urlParser', 'jquery.tmpl'], function(_urls, _tpl, page, urlParser) {
    
    var urlObj = $.extend({}, urlParser);

    var tpl = _tpl.liveTimeLine;
    var cache = {};
    var substrByByte = function(source, bl, el){
        return (source+'').substr(bl, el);
    }
    var istodayByByte = function(source, bl, el) {
        var date = substrByByte(source, bl, el);
        var now  = (new Date).getDate();
        if (now < 10) now = "0" + now;
        if (now == date) {
            return "今天";
        } else {
            return '';
        }
    }
    
    // compare time,if the first time is before the second return FALSE.
    var compareTime = function (time1, time2) {
        var beginTimes = time1.substring(0, 10).split('-');
        var endTimes = time2.substring(0, 10).split('-');

        time1 = beginTimes[1] + '/' + beginTimes[2] + '/' + beginTimes[0] + ' ' + time1.substring(10, 19);
        time2 = endTimes[1] + '/' + endTimes[2] + '/' + endTimes[0] + ' ' + time2.substring(10, 19);

        var date1 = new Date(time1);
        var date2 = new Date(time2);

        if (date1.getTime() < date2.getTime()) {
            return false;
        } else 
            return true;
        return false;
    };

    return {
        getCacheData : function () {
            return cache;
        },
        render: function (userInfo, id, param){
            $.extend(urlObj, param);
            //fill username to the url param
            urlObj.username = userInfo.data.username;

            //if no pageNo specified,set to 1
            if (!urlObj.pageNo) {
                urlObj.pageNo = 1;
            }

            //if no pageSize specified,set to 1
            if (!urlObj.pageSize) {
                urlObj.pageSize = 10;
            }

            // urlObj.userId = "31813";
            var dataUrl = _urls["liveTimeLine"](id);

            //add loading class to the element before ajax send
            var $el = $("#" + id);
            $el.addClass("loading");
            $.ajax({
                type : "get",
                url: dataUrl + '?' + $.param(urlObj),
                dataType: "json",
                success: function(result){

                    //remove loading class 
                    $el.removeClass("loading");

                    //deal with result json
                    if (result.code == 200) {
                        result.data.courseLinkToCMS = _urls.courseLinkToCMS;
                        $(result.data.result).each(function () {
                            this.template = id;
                        });
                        cache = result;
                        if (result.data.result && result.data.result.length > 0) {
                            $.tmpl(tpl, result.data, {"substr" : substrByByte, "istoday" : istodayByByte, "compareTime" : compareTime}).appendTo("#" + id);
                            urlObj.totalPages = result.data.totalPages;
                            
                            page.doInit(urlObj);
                        }
                    } else {
                        $el.html(result.message);
                    }
                },
                error : function (msg) {
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        },
        doInit: function (userInfo, id, param){
            this.render(userInfo, id, param);
        }
    }
});