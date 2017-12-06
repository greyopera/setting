define([
    'jquery'
], function ($) {
    "use strict";

    var $sms_code = $("#sms_code");

    var validation = {

        submit: function () {

            var $subject = $('[name="subject"]'),
                $description = $('[name="description"]'),
                promise = new Promise(function (resolve, reject) {

                    if ($subject.val() == '') {

                        reject({status: false, message: '제목 입력이 필요합니다.'});

                    } else if ($description.val() == '') {

                        reject({status: false, message: '내용 입력이 필요합니다.'});

                    } else {

                        resolve(true);

                    }

                });

            return promise;
        }
    }

    return validation;
});
