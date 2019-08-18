(function($,root){
    
    var $scope = $(document.body)
    var curDuration;//歌曲时长
    var frameId;
    var lastPer =0;
    var starTime;
    // 渲染总时间1
    function renderAllTime(time){
        curDuration = time
        // 253--02:13,
        var alltime = fromatTime(time)
        $scope.find('.all-time').html(alltime);
    }
    // 时间格式转换 253--02:13,
    function fromatTime(time){
        time = Math.round(time)
        var m = Math.floor(time / 60)//分钟
        var s = time - m*60;
        if(m<10){
            m = '0' + m
        }
        if(s<10){
            s = '0' + s
        }
        return m + ':' + s
    }
    // 更新时间
    function start(per){
        // 清除上次
        cancelAnimationFrame(frame)
        // 获取start时间戳
        starTime = new Date().getTime()
        // console.log(111) 
        lastPer = per == undefined ? lastPer : per      
        //每刷新频率获取实时时间及占比
        function frame(){
            var curTime = new Date().getTime()
            var percent = lastPer + (curTime - starTime) / (curDuration*1000)
            // 调用更新渲染函数
            if (percent < 1) {
                update(percent)
                 // console.log(222)
            frameId = requestAnimationFrame(frame)
            }else{
                cancelAnimationFrame(frameId);
                $scope.find(".next-btn").trigger("click");
            }
            

        }
        frame()

    }
    // 暂停更新时间
    function stop(){
        cancelAnimationFrame(frameId)
        var stopTime = new Date().getTime()
        // 记录上次并更新占比
        lastPer = lastPer + (stopTime - starTime) / (curDuration*1000)
        // console.log(lastPer)  
         
    }
    // 更新渲染播放进度he时间
    function update(per){
        var time = per * curDuration
        time = fromatTime(time)
        $scope.find('.cur-time').html(time)
        var percentage = (per - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX("+percentage+")"
        })
    }
    
    

    //暴露方法
    root.pro = {
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        update: update
    }
})(window.Zepto,(window.player || (window.player = {})))