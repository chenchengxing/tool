/**
 * @module createLiveTab
 * 
 * @name 直播课堂页  BBB(在线课堂)表单
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var _tpl = _tpl["formBBB"];
    var liveInfoUrl = _url["liveCourseInfo"];
    var dataUrl = _url["formBBB"];
    var updateUrl = _url["updateLive"];
    var coverUrl = _url["frontCover"];
    
    var decode = function (str){
        return decodeURIComponent(str);
    }
    
    var strParser = function (str){
        var urlArr = str.split("&");
        var param = {};
            
        for (var i = urlArr.length - 1; i >= 0; i--){
            var tempArr = urlArr[i].split("=");
            param[tempArr[0]] = tempArr[1];
        }
        return param;
    }
    
    var jsontoStr = function (obj){
        var str = "";
        for(i in obj) {
            str += '"';
            str += i;
            str += '":"';
            str += obj[i];
            str += '",';
        }
        
        return str.substr(0, str.length-1);
    }
    
    var createLive = function ($el, courseId){
        $el.find("#formBBB").find(".confirm").click(function (e){
            e.preventDefault();
            
            var $this = $(this);
            var $form = $el.find("#formBBB");
            var iptArr = [$form.find("#bname"), $form.find("#bdescription"), $form.find("#bbeginTime"), $form.find("#bendTime"), $form.find("#maxUser")]
            var tipArr = ["标题不能为空", "简介不能为空", "教室开放时间不能为空", "教室开放时间不能为空", "人数上限不能为空"];
            var $tipTpl = $('<p class="error"></p>');
            var flag = false;
            
            $.each(iptArr, function (i,v){
                if($(this).val() == ""){
                    $tipTpl.html(tipArr[i]);
                    if ($(this).parent().find(".error").length > 0){
                        $(this).parent().find(".error").remove();
                    }
                    $(this).parent().prepend($tipTpl);
                    flag = true;
                }
            });
            
            if(!flag){
                if(iptArr[0].val().length > 50){
                    var $parent = iptArr[0].parent();
                    $tipTpl.html("您输入的标题过长");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                var formatDate = function (time){
                    // 先转换成 2011//11/11 11:11:11
                    return new Date(Date.parse(time.replace(/-/g,"/")));
                }
                
                var _t1 = formatDate(iptArr[2].val());
                var _t2 = formatDate(iptArr[3].val());
                
                if(_t1.getYear() !=_t2.getYear() || _t1.getMonth() != _t2.getMonth() || _t1.getDate() != _t2.getDate()){
                    var $parent = iptArr[3].parent();
                    $tipTpl.html("开始时间和结束时间的日期必须同一天！");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                if(_t2 < _t1){
                    var $parent = iptArr[3].parent();
                    $tipTpl.html("开始时间必须小于结束时间！");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                
                if(!/^\d+(\.\d+)?$/.test($form.find("#maxUser").val())){
                    var $parent = $form.find("#maxUser").parent();
                    $tipTpl.html("人数上限必须为数字！");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                if($form.find("#maxUser").val() <= 0){
                    var $parent = $form.find("#maxUser").parent();
                    $tipTpl.html("人数上限不能为小于0！");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
            }
            
            if(!flag){
                var datas = $.extend({}, strParser($form.serialize()));
                var str = "";
                
                if(courseId){
                    datas.id = courseId;
                }
                datas.description = encodeURIComponent(datas.description);
                datas.beginTime = decodeURIComponent(datas.beginTime).replace("+", " ");
                datas.endTime = decodeURIComponent(datas.endTime).replace("+", " ");
                
                str = "jsonString={" + jsontoStr(datas) + "}";
                
                $.ajax({
                    url: dataUrl,
                    type: "post",
                    data: str,
                    dataType: "json",
                    success: function (msg){
                        if(msg.code == 200){
                            $el.parent().html("创建或修改成功！");
                        } else {
                            $tipTpl.html(msg.message);
                            
                            var $parent = $this.parent();
                            
                            if ($parent.find(".error").length > 0){
                                $parent.find(".error").remove();
                            }
                            $parent.prepend($tipTpl);
                        }
                    }
                });
            }
        });
    }
    
    var uploadCover = function ($el, coverUrl){
            var oBtn = $el.find("#buploadBtn");
            var oImg = $el.find("#bcoverBig");
            var oIpt = $el.find("#bpicUrl");
            new AjaxUpload(oBtn, {
                action: coverUrl,
                name:"file",
                onSubmit:function(file,ext){
                    if(ext && /^(JPG|JPEG|BMP|jpg|jpeg|png|gif|bmp)$/.test(ext)){
                        //ext是后缀名
                        oBtn.val("正在上传…");
                    }else{
                        alert("不支持非图片格式！");
                        return false;
                    }
                },
                onComplete:function(file,response){
                    var msg = eval("("+response+")");
                    if(msg.code == 200){
                        oBtn.val("上传成功");
                        oIpt.val(msg.data);
                        oImg.attr("src", msg.data);
                    } else {
                        oBtn.val("重新上传");
                    }
                }
            });
        }
    
    return {
        render: function (courseId, liveType){
            var $el = $("#createLiveDetail");
            var $tab = $("#createLiveTab");
            
            if (courseId && liveType == 3){
                $tab.find("li:eq(0)").hide();
                
                dataUrl = updateUrl;
                
                $el.addClass("loading");
            
                $.ajax({
                    url: liveInfoUrl(courseId),
                    dataType: "json",
                    success: function(result){
                        $el.removeClass("loading");
                        if(result.code == 200 && result.data){
                            $.tmpl(_tpl, result.data, {"decode": decode}).appendTo("#createLiveDetail");
                            
                            uploadCover($el, coverUrl);
                            
                            createLive($el, courseId);
                        }
                    }
                });
            }else{
                $.tmpl(_tpl, {}).appendTo("#createLiveDetail");
                
                $el.find("#formBBB").hide();
                
                uploadCover($el, coverUrl);
                
                createLive($el);
                
                $el.on("click", ".createLiveTabs li", function (){
                    var $contArr = [$el.find("#formLive"), $el.find("#formBBB")];
                    var index = $(this).index();
                    
                    $(this).addClass("cur").siblings().removeClass("cur");
                    
                    $contArr[index].show();
                });
            }
            
            $el.on("click", "#bbeginTime", function (e){
                WdatePicker({el:'bbeginTime',dateFmt:'yyyy-MM-dd HH:mm:ss'})
            });
            
            $el.on("click", "#bendTime", function (e){
                WdatePicker({el:'bendTime',dateFmt:'yyyy-MM-dd HH:mm:ss'})
            });
        },
        doInit: function (courseId, liveType){
            this.render(courseId, liveType);
        }
    }
});