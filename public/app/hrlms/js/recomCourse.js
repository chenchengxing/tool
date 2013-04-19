/**
 * @module recomCourse
 * 
 * @name 首页 推荐课程 模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_urls, _tpl, user) {
    
    var tpl = _tpl.recomCourse;
    var dataUrlArr = _urls["recomCourse"];
    var $el = $("#recomCourse");
    var cache = [];
    
    var substrByByte = function(source, length){
        return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1');
    }
    
    var bindEvent = function (){
        $el.find(".recomcourse-list li").off("mouseenter mouseleave");
            $el.find(".recomcourse-list li").hover(function (){
                $(this).addClass("hover");
                $(this).find(".c-pic").stop(true, true).animate({
                    "height": "120px"
                }, 'fast');
            }, function (){
                var $this = $(this);
                $(this).find(".c-pic").stop(true, true).animate({
                    "height": "140px"
                }, 'fast', function (){
                    $this.removeClass("hover");
                });
            });
    }
    
    var getList = function (num){
        $el.find(".recomcourse-list").empty();
        
        if(cache[num] != undefined) {
            cache[num].flag = false;
            
            $.tmpl(tpl, cache[num], {substr: substrByByte, "defaultImage" : _urls.defaultImage}).appendTo("#recomCourse .recomcourse-list");
            bindEvent();
        } else {
            var $wpel = $("#recomCourse .recomcourse-list");
            $wpel.addClass("loading");
            
            $.ajax({
                url: dataUrlArr[num],
                dataType: "json",
                success: function (data){
                    $wpel.removeClass("loading");
                    
                    cache[num] = data.data;
                    cache[num].flag = false;
                    
                    $.tmpl(tpl, cache[num], {substr: substrByByte, "defaultImage" : _urls.defaultImage}).appendTo("#recomCourse .recomcourse-list");
                    
                    bindEvent();
                }
            });
        }
        
    }
    
    return {
        render: function (){
            var $wpel = $("#recomCourse");
            $wpel.addClass("loading");
            
            $.ajax({
                url: dataUrlArr[0],
                dataType: "json",
                success: function (data){
                    cache[0] = data.data;
                    data.data.flag = true;
                    
                    $wpel.removeClass("loading");
                    
                    $.tmpl(tpl, data.data, {"substr": substrByByte, "defaultImage" : _urls.defaultImage}).appendTo("#recomCourse");
                    
                    bindEvent();
                }
            });
            
            $el.on("click", ".rc-tab li", function (e){
                if($(this).index() == 0){
                    if($(this).attr("class") != "rc-hot-cur"){
                        $(this).attr("class", "rc-hot-cur");
                        $(this).siblings().attr("class", "rc-lastest");
                        
                        getList($(this).index());
                    }
                } else {
                    if($(this).attr("class") != "rc-lastest-cur"){
                        $(this).attr("class", "rc-lastest-cur");
                        $(this).siblings().attr("class", "rc-hot");
                        
                        getList($(this).index());
                    }
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});