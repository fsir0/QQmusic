(function($, root) {
    function audioControl() {
        this.audio = new Audio;;
        this.status = "pause";
    }
    audioControl.prototype = {
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        getAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
            if(this.status == "play") {
                this.audio.play();
            } else if(this.status == "pause") {
                this.audio.pause();
            }
        },
        // 给audio增加playTo方法,让音乐从指定的起点开始播
        playTo: function(time) {
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioControl = audioControl;
})(window.Zepto, window.player || (window.player = {}))