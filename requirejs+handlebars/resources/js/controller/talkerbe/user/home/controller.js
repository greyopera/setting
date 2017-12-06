define([
    'jquery',
    'factory/review/utility/review.util'
], function($, reviewUtil) {
    "use strict";

    var $buttonReviewRegister = $(".button_review_register");

    function controller() {

        $buttonReviewRegister.on('click', reviewUtil.openLectureRegister);

    }

    return controller;
});