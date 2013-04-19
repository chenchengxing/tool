/**
 * @module playCourseIntro
 * 
 * @name 播放页 课程简介
 * @version 1.0.0
 */



define(['tpls'], function(_tpl) {
    
    var tpl = _tpl.playCourseIntro;
    
    var substrByByte = function(source, length){
        if(source.length > 13){
            return (source+'').substr(0,13).replace(/([^\x00-\xff])/g,'$1 ').substr(0,13).replace(/([^\x00-\xff]) /g,'$1') +"...";
        } else {
            return source;
        }
    }
    
    return {
        render: function (data){
            $.tmpl(tpl, data, {substr: substrByByte}).appendTo("#playCourseIntro");
        },
        doInit: function (data){
            this.render(data);
        }
    };
});