define([
    'jquery',
    'parseURL',
    './filter.lecture',
    'factory/review/utility/review.util',
    'HandlerExpiredTimer',
    'complexCarousel'
], function ($, parseURL, filterLecture, reviewUtil, HandlerExpiredTimer) {
    "use strict";

    /**
     * 페이지 진입 시, GET Parameter를 통해서, 필터 적용 하기.
     * @param category [category-id]
     * @param job [category-id]
     * @param teacher [teacher-id]
     * @example 전체+취업준비+신경수
     * http://www.weport.co.kr/video/?category=9&job=27&teacher=49
     */

    $(document).ready(function(){
       for(i=1; i<6;i++) {
            $(".visual .timerDay img").eq(i - 1).addClass("wm_banner_" + i);
            $(".rollingBanner ul li").eq(2 * i - 1).find('img').addClass("wm_banner_" + i);
        }
    });

    var stage_li = $(".stage .inCon ul li");
        var rolling_li = $(".rollingBanner ul li");

        rolling_li.append('<p class="onArr"><img src="/static/images/main/20160613/ico_arrowBn.png" /></p>');

        rollingBanner(0);
        var timeCnt = 1;
        var rollingInterval = setInterval(function () {
            rollingBanner(timeCnt);
        }, 3000);

        rolling_li.bind("mouseover", function () {
            clearInterval(rollingInterval);
            timeCnt = $(this).index();
            switch (timeCnt) {
                case 0:
                case 1:
                    timeCnt = 0;
                    break;
                case 2:
                case 3:
                    timeCnt = 1;
                    break;
                case 4:
                case 5:
                    timeCnt = 2;
                    break;
                case 6:
                case 7:
                    timeCnt = 3;
                    break;
            }
            rollingBanner(timeCnt);
        });

        $(".rollingBanner ul").bind("mouseleave", function () {
            clearInterval(rollingInterval);
            rollingInterval = setInterval(function () {
                rollingBanner(timeCnt);
            }, 3000);
        });

        function rollingBanner(idx) {
            var rollingEven = $(".rollingBanner ul li:even");
            var rollingOdd = $(".rollingBanner ul li:odd");
            var rollingCon = $(".rollingBanner .visual p");
            var n = 0;
            rolling_li.each(function () {
                if (idx == n) {
                    rollingOdd.eq(n).show();
                    for (var i = 0; i < 3; i++) {
                        rollingEven.show();
                        rollingEven.eq(n).hide();
                    }
                    rolling_li.eq(n * 2 + 1).find("p").show();
                    rollingCon.eq(n).show();
                } else {
                    rollingOdd.eq(n).hide();
                    rollingCon.eq(n).hide();
                }
                ++n;
            });
            ++timeCnt;
            if (timeCnt > 3) {
                timeCnt = 0;
            }
        }

        stage_li.bind("mouseover", function () {
            var stage_idx = $(this).index();
            var stageImg = "/static/images/main/20160613/img_orderTab";
            var stageCon = $(".stage .visual p");
            var n = 0;
            stage_li.each(function () {
                if (stage_idx == n) {
                    stage_li.eq(n).addClass('on').find("img").attr("src", stageImg + (n + 1) + "_on.png");
                    stageCon.eq(n).show();
                } else {
                    stage_li.eq(n).removeClass('on').find("img").attr("src", stageImg + (n + 1) + "_off.jpg");
                    stageCon.eq(n).hide();
                }
                ++n;
            });
        });


    function weportCategoryAutofilterFill() {

        var getParameter = parseURL(document.URL).searchObject;
        if (getParameter.length == 0) return;

        for (var param in getParameter) {
            var items = getParameter[param];

            if (items.hasOwnProperty('category')) $('[data-category-id=' + items.category + ']').trigger('click');
            if (items.hasOwnProperty('job')) $('[data-category-id=' + items.job + ']').trigger('click');
            if (items.hasOwnProperty('teacher')) $('[data-teacher-id=' + items.teacher + ']').trigger('click');
        }
    }


    function openVideo() {

        window.open(this.href, '_voddetail', 'width=852, height=900');
        return false;

    }

    function openSampleVideo() {

        var $self = $(this),
            videoPath = $self.attr('href');

        window.open(videoPath, '_videoSampleWindow', 'width=800, height=500');
        return false;

    }

    function displayExpiredTimeItem01(dates) {
        $("#videoStretegyBannerCarouselWrapper01 .day01").text(dates.days[0]);
        $("#videoStretegyBannerCarouselWrapper01 .day02").text(dates.days[1]);
        $("#videoStretegyBannerCarouselWrapper01 .hour01").text(dates.hours[0]);
        $("#videoStretegyBannerCarouselWrapper01 .hour02").text(dates.hours[1]);
        $("#videoStretegyBannerCarouselWrapper01 .minute01").text(dates.minutes[0]);
        $("#videoStretegyBannerCarouselWrapper01 .minute02").text(dates.minutes[1]);
        $("#videoStretegyBannerCarouselWrapper01 .second01").text(dates.seconds[0]);
        $("#videoStretegyBannerCarouselWrapper01 .second02").text(dates.seconds[1]);
    }

    function displayExpiredTimeItem02(dates) {
        $("#videoStretegyBannerCarouselWrapper02 .day01").text(dates.days[0]);
        $("#videoStretegyBannerCarouselWrapper02 .day02").text(dates.days[1]);
        $("#videoStretegyBannerCarouselWrapper02 .hour01").text(dates.hours[0]);
        $("#videoStretegyBannerCarouselWrapper02 .hour02").text(dates.hours[1]);
        $("#videoStretegyBannerCarouselWrapper02 .minute01").text(dates.minutes[0]);
        $("#videoStretegyBannerCarouselWrapper02 .minute02").text(dates.minutes[1]);
        $("#videoStretegyBannerCarouselWrapper02 .second01").text(dates.seconds[0]);
        $("#videoStretegyBannerCarouselWrapper02 .second02").text(dates.seconds[1]);
    }

    var $lectureListSearchType = $("#lectureListSearchType"),
        $videoStretegyBannerCarousel = $("#videoStretegyBannerCarousel");

    function controller() {

        // 강의 결과 필터 기능.
        $(".weport-filter").change(filterLecture);
        $(".teacher-filter").change(filterLecture);

        weportCategoryAutofilterFill();

        $lectureListSearchType.on('click', '.lecture_list_searchtype__key__head__image .link', openVideo);
        $lectureListSearchType.on('click', '.lecture_list_searchtype__key__head__information .link', openVideo);
        $lectureListSearchType.on('click', '.lecture_list_searchtype__key__head__information .function .video', openSampleVideo);
        $lectureListSearchType.on('click', '.lecture_list_searchtype__lectureinfo__function .link', openVideo);
        $lectureListSearchType.on('click', '.lecture_list_searchtype__lectureinfo__function .review', reviewUtil.openTeacherReview);

        $videoStretegyBannerCarousel.complexCarousel({
            $list: $videoStretegyBannerCarousel.find('.video_stretegy_banner_carousel__list'),
            $navigator: $videoStretegyBannerCarousel.find('.video_stretegy_banner_carousel__navigator'),
            $menuAnchor: $videoStretegyBannerCarousel.find('.video_stretegy_banner_carousel__navigator .button'),
            $listwrapper: $videoStretegyBannerCarousel.find('.video_stretegy_banner_carousel__wrapper'),
            timerCount: 3000,
            easing: 'easeInOutExpo',
        });

        var carouselHandlerExpiredTimer01 = new HandlerExpiredTimer({
            targetSelector: '#videoStretegyBannerCarouselWrapper01',
            leftTimerAPIEventName: 'event.weport.4',
            displayCallback: displayExpiredTimeItem01
        });
        carouselHandlerExpiredTimer01.bootstrap();

        var carouselHandlerExpiredTimer02 = new HandlerExpiredTimer({
            targetSelector: '#videoStretegyBannerCarouselWrapper02',
            leftTimerAPIEventName: 'event.weport.4',
            displayCallback: displayExpiredTimeItem02
        });
        carouselHandlerExpiredTimer02.bootstrap();

    }

    return controller;
});