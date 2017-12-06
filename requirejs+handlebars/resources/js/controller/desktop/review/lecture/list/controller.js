define([
    'jquery',
    'factory/review/lecture/list/review.lecture.list',
    'factory/review/utility/review.util'
], function ($, reviewLectureList, reviewUtil) {
    "use strict";

    var $buttonReviewDetailview,
        $buttonOpenVideoContentDetail = $("#buttonOpenVideoContentDetail"),
        $buttonOpenVideoContentDetailatTitle = $("#buttonOpenVideoContentDetailatTitle"),
        $buttonOpenVideoContentDetailonButton = $("#buttonOpenVideoContentDetailonButton"),
        $buttonOpenTeacherReview = $("#buttonOpenTeacherReview"),
        $popLectureReviewList = $("#popLectureReviewList"),
        $popContentsReviewScore = $("#popContentsReviewScore"),
        $popContentsReviewEverageBar = $("#popContentsReviewEverageBar"),
        $popContentsReviewEverageCount = $("#popContentsReviewEverageCount");

    function controller() {

        /**
         * 강의 후기 Template 삽입
         */
        var templateLectureReviewList = reviewLectureList
            .setModel(window.__reviewLectureListModel)
            .getTemplate();

        $popLectureReviewList.append(templateLectureReviewList);

        $buttonReviewDetailview = $(".pop_contents_review__list .review_view_button");

        if (window.__reviewLectureListModel.items.length) {
            $buttonReviewDetailview.on('click', reviewUtil.viewDescription);
        }

        if($buttonOpenVideoContentDetail.length) $buttonOpenVideoContentDetail.on('click', reviewUtil.openVideoContentDetail);
        if($buttonOpenVideoContentDetailatTitle.length) $buttonOpenVideoContentDetailatTitle.on('click', reviewUtil.openVideoContentDetail);
        if($buttonOpenVideoContentDetailonButton.length) $buttonOpenVideoContentDetailonButton.on('click', reviewUtil.openVideoContentDetail);

        if($buttonOpenTeacherReview.length) $buttonOpenTeacherReview.on('click', reviewUtil.openTeacherReview);

        /**
         * 진입 시 윈도우창 크기 조정. 본래의 width=740, height=600 에서
         * resizeTo 계산방식의 오차 범위로 인해 가산계산.
         */
        window.resizeTo(756, $('body').height() + 84);

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