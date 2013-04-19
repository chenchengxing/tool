/**
 * @module comment
 * 
 * @name 评论模块
 * @version 1.0.0
 */



define(['tpls'], function(_tpl) {
    
    var tpl = _tpl.comment;
    var playerTpl = _tpl.playerComment;
    
    return {
        render: function (userId, type){
            if (type == "player") {
                $("#comment").addClass("player-comment");
                // $("#comment").html(playerTpl);
            } else {
                $("#comment").addClass("comment-input");
                // $("#comment").html(tpl);
            }
            
            $("#comment").empty();
            
            $.tmpl(tpl, {"type" : type}).appendTo("#comment");

            $("#rating").mouseover(function () {
                $(this).mousemove(function (e) {
                    var site = e.clientX - $(this).offset().left;

                    var range = Math.ceil(site / 18);
                    if (range >= 5) range = 5;
                    $("#rating img").css("marginLeft", (range * 18 - 90) + "px");
                });
            }).mouseout(function () {
                $(this).unbind("mousemove");
            });

            $("#comment textarea").keyup(function () {
                if ($(this).val().length > 1000) {
                    $(this).val($(this).val().substr(0, 1000));
                }
            });

            $("#comment .gbtn").click(function () {
                var score = parseInt($("#rating img").css("marginLeft"))  / 18 + 5;
                var text =  $("#comment textarea").val();
                console.log(score);
                console.log(text);
                console.log(userId);

            });


        },
        doInit: function (userId, type){
            // 
            this.render(userId, type);
        }
    }
});
