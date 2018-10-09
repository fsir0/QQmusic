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
        }
    }
    root.audioControl = audioControl;
})(window.Zepto, window.player || (window.player = {}))