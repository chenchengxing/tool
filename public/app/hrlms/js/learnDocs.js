/**
 * @module learnDocs
 * 
 * @name 课程中心-课程详情 学习资料
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var dataUrl  = _url["learnDocs"];
    var tpl      = _tpl.learnDocs;
    
    var formatSize = function ($size){
        var size  = parseFloat($size);
        var rank =0;
        var rankchar ='B';
        
        while(size > 1024){
            size = size/1024;
            rank++;
        }
        if(rank == 1){
            rankchar = "KB";
        }
        else if(rank == 2){
            rankchar = "MB";
        }
        else if(rank == 3){
            rankchar = "GB";
        }    
        return size.toFixed(2)+ " "+ rankchar;
    }
    
    return {
        render: function (id){
            var $el = $("#learnDocs");
            $el.addClass("loading");
            
            $.ajax({
                url: dataUrl(id),
                dataType: "json",
                success: function(result){
                    $el.removeClass("loading");
                    if(result.code == 200){
                        if (result.data.length > 0) {
                            $("#learnDocs").empty();
                            $.tmpl(tpl, result, {formatSize: formatSize}).appendTo("#learnDocs");
                        } else {
                            $("#learnDocs").html('暂无');
                        }
                    }else{
                        $el.html(result.message);
                    }
                }
            });
        },
        doInit: function (id){
            this.render(id);
        }
    }
});