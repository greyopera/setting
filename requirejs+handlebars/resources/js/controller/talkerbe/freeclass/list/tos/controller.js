define([
    'jquery',
    '../listHandler/lecture.list',
    '../listHandler/list.handler'
], function ($, lectureList, listHandler) {
    "use strict";

    var $freeclassVideoList = $("#freeclassVideoList");

    window.page_go = function (page) {
        location.href = "?mode=list&page=" + page + "&"
    };

    function controller() {

        /**
         * 강의 목록 Append
         * @type {*}
         */
        var lectureListTemplate = lectureList
            .setModel(window._freeClassVideoListModel || null)
            .getTemplate();

        $freeclassVideoList.append(lectureListTemplate);

        /**
         * 강의 기능 연결
         */
        listHandler(); // Video 화면 제어
    }

    return controller;
});



