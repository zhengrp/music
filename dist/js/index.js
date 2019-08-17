var $ = window.Zepto
var root = window.player
var $scope = $(document.body)
var songlist
var controlManager //控制器对象
// var index =0
var audio =  root.audioControl
var timer 
// var audio = new root.audioManager();
console.log(root)
// bindEvent()
function bindEvent(){
    console.log(1)
    // 添加自定义事件
    $scope.on('play:change',function(e,index){
        // console.log(songlist[index].audio)
        // console.log(index)
        audio.getAudio(songlist[index].audio)
        if(audio.status == 'play'){
            audio.play()
            root.pro.start()
            rotated(0)
        }
        $(".img-wrapper").attr("data-deg",0)
        $(".img-wrapper").css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })

        root.pro.renderAllTime(songlist[index].duration) 
        root.render(songlist[index]);                                        
    })
    // 添加，点击事件
    // 上一曲
    $scope.on('click','.prev-btn',function(){
        // if(index===0){
        //     index = songlist.length -1
        // }else{
        //     index--
        // }
        var index = controlManager.prev() 
        // console.log(index)  
        //执行渲染                  
        $scope.trigger('play:change',index)        
    })
    // 下一曲
    $scope.on('click','.next-btn',function(){
        
        // if(index===songlist.length -1){
        //     index = 0
        // }else{
        //     index++
        // }//此处抽离到controlManager.js
        var index = controlManager.next()    
        // console.log(index)  
        $scope.trigger('play:change',index)
        
    })
    // 播放&暂停
    $scope.on('click','.play-btn',function(){
        if(audio.status == 'pause'){
            audio.play()
            root.pro.start()
            var deg = $('.img-wrapper').attr('data-deg')
            console.log(deg); 
            rotated(deg)
        }else{
            audio.pause()
            root.pro.stop()
            clearInterval(timer);            
        }
        // 切换播放按钮
        $(this).toggleClass('playing')
    })
    //收藏
    $scope.on('click','.like-btn',function(){
        $(this).toggleClass('liking')
    })
   
}
function touchEvent(){

}

// CD旋转
function rotated(deg){
    deg = +deg //类型转换
    clearInterval(timer)
    timer = setInterval(function(){
        deg += 2
        $(".img-wrapper").attr("data-deg",deg)
        $(".img-wrapper").css({
            'transform': 'rotateZ('+ deg +'deg)',
            'transition': 'all 0.5s'
        })
    },200)
}

// 请求ajax数据
getData('../mock/data.json')
function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function (data){
            // console.log(data)
            // 保存歌曲列表数据
            songlist = data
            // 渲染数据
            root.render(data[0])
            bindEvent()
            // 构造对象保存到控制器对象
            controlManager = new root.ControlManager(data.length)
            // 触发自定义事件
            $scope.trigger('play:change',0)
        },
        error:function(){
            console.log('error')
        }
    })

}
