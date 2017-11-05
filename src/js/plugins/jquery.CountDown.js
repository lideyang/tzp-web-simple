/**
 * Created by lidy on 2017/11/5.
 */
/*
 * time 倒计时时间
 * mobile 发送手机号
 * start 是否直接开始
 * isMobile 验证手机是否合法#id
 */
(function ($) {
    function CD(opts, obj) {
        var defaults = {
            time: 60,
            mobile: '',
            start: false,
            isMobile: false,
            isSeed: false,
            isMsg: false,
            type: "POST",
            Msg: '验证码已发送，请注意查收',
            url: '/',
            isCallBack: false,
            isClick: true,
            isClear: false,
            isUpdateDate: false,
            beforeClick: false,
            tokenId: false,
            callBack: false,
            beforeSeed: false,
            successDataCode: '200',
            data: {Mobile: $('#Mobile').val()},
            onSeedFail: function () {
            }
        }
        var $self = this;
        if ($.fn.jquery > 1.7) {
            $(obj).prop('disabled', false);
        } else {
            $(obj).attr('disabled', false);
        }
        var opt = $self.defs = $.extend(true, defaults, opts);
        $self.time = 0;
        $self.Tid = 0;
        $self.seedBtn = $(obj);
        $self.type = $self.seedBtn.is('input') ? 'input' : 'button';
        $self.btnText = $self.type === 'input' ? $self.seedBtn.val() : $self.seedBtn.text();
        if ($self.defs.start) {
            $self.init();
        }
        if ($self.defs.isClick) {
            $self.seedBtn.on("click", function () {
                if ($self.time > 0) {     //倒计时完成
                    return;
                }
                $self.seed();
                //$('#checkCode').attr("readonly", "readonly");
            });
        }
    };
    CD.prototype = {
        init: function () {
            var $self = this;
            if ($self.defs.isSeed && $self.time == 0) { //倒计时开始不为0才可发送
                this.seed();
            } else if ($self.time === 0) {
                $self.time = $self.defs.time;
                $self.Tid = setInterval(function () {
                    $self.CountDownDo()
                }, 1000);
            }
        },
        seed: function () {
            var $self = this;
            //点击前新增逻辑
            if ($self.defs.beforeClick && typeof($self.defs.beforeClick) == 'function') {
                $self.defs.beforeClick();
            }
            //验证手机
            if ($self.defs.isMobile) {
                var mobile = $($self.defs.isMobile).val();
                if (mobile == '') {
                    layer.msg("请输入手机号码", {icon: 2});
                    return;
                }
                if (!$self.checkMobile(mobile)) {
                    layer.msg("手机号码不正确", {icon: 2});
                    return;
                }
                else {
                    $self.defs.data.phone = mobile;
                }
            }
            if ($self.defs.beforeSeed) {
                $self.defs.beforeSeed;
            }
            if ($self.defs.isClear) {
                $($self.defs.isClear).val('');
            }
            if ($self.defs.isUpdateDate) {
                $self.defs.data = $($self.defs.isUpdateDate).serializeArray();
            }
            $.ajax({
                type: $self.defs.type,
                url: $self.defs.url,
                data: $self.defs.data,
                dataType: 'JSON',
                async: false,
                cache: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.success) {
                        if ($self.defs.isMsg) {
                            $self.seedBtn.parent().find(".alertText").css("display", 'inline').html('<em class="miss"></em><label class="error miss">' + $self.defs.Msg + '</label>').delay(3000).fadeOut();
                        } else {
                            $self.seedBtn.parent().find(".alertText").css("display", 'none').html('');
                        }
                        $self.time = $self.defs.time;
                        $self.CountDownDo();
                        $self.Tid = setInterval(function () {
                            $self.CountDownDo();
                        }, 1000);
                    }
                    else {
                        if ($self.defs.isCallBack) {
                            if (data[$self.defs.isCallBack]) {
                                layer.msg(data[$self.defs.isCallBack], {icon: 5});
                            }
                        }
                        else {
                            if (data.code == '500') {
                                layer.msg("发送失败,请稍后再试。", {icon: 5});
                            }
                            else {
                                layer.msg("页面已过期，请重新登录并再次发起操作", {icon: 5});
                            }
                        }
                        if ($self.defs.isMsg) {
                            if (data.code != '500') {
                                $self.seedBtn.parent().find(".alertText").html('<em class="miss"></em><label class="error">' + data.message + '</label>');
                            } else {
                                $self.seedBtn.parent().find(".alertText").css("display", 'none').html('');
                            }
                        }
                        $self.defs.onSeedFail();
                    }
                },
                error: function () {
                    layer.msg("验证码发送失败,请稍后再试。", {icon: 5});
                }
            });
        },
        CountDownDo: function () {
            var $self = this;
            if ($self.time > 1) {
                $self.time -= 1;
                $self.type === 'input' ? $self.seedBtn.val("还剩" + $self.time + "秒") : $self.seedBtn.text("还剩" + $self.time + "秒");
                $self.seedBtn.removeClass("btn-sms").attr("disabled", "disabled").addClass('btnClose')
            } else {
                $self.time = 0;
                clearInterval($self.Tid);
                $self.type === 'input' ? $self.seedBtn.val($self.btnText) : $self.seedBtn.text($self.btnText);
                $self.seedBtn.addClass("btn-sms").removeAttr("disabled").removeClass('btnClose');
            }
        },
        checkMobile: function (str) {
            var re = /(^1\d{10}$)|(^1\d{2}\*\*\*\*\d{4}$)/
            if (re.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        setDefaults: function (opt) {
            this.defs = $.extend(true, this.defs, opt);
        },
        //重置按钮
        cleanDown: function () {
            var $self = this;
            $self.time = 0;
            clearInterval($self.Tid);
            $self.seedBtn.val($self.btnText);
            $self.seedBtn.addClass("btn-sms").removeAttr("disabled").removeClass('btnClose');
        }
    }
    $.fn.CountDown = function (options, modal) {
        this.each(function () {
            var $self = $(this);
            var CountDown = $self.data('CountDown');
            if (typeof options == 'string') {
                CountDown[options](modal);
            } else {
                if (!options.isClick) {
                    if (CountDown && !CountDown.time) {
                        CountDown.init();
                    }
                }
                if (!CountDown) $self.data('CountDown', (CountDown = new CD(options, $self)));
            }
        })
        return this;
    }
})(jQuery);