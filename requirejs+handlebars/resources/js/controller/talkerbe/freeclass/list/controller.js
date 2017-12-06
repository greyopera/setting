define([
    'jquery',
    'controller/talkerbe/freeclass/list/listHandler/lecture.list',
    'controller/talkerbe/freeclass/list/listHandler/lecture.filter',
    'controller/talkerbe/freeclass/list/listHandler/list.handler'
], function ($, lectureList, lectureFilter, listHandler) {
    "use strict";

    var $freeclassVideoList = $("#freeclassVideoList"),
        filterSelector;

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
         * 목록 기능 연결
         */
        listHandler();

        /**
         * 필터 기능 연결
         */
        lectureFilter({
            selector : {
                paging : '#freeclassVideoPaging',
                parent : '#listArea',
                list : '#freeclassVideoList',
                listChildren : '.freeclass__video_list__items',
                filter : ''
            },
            filterObject : {
                $container: $("#listFilter"),
                toeic: {
                    $all: $('#tos-filter1'),
                    $explain: $('#tos-filter2'),
                    $prediction: $('#tos-filter3')
                },

                opic: {
                    $all: $('#opic-filter1'),
                    $review: $('#opic-filter2'),
                }
            }
        });

        /* 진입 시 전체목록 출력 */
        $("#tos-filter1").trigger('click');
        $("#opic-filter1").trigger('click');
    }

    return controller;
});



