define([
    'jquery',
    'factory/review/lecture/register/validation'
], function ($, reviewRegisterValidation) {
    "use strict";

    var $buttonMoveReviewList = $("#buttonMoveReviewList"),
        $reviewSubmit = $("#popContentsReviewRegisterFormSubmit"),
        $reviewSubject = $('[name=subject]'),
        $reviewDescription = $('[name=description]'),
        $popContentsReviewScore = $("#popContentsReviewScore"),
        $popContentsReviewEverageBar = $("#popContentsReviewEverageBar"),
        $popContentsReviewEverageCount = $("#popContentsReviewEverageCount"),
        $isPosting = false;

    function reviewSubmit(e) {

        reviewRegisterValidation()
            .then(function() {
                if($isPosting) {
                    if(e) e.preventDefault();
                    alert("이미 후기 등록을 요청하였습니다.");
                    return false;
                }

                $isPosting = true;

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
         * 진입 시 윈도우창 크기 조정. 본래의 width=740, height=410 에서
         * resizeTo 계산방식의 오차 범위로 인해 가산계산.
         */
        window.resizeTo(756, 476);

        $buttonMoveReviewList.on('click', function () {
            if($reviewSubject.val() != '' || $reviewDescription.val() != '') {
                if (confirm('등록하지 않은 후기는 삭제됩니다. 목록으로 이동하시겠습니까?')) {
                    window.resizeTo(746, 600);
                } else {
                    return false;
                }
            }

        });

        $reviewSubmit.on('click', reviewSubmit);


        /**
         * 후기 평점 계산
         */
        var reviewsScore = Number($popContentsReviewScore.data('score')).toFixed(1),
            calculateTeachersGraph = ((100*reviewsScore)/5).toFixed(1);
            $popContentsReviewEverageBar.css('width', calculateTeachersGraph+'%')
            $popContentsReviewEverageCount.text(reviewsScore);

    }

    return controller;
});