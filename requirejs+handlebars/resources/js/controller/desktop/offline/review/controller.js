define([
    'jquery',
    'complexCarousel',
], function ($) {


    var $offReviewBanner = $("#offReviewBanner");




    function controller(){
        // 상단 전략 배너 핸들러
        $offReviewBanner.complexCarousel({
            $list: $offReviewBanner.find('.imgs_container'),
            $listwrapper: $offReviewBanner.find('.banner_container'),
            timerCount: 4000,
        });

        $(function () {

            $(".offline_reviews__teachers").hide();
            $(".offline_reviews__teachers:first").show();

            $("ul.tabs li").click(function () {
                $("ul.tabs li").removeClass("active");
                $(this).addClass("active");
                $(".offline_reviews__teachers").hide()
                var activeTab = $(this).attr("rel");
                $("#" + activeTab).fadeIn()
            });
        });
    }
    return controller;


});