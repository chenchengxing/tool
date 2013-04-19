/**
 * @module formLive
 * 
 * @name 直播课堂页  现场直播表单
 * @version 1.0.0
 */



define(['urls', 'tpls', 'jquery.tmpl'], function(_url, _tpl) {
    
    var _tpl = _tpl["formLive"];
    var liveInfoUrl = _url["liveCourseInfo"];
    var dataUrl = _url["formLive"];
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
    
    var uploadCover = function ($el, coverUrl){
        var oBtn = $el.find("#uploadBtn");
        var oImg = $el.find("#coverBig");
        var oIpt = $el.find("#picUrl");
        
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
                if (response.indexOf("PRE") > -1){
                    response = response.replace("<PRE>","").replace("</PRE>","");
                }
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
    
    var createLive = function ($el, courseId){
        $el.find("#formLive").on("click", ".confirm", function (e){
            e.preventDefault();
            
            var $this = $(this);
            var $form = $el.find("#formLive");
            var iptArr = [$form.find("#name"), $form.find("#description"), $form.find("#beginTime"), $form.find("#endTime"), $form.find("#contactPersonMail"), $form.find("#address"), $form.find("#maxUser")]
            var tipArr = ["标题不能为空", "简介不能为空", "教室开放时间不能为空", "教室开放时间不能为空", "联系人邮箱不能为空","直播地点不能为空", "人数上限不能为空"];
            var $tipTpl = $('<p class="error"></p>');
            var flag = false;
            
            $.each(iptArr, function (i,v){
                if($(this).val() == ""){
                    $tipTpl.html(tipArr[i]);
                    if ($(this).parent().find(".error").length > 0){
                        $(this).parent().find(".error").remove();
                    }
                    $(this).parent().append($tipTpl);
                    flag = true;
                }
            });
            
            if(!flag){
                if($form.find("#name").val().length > 50){
                    var $parent = $form.find("#name").parent();
                    $tipTpl.html("您输入的标题过长");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test($form.find("#contactPersonMail").val())){
                    var $parent = $form.find("#contactPersonMail").parent();
                    $tipTpl.html("您输入的邮箱格式不正确");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                var formatDate = function (time){
                    // 先转换成 2011/11/11 11:11:11
                    return new Date(Date.parse(time.replace(/-/g,"/")));
                }
                
                var _t1 = formatDate($form.find("#beginTime").val());
                var _t2 = formatDate($form.find("#endTime").val());
                
                if(_t1.getYear() !=_t2.getYear() || _t1.getMonth() != _t2.getMonth() || _t1.getDate() != _t2.getDate()){
                    var $parent = iptArr[3].parent();
                    $tipTpl.html("开始时间和结束时间的日期必须同一天！");
                    if ($parent.find(".error").length > 0){
                        $parent.find(".error").remove();
                    }
                    $parent.append($tipTpl);
                    flag = true;
                }
                
                if(formatDate($form.find("#endTime").val()) < formatDate($form.find("#beginTime").val())){
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
    
    return {
        render: function (courseId, liveType){
            var $el = $("#createLiveDetail");
            var $tab = $("#createLiveTab");
            
            if (liveType){
                if(liveType != 3){
                    $tab.find("li:eq(1)").hide();
                    
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
                }
            }else{
                $.tmpl(_tpl, {}).appendTo("#createLiveDetail");
                
                uploadCover($el, coverUrl);
                
                createLive($el);
                
                $("#createLiveForm").on("click", ".createLiveTabs li", function (){
                    var $contArr = [$el.find("#formLive"), $el.find("#formBBB")];
                    var index = $(this).index();
                    
                    $(this).addClass("cur").siblings().removeClass("cur");
                    $.each($contArr, function(){
                        $(this).hide();
                    });
                    $contArr[index].show();
                });
            }
            
            $el.on("click", "#beginTime", function (e){
                WdatePicker({el:'beginTime',dateFmt:'yyyy-MM-dd HH:mm:ss'})
            });
            
            $el.on("click", "#endTime", function (e){
                WdatePicker({el:'endTime',dateFmt:'yyyy-MM-dd HH:mm:ss'})
            });
        },
        doInit: function (courseId, liveType){
            this.render(courseId, liveType);
        }
    }
});