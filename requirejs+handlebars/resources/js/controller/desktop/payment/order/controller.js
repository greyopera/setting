define([
    'jquery',
    'windowPopup'
], function ($, windowPopup) {
    "use strict";

    var $buttonUseCouponPopup = $("#buttonUseCouponPopup");

    function openCouponPopup() {

        var $self = $(this),
            locationPath = $self.attr('href');

        windowPopup(locationPath, 780, 460, '_usecouponPopup');
        return false;

    }

    function controller() {

        $buttonUseCouponPopup.on('click', openCouponPopup);

    }

    return controller;
});