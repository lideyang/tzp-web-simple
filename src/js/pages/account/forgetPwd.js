/**
 * Created by Lidy on 2017/11/7.
 */
+function () {
    var ForgetPwd = function () {//构造函数
        this.$forgetPwdForm = $("#forgetPwdForm");
        this.$getMobileCode = $("#getMobileCode");
        this.validateForm = null;//验证方法
    }
    ForgetPwd.prototype = {
        init: function () {
            this.validate();//表单验证
            this.initEvent();//绑定事件
        },
        initEvent: function () {
            var self = this;
            //发送验证码
            this.$getMobileCode.on('click', function () {
                if (self.validateForm.element($("#userMobile"))) {
                    $(this).CountDown({
                        data: {
                            Mobile: $('#userMobile').val()
                        },
                        isMsg: true,
                        isCallBack: 'message',//回调信息字段
                        start: true,
                        isSeed: true,
                        isClick: false,
                        url: '/mock/seedCode.json'
                    });
                }
            });
        },
        validate: function () {
            //找回密码手机验证
            this.validateForm = this.$forgetPwdForm.validate({
                // 验证规则
                rules: {
                    userMobile: {
                        required: true,
                        isMobile: true
                    },
                    code: {
                        required: true,
                        minlength: 7,
                        maxlength: 7
                    }
                },
                // 设置错误信息
                messages: {
                    userMobile: {
                        required: "请输入手机号",
                        isMobile: "请输入正确的手机号码"
                    },
                    code: {
                        required: "请输入验证码",
                        isNumber: "请输入正确的验证码",
                        minlength: "请输入7位验证码",
                        maxlength: "验证码错误"
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator.setValidateIcon($parent);
                    $errorIcon.addClass('icon-error').removeClass('icon-right');
                    $parent.addClass('has-error has-feedback').removeClass('has-success');
                    $("#errorMsg").html(error).parent().css('visibility', 'visible');//显示错误信息
                },
                //验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator.setValidateIcon($parent);
                    $errorIcon.addClass('icon-right').removeClass('icon-error');
                    $parent.removeClass('has-error').addClass('has-success has-feedback');
                    $("#errorMsg").html('').parent().css('visibility', 'hidden');//隐藏错误信息
                },
                invalidHandler: function (form, validator) { //错误提示
                    var $errorMsg = $("#errorMsg");
                    $errorMsg.hide();
                    setTimeout(function () {
                        $.each(validator.errorList, function (key, value) {
                            $errorMsg.text(value.message).parent().css('visibility', 'visible');
                            return false;
                        });
                        $errorMsg.show();
                    }, 100)
                },
                submitHandler: function (form) { //验证通过提交表单
                    $(form)[0].submit();
                }
            });
        },
    }
    new ForgetPwd().init();
}();