/**
 * Created by lidy on 2017/11/7.
 */
+function () {
    var ForgetPwd = function () {//构造函数
        this.$setLoginPwdForm = $("#setLoginPwdForm");
        this.validateForm = null;//验证方法
    }
    ForgetPwd.prototype = {
        init: function () {
            this.validate();//表单验证
        },
        validate: function () {
            //找回密码手机验证
            this.validateForm = this.$setLoginPwdForm.validate({
                // 验证规则
                rules: {
                    loginPwd: {
                        required: true,
                        minlength: 6
                    },
                    reLoginPwd: {
                        required: true,
                        minlength: 6,
                        equalTo: '#loginPwd'
                    }
                },
                // 设置错误信息
                messages: {
                    loginPwd: {
                        required: '请输入登录密码',
                        minlength: '登录密码必须大于6位数'
                    },
                    reLoginPwd: {
                        required: '请输入登录密码',
                        minlength: '登录密码必须大于6位数',
                        equalTo: '两次输入的密码必须一致'
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