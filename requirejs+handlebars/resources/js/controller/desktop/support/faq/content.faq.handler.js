define(['jquery'], function ($) {
    "use strict";

    /**
     * 고객센터 > 자주하는 질문
     * 카테고리, 질의 열고 닫는 기능.
     */

    function contentFaqHandler() {

        $(".tabsty")
            .click(function (e) {

                $(".tabsty")
                    .removeClass("on");
                $(".faq")
                    .hide();

                var href = $(this)
                    .find('a')
                    .attr('href');

                $(href)
                    .show();
                $(this)
                    .addClass("on");

                e.preventDefault();
            });



        $(".article>a")
            .click(function () {
                var submenu = $(this)
                    .next("ul");
                if (submenu.is(":visible")) {
                    submenu.slideUp();
                } else {
                    submenu.slideDown();
                }
            });
    }

    return contentFaqHandler;
});
