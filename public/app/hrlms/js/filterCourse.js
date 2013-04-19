/**
 * @module filterCourse
 * 
 * @name 排序/浏览方式模块
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2013-3-5
 */



define(['tpls', 'jquery.tmpl'], function(_tpl) {
    
    var tpl = _tpl.filterCourse;
    var $el = $("#filterCourse");
    
    return {
        render: function (orderBy, viewType, params){
            var obj = {
                "orderBy": 1,
                "viewType": 1
            };
            //obj = $.extend({}, params, obj);
            if ($.isEmptyObject(params)){
                params.orderBy = 1;
                params.viewType = 1;
            }
            
            var linkUrl = function(num){
                switch(num){
                    case 01:
                        obj.orderBy = params.orderBy;
                        obj.viewType = 1;
                        break;
                    case 02:
                        obj.orderBy = params.orderBy;
                        obj.viewType = 2;
                        break;
                    case 10:
                        obj.viewType = params.viewType;
                        obj.orderBy = 1;
                        break;
                    case 20:
                        obj.viewType = params.viewType;
                        obj.orderBy = 2;
                        break;
                    default:
                        obj.viewType = params.viewType;
                        obj.orderBy = 3;
                }
                return "?" + $.param($.extend({}, params, obj));
            }
            
            $.tmpl(tpl, params, {linkUrl: linkUrl}).appendTo("#filterCourse");
        },
        doInit: function (orderBy, viewType, params){
            this.render(orderBy, viewType, params);
        }
    }
});