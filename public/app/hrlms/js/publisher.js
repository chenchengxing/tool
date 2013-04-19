/**
 * @module publisher
 * 
 * @name 小组 输入框模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl.publisher;
    var dataUrl = _url["publisher"];
    var $el = {},_tag = "",_classNum = 0;
    var start = 0;
    var end = 0;
    
    var savePos = function (el){
        if(typeof (el.selectionStart) == "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
        } else if (document.selection) {
            var range = document.selection.createRange();
            if (range.parentElement().id == el.id) {
                var range_all = document.body.createTextRange();
                range_all.moveToElementText(el);
                for (start = 0; range_all.compareEndPoints("StartToStart", range) < 0; start++)
                    range_all.moveStart('character', 1);
                for (var i = 0; i <= start; i++) {
                    if (el.value.charAt(i) == '/n')
                        start++;
                }
                var range_all = document.body.createTextRange();
                range_all.moveToElementText(el);
                for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end++){
                    range_all.moveStart('character', 1);
                }
                for (var i = 0; i <= end; i++) {
                    if (el.value.charAt(i) == '/n')
                        end++;
                }
            }
        }
    };
    
    var selectText = function (el,start,end){
        if(el.createTextRange){
            var Range = el.createTextRange();
            Range.collapse();
            Range.moveEnd('character',end);
            Range.moveStart('character',start);
            Range.select();
        }
        if(el.setSelectionRange){
            el.focus();
            el.setSelectionRange(start,end);  //设光标 
        }
    };

    return {
        render: function (id, cbfn, tag, classNum){
            $el = $("#publisher");
            if(!!tag){
                _tag = "#"+tag+"#";
            }; 
            if(!!classNum){
                _classNum = classNum;
            };
            
            var tweetListTips = function(id, callbackfun){
                $el.find("#publisherTextarea").val(_tag).trigger("mouseup");
                callbackfun();
            };

            $el.on("click", "#insertTopic", function (e){
                e.preventDefault();
                
                var $textarea = $el.find("#publisherTextarea");
                
                var pre = $textarea.val().substr(0, start);
                var post = $textarea.val().substr(start);
                
                $textarea.val(pre + "#在这里输入你想要说的话题#" + post);
                selectText($textarea[0], start+1, start+13);
            });
            
            $el.on("keydown keyup mousedown mouseup focus", "#publisherTextarea", function (){
                var $charEl = $el.find(".char-constantia");
                var $textarea = $el.find("#publisherTextarea");
                var $tiptxt = $charEl.prev();
                var val = $textarea.val();
                
                savePos(this);
                
                if (val.length <= 140){
                    $charEl.removeClass("er");
                    $tiptxt.html($tiptxt.html().replace("已经超过", "还可以输"));
                    $charEl.html(140 - val.length);
                } else {
                    $tiptxt.html($tiptxt.html().replace("还可以输", "已经超过"));
                    $charEl.html(val.length - 140);
                    $charEl.addClass("er");
                }
            });
            $el.on("click", "#submitBtn", function (e){
                var $textarea = $el.find("#publisherTextarea");
                var val = $.trim($textarea.val());
                var datas = {};
                
                e.preventDefault();
                
                //修改判断逻辑，信息主体不超过140字，不少于1个字，同时不能只有话题
                if (val.length <= 140 && $.trim(val.replace(/#[^#]+#/g,"")).length > 0){
                    datas.content = val;

                    datas.groupId = id;

                    $.ajax({
                        url: dataUrl,
                        dataType: "json",
                        type: "post",
                        data: datas,
                        success: function (result){
                            if(result.code == 200){
                                if (typeof cbfn == "function"){
                                    tweetListTips(id, cbfn);
                                    
                                    // 发言数加1
                                    var $count = $("#groupTopicHeader").find("#noticeCount");
                                    if($count.length > 0){
                                        var num = parseInt($count.text());
                                        $count.text(num+1);
                                    }
                                }
                            }else{
                                alert(result.message);
                            }
                        },
                        error: function (msg){
                            $el.removeClass("loading").addClass("error");
                            $el.html(msg);
                        }
                    });
                }
                return false;
            });

            $el.empty();
            $.tmpl(tpl, {value:_tag,classNum:_classNum}).appendTo($el);
            $("#publisherTextarea").trigger("mouseup");
        },
        doInit: function (id, cbfn, tag, _classNum){
            this.render(id, cbfn, tag, _classNum);
        }
    };
});