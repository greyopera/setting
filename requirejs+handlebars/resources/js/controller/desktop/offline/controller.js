define([
    'jquery',
    'complexCarousel',
], function ($) {
    "use strict";

    function controller() {

        function Rolling(){
            var stage_li = $(".stage .inCon ul li");
            var rolling_li = $(".rollingBanner ul li");

            rolling_li.append('<p class="onArr"><img src="/static/images/main/20160613/ico_arrowBn.png" /></p>');

            rollingBanner(0);
            var timeCnt = 1;
            var rollingInterval = setInterval(function () {
                rollingBanner(timeCnt);
            }, 3000);

            rolling_li.bind("mouseover", function () {
                clearInterval(rollingInterval);
                timeCnt = $(this).index();
                switch (timeCnt) {
                    case 0:
                    case 1:
                        timeCnt = 0;
                        break;
                    case 2:
                    case 3:
                        timeCnt = 1;
                        break;
                    case 4:
                    case 5:
                        timeCnt = 2;
                        break;
                    case 6:
                    case 7:
                        timeCnt = 3;
                        break;
                    case 8:
                    case 9:
                        timeCnt = 4;
                        break;
                }
                rollingBanner(timeCnt);
            });

            $(".rollingBanner ul").bind("mouseleave", function () {
                clearInterval(rollingInterval);
                rollingInterval = setInterval(function () {
                    rollingBanner(timeCnt);
                }, 3000);
            });

            function rollingBanner(idx) {
                var rollingEven = $(".rollingBanner ul li:even");
                var rollingOdd = $(".rollingBanner ul li:odd");
                var rollingCon = $(".rollingBanner .visual p");
                var n = 0;
                rolling_li.each(function () {
                    if (idx == n) {
                        rollingOdd.eq(n).show();
                        for (var i = 0; i < 4; i++) {
                            rollingEven.show();
                            rollingEven.eq(n).hide();
                        }
                        rolling_li.eq(n * 2 + 1).find("p").show();
                        rollingCon.eq(n).show();
                    } else {
                        rollingOdd.eq(n).hide();
                        rollingCon.eq(n).hide();
                    }
                    ++n;
                });
                ++timeCnt;
                if (timeCnt > 4) {
                    timeCnt = 0;
                }
            }
        }
        return Rolling();




    }

    return controller;

});