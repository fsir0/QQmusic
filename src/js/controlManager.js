// 控制按钮
(function($, root) {
    root.controlManager = function controlManager(len) {
        this.index = index;
        this.len = 0;
    }

    controlManager.prototype = {
        prev: function() {
            // index--;
            this.getIndex(-1);
        },
        next: function() {
            // index++;
            this.getIndex(+1);
        },
        getIndex: function(val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

})(window.Zepto, window.player || (window.player = {}))