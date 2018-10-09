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
        }
    }).on("click", ".prev-btn", function() {
        // 调用封装controlManager的判断当前index值
        index = controlManager.prev();
        root.render(songList[index]);
        $scope.trigger("play:change", index);
    }).on("click", ".next-btn", function() {
        index = controlManager.next();
        root.render(songList[index]);
        $scope.trigger("play:change", index);
    }).on("click", ".play-btn", function() {
        if(audio.status == "play") {
            audio.pause();
        } else {
            audio.play()
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