/**
 * Created by lidy on 2017/11/4.
 */
$(function () {
    //设置默认值
    $.fn.popover.Constructor.DEFAULTS.trigger = 'manual';
    $.fn.popover.Constructor.DEFAULTS.html = true;
    //公众号
    $("#publicSeverBtn").popover({
        content: $('#publicSeverPic').html()
    });
    //QQ群
    $("#customerGroupBtn").popover({
        content: '<p>客服群1：169935413</p><p>客服群2：528514708</p>'
    });
    //提交反馈
    var feedBack = false;
    var mobileReg = /^(13|14|15|18|17)[0-9]{9}$/;
    $("#submitFeedBack").click(function () {
        if (feedBack) {
            return false;
        }
        var msg = $("#feedMsg").val();
        if (msg == null || msg == "") {
            layerTips("请输入反馈内容！", "#feedMsg");
            return false;
        }
        if (msg.length > 160) {
            layerTips("反馈内容限160字符！", "#feedMsg");
            return false;
        }
        var feedPhone = $("#feedPhone").val();

        if (feedPhone == null || feedPhone == '' || !mobileReg.test(feedPhone)) {
            layerTips("请填写正确的手机号！", "#feedPhone");
            return false;
        }
        feedBack = true;
        $.post("/help/feedBack", {phone: feedPhone, msg: msg}, function (data) {
            var result = $.parseJSON(data)
            feedBack = false;
            if (result == null) {
                return;
            }
            if (result.code == "0") {
                layer.closeAll();
                layer.alert('感谢您的反馈！', {icon: 6});
                return;
            } else {
                layerTips(result.msg, result.code == 1 ? "#feedPhone" : "#feedMsg");
                return;
            }
        })
    })
    function layerTips(msg, doc) {
        layer.tips(msg, doc, {tips: [2, '#FF8C2F']});
    }
});

var common = {
    contactCustomer: function () {
        var i = parseInt(Math.random() * 2);
        if (i == 0) {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=2785713609&site=qq&menu=yes");
        } else {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=3580243303&site=qq&menu=yes");
        }
    },
    feedbackMessage: function () {
        layer.open({
            type: 1,
            area: ['330px', '260px'], //宽高
            title: false,
            shadeClose: true,
            skin: 'layui-layer-rim',
            closeBtn: false,
            shadeClose: true,
            content: $("#layeryijian")
        });
        $('.layui-layer').hide();
        setTimeout(function () {
            $('.layui-layer').show();
        }, 300)
    }
}