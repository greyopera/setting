define([
    'jquery',
], function ($) {
    "use strict";

    var $dialing = $("#dialing"),
        $phoneNumber = $('#phoneNumber'),
        $agreePolicy01 = $("#agreePolicy01");

    function checkPhoneNumber(phoneNumber) {

        var checkNumber = /^\d{10,11}$/.test(phoneNumber);
        return checkNumber;

    }

    var validation = {
        isPass: false,
        submit: function () {

            var promise = new Promise(function (resolve, reject) {

                if(!$agreePolicy01.is(':checked')) {

                    reject({message:'필수 약관에 동의해주세요'});

                } else {

                    validation
                        .verifyPhoneNumber($dialing.val() + $phoneNumber.val())
                        .then(function (res) {

                            resolve({phoneNumber: $dialing.val() + $phoneNumber.val(), message:'참여가 완료되었습니다.'});
                            validation.isPass = true;

                        }).catch(function (res) {

                            reject(res);

                        });
                }

            });

            return promise;
        },

        verifyPhoneNumber: function (phoneNumber) {

            var promise = new Promise(function (resolve, reject) {

                if (phoneNumber == '') {
                    reject({message: '휴대폰 입력이 필요합니다.'});
                } else if (!checkPhoneNumber(phoneNumber)) {
                    reject({message: '정확한 핸드폰 번호를 입력해주세요.'});
                } else {
                    resolve(true);
                }

            });

            return promise;
        }

    }

    return validation;
});