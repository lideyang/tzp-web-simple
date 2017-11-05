/**
 * Created by lidy on 2017/11/4.
 */
jQuery.extend(jQuery.validator.messages, {
    required: "此项必须填写",
    remote: "请修正此栏位",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入正确的数字",
    digits: "只可输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: jQuery.validator.format("最多 {0} 个字"),
    minlength: jQuery.validator.format("最少 {0} 个字"),
    rangelength: jQuery.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),
    range: jQuery.validator.format("请输入 {0} 至 {1} 之间的数值"),
    max: jQuery.validator.format("请输入不大于 {0} 的数值"),
    min: jQuery.validator.format("请输入不小于 {0} 的数值")
});
// 自定义验证
// 手机号码验证
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");
// 密码验证
jQuery.validator.addMethod("isPwd", function (value, element) {
    var length = /^\w{8,20}$/;
    var d = /[0-9]/;
    var z = /[a-zA-Z]/;
    var down = /([\x21-\x7e]+)/; //特殊字符
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var ispwd = false;
    var num = 0;
    if (d.test(value)) {
        num++;
    }
    if (z.test(value)) {
        num++;
    }
    //if (pattern.test(value)) {
    //    num++;
    //}
    if (num > 1 && length.test(value)) {
        ispwd = true;
    }
    //console.log(pattern.test(value) + ' ' + num + ' ' + ispwd);
    return this.optional(element) || ispwd;
}, "必须是8-20个英文字母、数字的组合，不能是纯数字");

//成功错误交互设置图标方法
jQuery.validator.setValidateIcon = function (element) {
    var $errorIcon = element.children('.form-control-feedback');
    if (!$errorIcon.length) {//如果没有错误的图标元素添加一个
        $errorIcon = element.append('<span class="icon-font form-control-feedback"></span>').children('.form-control-feedback');
    }
    return $errorIcon
}