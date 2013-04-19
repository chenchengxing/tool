/**
 * @module slide
 * 
 * @name 首页 轮播模块
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var tpl = _tpl.slide;
    var dataUrl = _url["slide"];
    var $el = $("#slide");
    
    return {
        render: function (){
            $.ajax({
                url: dataUrl,
                dataType: "json",
                success: function (data){
                    
                    $.tmpl(tpl, data.data).appendTo("#slide");
                    
                    var $prevBtn = $el.find(".toleft");
                    var $nextBtn = $el.find(".toright");
                    var $btnEls = $el.find(".btns li");
                    var $picWp = $el.find(".pic ul");
                    
                    var num = $btnEls.length;
                    var picW = 720;
                    var curIndex = 0;
                    var timer = null;
                    
                    if (data.data.result.length > 1){
                        $picWp.css("width", picW*data.data.result.length);
                    } else {
                        return;
                    }
                    
                    var invoke = function (i) {
                        $picWp.animate({marginLeft: -picW*i+"px"});
                        $btnEls.removeClass("cur");
                        $btnEls.eq(i).addClass("cur");
                    }
                    var auto = function () {
                        curIndex++;
                        if (curIndex >= num ){
                            curIndex = 0;
                        }
                        invoke(curIndex);
                    }
                    
                    timer = setInterval(auto, 3000);
                    
                    $prevBtn.click(function(e){
                        e.preventDefault();
                        curIndex--;
                        if (curIndex < 0 ){
                            curIndex = num-1;
                        }
                        invoke(curIndex);
                    });
                    
                    $nextBtn.click(function(e){
                        e.preventDefault();
                        
                        curIndex++;
                        if (curIndex >= num ){
                            curIndex = 0;
                        }
                        invoke(curIndex);
                    });
                    
                    $btnEls.click(function(e){
                        curIndex = $(this).index();
                        invoke(curIndex);
                    })
                    $el.hover(function () {
                        if(timer){
                            clearInterval(timer);
                        }
                    }, function () {
                        if(timer){
                            clearInterval(timer);
                        }
                        timer = setInterval(auto, 3000);
                    });
                    
                }
            });
        },
        doInit: function (){
            this.render();
        }
    };
});