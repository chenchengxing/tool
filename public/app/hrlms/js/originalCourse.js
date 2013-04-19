/**
 * @module originalCourse
 * 
 * @name 首页 学员原创课程 模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_urls, _tpl, user) {
    
    var tpl = _tpl.originalCourse;
    var dataUrl = _urls["originalCourse"];
    var $el = $("#originalCourse");
    
    var substrByByte = function(source, length){
        if(source.length > length){
            return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1') + "...";
        }else{
            return source;
        }
    }
    
    return {
        render: function (){
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    if(result.code == 200){
                    
                        $.tmpl(tpl, result.data, {substr: substrByByte, "defaultImage" : _urls.defaultImage}).appendTo("#originalCourse");
                        
                        var $lBtn = $el.find(".ori-arrow-left");
                        var $rBtn = $el.find(".ori-arrow-right");
                        var $list = $el.find(".ori-c-list");
                        var $item = $list.find("li");
                        var len = $item.length;
                        var w = $item.width();
                        var index = 0;
                        
                        
                        var invoke = function (num){
                            if(num == -1) {
                                num = 0;
                            }
                            if(num >= len){
                                num = len-1;
                            }
                            $list.animate({
                                "marginLeft": -num*w
                            });
                            index = num;
                        }
                        
                        if(len > 1) {
                            $lBtn.click(function (){
                                index--;
                                invoke(index);
                            });
                            
                            $rBtn.click(function (){
                                index++;
                                invoke(index);
                            });
                        }
                        
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
        doInit: function (){
            this.render();
        }
    };
});