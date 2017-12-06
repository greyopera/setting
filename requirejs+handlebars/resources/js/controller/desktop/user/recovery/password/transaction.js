define(['jquery'], function ($) {
    "use strict";

    var remain_time = 180,
        sms_return_code = "",
        $inputPhoneNumber = $("#find_phone_num"),
        $inputPhoneCertf = $("#find_phone_num_certf_input"),
        $inputEmailAddr = $("#find_email_addr"),
        $buttonPhoneCertf = $("#find_phone_num_certf");

    /**
     * 핸드폰 인증창 닫기
     */
    function resetIdPhone() {

        remain_time = 180;
        sms_return_code = "";

        $inputPhoneNumber.removeAttr('disabled');
        $buttonPhoneCertf.removeAttr('disabled');

        $("#auth_div").hide();

    }


    var transaction = {

        /**
         * 휴대전화 인증번호 요청
         * @param url
         * @param data
         * @returns {*}
         */
        phoneCertRequest: function (url, data) {

            function process(data) {

                if (data.status == 'fail') {

                    alert(data.message);
                    $inputPhoneNumber.removeAttr('disabled');
                    $buttonPhoneCertf.removeAttr('disabled');
                    return;

                }

                remain_time = 180;

                // 인증번호 입력 창을 띄운다.
                $("#auth_div").show();

                $inputPhoneCertf.removeAttr('disabled');

                var timeInterval = setInterval(function () {

                    if (remain_time > 0) {

                        var el_min = leadingZeros(Math.floor(remain_time / 60 % 60), 2);
                        var el_sec = leadingZeros(Math.floor((remain_time - el_min * 60) % 60), 2);

                        $("#remain_time").text("인증 남은 시간 : " + el_min + ":" + el_sec);

                        if (remain_time >= 120) {
                            $inputPhoneNumber.removeAttr('disabled');
                            $buttonPhoneCertf.removeAttr('disabled').text('인증번호 재전송');
                        }
                        remain_time--;

                    } else {

                        resetIdPhone();
                        clearInterval(timeInterval);

                    }

                }, 1000);

                return data;
            }

            return $.ajax({
                url: url,
                type: 'POST',
                data: data
            }).then(process);

        },

        /**
         * 휴대전화로 비밀번호 찾기
         * @method POST
         * @param {String} url - 인증 URL
         * @param {Number} data.id
         * @param {String} data.username
         * @param {String} data.name
         * @param {String} data.phone
         * @param {String} data.code
         */
        verifyPhoneNumber: function (url, data) {

            function process(res) {

                if (res.status == 'fail') {
                    alert(res.message);
                    $inputPhoneCertf.focus();

                    return false;

                } else {

                    $('#auth_method').val('phone');
                    $('#auth_id').val(data.id);
                    $('#username').val(data.username);
                    $('#name').val(data.name);
                    $('#phone').val(data.phone);
                    $('#code').val(data.code);

                    $('#auth_ok').submit();

                    // $.post('/user/recovery/password', $('#auth_ok').serialize())
                    //     .then(function (res) {
                    //         console.log(res);
                    //     });
                }

            }

            return $.post(url, data)
                .then(process);

        },

        /**
         * 이메일로 비밀번호 찾기
         * @method POST
         * @param {String} url - 인증 URL
         * @param {Number} data.auth_method
         * @param {String} data.name
         * @param {String} data.email
         * @param {String} data.username
         */
        verifyEmail: function (url, data) {

            function process(res) {

                if (res.status == 'fail') {
                    alert(res.message);
                    return false;
                }

                $('#auth_method').val('email');
                $('#email').val($inputEmailAddr.val());
                $('#auth_ok').submit();

            }

            return $.post(url, data)
                .then(process);

        }

    };

    return transaction;
});