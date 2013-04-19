/**
 * @module courseInfo
 * 
 * @name 课程中心-课程详情
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'courseDetail', 'recentStudent', 'relateCourse', 'onlineCourse', /*'faceTrain', */'learnDocs', 'publisher', 'tweetList', 'courseOwner'], function(user, top, hd, ft, cd, rs, rt, oc, ld, pl, tl, courseOwner) {
    var userInit = user.doInit();
    userInit.done(function (){
        top.doInit(this);
        
        var uid = this.data.id;
        
        cd.doInit(function (){
            var courseId = this.id;
            var groupId = this.snsGroupId;
            var $el = $("#courseDetail");
            var tabContArr = ["onlineCourse", /*"faceTrain", */"learnDocs", "publisher", "tweetList","pagination"];
            var contArr = [oc, /*faceT, */ld];
            
            courseOwner.doInit(this);
            
            rs.doInit(courseId);
            rt.doInit(courseId);
            
            pl.doInit(groupId,tl.refresh,"",1);
            tl.doInit(groupId, 'tweetList', 0, function(data){
                $("#courseDetail .i-c").parent().html('<i class="i-c"></i>评论('+data.data.totalCount+')')
            });
                
            $("#courseDetail").on("click", ".tab-btns li", function (){
                var index = $(this).index();
                
                $(this).siblings().removeClass("cur");
                $(this).addClass("cur");
                $el.find("#"+tabContArr[index]).siblings().hide();
                $el.find("#"+tabContArr[index]).show();

                if(index == 2){
                    tl.refresh();
                    $el.find("#"+tabContArr[index]).show();
                    $el.find("#"+tabContArr[index+1]).show();
                    $el.find("#"+tabContArr[index+2]).show();
                } else {
                    contArr[index].doInit(courseId);
                }
            });
            $("#courseDetail .tab-btns li:eq(0)").click();
        });
    });
    
    hd.doInit(1);
    
    ft.doInit();
    
    
});