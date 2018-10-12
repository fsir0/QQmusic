// var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
var audio = new root.audioControl();
function bindEvent() {
    $scope.on("play:change", function(e, index, p) {
        audio.getAudio(songList[index].audio);
        if(audio == "play") {
            audio.play();
            root.pro.start();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        // 给上一首绑定事件
    }).on("click", ".prev-btn", function() {
        // 调用封装controlManager的判断当前index值
        index = controlManager.prev();
        root.pro.start(0);
        $scope.trigger("play:change", index);
        // 给下一首绑定事件
    }).on("click", ".next-btn", function() {
        root.pro.start(0);
        index = controlManager.next();
        $scope.trigger("play:change", index);
        // 给暂停和播放绑定事件
    }).on("click", ".play-btn", function() {
        if(audio.status == "play") {
            audio.pause();
            root.pro.stop();
        } else {
            audio.play();
            root.pro.start();
        }
    });
    bindTouch();
}
// 进度条拖拽的实现
function bindTouch() {
    var $sliderBottom = $scope.find('.pro-wrapper');
    var $slider = $scope.find('.pro-top');
    var offset = $scope.find('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    // $sliderBottom.on('touchend', function(e) {
    //     var x = e.changedTouches[0].clientX;
    //     var per = (x - left) / width;
    //     // 点击时判断百分比大于1或则小于0时失效
    //     if(per <= 0 || per >= 1) {
    //         return;
    //     }
    //     root.pro.update(per);
    // });
    $slider.on('touchstart', function() {
        // 拖动的时候让进度条停止但是音乐不停止
        root.pro.stop();
    }).on('touchmove', function(e) {
        // console.log(e) // 找到e中的clientX
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        // per在0~1实现拖拽,在之外进行置位处理
        if(per > 0 && per < 1) {
            console.log(per);
            console.log(root.pro.update);
            // 仅仅更新进度条，在下一个事件中触发运动
            root.pro.update(per);
        } else if( per <= 0) {
            root.pro.update(0);
        } else {
            root.pro.update(0.9999);
        }
    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per < 1) {
            // 获取当前拖动到的时间用于控制音乐的位置
            var curTime = per * songList[controlManager.index].duration;
            // 控制声音从当前秒数开始播放
            audio.playTo(curTime);
            // 控制进度条从当前百分比开始运动
            root.pro.start(per);
        } else if(per < 0) {
            // 控制歌曲从0开始播放
            audio.playTo(0);
            // 控制进度条从0开始运动
            root.pro.start(0);
        } else {
            $scope.find('.next-btn').trigger('click');
        }
    })
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            songList = data;
            bindEvent();
            controlManager = new root.controlManager(data.length);
            root.render(data[0]);
            $scope.trigger("play:change", index);
        },
        error: function(err) {
            console.log("error" + err);
        }
    })
}
 getData("../mock/data.json")