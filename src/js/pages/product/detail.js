/**
 * Created by lidy on 2017/11/11.
 */
+function () {
    var productList = function () {//构造函数
        this.$productDetailBar = $("#productDetailBar");
        this.$subscriptionBtn = $("#subscriptionBtn");
        this.$subscriptionMoney = $("#subscriptionMoney");
        this.$subscriptionTxt = $("#subscriptionTxt");
        this.submitSubscriptionBtn = $("#submitSubscriptionBtn");
    }
    productList.prototype = {
        init: function () {
            this.setProgress();
            this.initEvent();
        },
        setProgress: function () { //设置进度效果
            var $progressBar = this.$productDetailBar.find('.progress-bar');
            $progressBar.css({
                width: $progressBar.data('progress') + '%'
            })
        },
        initEvent(){
            var self = this;
            $('.icheck').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
            $('.selectpicker').selectpicker({ //select增强
                iconBase: 'icon-font',
                tickIcon: 'icon-right'
            });
            //点击认购弹出确认认购灯箱
            this.$subscriptionBtn.on('click', function () {
                self.$subscriptionMoney.text(self.$subscriptionTxt.val() + '.00');
                layer.open({
                    type: 1,
                    area: ['618px', 'auto'], //宽高
                    title: false,
                    shadeClose: true,
                    closeBtn: true,
                    content: $("#subscriptionModal")
                });
            })
            //确认认购按钮
            this.submitSubscriptionBtn.on('click', function () {
                if ($('#agreement').prop('checked')) {

                } else {
                    layer.msg('请同意认购协议再认购产品', {icon: 7})
                }
            })
        }
    }
    new productList().init();
}();