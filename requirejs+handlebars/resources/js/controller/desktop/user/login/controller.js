define([
    'jquery',
    'complexCarousel'
], function ($) {
    "use strict";

    var $loginSlideBannerCarousel = $("#loginSlideBannerCarousel");

    function controller() {

       $loginSlideBannerCarousel.complexCarousel({
            $list: $loginSlideBannerCarousel.find('.login_slide_banner_carousel__list'),
            $navigator: $loginSlideBannerCarousel.find('.login_slide_banner_carousel__navigator'),
            $listwrapper: $loginSlideBannerCarousel.find('.login_slide_banner_carousel__wrapper'),
            $prev: $loginSlideBannerCarousel.find('button.prev'),
            $next: $loginSlideBannerCarousel.find('button.next'),
            $menuAnchor: $loginSlideBannerCarousel.find('.login_slide_banner_carousel__navigator button'),
            timerCount: 3000
        });

    }

    return controller;
});