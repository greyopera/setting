define([
    'jquery',
], function ($) {
    "use strict";

    var validation = {

        submit: function () {

            var $password = $('[name=password]'),
                promise = new Promise(function (resolve, reject) {

                    if ($password.val() == '') {

                        reject({status: false, message: '비밀번호를 입력하세요'});

                    } else {

                        resolve(true);

                    }

                });

            return promise;
        }
    }

    return validation;
});