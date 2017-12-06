define([
    'jquery',
    'controller/desktop/support/faq/content.faq.handler'
], function($, contentFaqHandler) {
    "use strict";

    function controller() {

        // Faq 열고 닫기, 카테고리 누르기
        contentFaqHandler();

    }

    return controller;
});