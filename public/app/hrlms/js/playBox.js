/**
 * @module playBox
 * 
 * @name 播放页 播放器
 * @version 1.0.0
 */



define(['urls'], function(_url) {

    var dataUrl = _url["playBox"];
    var elementView = _url["elementView"];
    
    return {
        render: function (data, index){
            var $el = $("#playBox");
            var w = $el.width();
            var h = $el.parent().height() - 78;
            
            $el.html('<iframe src="" frameborder="0" height="'+h+'" width="'+w+'"></iframe>');
            
            var $ifm = $el.find("iframe");
            var num = 0;
            if (index) {
                num = index;
            }
            
            var type = data.elementList[num].type;
            var id = data.elementList[num].id;
            
            $ifm.attr("src", dataUrl(type, id, w, h));
            
            $.get(elementView(data.id, id), function (){
                
            });
        },
        doInit: function (data, index){
            this.render(data, index);
        }
    };
});