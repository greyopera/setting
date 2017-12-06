define([
    'jquery',
    'complexCarousel',
], function ($) {
    "use strict";

    function controller() {



        /* 합격자 수기 */
        var review_width = 178;
        var review_animate = false;
        var review_len = $("#review_slide").children().length; // 전체 행 갯수

        $("#review_slide").css('width', review_width * review_len + 20);

        function review_next() {
            if (!review_animate) {
                review_animate = true;
                $("#review_slide").animate({
                    'left': '-' + review_width + 'px'
                }, 500, function () {
                    // 맨첫번째것을 가장 마지막에 붙여준다.
                    var firstChild = $("#review_slide").children().filter(':lt(' + 1 + ')').clone(true);
                    firstChild.appendTo($("#review_slide"));
                    // 첫번째것은 삭제해준다.
                    $("#review_slide").children().filter(':lt(' + 1 + ')').remove();
                    // 위치를 다시 처음으로 옮겨준다.
                    $("#review_slide").css('left', '0px');
                    review_animate = false;
                });
            }
            return false;
        }

        function review_prev() {
            if (!review_animate) {
                var lastItem = $("#review_slide").children().eq(-2).nextAll().clone(true);
                lastItem.prependTo($("#review_slide")); //복사된 요소를 롤링객체의 앞에 붙여놓는다.
                $("#review_slide").children().eq(-2).nextAll().remove(); //선택된 요소는 끝에서 제거한다
                $("#review_slide").css('left', '-' + review_width + 'px'); //롤링객체의 left위치값을 재설정한다.
                review_animate = true;
                $("#review_slide").animate({
                    'left': '0px'
                }, 500, function () {
                    review_animate = false;
                });
            }

            return false;
        }

        setInterval(function () {
            review_next();
        }, 3000);

        $("#review_rarr").click(function () {
            review_next();
        });

        $("#review_larr").click(function () {
            review_prev();
        });

        /* 합격자 현황 */
        $(function () {

            var scroll_height = $("#pass_slide li").height();
            var animate = false;
            var len = $("#pass_slide").children().length; // 전체 행 갯수

            var bgColor = 1;
            var nBgColor = 0;

            $("#pass_slide").css('height', scroll_height * len);

            $("#pass_slide .pass_item:nth-child(2n+" + nBgColor + ")").css('background-color', '#ffffff');
            $("#pass_slide .pass_item:nth-child(2n+" + bgColor + ")").css('background-color', '#ffffff');

            setInterval(function () {

                if (!animate) {
                    animate = true;
                    $("#pass_slide").animate({
                        'top': '-' + scroll_height + 'px'
                    }, 1000, function () {
                        // 맨첫번째것을 가장 마지막에 붙여준다.
                        var firstChild = $("#pass_slide").children().filter(':lt(' + 1 + ')').clone(true);
                        firstChild.appendTo($("#pass_slide"));
                        // 첫번째것은 삭제해준다.
                        $("#pass_slide").children().filter(':lt(' + 1 + ')').remove();
                        // 위치를 다시 처음으로 옮겨준다.
                        $("#pass_slide").css('top', '0px');
                        animate = false;

                        $("#pass_slide .pass_item:nth-child(2n+" + bgColor + ")").css('background-color', '#ffffff');
                        $("#pass_slide .pass_item:nth-child(2n+" + nBgColor + ")").css('background-color', '#ffffff');

                        if (bgColor == 0) {
                            bgColor = 1;
                            nBgColor = 0;
                        } else {
                            bgColor = 0;
                            nBgColor = 1;
                        }
                    });
                }
            }, 1000);

        });

        /* 위포트 학원 강사진 */
        var teacher_width = 198;
        var teacher_animate = false;
        var teacher_len = $("#teacher_slide").children().length; // 전체 행 갯수

        $("#teacher_slide").css('width', teacher_width * teacher_len + 20);

        function teacher_next() {
            if (!teacher_animate) {
                teacher_animate = true;
                $("#teacher_slide").animate({
                    'left': '-' + teacher_width + 'px'
                }, 500, function () {
                    // 맨첫번째것을 가장 마지막에 붙여준다.
                    var firstChild = $("#teacher_slide").children().filter(':lt(' + 1 + ')').clone(true);
                    firstChild.appendTo($("#teacher_slide"));
                    // 첫번째것은 삭제해준다.
                    $("#teacher_slide").children().filter(':lt(' + 1 + ')').remove();
                    // 위치를 다시 처음으로 옮겨준다.
                    $("#teacher_slide").css('left', '0px');
                    teacher_animate = false;
                });
            }
            return false;
        }

        function teacher_prev() {
            if (!teacher_animate) {
                var lastItem = $("#teacher_slide").children().eq(-2).nextAll().clone(true);
                lastItem.prependTo($("#teacher_slide")); //복사된 요소를 롤링객체의 앞에 붙여놓는다.
                $("#teacher_slide").children().eq(-2).nextAll().remove(); //선택된 요소는 끝에서 제거한다
                $("#teacher_slide").css('left', '-' + teacher_width + 'px'); //롤링객체의 left위치값을 재설정한다.
                teacher_animate = true;
                $("#teacher_slide").animate({
                    'left': '0px'
                }, 500, function () {
                    teacher_animate = false;
                });
            }

            return false;
        }

        setInterval(function () {
            teacher_next();
        }, 3000);

        $("#teacher_rarr").click(function () {
            teacher_next();
        });

        $("#teacher_larr").click(function () {
            teacher_prev();
        });



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
                        for (var i = 0; i < 2; i++) {
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
                if (timeCnt > 2) {
                    timeCnt = 0;
                }
            }
        }
        return Rolling();




    }

    return controller;

});