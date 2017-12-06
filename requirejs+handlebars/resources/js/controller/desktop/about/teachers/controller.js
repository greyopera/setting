define([
    'jquery',
    'factory/weport_teacherlist/teacherlist'
], function ($, teacherList) {
    "use strict";

    var $teacherList = $("#teacherList");

    function appendTeacherList(categoryCode) {

        var templateTeacher = teacherList
            .getTemplate(categoryCode);

        $teacherList.empty();

        $teacherList.append(templateTeacher.menu);
        $teacherList.append(templateTeacher.list);
    }

    function teacherMenuHandler() {

        var currentHash = location.hash.split('#'),
            activeNumber = 0;

        for(var a = 0, b = currentHash.length; a<b; a++) {
            if(currentHash[a].match(/^group[1-9]$/)) {
                activeNumber = currentHash[a].split('group')[1];
                break;
            }
        }

        if(activeNumber == 0) {
            appendTeacherList(0);
        } else {
            appendTeacherList(activeNumber);
        }
    }

    function openReviewPopup(e) {
        var $self = $(this),
            locationPath = $self.attr('href');

        window.open(locationPath, '_reviewWindow', 'width=725,height=450');
        return false;
    }

    function controller() {
        teacherList.setModel(window.teachersModel || null);
        $(window).on('hashchange', teacherMenuHandler).trigger('hashchange'); // Hash 변경시 탭버튼 변경.

        $teacherList.on('click', '.teacher_list__contents__column__items__relation .review', openReviewPopup);

    }

    return controller;
});