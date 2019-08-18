// 控制音乐播放
(function($,root){
    // 控制音频对象
    function AudioControl(){
        this.audio = new Audio()
        // audio 默认状态
        this.status = 'pause'//初始暂停

    }
    // 原型对象上增加 play pause getAudio 方法
    AudioControl.prototype = {
        play:function(){
            this.audio.play()
            this.status = 'play'
        },
        pause:function(){
            this.audio.pause()
            this.status = 'pause'
        },
        getAudio:function(src){
            this.audio.src = src
            this.audio.load()
        },
        playTo:function(time){
            this.audio.currentTime = time
            this.audio.play()

        }
    }
    // 暴漏接口
    root.audioControl = new AudioControl
})(window.Zepto,window.player || (window.player = {}))