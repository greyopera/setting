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

        window.openSub = function(seq) {
            window.open(seq, 'pop_detail', 'width=958, height=715');
        }

        window.on_pop_posts = function(url) {
            window.open(url, "contents", "width=725,height=450,top=150,left=200,scrollbars=yes");
        }

        window.goPopDetail = function(url) {
            window.open(url, "_voddetail");
        }

        window.cngTab = function(num) {
            var tabName = "teachertab" + num;
            document.getElementById('teachertab01').style.display = "none";
            document.getElementById('teachertab02').style.display = "none";
            document.getElementById(tabName).style.display = "block";
        }

        window.vod_sample = function(sample_url) {
            window.open(sample_url, '_vod_smaple', 'width=720,height=480');
        }


        $('#teachertab a').mouseover(function () {
            var imgSrcTxt = $(this).find('img').attr('src');
            $(this).find('img').attr('src', imgSrcTxt.replace('.png', '_over.png'));
            $(this).find('img').attr('src', $(this).find('img').attr('src').replace('_over_over.png', '_over.png'));
        }).mouseout(function () {
            var imgSrcTxt = $(this).find('img').attr('src');
            $(this).find('img').attr('src', imgSrcTxt.replace('_over.png', '.png'));
        });


    })();

    var getReviewRolling,
        $reviewsSectionDetail = $("#reviewsSectionDetail"),
        $teacherDetailReviewsRollingList = $("#teacherDetailReviewsRollingList"),
        $buttonOpenTeacherReview = $("#buttonOpenTeacherReview");

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
                    button: {
                        prev: '#buttonReviewsSectionDetailRollingPrev',
                        next: '#buttonReviewsSectionDetailRollingNext'
                    }
                },
                timerCount: 3000,
                fullSize: window.__teacherReviewLectureListModel.items.length
            });

        }
    }

    return controller;
});