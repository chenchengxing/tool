/**
 * @module playTitle
 * 
 * @name 播放页 课程标题
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'jquery.tmpl'], function(_url, _tpl, params) {
    
    var tpl = _tpl.playTitle;
    var dataUrl = _url["playTitle"];
    var courseId = params["courseId"];
    var elementId = params["elementId"];
    
    var substrByByte = function(source, length){
        return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1');
    }
    
    return {
        render: function (cbfn, eleId){
            var $el = $("#" + eleId);
            var type = 0;
            
            $el.addClass("loading");
            
            if(courseId){
                dataUrl = dataUrl(courseId, eleId);
            }

            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (result){
                    $el.removeClass("loading");
                    
                    if(result.code == 200){
                        var db = result.data;
                        var index = 0;
                        var flag = 0;
                        
                        if(eleId == "playTitle"){
                            if(elementId){
                                $.each(db.elementList, function (i, n){
                                    if(elementId == n.id){
                                        index = i;
                                    }
                                });
                            }
                            $.tmpl(tpl, {
                                    "id": db.id,
                                    "lesson": "课时" + (index+1),
                                    "name": db.elementList[index].name,
                                    "template" : eleId
                                }, {substr: substrByByte}).appendTo($el);
                        } else {
                            $.tmpl(tpl, {
                                "id": result.data.id,
                                "lesson": "课时",
                                "name": result.data.name,
                                "template" : eleId
                            }, {substr: substrByByte}).appendTo($el);
                        }
                        
                        $el.find(".rtbtn").click(function (e){
                            e.preventDefault();
                            
                            var $right = $("#right");
                            var $left = $("#left");
                            var $this = $(this);
                            
                            if(flag){
                                $left.animate({
                                    "marginRight": "318px"
                                });
                                $right.animate({
                                    "width": "318px"
                                }, "fast", function (){
                                    $right.css("overflow","hidden");
                                    $this.attr("class", "rtbtn hide-rtbtn");
                                });
                                
                                flag = 0;
                            }else{
                                $left.animate({
                                    "marginRight": "0"
                                });
                                $right.animate({
                                    "width": 0
                                }, "fast", function (){
                                    $right.css("overflow","hidden");
                                    $this.attr("class", "rtbtn show-rtbtn");
                                });
                                
                                flag = 1;
                            }
                        });
                        
                        if(cbfn) {
                            cbfn(result.data, index);
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
        doInit: function (cbfn, eleId){
            this.render(cbfn, eleId);
        }
    };
});