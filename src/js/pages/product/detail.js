/**
 * Created by lidy on 2017/11/11.
 */
+function () {
    var productList = function () {//构造函数
        this.$productDetailBar = $("#productDetailBar");
    }
    productList.prototype = {
        init: function () {this.setProgress();
        },
        setProgress: function () { //设置进度效果
            var $progressBar = this.$productDetailBar.find('.progress-bar');
            $progressBar.css({
                width: $progressBar.data('progress') + '%'
            })
        }
    }
    new productList().init();
}();