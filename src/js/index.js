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
        $scope.trigger("play:change", index);
        // 给下一首绑定事件
    }).on("click", ".next-btn", function() {
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
    $sliderBottom.on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        // 点击时判断百分比大于1或则小于0时失效
        if(per <= 0 || per >= 1) {
            return;
        }
        root.pro.update(per);
    });
    $slider.on('touchstart', function() {

    }).on('touchmove', function(e) {
        // console.log(e) // 找到e中的clientX
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        // per在0~1实现拖拽,在之外进行置位处理
        if(per > 0 && per < 1) {
            root.pro.update(per);
        } else if( per <= 0) {
            root.pro.update(0);
        } else {
            root.pro.update(0.9999);
        }
    }).on('touchend', function() {
        
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