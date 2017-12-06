define([
    'jquery',
    'factory/review/utility/review.util'
], function ($, reviewUtil) {
    "use strict";

    var $buttonOpenTeacherReview = $("#buttonOpenTeacherReview"),
        $buttonOpenVideoContentDetail = $("#buttonOpenVideoContentDetail"),
        $buttonOpenLectureList = $("#buttonOpenLectureList"),
        $popContentsReviewScore = $("#popContentsReviewScore"),
        $popContentsReviewEverageBar = $("#popContentsReviewEverageBar"),
        $popContentsReviewEverageCount = $("#popContentsReviewEverageCount");

    function controller() {

        /**
         * 진입 시 윈도우창 크기 조정. 본래의 width=740, height=600 에서
         * resizeTo 계산방식의 오차 범위로 인해 가산계산.
         */
        window.resizeTo(756, 666);

        if ($buttonOpenTeacherReview.length) $buttonOpenTeacherReview.on('click', reviewUtil.openTeacherReview);
        if ($buttonOpenVideoContentDetail.length) $buttonOpenVideoContentDetail.on('click', reviewUtil.openVideoContentDetail);
        if ($buttonOpenLectureList.length) $buttonOpenLectureList.on('click', reviewUtil.openLectureReview);

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