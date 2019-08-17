// 控制播放index，返回curindex
(function($,root){
    // controlManager的构造函数
    function ControlManager(len){
        this.index = 0
        this.len = len
    }
    //定义原型链上的方法 prev next getIndex
    ControlManager.prototype = {
        prev:function(){
            // index --
            return this.getIndex(-1)
        },
        next:function(){
            // index ++
            return this.getIndex(1)            
        },
        getIndex:function(val){
            var index = this.index
            var len = this.len
            // 不管几圈，获取的都是新的index
            var curIndex = (index +val +len)% len
            this.index = curIndex
            return curIndex
        }
    }

    root.ControlManager =  ControlManager
})(window.Zepto,window.player || (window.player = {}))