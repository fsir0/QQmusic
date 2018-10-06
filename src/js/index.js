// var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;
function bindEvent() {
    $scope.on("click", ".prev-btn", function() {
        if(index == 0) {
            index = songList.length - 1;
        } else {
            index --;            
        }
        root.render(songList[index]);
    }).on("click", ".next-btn", function() {
        if(index == songList.length - 1) {
            index = 0;
        } else {
            index ++;
        }
        root.render(songList[index]);
    })
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            console.log(data);
            songList = data;
            bindEvent();
            root.render(data[0]);
        },
        error: function(err) {
            console.log("error" + err);
        }
    })
}
 getData("../mock/data.json")