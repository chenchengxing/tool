/**
 * @module personalCenterLearningLearningInfo
 * 
 * @name  正在学习的课程(个人中心) 顶部
 * @version 1.0.0
 */



define(['tpls'], function(_tpl) {
    
    var tpl = _tpl.personalCenterLearningLearningInfo;
    
    return {
        render: function (data){
            $.tmpl(tpl, data).appendTo("#personalCenterLearningLearningInfo");
        },
        doInit: function (data){
            this.render(data);
        }
    }
});
