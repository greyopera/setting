define([
    'jquery',
    'factory/review/lecture/list.rolling/review.list',
    'factory/review/lecture/list.rolling/review.rolling',
    'factory/review/utility/review.util'
], function ($, reviewList, reviewRolling, reviewUtil) {
    "use strict";

    /**
     * Legacy Code : 기존 기능을 구성함. 향후 Refactoring 필요.
     */
    (function () {

        window.openSub = function (seq) {
            window.open(seq, 'pop_detail', 'width=958, height=715');
        }

    })();

    function openSampleVideo() {
        var $self = $(this),
            videoPath = $self.attr('href');

        window.open(videoPath, '_videoSampleWindow', 'width=800, height=500');
        return false;
    }

    function tabMenuHandler() {
        var $self = $(this),
            $displayPath = $($self.attr('href'));

        $teacherLectureContents.css('display', 'none');
        $displayPath.css('display', 'block');

        return false;

    }

    var getReviewRolling,
        $reviewsSectionDetail = $("#reviewsSectionDetail"),
        $teacherDetailReviewsRollingList = $("#teacherDetailReviewsRollingList"),
        $buttonOpenTeacherReview = $("#buttonOpenTeacherReview"),
        $teacherLectureSearchList = $("#teacherLectureSearchList"),
        $teacherLectureContents = $(".teacher_lecture_contents"),
        $teacherLectureContentsTabMenu = $(".teacher_lecture_contents__tab_menu .link");

    function controller() {

        var templateTeacher = reviewList
            .setModel(window.__teacherReviewLectureListModel)
            .getTemplate();

        $teacherDetailReviewsRollingList.empty().append(templateTeacher);
        $teacherDetailReviewsRollingList.on('click', '.review_view_button', reviewUtil.openReviewDetail);

        if (window.__teacherReviewLectureListModel.items.length > 3) {

            $reviewsSectionDetail.addClass('is_full');

            $buttonOpenTeacherReview.on('click', reviewUtil.openTeacherReview);

            getReviewRolling = new reviewRolling();
            getReviewRolling.bootStrap({
                selector: {
                    container: '#teacherDetailReviewsRolling',
                    list: '#teacherDetailReviewsRollingList table',
                    listChildren: '#teacherDetailReviewsRollingList table tr',
                    button: {
                        prev: '#buttonReviewsSectionDetailRollingPrev',
                        next: '#buttonReviewsSectionDetailRollingNext'
                    }
                },
                timerCount: 3000,
                fullSize: window.__teacherReviewLectureListModel.items.length
            });
        }

        $teacherLectureContentsTabMenu.on('click', tabMenuHandler);

        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__key__head__image .link', reviewUtil.openVideoContentDetail);

        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__key__head__information .link', reviewUtil.openVideoContentDetail);
        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__key__head__information .function .video', openSampleVideo);
        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__key__head__information .subject .link', reviewUtil.openVideoContentDetail);

        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__lectureinfo__function .link', reviewUtil.openVideoContentDetail);
        $teacherLectureSearchList.on('click', '.lecture_list_searchtype__lectureinfo__function .review', reviewUtil.openLectureReview);

        $('body').on('click', '.examcontent .button.review', reviewUtil.openLectureReview); // 자소서&컨설팅

    }

    return controller;
});