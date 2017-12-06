define([
    'jquery',
], function ($) {
    "use strict";

    var verifyServerUrl = $('#verifyPhoneSendButton').data('url'),
        verifyCertNoServerUrl = $('#verifyCompleteButton').data('url');

    function checkPhoneNumber(phoneNumber) {

        var checkNumber = /^\d{3}\d{3,4}\d{4}$/.test(phoneNumber);
        return checkNumber;
    }

    function check_name(name) {

        var name = name.trim(),
            pattern_kor = !/[^ㄱ-ㅎ가-힣]/g.test(name),
            pattern_eng = /^[A-za-z]/g.test(name),
            pattern_special = /[~!@\#$%<>^&*\()\-=+_\’]/gi.test(name);

        if (pattern_special) {
            return {message: '특수문자를 포함할 수 없습니다.'}
        }

        if (pattern_eng || pattern_kor) {

            if (pattern_eng) {
                if (name.length > 15) return {message: '영문 이름은 15자를 넘을 수 없습니다.'}
            } else {
                if (name.length > 5) return {message: '한글 이름은 5자를 넘을 수 없습니다.'}
            }

            return true;

        } else {

            return {message: "이름 입력이 잘못 되었습니다. (한글만 O, 영문만 O)"}

        }
    }

    function check_password(pwd) {

        var char_type = 0;
        if (/[a-z]/.test(pwd)) char_type = char_type + 1;
        if (/[A-Z]/.test(pwd)) char_type = char_type + 1;
        if (/[0-9]/.test(pwd)) char_type = char_type + 1;
        if (/[~!@#$%\^&*()_+`\-={}|[\]\\:";'<>?,./]/gi.test(pwd)) char_type = char_type + 1;

        // 연속 같은 문자숫자 체크, 이어지는 문자 체크
        if (/(\w)\1\1\1/.test(pwd) || /(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)|(abcd)|(bcde)|(cdef)|(defg)|(efgh)|(fghi)|(ghij)|(hijk)|(ijkl)|(jklm)|(klmn)|(lmno)|(mnop)|(nopq)|(opqr)|(pqrs)|(qrst)|(rstu)|(stuv)|(tuvw)|(uvwx)|(vwxy)|(wxyz)/.test(pwd)) {
            return false;
        }

        return !(char_type < 2 || (char_type == 2 && pwd.length < 10) || pwd.length < 8);
    }

    var validation = {
        currentPasswording: null,

        phoneNumber: function (phoneNumber) {
            var pattern_special = /[~!@\#$%<>^&*\()\-=+_\’]/gi;
            if (pattern_special.test(phoneNumber)) {
                return phoneNumber.replace(pattern_special, "")
            } else {
                return false;
            }
        },

        email: function (email) {
            var pattern_special = /[~!@\#$%<>^&*\()\-=+_\’]/gi;
            if (pattern_special.test(email)) {
                return email.replace(pattern_special, "")
            } else {
                return false;
            }
        },

        password: function (password) {

            var promise = new Promise(function (resolve, reject) {
                if (check_password(password)) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });

            this.currentPasswording = password;
            return promise;
        },

        passwordRepeat: function (password) {

            var that = this,
                promise = new Promise(function (resolve, reject) {

                    if (password == that.currentPasswording) {
                        resolve(true);
                    } else {
                        reject(false);
                    }

                });

            return promise;
        },

        name: function (name) {

            var promise = new Promise(function (resolve, reject) {

                if (check_name(name).message) {
                    reject(check_name(name));
                } else {
                    resolve(true);
                }

            });

            return promise;
        },

        verifyNumber: function (phoneNumber) {

            var promise = new Promise(function (resolve, reject) {

                if (!checkPhoneNumber(phoneNumber)) {
                    reject({message: '핸드폰 번호 입력이 필요 합니다.'});
                } else {

                    $.ajax({
                        type: "POST",
                        url: verifyServerUrl,
                        data: {
                            'phone': phoneNumber
                        },
                        success: function (data) {

                            if (data.status == 'fail') {
                                reject({message: data.message});
                            } else {
                                resolve({data: data, message: '인증번호가 발송되었습니다.'});
                            }
                        },
                        error: function (e, status, thrown) {
                            reject({message: '통신오류가 발생하였습니다. 다시 시도해 주세요.'});
                        }
                    });
                }
            });

            return promise;
        },

        submit: function () {

            var $email = $("#uEmail1"),
                $phoneVerify = $("#uHp4"),
                $agreeAdvertiseSMS = $("#uSmsReceipt"),
                $agreeAdvertiseEMAIL = $("#uEmailReceipt"),
                promise = new Promise(function (resolve, reject) {
                    if ($phoneVerify.data('verify') !== true) {

                        reject({status: false, message: '핸드폰 인증이 필요합니다.'});

                    } else {

                        resolve(true);

                    }

                });

            return promise;
        },

        verifyPhoneDuplicate: function (phoneNumber) {

            var promise = new Promise(function (resolve, reject) {
                resolve(true);
            });

            return promise;
        },

        verifyEmailDuplicate: function (email) {

            var promise = new Promise(function (resolve, reject) {
                resolve(true);
            });

            return promise;
        },

        verifyNumberCheck: function (certNumber, phoneNumber, ID) {

            var promise = new Promise(function (resolve, reject) {

                if (certNumber == '') {

                    reject({message: '인증번호 입력이 필요합니다.'});

                } else {

                    $.ajax({
                        type: "POST",
                        url: verifyCertNoServerUrl,
                        data: {
                            'code': certNumber,
                            'phone': phoneNumber,
                            'id': ID
                        },
                        success: function (data) {

                            if (data.status == 'fail') {
                                reject({message: data.message});
                            } else {
                                resolve({data: data, message: '인증번호가 발송되었습니다.'});
                            }
                        },
                        error: function (e, status, thrown) {
                            reject({message: '통신오류가 발생하였습니다. 다시 시도해 주세요.'});
                        }
                    });
                }
            });

            return promise;
        }

    }

    return validation;
});