define([
    'jquery',
    'HandlerExpiredTimer',
    'factory/review/utility/review.star.bar',
    'factory/common_handler/handler.globalnavigation'
], function ($, HandlerExpiredTimer, reviewStarBar, handlerGlobalNavigation) {
    "use strict";

    var freepassSelector = ".header__stretegy_timer__items--freepass",
        ncsfreepassSelector = ".header__stretegy_timer__items--ncs",
        toeicfreepassSelector = ".header__stretegy_timer__items--freepass-toeic",
        freePassExpiredTimer,
        ncsFreePassExpiredTimer,
        toeicFreePassExpiredTimer;

    function displayfreePassExpiredTimer(dates) {

        $(freepassSelector).find(".day01").text(dates.days[0]);
        $(freepassSelector).find(".day02").text(dates.days[1]);
        $(freepassSelector).find(".hour01").text(dates.hours[0]);
        $(freepassSelector).find(".hour02").text(dates.hours[1]);
        $(freepassSelector).find(".minute01").text(dates.minutes[0]);
        $(freepassSelector).find(".minute02").text(dates.minutes[1]);
        $(freepassSelector).find(".second01").text(dates.seconds[0]);
        $(freepassSelector).find(".second02").text(dates.seconds[1]);

    }

    function displayNcsfreePassExpiredTimer(dates) {

        $(ncsfreepassSelector).find(".day01").text(dates.days[0]);
        $(ncsfreepassSelector).find(".day02").text(dates.days[1]);
        $(ncsfreepassSelector).find(".hour01").text(dates.hours[0]);
        $(ncsfreepassSelector).find(".hour02").text(dates.hours[1]);
        $(ncsfreepassSelector).find(".minute01").text(dates.minutes[0]);
        $(ncsfreepassSelector).find(".minute02").text(dates.minutes[1]);
        $(ncsfreepassSelector).find(".second01").text(dates.seconds[0]);
        $(ncsfreepassSelector).find(".second02").text(dates.seconds[1]);

    }

    function displayToeicfreePassExpiredTimer(dates) {

        $(toeicfreepassSelector).find(".day01").text(dates.days[0]);
        $(toeicfreepassSelector).find(".day02").text(dates.days[1]);
        $(toeicfreepassSelector).find(".hour01").text(dates.hours[0]);
        $(toeicfreepassSelector).find(".hour02").text(dates.hours[1]);
        $(toeicfreepassSelector).find(".minute01").text(dates.minutes[0]);
        $(toeicfreepassSelector).find(".minute02").text(dates.minutes[1]);
        $(toeicfreepassSelector).find(".second01").text(dates.seconds[0]);
        $(toeicfreepassSelector).find(".second02").text(dates.seconds[1]);

    }

    /**
     * TODO : layout.weport.html 하단의 의존성 스크립트 전부 옮겨 와야 함.
     */
    function controller() {

        if ($(freepassSelector).length) {
            // 상단 취업완성 프리패스 타이머
            freePassExpiredTimer = new HandlerExpiredTimer({
                targetSelector: freepassSelector,
                leftTimerAPIEventName: 'event.weport.4',
                displayCallback: displayfreePassExpiredTimer
            });
            freePassExpiredTimer.bootstrap();
        }

        if ($(ncsfreepassSelector).length) {
            // 공기업 ncs 프리패스 타이머
            ncsFreePassExpiredTimer = new HandlerExpiredTimer({
                targetSelector: ncsfreepassSelector,
                leftTimerAPIEventName: 'event.ncs.3',
                displayCallback: displayNcsfreePassExpiredTimer
            });
            ncsFreePassExpiredTimer.bootstrap();
        }

        if ($(toeicfreepassSelector).length) {
            // 토커비 토익 프리패스 타이머
            toeicFreePassExpiredTimer = new HandlerExpiredTimer({
                targetSelector: toeicfreepassSelector,
                leftTimerAPIEventName: 'event.talkerbe.2',
                displayCallback: displayToeicfreePassExpiredTimer
            });
            toeicFreePassExpiredTimer.bootstrap();
        }
        reviewStarBar(); // Legacy Code

        // GNB 제어
        handlerGlobalNavigation.bootstrap({
            targetElementSelector: '#headerGlobalNavigation',
            menuElementSelector: '#headerGlobalNavigation .menu_list'
        });
    }

    return controller;

});
