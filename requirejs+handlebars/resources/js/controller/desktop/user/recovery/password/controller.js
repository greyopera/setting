define([
    'jquery',
    './validation',
    './transaction'
], function ($, validation, transaction) {
    "use strict";

    var sms_return_code,
        $inputPhoneNumber = $("#find_phone_num"),
        $buttonFindPassword = $("#id_find_btn_phone_number, #id_find_btn_email"),
        $buttonPhoneCertf = $("#find_phone_num_certf"),
        $inputPhoneCertf = $("#find_phone_num_certf_input"),
        $inputCertif = $("input[name='certif']"),
        $inputName = $("#find_name"),
        $inputId = $("#find_id"),
        $inputEmailAddr = $("#find_email_addr"),
        $formPhone = $("#formPhone"),
        $formEmail = $("#formEmail");

    /**
     * 인증 수단 변경
     */
    function changeAuthType() {

        $inputPhoneNumber.val('');

        var data_type = $("input[name='certif']:checked").val();

        if (data_type == 'phone') {

            $formPhone.css('display','block');
            $formEmail.css('display','none');

        } else if (data_type == 'email') {

            $formPhone.css('display','none');
            $formEmail.css('display','block');

        }
    }

    /**
     * 인증번호 발송하기 버튼 클릭시
     */
    function buttonCertfSend(e) {

        var $self = $(this);

        // 휴대폰 번호 입력 박스/인증번호 전송 버튼을 비활성화
        $buttonPhoneCertf.attr('disabled', 'disabled');

        validation
            .phoneCertf()
            .then(function (resolve) {

                $inputPhoneNumber.attr('disabled', 'disabled');
                return transaction
                    .phoneCertRequest( $self.data('request-url'), {
                        'auth_method': 'phone',
                        'username': $inputId.val(),
                        'name': $inputName.val(),
                        'phone': $inputPhoneNumber.val()
                    });
            })
            .then(function(data) {
                sms_return_code = data.id;
            })
            .catch(function (reject) {

                $buttonPhoneCertf.removeAttr('disabled');
                reject.$target.focus();
                alert(reject.message);

            });
    }

    /**
     * 비밀번호 찾기 버튼 클릭 시
     */
    function buttonFindId(e) {

        if (e) e.preventDefault();

        var $self = $(this),
            $checkedCertif = $("input[name='certif']:checked"),
            valueCertif = $checkedCertif.val();

        // 핸드폰 번호로 인증일경우
        if (valueCertif == 'phone') {

            validation
                .formPhone()
                .then(function (resolve) {

                    return transaction
                        .verifyPhoneNumber($self.data('cert-url'), {
                            'id': sms_return_code,
                            'username': $inputId.val(),
                            'name': $inputName.val(),
                            'phone': $inputPhoneNumber.val(),
                            'code': $inputPhoneCertf.val()
                        });
                })
                .catch(function (reject) {

                    reject.$target.focus();
                    alert(reject.message);

                });

        // 이메일 번호로 인증일 경우
        } else if (valueCertif == 'email') {

            validation
                .formEmail()
                .then(function (resolve) {

                    return transaction
                        .verifyEmail($self.data('cert-url'), {
                            'auth_method': 'email',
                            'name': $inputName.val(),
                            'email': $inputEmailAddr.val(),
                            'username': $inputId.val()
                        });
                })
                .catch(function (reject) {

                    reject.$target.focus();
                    alert(reject.message);

                });
        }
    }

    function controller() {

        // 휴대폰 인증과 이메일주소 인증 라디오 버튼
        $inputCertif.on('change', changeAuthType);

        $buttonPhoneCertf.on('click', buttonCertfSend);
        $buttonFindPassword.on('click', buttonFindId);

        // 핸드폰 번호, 이메일 Validation
        $inputPhoneNumber.on('blur', validation.inspectionWord);

        // 같은 폼내용 value 일치
        $('[name=find_id]').on('keyup', function(e) { $('[name=find_id]').val( $(this).val() ); });
        $('[name=find_name]').on('keyup', function(e) { $('[name=find_name]').val( $(this).val() ); });
    }

    return controller;

});