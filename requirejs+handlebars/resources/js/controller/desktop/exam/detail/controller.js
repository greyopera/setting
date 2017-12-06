define([
    'jquery',
    'factory/review/lecture/list.rolling/review.list',
    'factory/review/lecture/list.rolling/review.rolling',
    'factory/review/utility/review.util'
], function ($, reviewList, reviewRolling, reviewUtil) {
    "use strict";


    var getReviewRolling,
        $reviewsSectionDetail = $("#reviewsSectionDetail"),
        $examDetailReviewsRollingList = $("#examDetailReviewsRollingList"),
        $buttonOpenExamReview = $("#buttonOpenExamReview"),
        $sampleExamLinkor = $("#sampleExamLinkor area");

    function openSampleImage() {
        var $self = $(this),
            path = $self.attr("href"),
            popupW = $self.data('w'),
            popupH = $self.data('h');

        window.open(path, '_samplePopup', 'width='+popupW+', height='+popupH);
        return false;
    }

    function controller() {

        var templateExam = reviewList
            .setModel(window.__examReviewLectureListModel)
            .getTemplate();

        $examDetailReviewsRollingList.empty().append(templateExam);
        $examDetailReviewsRollingList.on('click', '.review_view_button', reviewUtil.openReviewDetail);

        if (window.__examReviewLectureListModel.items.length > 3) {

            $reviewsSectionDetail.addClass('is_full');

            $buttonOpenExamReview.on('click', reviewUtil.openExamReview);

            getReviewRolling = new reviewRolling();
            getReviewRolling.bootStrap({
                selector: {
                    container: '#examDetailReviewsRolling',
                    list: '#examDetailReviewsRollingList table',
                    button: {
                        prev: '#buttonReviewsSectionDetailRollingPrev',
                        next: '#buttonReviewsSectionDetailRollingNext'
                    }
                },
                timerCount : 3000,
                fullSize : window.__examReviewLectureListModel.items.length
            });

        }

        $sampleExamLinkor.on('click', openSampleImage);
    }

    return controller;
});