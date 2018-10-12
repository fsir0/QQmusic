// 进度条
(function($, root) {
    // 渲染时间 duration
    var $scope = $(document.body);
    // 用函数内的全局变量来保存：
    // 当前歌曲总时长
    // 动画驱动器
    // 开始时间
    // 当前停止时的百分比
    var curDuration,
        frameId,
        startTime,
        lastePercent = 0;
    function renderAllTime(time) {
        curDuration = time;
        time = formatTime(time);
        // 每次renderAllTime的时候将lastepercent清零
        lastepercent = 0;
        $scope.find('.all-time').html(time);
    }
    function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = time % 60;
        // 对数据进行处理，小于10则在数字前加0
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return min + ':' + sec;
    }
    // 用requestAnimationFrame记录播放事件
    function start(p) {
        // 如传入百分比，则用此百分比作为累加百分比基数
        lastePercent = p == undefined ? lastePercent : p;
        startTime = new Date().getTime();
        // requestAnimationFrame根据当前浏览器的驱动事件来触发事件
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastePercent + (curTime - startTime) / (curDuration * 1000);
            // 判断当前时间不能超过总时长，超过则不执行更新时间了，并且不再循环此函数
            if(percent < 1) {
                // 类似于setTimeout
                frameId = requestAnimationFrame(frame);
                update(percent);
            }
        }
        frame();
    }
    // 停止requestAnimationFrame
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        // 让百分比进行累计，否则每次都会以上一次暂停重新计时。因此采用+=
        lastePercent += (stopTime - startTime) / (curDuration * 1000);
    }
    // 实时更新进度条和开始时间
    function update(per) {
        // 计算出目前是当前这首歌的多少秒
        var curTime = curDuration * per;
        // 格式化时间
        curTime = formatTime(Math.round(curTime));
        $scope.find('.cur-time').html(curTime);
        // 根据当前百分比渲染进度条
        $scope.find('.pro-top').css({
            transform: 'translateX(' + (per - 1) * 100 + '%)'
        })
    }
    root.pro = {
        renderAllTime,
        update,
        start,
        stop
    }
})(window.Zepto, window.player || (window.player = {}))
