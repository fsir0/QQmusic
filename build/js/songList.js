(function ($, root) {
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
        MyfadeIn($songList, 'bottom', '0');
    };

    function hide() {
        $songList.css('bottom', '-200px');
        $mark.css('opacity', '0');
        $mark.css('display', 'none');
    };
    // 渲染播放列表
    function listRender(data) {
        var list = "";
        data.forEach((ele, index) => {
            list += `<li>${ele.name}</li>`;
        });
        if(list == "") {
            return;
        }
        $scope.find('ul.list').html(list)
    };
    root.listControl = {
        show,
        hide,
        listRender,
    }
})(window.Zepto, window.player || (window.player = {}))