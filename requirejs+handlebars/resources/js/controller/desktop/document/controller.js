define([
    'jquery',
    'factory/review/utility/review.util',
    'windowPopup',
    'parseURL',
    'complexCarousel'
], function ($, reviewUtil, windowPopup) {
    "use strict";

    var $documentBannerStretegyCarousel = $("#documentBannerStretegyCarousel"),
        $documentBannerAnalysisCompanyBrand = $("#documentBannerAnalysisCompanyBrand"),
        $lectureListSearchType = $("#lectureListSearchType");

    function openSample() {
        var $self = $(this),
            path = $self.attr('href');

        windowPopup(path, 780, 800, '__reportPreviewPopup');
        return false;
    }

    function controller() {

        $documentBannerStretegyCarousel.complexCarousel({
            $list: $documentBannerStretegyCarousel.find('.document_banner_stretegy_carousel__list'),
            $navigator: $documentBannerStretegyCarousel.find('.document_banner_stretegy_carousel__navigator'),
            $menuAnchor: $documentBannerStretegyCarousel.find('.document_banner_stretegy_carousel__navigator .button'),
            $listwrapper: $documentBannerStretegyCarousel.find('.document_banner_stretegy_carousel__wrapper'),
            timerCount: 3000,
            easing: 'none',
        });

        $documentBannerAnalysisCompanyBrand.complexCarousel({
            $list: $documentBannerAnalysisCompanyBrand.find('.document_banner_analysis_company__brand__list'),
            $listwrapper: $documentBannerAnalysisCompanyBrand.find('.document_banner_analysis_company__brand__wrapper'),
            $prev: $documentBannerAnalysisCompanyBrand.find('.button.prev'),
            $next: $documentBannerAnalysisCompanyBrand.find('.button.next'),
            perwidth: 105,
            showcount: 7,
//            timerCount: 3500,
            timerCount: 0,
            easing: 'easeOutExpo',
        });

        // 카테고리 변경 시 submit 강제 호출
        $("#categoryList input").on('change', function () {
            $("#keywordFormSubmitButton").trigger('click');
        });

        $lectureListSearchType.on('click', '.lecture_list_searchtype__lectureinfo__function .review', reviewUtil.openTeacherReview);
        $lectureListSearchType.on('click', '.lecture_list_searchtype__key__head__information .function .video', openSample);

    }

    return controller;
});