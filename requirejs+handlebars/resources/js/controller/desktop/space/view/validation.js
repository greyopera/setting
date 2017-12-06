define([
    'jquery'
], function ($) {
    "use strict";

    var validation = {

        updateSubmit: function ($textarea) {

            var $description = $textarea,
                promise = new Promise(function (resolve, reject) {

                    if ($description.val() == '') {
                        reject({status: false, message: '내용 입력이 필요합니다.'});
                    } else {
                        resolve(true);
                    }

                });

            return promise;
        },

        commentSubmit: function () {

            var $description = $('[name="description"]'),
                promise = new Promise(function (resolve, reject) {

                    if ($description.val() == '') {
                        reject({status: false, message: '내용 입력이 필요합니다.'});
                    } else {
                        resolve(true);
                    }

                });

            return promise;
        }
    };

    return validation;
});
