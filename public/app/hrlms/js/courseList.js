/**
 * @module courseList
 * 
 * @name 课程中心 课程列表模块
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2013-2-28
 */



define(['urls', 'tpls', 'urlParser', 'filterCourse', 'pagination', 'jquery.tmpl'], function(_urls, _tpl, urlParser, fc, page) {
    var dataUrl = _urls.path + _urls["courseList"];
    var tpl = _tpl.courseList;
    var urlObj = $.extend({}, urlParser);
    
    // pageNo=0&pageSize=10&nodId=2&orderBy=1&viewType=1
    if(!urlObj.pageNo){
        urlObj.pageNo = 1;
    }
    
    if(!urlObj.orderBy){
        urlObj.orderBy = 1;
    }
    
    if(!!urlObj.sourceId){
        sourceId = 1;
        if(urlObj.sourceId == 2){
            sourceId = 2;
        }
    }else{
        sourceId = 1;
    }
    
    if(!urlObj.viewType){
        urlObj.viewType = 1;
        
        if(urlObj.sourceId == 2){
            urlObj.viewType = 2;
        }
    }
    
    if (!urlObj.pageSize) {
        urlObj.pageSize = 6;
        if(urlObj.viewType == 1){
            urlObj.pageSize = 15;
        }
    }
    
    if(urlObj.q != undefined){
        urlObj.q = decodeURIComponent(urlObj.q);
    }
    
    var substrByByte = function(source, length){
        return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1');
    }
    
    var bindEvt = function (str){
        var $el = $("#"+str);
        $el.find(".list-gird .c").off("mouseenter mouseleave");
        
        $el.find(".list-gird .c").hover(function (){
            $(this).addClass("hover");
            $(this).find(".c-pic").stop(true, true).animate({
                "height": "120px"
            }, 'fast');
        },function (){
            var $this = $(this);
            $(this).find(".c-pic").stop(true, true).animate({
                "height": "140px"
            }, 'fast', function (){
                $this.removeClass("hover");
            });
        });
    }
    
    return {
        render: function (str, flag, num, userId){
            var $el = $("#"+str);
            
            $el.addClass("loading");
            
            if(num){
                dataUrl = _urls.path + _urls["groupCourseList"];
            }
            
            if(userId){
                urlObj.userId = userId;
                if(num == 2){
                    dataUrl = _urls.path + _urls["profileCourseList"];
                    urlObj.type = 1;
                    urlObj.pageSize = 10;
                }
            }
            
            dataUrl = dataUrl + "?" + $.param(urlObj);
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                type:"GET",
                success: function(result){
                    $el.removeClass("loading");
                    if(result.code == 200){
                        if(flag){
                            urlObj.viewType = 2;
                        }
                        
                        if(num){
                            result.data.groupIsAdmin = num;
                        }
                        
                        if(urlParser != undefined && urlParser.groupId != undefined){
                            result.data.groupId = urlParser.groupId;
                        }
                        
                        result.data.viewType = urlObj.viewType;
                        
                        $.tmpl(tpl, result.data, {substr: substrByByte, "defaultImage" : _urls.defaultImage}).appendTo("#"+str);
                        
                        bindEvt(str);
                        
                        if (result.data && result.data.result && result.data.result.length > 0) {
                            fc.doInit(urlObj.orderBy, urlObj.viewType, urlObj);
                        } else {
                            $("#filterCourse").css("border-bottom", "none");
                        }
                        
                        urlObj.totalPages = result.data.totalPages;
                        
                        page.doInit(urlObj);
                    } else {
                        $el.html(result.message);
                    }
                },
                error: function (msg){
                    $el.removeClass("loading").addClass("error");
                    $el.html(msg);
                }
            });
        },
        
        doInit: function (str, flag, num, userId){
            this.render(str, flag, num, userId);
        }
    }
});