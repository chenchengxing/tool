/**
 * @module personalCenterSelectable
 * 
 * @name 个人中心-可选课表
 * @version 1.0.0
 */



define(['user', 'top', 'header', 'footer', 'personalCenterNav', 'liveTimeLine', 'urls'], 
    function(user, top, hd, ft, pcn, ltl, urls) {
    var userInit = user.doInit();
    
    hd.doInit();
    
    ft.doInit();
    
    userInit.done(function (){
        top.doInit(this);
        
        pcn.doInit(this, "selectable");

        ltl.doInit(this, "personalCenterSelectableList");

        var username = this.data.username;
        var dealingFlag = false;
        $("#personalCenterSelectableList").live("click", function (e) {
            if ($(e.target).hasClass("gbtn") && !dealingFlag) {
                e.preventDefault();
                dealingFlag = true;
                var cache = ltl.getCacheData();
                var index = $("#personalCenterSelectableList li").index($(e.target).parent().parent().parent());
                var param = {};
                param.username = username;
                param.chooseCheckBox = cache.data.result[index].id;
                // console.log(param.chooseCheckBox);
                // param.chooseCheckBox = 4970259;
                // param.username = "jiangzhenghao";
                param.forward = "index.html";
                $.ajax({
                    type : "post",
                    url: urls.courseSignUp,
                    dataType: "json",
                    data : param,
                    success: function(result){
                        alert(result.data.result);
                        if (result.code == 200){
                            // window.location.href = "personalCenterCalendar.html";
                            window.location.reload();
                        }
                        //refresh dealing status
                        dealingFlag = false;
                    }
                });
                return false;
            } else if ($(e.target).is("a")) {
                ;
            }
            else {
                return false;
            }
        });
    });
    
    
});