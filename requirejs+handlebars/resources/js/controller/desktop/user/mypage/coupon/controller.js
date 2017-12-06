/**
 * Created by jlee on 2017-03-30.
 */
define([
    'jquery',
    'jqueryInputmask'
], function ($) {
    "use strict";

    var $WriteForm_Postscript = $('form[name="WriteForm_Postscript"]'),
        $coupon_number = $('#coupon_number');

    function WriteOkGo_P() {
        var ff = document.WriteForm_Postscript;

        if (!ff.c_code.value) {
            alert("쿠폰번호를 입력하여 주십시오.");
            ff.c_code.focus();
            return false;
        }

        return true;
    }

    function WriteOkGo_P2() {
        var ff = document.WriteForm_Postscript2;

        if (!ff.b_code.value) {
            alert("쿠폰번호를 입력하여 주십시오.");
            ff.b_code.focus();
            return false;
        }

        ff.action = "mypage_coupon_ok2.php";
        ff.target = "board_iframe_short_list";
    }

    function pop_benefit(idx, redirect_url) {
        location.href = redirect_url;
    }

    function page_go_etc(page) {
        location.href = "?mode=list&page2=" + page + "&";
    }

    function controller() {

        var im = new Inputmask({
            mask: ["XXXX-XXXX-XXXX-XXXX", "X"],
            definitions: {
                "X": {
                    validator: "[A-Za-z0-9]",
                    casing: "upper"
                }
            }
        });
        im.mask($coupon_number);

        $WriteForm_Postscript.submit(function (event) {
            if (!WriteOkGo_P()) {
                event.preventDefault();
            }
        });
    }

    return controller;
});