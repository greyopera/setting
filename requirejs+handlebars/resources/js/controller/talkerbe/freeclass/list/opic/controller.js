define([
    'jquery',
    '../listHandler/list.handler'
], function ($, listHandler) {
    "use strict";

    window.page_go = function (page) {
        location.href = "?mode=list&page=" + page + "&"
    };

    function controller() {
        listHandler(); // Video 화면 제어
    }

    return controller;
});



