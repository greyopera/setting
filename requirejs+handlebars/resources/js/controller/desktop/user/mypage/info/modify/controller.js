define([
    'jquery',
    './validation'
], function ($, validation) {
    "use strict";

    var $uphVerifyButton = $("#uphVerifyButton"),
        $cerNumIn = $("#uHp4"),
        $smsCode = $("#sms_code"),
        $verifyCompleteButton = $("#verifyCompleteButton"),
        $registerFormSubmitButton = $("#registerFormSubmitButton"),
        $phoneNumber01 = $("#phoneNumber01"),
        $phoneNumber02 = $("#phoneNumber02"),
        $phoneNumber03 = $("#phoneNumber03"),
        $verifyPhoneSendButton = $("#verifyPhoneSendButton"),
        $accountUpdateFormPhoneMessage = $("#accountUpdateFormPhoneMessage"),
        $buttonModifyPhonenumber = $("#buttonModifyPhonenumber"),
        $currentPhoneNumber = $("#currentPhoneNumber");

    function handlerPhoneNumberChangeForm() {
        var $self = $(this),
            $parent = $self.closest('.field_phone');

        $parent.addClass('is_change_number');
        $cerNumIn.data('verify', false);
    }

    function validationVerifyNumber() {

        var phoneNumber = $phoneNumber01.val() + $phoneNumber02.val() + $phoneNumber03.val();

        function resetPhoneNumberForm() {

            $accountUpdateFormPhoneMessage
                .removeClass('success')
                .addClass('fail')
                .text('허용된 시간이 지났습니다. 다시 인증해 주세요.');

            $phoneNumber01
                .removeAttr("disabled")
                .attr("readonly", false)
                .focus();

            $phoneNumber02
                .removeAttr("disabled")
                .attr("readonly", false);

            $phoneNumber03
                .removeAttr("disabled")
                .attr("readonly", false);

            $uphVerifyButton
                .removeAttr("disabled");

            $cerNumIn
                .attr("readonly", true)
                .attr("disabled", "disabled");

            $verifyCompleteButton
                .attr("readonly", true)
                .attr("disabled", "disabled");

        }

        validation
            .verifyNumber(phoneNumber)
            .then(function (res) {

                $smsCode.val(res.data.id);

                $accountUpdateFormPhoneMessage
                    .removeClass('fail')
                    .addClass('active success')
                    .text(res.message);

                $phoneNumber01
                    .attr("disabled", "disabled")
                    .attr("readonly", true);

                $phoneNumber02
                    .attr("disabled", "disabled")
                    .attr("readonly", true);

                $phoneNumber03
                    .attr("disabled", "disabled")
                    .attr("readonly", true);

                $uphVerifyButton
                    .attr("disabled", "disabled");

                $cerNumIn
                    .removeAttr("readonly")
                    .removeAttr("disabled").focus();

                $verifyCompleteButton
                    .removeAttr("disabled");

                setTimeout(function () {

                    if ($("#sms_chk").val() != 'Y') resetPhoneNumberForm();

                }, 60000 * 5);

            })
            .catch(function (res) {
                $accountUpdateFormPhoneMessage
                    .removeClass('success')
                    .addClass('active fail')
                    .text(res.message);
            });
    }

    function validationVerifyNumberCheck() {

        var $self = $(this),
            $parent = $self.closest('.is_change_number'),
            certNumber = $cerNumIn.val(),
            phoneNumber = $phoneNumber01.val() + $phoneNumber02.val() + $phoneNumber03.val(),
            ID = $smsCode.val();

        validation
            .verifyNumberCheck(certNumber, phoneNumber, ID)
            .then(function (res) {

                $accountUpdateFormPhoneMessage
                    .removeClass('fail')
                    .addClass('active success')
                    .text(res.message);

                $cerNumIn
                    .data('verify', true)
                    .attr('disabled', 'disabled')
                    .attr('readonly', true);

                $verifyCompleteButton
                    .attr('disabled', 'disabled')
                    .find('span')
                    .text('인증받기 완료');

                $phoneNumber01
                    .removeAttr("disabled")
                    .removeAttr("readonly");

                $phoneNumber02
                    .removeAttr("disabled")
                    .removeAttr("readonly");

                $phoneNumber03
                    .removeAttr("disabled")
                    .removeAttr("readonly");

                $currentPhoneNumber.text( $phoneNumber01.val() + ' - ' + $phoneNumber02.val() + ' - ' + $phoneNumber03.val() );

                $parent.removeClass('is_change_number');
                $registerFormSubmitButton.trigger('click');


            })
            .catch(function (res) {
                $accountUpdateFormPhoneMessage
                    .removeClass('success')
                    .addClass('active fail')
                    .text(res.message);
            });
    }

    function validationSubmit(e) {

        validation
            .submit()
            .then(function (res) {
                $('#registerForm [disabled]').removeAttr('disabled');
            })
            .catch(function (res) {
                e.preventDefault();
                alert(res.message);
                return false;
            });
    }

    function controller() {

        $uphVerifyButton.on('click', validationVerifyNumber);
        $registerFormSubmitButton.on('click', validationSubmit);

        $verifyPhoneSendButton.on('click', validationVerifyNumber);
        $verifyCompleteButton.on('click', validationVerifyNumberCheck);

        $buttonModifyPhonenumber.on('click', handlerPhoneNumberChangeForm);

    }

    return controller;
});