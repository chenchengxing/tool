/**
 * @module groupCreateDetail
 * 
 * @name 标签页 申请创建小组
 * @author HI:lovexctk  <zhangwei11@baidu.com>
 * @version 2013-3-18
 */



define(['urls', 'tpls', 'urlParser'], function(_url, _tpl, urlparser) {
    var tpl = _tpl["groupCreateDetail"];
    var creatUrl = _url["groupSave"];
    var updataUrl = _url["groupUpdate"];
    var logoUrl = _url["groupLogo"];
    var editUrl = _url["groupEdit"];

    var $el = $("#groupCreateDetail");
    
    var uploadCover = function ($el, url){
        var oBtn = $el.find("#uploadBtn");
        var oImg = $el.find("#coverBig");
        var oIpt = $el.find("#picUrl");
        new AjaxUpload(oBtn, {
            action: url,
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
    
    var tipInfo = function (el, str){
        if (el.parent().find(".error").length > 0){
            el.parent().find(".error").remove();
        }
        el.parent().append(str);
    }
    
    var createGroup = function ($el, url, groupId){
        var $name = $("#groupName");
        var $desc = $("#groupDescription");
        var $logo = $("#picUrl");
        var $tipTpl = $('<p class="error"></p>');
        
        $name.blur(function() {
            if($.trim($name.val()).length > 50){
                $tipTpl.html("小组名称不能超过50个字！");
            } else {
                $tipTpl.html("");
            }
        });
        $desc.blur(function() {
            if($.trim($desc.val()).length > 500){
                $tipTpl.html("小组简介不能超过500个字！");
            } else {
                $tipTpl.html("");
            }
        });
        
        $el.on("click", ".confirm", function (e){
            e.preventDefault();
            
            var $this = $(this);
            
            if($name.val() != ""){
                $name.parent().find(".error").remove();
            }
            
            if($desc.val() != ""){
                $desc.parent().find(".error").remove();
            }
            
            if($.trim($name.val()) == ""){
                $tipTpl.html("小组名称不能为空！");
                tipInfo($name, $tipTpl);
                return;
            }else if($.trim($name.val()).length > 50){
                $tipTpl.html("小组名称不能超过50个字！");
                
                tipInfo($name, $tipTpl);
                return;
            }
            
            if($.trim($desc.val()) == ""){
                $tipTpl.html("小组简介不能为空！");
                tipInfo($desc, $tipTpl);
                return;
            }else if($.trim($desc.val()).length > 500){
                $tipTpl.html("小组简介不能超过500个字！");
                
                tipInfo($desc, $tipTpl);
                return;
            }
            
            
            
            var datas = {};
            
            if(groupId){
                datas = {"id": groupId, "name": $name.val(), "desc": $desc.val(), "logo": $logo.val()}
            }else{
                datas = {"name": $name.val(), "desc": $desc.val(), "logo": $logo.val()}
            }
            
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: datas,
                success: function (msg){
                    if(msg.code == 200){
                        $el.html('<p>操作成功，点击查看<a href="groupInfo.html?groupId='+msg.data+'" style="color:#E26A49;">小组详情</a></p>');
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
        });
    }
    
    return {
        render: function (){
            
            if(urlparser){
                var groupId = urlparser["groupId"];
                
                $el.addClass("loading");
                
                $("#groupCreateTab").find("b").text("管理小组");
                
                $.ajax({
                    url: editUrl(groupId),
                    type: "get",
                    success: function (msg){
                        $el.removeClass("loading");
                        
                        msg.data.groupId = groupId;
                        $.tmpl(tpl, msg.data).appendTo("#groupCreateDetail");
                        
                        uploadCover($el, logoUrl);
                        
                        createGroup($el, updataUrl, groupId);
                    }
                })
                
            }else{
                $.tmpl(tpl, {}).appendTo("#groupCreateDetail");
                
                uploadCover($el, logoUrl);
                
                createGroup($el, creatUrl);
            }
            
        },
        doInit: function (){
            this.render();
        }
    }
});