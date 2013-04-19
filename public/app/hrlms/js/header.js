/**
 * @module header
 * 
 * @name 页面头部（logo 导航 搜索）
 * @version 1.0.0
 */



define(['tpls', 'urlParser'], function(_tpl, urlParser) {
    
    var tpl = _tpl.header;
    var $el = $("#header");
    
    return {
        render: function (num){
            $el.html(tpl);
            
            var $nav = $el.find("#nav li");
            var $sForm = $el.find(".search");
            var $kwIpt = $el.find(".kw");
            var $sBtn = $el.find(".sbtn");
            if (urlParser && urlParser.q)
                $kwIpt.val(decodeURIComponent(urlParser.q));
            
            if(num){
                switch(num){
                    case 1:
                        $el.addClass("green-bg");
                        $nav.eq(num).addClass("cur");
                        break;
                    case 2:
                        $el.addClass("blue-bg");
                        $nav.eq(num).addClass("cur");
                        break;
                    case 3:
                        $el.addClass("darkgray-bg");
                        $nav.eq(num).addClass("cur");
                        break;
                }
            }
            
            // $nav.eq(1).hover(function (){
            //     $(this).addClass("hover");
            // }, function (){
            //     $(this).removeClass("hover");
            // });
            
        },
        doInit: function (curIndex){
            
            this.render(curIndex);
        }
    }
});