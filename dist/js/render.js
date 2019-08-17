// 实现动态页面渲染操作 img+info+like-btn
(function($,root ){
    // console.log(root)
    var $scope = $(document.body)
    // 渲染歌信息
    function renderInfo(info){
        var html =`<div class="song-name">${info.song}</div>
                    <div class="singer-name">${info.singer}</div>
                    <div class="album-name">${info.album}</div>`
        $scope.find('.song-info').html(html)//渲染页面
    }
    // 渲染歌图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img, $scope);//背景高斯模糊
            $scope.find('.song-img img').attr('src',src)//添加src属性
        }
        img.src = src;//src添加到src属性中
    }
    // 收藏
    function renderIsLike(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liking')
        }else{
            $scope.find('.like-btn').removeClass('liking')
        }    
    }
    // 暴露接口，参数传入ajax数据
    root.render = function(data){
        // console.log(data)
        renderInfo(data)
        renderImg(data.image)
        renderIsLike(data.isLike)
    }    
})(window.Zepto,window.player || (window.player= {}))
// 通过window.player暴露函数