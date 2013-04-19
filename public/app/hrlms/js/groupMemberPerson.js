/**
 * @module groupMemberPerson
 * 
 * @name 小组 成员详情
 * @version 1.0.0
 */
define(['urls', 'tpls', 'urlParser', 'pagination', 'userPopup', 'jquery.tmpl'], function (_urls, _tpl, urlParser, page, userPopup) {

    var tpl = _tpl.groupMemberPerson;
    var dataUrl = _urls["groupMemberPerson"];
    var urlObj = $.extend({}, urlParser);
    var $el = $("#groupMemberPerson");

    //绑定踢出小组成员的功能
    $el.on("click", ".mout", function () {
        var _that = this;
        if (confirm("确认要踢出小组成员" + $(_that).parent().prev().text() + "吗？")) {
            $.ajax({
                url: _urls["groupMemberQuit"],
                type: "post",
                dataType: "json",
                data: {
                    groupId: $(_that).attr("data-groupId"),
                    userId: $(_that).attr("data-userId")
                },
                success: function (data) {
                    if (data.code == 200) {
                        $(_that).closest("li").remove();
                        $("#MemberCount").text("(" + (parseInt($("#MemberCount").text().replace(/^\(|\)$/g, "")) - 1) + ")");
                    } else {
                        alert(data.message);
                    }
                }
            });
        };
        return false;
    });
    if (!urlObj.groupId) {
        urlObj.groupId = 1;
    };
    if (!urlObj.pageNo) {
        urlObj.pageNo = 1;
    };
    if (!urlObj.pageSize) {
        urlObj.pageSize = 50;
    };
    return {
        render: function (flag) {
            $el.addClass("loading");
            userPopup.doInit("#groupMemberPerson");
            $.ajax({
                url: dataUrl,
                type: "post",
                dataType: "json",
                data: urlObj,
                success: function (data) {
                    $el.removeClass("loading");
                    if (data.code == 200) {
                        data.data.admin = flag;
                        $.tmpl(tpl, data.data, {"defaultImage" : _urls.defaultImage}).appendTo($el);
                        urlObj.totalPages = data.data.totalPages;
                        page.doInit(urlObj);
                    } else {
                        $el.html(data.message);
                    }
                }
            });
        },
        doInit: function (flag) {
            this.render(flag);
        }
    };
});