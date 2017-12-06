define([
    'jquery',
    'jqueryInputmask'
], function ($) {
    "use strict";

    var $popupOrderCouponListTable = $("#popupOrderCouponListTable"),
        $buttonCheckCouponUse = $("#buttonCheckCouponUse");

    function checkCouponUse() {
        var coupon = $('input:radio[name=user_coupon_id]:checked');

        if (coupon.length < 1) {
            alert('쿠폰을 선택해주세요');
            return;
        }

        window.opener.select_coupon(Number(coupon.val()), Number(coupon.data('discount')));
        window.close();
    }

    function openTableContents() {

        var $self = $(this),
            $parent = $self.closest('tr'),
            $next = $parent.next();

        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
        } else {
            $parent.addClass('active');
        }

    }

    function controller() {

        var getInputMask = new Inputmask({
            mask: ["XXXX-XXXX-XXXX-XXXX", "X"],
            definitions: {
                "X": {
                    validator: "[A-Za-z0-9]",
                    casing: "upper"
                }
            }
        });
        getInputMask.mask(document.getElementById("coupon_number"));

        $popupOrderCouponListTable.on('click', '.subject .button', openTableContents);
        $buttonCheckCouponUse.on('click', checkCouponUse);
    }

    return controller;
});