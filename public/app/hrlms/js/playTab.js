/**
 * @module playTab
 * 
 * @name 播放页 目录和评论
 * @version 1.0.0
 */



define(['urls', 'tpls', 'publisher', 'tweetList', 'jquery.tmpl'], function(_url, _tpl, pb, tl) {
    
    var tpl = _tpl.playTab;
    var dataUrl = _url["noticeCount"];
    var elementUrl  = _url["onlineCourse"];
    var chapterListTpl = _tpl.chapterList;
    
    var substrByByte = function(source, length){
        if(source.length > 20){
            return (source+'').substr(0,30).replace(/([^\x00-\xff])/g,'$1 ').substr(0,30).replace(/([^\x00-\xff]) /g,'$1') + "...";
        } else {
            return source;
        }
    }
    
    return {
        render: function (data, index){
            var $el = $("#playTab");
            var groupId = data.snsGroupId;
            var courseId = data.id;
            
            $.ajax({
                url:dataUrl,
                type:"get",
                dataType:"json",
                data:{"groupId": groupId},//data.snsGroupId
                success:function(response){
                    
                    response.height = $el.parent().height() - 104;
                    $.tmpl(tpl, response).appendTo("#playTab");
                    
                    $el.find("#chapterList").addClass("loading");
                    
                    $.ajax({
                        url: elementUrl(courseId),
                        dataType: "json",
                        success: function(result){
                            $el.find("#chapterList").removeClass("loading");
                            
                            if(result.code == 200){
                                result.curIndex = index;
                                result.courseId = courseId;
                                $.tmpl(chapterListTpl, result, {substr: substrByByte}).appendTo("#chapterList");
                            }else{
                                $el.html(result.message);
                            }
                        }
                    });
                    
                    
                    pb.doInit(groupId, tl.refresh,"",1);//data.snsGroupId
                    tl.doInit(groupId, 'tweetList', 1, function(data){$("#playTab .c-icon").next().text("("+data.data.totalCount+")")});//data.snsGroupId
                    
                    $el.on("click", ".tab-btns>li", function(){
                        if(!$(this).hasClass("cur")){
                            var _index = $el.find(".tab-btns>li").index(this);
                            switch(_index){
                                case 0:
                                    $el.find("li.cur").removeClass("cur");
                                    $(this).addClass("cur");
                                    $el.find("#playComment").hide();
                                    $el.find("#chapterList").show();
                                break;
                                case 1:
                                    $el.find("li.cur").removeClass("cur");
                                    $(this).addClass("cur");
                                    tl.refresh();//data.snsGroupId
                                    $el.find("#chapterList").hide();
                                    $el.find("#playComment").show();
                                break;
                            }
                        }
                    });
                }
            });
        },
        doInit: function (data, index){
            this.render(data, index);
        }
    };
});