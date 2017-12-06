define([
    'jquery',
    'factory/review/lecture/list/review.lecture.list',
    'factory/review/utility/review.util',
    './handler.tabmenu',
    './_legacy'
], function ($, reviewLectureList, reviewUtil, handlerTabmenu,_legacy) {
    "use strict";

    var $buttonReviewLectureMoreview = $("#buttonReviewLectureMoreview"),
        $buttonReviewRegister = $("#buttonReviewRegister"),
        $reviewLectureContent = $("#reviewLectureContent"),
        $reviewCount = $("#reviewCount"),
        $reviewMoreviewCount = $("#reviewMoreviewCount"),
        $reviewLectureMoreview = $("#reviewLectureMoreview"),
        $teacherEverageBar = $("#teacherEverageBar"),
        $teacherEverageCount = $("#teacherEverageCount"),
        calculateTeachersGraph = 0;

    function controller() {

        // Legacy Code
        _legacy();

        /**
         * 강의 후기 Template 삽입
         */
        var templateReviewLecturelist = reviewLectureList
            .setModel(window.__reviewVideoListModel)
            .getTemplate();

        $reviewLectureContent.append(templateReviewLecturelist);
        $reviewCount.text(window.__reviewVideoListModel.count);

        if (window.__reviewVideoListModel.count > 5) {
            $reviewLectureMoreview.addClass('is_more_view');
            $reviewLectureMoreview.find('.button').attr('href', window.__reviewVideoListModel.link);
            $reviewMoreviewCount.text(window.__reviewVideoListModel.count - 5);
        }
        $("#reviewLectureContent .review_view_button").on('click', reviewUtil.viewDescription);

        /**
         * 선생님 관련 Model 있을 경우
         */
        if (window.__teacherReviewModel) {

            // 선생님 평점이 있을 경우
            if (window.__teacherReviewModel.hasOwnProperty('score')) {
                calculateTeachersGraph = ((100 * window.__teacherReviewModel.score) / 5).toFixed(1);
                $teacherEverageBar.css('width', calculateTeachersGraph + '%')

                if (calculateTeachersGraph == 0) {
                    $teacherEverageCount.parent().remove();
                } else {
                    $teacherEverageCount.text(window.__teacherReviewModel.score);
                }
            }

        }

        /**
         * 강의 후기 관련 버튼기능 핸드링
         */
        if ($buttonReviewLectureMoreview.length) $buttonReviewLectureMoreview.on('click', reviewUtil.openLectureReview);
        if ($buttonReviewRegister.length) $buttonReviewRegister.on('click', reviewUtil.openLectureRegister);

        $('body').on('click', '#buttonReviewLectureMoreview', reviewUtil.openTeacherReview);
        $('body').on('click', '#buttonReviewMoreview02', reviewUtil.openTeacherReview);

        /**
         * 탭메뉴 제어
         */

        handlerTabmenu('#popupVideoContainerHeaderTabmenu');

    }

    return controller;
});