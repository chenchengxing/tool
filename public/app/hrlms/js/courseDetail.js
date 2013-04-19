/**
 * @module courseDetail
 * 
 * @name 课程中心-课程详情 课程描述
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_url, _tpl, urlParser) {
    
    var dataUrl  = _url["courseDetail"];
    var tpl = _tpl.courseDetail;
    var $el = $("#courseDetail");
    var urlObj = urlParser;
    var cache = {};
    
    if(!$.isEmptyObject(urlObj)){
        dataUrl = _url.path + dataUrl(urlObj.courseId);
    };
    
    var substrByByte = function(source){
        if(source.length > 100){
            return (source+'').substr(0,100).replace(/([^\x00-\xff])/g,'$1 ').substr(0,100).replace(/([^\x00-\xff]) /g,'$1')+"...";
        }else {
            return source;
        }
    }
    var ifOverflow = function (str) {
        if (str.length > 100)
            return true;
        return false;
    }

     $("#courseDetail .view-more-description").live("click", function (e) {
        $(e.target).parent().html(cache.data.description + '<span class="view-less-description">&lt;&lt;收起</span>').css("height", "auto");
        return false;
    });

    $("#courseDetail .view-less-description").live("click", function (e) {
        $(e.target).parent().html(substrByByte(cache.data.description) + '<span class="view-more-description">更多&gt;&gt;</span>').css("height", "62px");
        return false;
    });

    return {
        render: function (cbfn){
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function(result){
                    if(result.code == 200){
                        cache = result;
                        $.tmpl(tpl, result.data, {"substr" : substrByByte,"ifOverflow" : ifOverflow}).appendTo("#courseDetail");
                        if(typeof cbfn == "function"){
                            cbfn.call(result.data);
                        }
                    } else {
                        $el.html(result.message);
                    }
                },
                error: function (){
                    $("#courseDetail").append("读取课程详情出现异常。");
                }
            });
        },
        doInit: function (cbfn){
            this.render(cbfn);
        }
    }
});