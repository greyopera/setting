define(['jquery'], function ($) {
    "use strict";

    var $inputId = $("#find_id"),
        $inputName = $("#find_name"),
        $inputPhoneNumber = $("#find_phone_num"),
        $inputPhoneNumCertf = $("#find_phone_num_certf_input"),
        $inputEmailId = $("#find_id_02"),
        $inputEmailName = $("#find_name_02"),
        $inputEmailAddr = $("#find_email_addr");

    var validation = {

        /**
         * 휴대 전화번호 양식 검증
         */
        inspectionWord: function () {

            var $self = $(this),
                $checkedCertif = $("input[name='certif']:checked"),
                valueCertif = $checkedCertif.val();

            // 핸드폰 번호일 경우 유효성 검사
            if (valueCertif == 'phone') {

                var trans_num = $self.val().replace(/-/gi, '');

                if (trans_num != null && trans_num != '') {

                    if (trans_num.length == 11 || trans_num.length == 10) {

                        var regExp_ctn = /^01([016789])([1-9]{1})([0-9]{2,3})([0-9]{4})$/;

                        if (regExp_ctn.test(trans_num)) {

                            trans_num = $self.val().replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
                            $self.val(trans_num);

                        } else {

                            alert("잘못된 핸드폰 번호입니다.");
                            $self.val("").focus();

                        }

                    } else {

                        alert("잘못된 핸드폰 번호입니다.");
                        $self.val("").focus();

                    }
                }

            } else if (valueCertif == 'email') {

                var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

                if ($self.val() != null && $self.val() != '') {

                    if (!regex.test($self.val())) {
                        alert("잘못된 형식의 E-mail 주소입니다.");
                        $self.focus();
                    }

                }
            }
        },

        /**
         * 휴대전화 인증번호 요청폼 검증
         * @returns {Promise}
         */
        phoneCertf: function () {

            var promise = new Promise(function (resolve, reject) {

                if ($inputId.val() == '') {
                    reject( { message: "ID를 입력하셔야 합니다.", $target: $inputId } );
                } else if ($inputName.val() == '') {
                    reject( { message: "이름을 입력하셔야 합니다.", $target: $inputName } );
                } else if ($inputPhoneNumber.val() == '') {
                    reject( { message: "핸드폰 번호를 입력하셔야 합니다.", $target: $inputPhoneNumber } );
                } else {
                    resolve(true);
                }

            });

            return promise;
        },

        /**
         * 휴대전화 비밀번호 찾기폼 검증
         * @returns {Promise}
         */
        formPhone: function () {

            var promise = new Promise(function (resolve, reject) {

                if ( $inputId.val() == '' ) {
                    reject( { message: "ID를 입력이 필요합니다.", $target: $inputId } );
                } else if ( $inputName.val() == '' ) {
                    reject( { message: "이름을 입력이 필요합니다.", $target: $inputName } );
                } else if ( $inputPhoneNumCertf.val() == '' ) {
                    reject( { message: "핸드폰 인증번호를 입력하세요.", $target: $inputPhoneNumCertf } );
                } else {
                    resolve(true);
                }

            });

            return promise;
        },

        /**
         * 이메일 비밀번호 찾기폼 검증
         * @returns {Promise}
         */
        formEmail: function () {

            var promise = new Promise(function (resolve, reject) {

                if ( $inputId.val() == '' ) {
                    reject( { message: "ID를 입력이 필요합니다.", $target: $inputEmailId } );
                } else if ( $inputName.val() == '' ) {
                    reject( { message: "이름을 입력이 필요합니다.", $target: $inputEmailName } );
                } else if ( $inputEmailAddr.val() == '' ) {
                    reject( { message: "이메일 입력이 필요합니다.", $target: $inputEmailAddr } );
                } else {
                    resolve(true);
                }

            });

            return promise;

        }
    };

    return validation;
});