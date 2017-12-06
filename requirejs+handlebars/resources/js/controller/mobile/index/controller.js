define([
    'jquery',
    'factory/weport_booklist/booklist',
    'simpleCarousel'
], function($, weportBookList) {
    "use strict";

    var $bookList = $('#bookListContents'),
        $mainInformationBanner = $("#mainInformationBanner"), // 로그인 전에 보여주는 상단 배너
        $mainStrategicBanner = $("#mainStrategicBanner"),
        weportBookTotalSize = 0;

    function controller() {

        var $bookListChildren;

        $bookList.empty().append( weportBookList.getTemplate() );
        $bookListChildren = $bookList.children();

        for(var a = 0, b = $bookListChildren.length; a<b; a++) {
            weportBookTotalSize += $bookListChildren.eq(a).outerWidth(true);
        }
        $bookList.width( weportBookTotalSize );


        if($mainInformationBanner.length) {
            $mainInformationBanner.simpleCarousel({
                $listwrapper : $mainInformationBanner.find('.mainInformation_banner__listwrapper'),
                timer: 3000,
                easing: 'easeOutQuint'
            });
        }

        if($mainStrategicBanner.length) {
            $mainStrategicBanner.simpleCarousel({
                $listwrapper : $mainStrategicBanner.find('.main_strategic_banner__wrapper'),
                timer: 3000,
                easing: 'easeOutQuint'
            });
        }
    }

    return controller;
});