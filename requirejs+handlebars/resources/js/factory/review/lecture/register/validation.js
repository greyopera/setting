define([
    'jquery'
], function ($) {
    "use strict";

    var $stars = $('[name=score]'),
        $subject = $('[name=subject]'),
        $description = $('[name=description]');

    var validation = function () {

        var promise = new Promise(function (resolve, reject) {

            if ($subject.val().trim() == '') {
                reject({ message: "제목 입력이 필요합니다.", $target: $subject });
            } else {
                resolve(true);
            }

        });

        return promise;
    };

    return validation;
});