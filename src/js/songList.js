(function($, root) {
    var $scope = $(document.body);
    var $mark = $scope.find('.mark');
    function listControl() {

    }
    listControl.prototype = {
        show: function() {
            $mark.animate({display: 'block', opacity: '0.8'}, 400);
        }
    }
})(window.Zepto, window.player || (window.player = {}))