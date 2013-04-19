/**
 * @module livePlayBox
 * 
 * @name 播放页 播放器
 * @version 1.0.0
 */



define(['urls', 'tpls', "swfobject"], function(_url, _tpls) {

    var dataUrl = _url["livePlayBox"];
    var elementView = _url["elementView"];
    var tpl = _tpls.peixunClassroom;
    var bbbUrl = _url["peixunClassroom"];
    var constructLivePlayUrl = function (url, courseId, width, height) {
        return url + "?id=" + courseId + "&height=" + height + "&width=" + width;
    }
    return {
        render: function (data){
            var $el = $("#livePlayBox");

            // var w = $el.width();
            var w = 980;
            var h = $el.parent().height() - 80;

            if (data.liveType != 3) {
                $el.html('<iframe src="" frameborder="0" height="'+h+'" width="'+w+'"></iframe>');
                var $ifm = $el.find("iframe");
                $ifm.attr("src", constructLivePlayUrl(dataUrl(data.liveType), data.id, w, h));
            } else {
                $("#livePlay").empty();
                $("<div />").attr("id","peixunClassroomContent").appendTo($("#livePlay"));
                var getParam = function (paramName) {
                    paramValue = "";
                    isFound = false;
                    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=")>1)
                    {
                        arrSource = unescape(this.location.search).substring(1,this.location.search.length).split("&");
                        i = 0;
                        while (i < arrSource.length && !isFound)
                        {
                            if (arrSource[i].indexOf("=") > 0)
                            {
                                 if (arrSource[i].split("=")[0].toLowerCase()==paramName.toLowerCase())
                                 {
                                    paramValue = arrSource[i].split("=")[1];
                                    isFound = true;
                                 }
                            }
                            i++;
                        }   
                    }
                   return paramValue;
                }

                $.ajax({
                    url : bbbUrl,
                    data : {"q": data.id},
                    dataType : "json",
                    success : function (response) {
                        var sec=getParam('sec');
                        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
                        var swfVersionStr = "10.3.0";
                        // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
                        var xiSwfUrlStr = "playerProductInstall.swf";

                        var flashvars = {};
                        flashvars.sectionId = response.data.sectionId;
                        flashvars.appId = response.data.appId;
                        flashvars.courseTitle = response.data.courseTitle;
                        flashvars.externUserId = response.data.externUserId;
                        
                        flashvars.username = response.data.username;
                        flashvars.role = response.data.role;
                        flashvars.maxUsers = response.data.maxUsers;
                        flashvars.sTime = response.data.sTime;
                        flashvars.eTime = response.data.eTime;
                        flashvars.iconURL = response.data.iconURL;
                        flashvars.callbackURL = response.data.callbackURL;
                         //secretKey

                        var params = {};
                        params.quality = "high";
                        params.bgcolor = "#ffffff";
                        params.allowscriptaccess = "always";
                        params.allowfullscreen = "true";
                        var attributes = {};
                        attributes.id = "PeixunClassroomLive";
                        attributes.name = "PeixunClassroomLive";
                        attributes.align = "middle";
                        swfobject.embedSWF(
                            response.data.swf, "peixunClassroomContent", 
                            "100%", "700", 
                            swfVersionStr, xiSwfUrlStr, 
                            flashvars, params, attributes);
                        // JavaScript enabled so display the peixunClassroomContent div in case it is not replaced with a swf object.
                        swfobject.createCSS("#peixunClassroomContent", "display:block;text-align:left;");
                        // var addScript = '<script type="text/javascript">function AS_closePage(){window.close();}</script>';
                        // console.log("here")
                        // $("body").append(addScript);
                        var script   = document.createElement("script");
                        script.type  = "text/javascript";
                        script.text  = "function AS_closePage(){window.close();}";
                        document.body.appendChild(script);
                    }
                });
                
            }
        },
        doInit: function (data){
            this.render(data);
        }
    };
});