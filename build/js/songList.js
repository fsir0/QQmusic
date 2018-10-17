(function($, root) {
    var $scope = $(document.body);
    var $mark = $scope.find('.mark');
    var $songList = $scope.find('.song-list');
    // Zepto中没有fadeIn方法，自己定义一个MyfadeIn方法,仅在此js内使用
    function MyfadeIn($dom, item, value) {
        $dom.css('display', 'block');
        setTimeout(() => $dom.css(item, value), 0);
    };
    function show() {
        MyfadeIn($mark, 'opacity', '0.8');
        // MyfadeIn($songList, 'bottom', '0');
    };
    function hide() {
        // $songList.css('bottom', '-200px');
        $mark.css('opacity', '0');
        // setTimeout(() => $mark.css('display', 'none'), 10);
    }
    root.listControl = {
        show,
        hide
    }
})(window.Zepto, window.player || (window.player = {}))