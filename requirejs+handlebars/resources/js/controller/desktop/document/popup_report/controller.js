define([
    'jquery',
    './image.zoom',
    'complexCarousel'
], function ($, imageZoom) {
    "use strict";

    var $popupReportSampleImageCarousel = $("#popupReportSampleImageCarousel"),
        $reportSampleContentFunctionLink = $("#reportSampleContentFunctionLink");

    function openDocument() {
        var $self = $(this),
            path = $self.attr('href');

        window.opener.location.href = path;
        window.close();
    }

    function controller() {

        $popupReportSampleImageCarousel.complexCarousel({
            $list: $popupReportSampleImageCarousel.find('.popup_report_sample__image__carousel__list'),
            $listwrapper: $popupReportSampleImageCarousel.find('.popup_report_sample__image__carousel__wrapper'),
            $prev: $popupReportSampleImageCarousel.find('.button.prev'),
            $next: $popupReportSampleImageCarousel.find('.button.next'),
            timerCount: 0,
            perwidth: 680,
            easing: 'easeInOutExpo',
        });

        imageZoom.bootstrap({
            wrapper: '#popupReportSampleImageCarousel',
            zoomContainer: '.popup_report_sample__image__carousel__list .panzoom',
            clickSelector: '.popup_report_sample__image__carousel__list .function .zoom'
        });

        $popupReportSampleImageCarousel.find('.button.prev, .button.next').on('click', $.proxy(imageZoom.destroyEvent, imageZoom));
        $reportSampleContentFunctionLink.on('click', openDocument);

    }

    return controller;
});