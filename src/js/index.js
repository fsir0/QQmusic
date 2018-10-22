// var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
var audio = new root.audioControl();
function bindEvent() {
    $scope.on("play:change", function(e, index) {
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
        // 这里将进度条以及进度条的缓存置零并且停止运动
        // 在play:change中判断是否需要继续运动
        root.pro.start(0);
        root.pro.stop();
        $scope.trigger("play:change", index);
        // 给下一首绑定事件
    }).on("click", ".next-btn", function() {
        index = controlManager.next();
        root.pro.start(0);
        root.pro.stop();
        $scope.trigger("play:change", index);
        // 给暂停和播放绑定事件
    }).on("click", ".play-btn", function() {
        $scope.find(".play-btn").toggleClass("pause-btn");
        if(audio.status == "play") {
            // $scope.find(".play-btn").removeClass("pause-btn");
            audio.pause();
            root.pro.stop();
        } else {
            // $scope.find(".play-btn").addClass("pause-btn");
            audio.play();
            root.pro.start();
        }
    }).on("click", ".like-btn", function() {
        $scope.find(".like-btn").toggleClass("liked");
        songList[index].isLike = !songList[index].isLike;
        // console.log(songList);
        // 待调试
        // postData("../mock/accept.json", songList);
        // 打开音乐列表
    }).on('click', '.colum-btn', function() {
        root.listControl.show();
        // 关闭音乐列表
    }).on('click', '.list-close-btn', function() {
        root.listControl.hide();
        // 点击遮罩层的时候也进行关闭处理
    }).on('click', '.mark', function() {
        root.listControl.hide();
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
        $scope.find(".play-btn").addClass("pause-btn");
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
function postData(url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        successL: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log('post error' + err);
        }
    })
}
getData("../mock/data.json")