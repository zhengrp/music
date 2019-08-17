(function api ($,url){
    function getData(url){
        $.ajax({
            type:'GET',
            url:url,
            success:function (data){
                // console.log(data)
                // 数据给songlist
                songlist = data
                // 默认渲染第一首
                root.render(data[0])
                bindEvent()
                // 构造对象
                controlManager = new root.controlManager(data.length)
                // 触发自定义事件
                $scope.trigger('play:change',0)
            },
            error:function(){
                console.log('error')
            }
        })
    }
    window.getData = getData
})(window.Zepto,url)