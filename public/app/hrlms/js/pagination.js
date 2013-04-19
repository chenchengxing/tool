/**
 * @module pagination
 * 
 * @name 分页模块
 * @author hi:lovexctk <zhangwei11@baidu.com>
 * @version 2013-3-4
 */



define(function() {
    
    return {
        render: function (options, cbfn){
            var $el = $("#pagination");
            var defaults = {
                "pageNo": 1,
                "pageSize": 10
            }
            
            var opts = $.extend({}, defaults, options);
            
            var pageNo = parseInt(opts.pageNo);
            var totalPages = opts.totalPages;
            var str = '';
            var startIndex = 1;
            var params = opts;
            var loopNum = Math.min(pageNo+3,totalPages);
            
            delete params["totalPages"];
            delete params["callback"];
            
            if (totalPages <= 1) {
                return false;
            }
            
            
            // 添加上一页
            if (pageNo != 1){
                params["pageNo"] = pageNo - 1;
                str += '<a href="?';
                str += $.param(params);
                str += '" class="page-prev">上一页</a> ';
            }
            
            if (totalPages < 6){
                startIndex = 1;
                loopNum = totalPages;
            }
            if(totalPages >= pageNo && pageNo > 4){
                startIndex = pageNo - 3;
            }
            if(pageNo <= 4 && totalPages >6){
                loopNum = 6;
            }
            
            for (; startIndex <= loopNum; startIndex++) {
                
                if(startIndex == pageNo ){
                    str += '<span>'
                    str += startIndex;
                    str += '</span> ';
                } else {
                    params["pageNo"] = startIndex;
                    str += '<a href="?';
                    str += $.param(params);
                    str += '">';
                    str += startIndex;
                    str += '</a> ';
                }
            }
            
            // 添加...
            if (loopNum < totalPages){
                str += '<span class="page-dot">...</span> ';
            }
            
            // 添加下一页
            if (totalPages !=0 && pageNo != totalPages){
                params["pageNo"] = pageNo + 1;
                str += '<a href="?';
                str += $.param(params);
                str += '" class="page-next">下一页</a> ';
            }
            
            $el.html(str);
            
            if(typeof cbfn == "function"){
                cbfn.call(params);
            }
        },
        doInit: function (options, fn){
            this.render(options, fn);
        }
    }
});