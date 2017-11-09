/**
 * Created by Lidy on 2017/11/9.
 */
+function () {
    var productList = function () {//构造函数
        this.$productTableList = $("#productTableList");
        this.$productListGroup = this.$productTableList.children('.group');
    }
    productList.prototype = {
        init: function () {
            this.setListLevel();
            this.setProgress();
        },
        setListLevel: function () {
            var length = this.$productListGroup.length;
            this.$productListGroup.each(function (index) {//设置列表 zindex属性改变阴影效果层级
                $(this).css('zIndex', length - index);
            })
        },
        setProgress: function () { //设置进度效果
            this.$productListGroup.each(function (index, item) {
                var $progressBar = $(this).find('.progress-bar');
                $progressBar.css({
                    width: $progressBar.data('progress') + '%'
                })
            })
        }
    }
    new productList().init();
}();