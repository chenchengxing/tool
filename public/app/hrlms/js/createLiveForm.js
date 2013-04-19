/**
 * @module createLiveTab
 * 
 * @name 直播课堂页  创建直播表单
 * @version 1.0.0
 */



define(['urls', 'tpls', 'urlParser', 'formLive', 'formBBB'], function (_url, _tpl, urlParser, formLive, formBBB){
    
    var _tpl = _tpl["createLiveForm"];
    var $el = $("#createLiveForm");
    
    return {
        render: function (){
            $el.html(_tpl);
            
            if(urlParser != undefined){
                var courseId = urlParser.courseId;
                var liveType = urlParser.liveType;
            
                formLive.doInit(courseId, liveType);
                formBBB.doInit(courseId, liveType);
            } else {
                formLive.doInit();
                formBBB.doInit();
            }
        },
        doInit: function (){
            this.render();
        }
    }
})