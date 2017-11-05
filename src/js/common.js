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
});