define([
    'jquery',
    'factory/review/lecture/list/review.lecture.list',
    'factory/review/lecture/register/validation',
    'factory/review/utility/review.util'
], function ($, reviewLectureList, reviewRegisterValidation, reviewUtil) {
    "use strict";

    var $buttonReviewMoreview = $("#buttonReviewMoreview"),
        $buttonReviewRegister = $("#buttonReviewRegister"),
        $mypageUsercontentsReviewListContent = $("#mypageUsercontentsReviewListContent"),
        $reviewSubmit = $("#contentsReviewRegisterFormSubmit"),
        $reviewSubject = $('#reviewSubject'),
        $reviewDescription = $('#reviewDescription');

    function reviewSubmit(e) {

        reviewRegisterValidation()
            .then(function() {

                if($reviewDescription.val() == '') {
                    $reviewDescription.val( $reviewSubject.val() );
                }

            })
            .catch(function(res) {

                if(e) e.preventDefault();
                alert(res.message);

                return false;
            });
    }

    function controller() {

        /**
         * 진입 시 Form 값 비움.
         */
        $reviewSubject.val('')
        $reviewDescription.val('');

        /**
         * 강의 후기 Template 삽입
         */
        var templateReviewLecturelist = reviewLectureList
            .setModel(window.__reviewLectureListModel)
            .getTemplate();

        $mypageUsercontentsReviewListContent.append(templateReviewLecturelist);

        if (window.__reviewLectureListModel.items.length) {
            $buttonReviewMoreview.on('click', reviewUtil.openLectureReview);
            $("#mypageUsercontentsReviewListContent .review_view_button").on('click', reviewUtil.viewDescription);
        }

        $reviewSubmit.on('click', reviewSubmit);

    }

    return controller;
});