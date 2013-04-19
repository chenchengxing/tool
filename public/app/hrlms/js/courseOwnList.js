/**
 * @module groupOwnList
 * 
 * @name 小组 添加课程列表
 * @version 1.0.0
 */



define(['tpls', 'jquery.tmpl', 'urls', 'urlParser'], function(_tpl, _jq, _urls, urlParser) {

    var $csInfo = $("#csInfo");
    var dataUrl = _urls.ownCourseList;//"ownCourseList":"/platform/rs/course/list"
    
    return {
        render: function (groupId){
            var _this = $csInfo;
            
            $('<div class="tbContain"></div>').appendTo('#csInfo');
            $('<div class="cs-head"><span class="cs-ck"><input class="cs-cknum" style="visibility:hidden;" type="checkbox"/></span><span class="cs-title">课程名</span><span class="cs-name">创建者</span><span class="cs-time">更新时间</span></div>').appendTo('.tbContain');
            
            $.get(dataUrl, {keyword:'', pageSize:100, pageNo:1}, function(result) {
                if (200 == result.code) {
                    var data = result.data.result;
                    for (var i=0,len=data.length;i<len;i++) {
                        $('<div class="cs-info">'
                            +'<span class="cs-ck"><input tid="'+data[i].id+'" class="cs-cknum" type="checkbox"/></span>'
                            +'<span class="cs-title">'+data[i].name+'</span>'
                            +'<span class="cs-name">'+data[i].creatorName+'</span>'
                            +'<span class="cs-time">'+data[i].createTime+'</span>'
                        +'</div>').appendTo('.tbContain');
                    }
                    
                    _this.find('.cs-info').hover(
                        function() {
                            $(this).css('background','#FCC9A4');
                        },
                        function() {
                            $(this).css('background','#fff');
                        }
                    );
                } else {
                    $('<div style="color:red;text-align:center;">暂无数据</div>').appendTo('.tbContain');
                }
            }, 'json');
            
            $('<div class="handle"><a class="rbtn bmin" href="javascript:void(0)">确定</a></div>').appendTo('#csInfo');
            
            $('.handle .rbtn').click(function (){
                var checks = $('.cs-ck input:checked');
                var temp = [];
                for (var i=0,len=checks.length; i<len; i++) {
                    temp[i] = checks.eq(i).attr('tid');
                }
                temp = temp.join(',');
                $.post(_urls.coursegroupAdd(), {groupId: groupId ,courseId:temp}, function(result) {
                    if (200 == result.code) {
                        alert("添加成功！");
                        location.href = "groupCourse.html?groupId=" + groupId;
                    } else {
                        alert(result.message);
                    }
                }, 'json');
            });
        },
        doInit: function (groupId){
            this.render(groupId);
        }
    }
});