// 渲染操作

(function($, root) {
    var $scope = $(document.body);
    function renderInfo(info) {
        var _html = '<div class="song-name">'+ info.name +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>'
        $(".song-info", $scope).html(_html);
    }
    function renderImg(src) {
        var _img = new Image();
        _img.src = src;
        _img.onload = function() {
            $scope.find(".song-img img").attr("src", src);
        }
    }
    root.render = function render(data) {
        if(!data) {
            console.log("未获取到数据");
            return;
        }
        renderInfo(data);
        renderImg(data.images);
    }
    // 通过window.player来暴露此函数
})(window.Zepto, window.player || (window.player = {}))