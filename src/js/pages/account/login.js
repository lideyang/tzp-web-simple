/**
 * Created by Lidy on 2017/11/1.
 */
+function () {
    var Login = function () {//构造函数
        this.$companyForm = $("#companyForm");
    }
    Login.prototype = {
        init: function () {
            this.validate();
        },
        validate: function () {
            //商户登录验证
            this.$companyForm.validate({
                // 验证规则
                rules: {
                    userMobile: {
                        required: true,
                        isMobile: true
                    },
                    userPassword: {
                        required: true,
                        minlength: 6
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
                    userPassword: {
                        required: '请输入登录密码',
                        minlength: '请输入正确的密码',
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
                },
                //验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator.setValidateIcon($parent);
                    $errorIcon.addClass('icon-right').removeClass('icon-error');
                    $parent.removeClass('has-error').addClass('has-success has-feedback');
                },
                invalidHandler: function (form, validator) { //错误提示
                    $.each(validator.errorList, function (key, value) {
                        $("#errorMsg").text(value.message).parent().css('visibility', 'visible');
                        return false;
                    });
                },
                submitHandler: function (form) { //验证通过提交表单
                    $(form)[0].submit();
                }
            });
        },
    }
    new Login().init();
}();