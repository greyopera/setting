define(['jquery', 'jqueryCookie'], function ($) {
    "use strict";

    function closeWarningPopup() {
        $popLayerWarningMessage01.removeClass('active');
    }

    function closeAllWarningPopup() {
        $.cookie('weport_popup_main_warning_message0412', 'true');
        closeWarningPopup();
    }

    // SKCT 메인 팝업 광고창.
    var instancePopup = {
        'popLayerEventMessage01': function() {

            var $eventPopup = $("#popLayerEventMessage01");
            if ($.cookie('popLayerEventMessage01') != 'true') {
                $eventPopup.addClass('active');

                $eventPopup.one('click', '#popLayerEventMessage01DayClose', function(e) {
                    if(e) e.preventDefault();
                    $.cookie('popLayerEventMessage01', 'true');
                    $eventPopup.remove();

                    return false;
                });

                $eventPopup.one('click', '#popLayerEventMessage01Close', function(e) {
                    if(e) e.preventDefault();
                    $eventPopup.remove();

                    return false;
                });

            } else {
                $eventPopup.remove();
            }

            return false;

        }
    };

    function handlerEventPopup(popupId) {

        popupId.forEach(function(element, index, array){
            instancePopup[element]();
        });

    }

    return handlerEventPopup;
});