define([
    'jquery',
    'factory/weport_booklist/booklist',
    './booklist.slider',
    './handler.event.popup',
    'jqueryCookie'
], function ($, weportBookList, booklistSlider, handlerEventPopup) {
    "use strict";

    /**
     * Legacy Code
     * @Description : main_msw.js 에 있던 코드 Refactoring 필요함.
     * @type {*}
     */

        $(document).ready(function(){
            for(i=1; i<6;i++) {
                $(".visual .timerDay img").eq(i - 1).addClass("wm_banner_" + i);
                $(".rollingBanner ul li").eq(2 * i - 1).find('img').addClass("wm_banner_" + i);
            }
        });

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

        stage_li.bind("mouseover", function () {
            var stage_idx = $(this).index();
            var stageImg = "/static/images/main/20160613/img_orderTab";
            var stageCon = $(".stage .visual p");
            var n = 0;
            stage_li.each(function () {
                if (stage_idx == n) {
                    stage_li.eq(n).addClass('on').find("img").attr("src", stageImg + (n + 1) + "_on.png");
                    stageCon.eq(n).show();
                } else {
                    stage_li.eq(n).removeClass('on').find("img").attr("src", stageImg + (n + 1) + "_off.jpg");
                    stageCon.eq(n).hide();
                }
                ++n;
            });
        });


        var bookNumber = $(".weport_book .numCount strong");
        var bookCnt = 1;
        var slider_interval;
        $('.controlArrow p').bind("click", function () {
            switch ($(this).index()) {
                case 0:
                    sliderBanner.prev_Slide(199, 1, 400);
                    break;
                case 1:
                    sliderBanner.next_Slide(199, 1, 400);
                    break;
            }
        });

        $('.weport-memoirs .controllMemoirs p').bind("click", function () {
            switch ($(this).index()) {
                case 0:
                    sliderBanner.prev_Slide(218, 2, 400);
                    break;
                case 1:
                    sliderBanner.next_Slide(218, 2, 400);
                    break;
            }
        });

        $('.ncs-memoirs .controllMemoirs p').bind("click", function () {
            switch ($(this).index()) {
                case 0:
                    sliderBanner.prev_Slide(318, 5, 400);
                    break;
                case 1:
                    sliderBanner.next_Slide(318, 5, 400);
                    break;
            }
        });

        $('.teacher_intro ul').bind("mouseover", function () {
            clearInterval(slider_interval);
        });
        $('.teacher_intro ul').bind("mouseleave", function () {
            slider_interval = setInterval(function () {
                sliderBanner.next_Slide(199, 1)
            }, 3000);
        });
        var nodePart;
        var sliderBanner = {
            next_Slide: function (leftSize, category, speed) {
                clearInterval(slider_interval);
                if (category == 1) {
                    nodePart = $('.teacher_intro ul');
                } else if (category == 2) {
                    nodePart = $('.weport-memoirs ul.freepassBanner');
                } else if (category == 5) {
                    nodePart = $('.ncs-memoirs ul.freepassBanner');
                } else if (category == 4) {
                    nodePart = $('.book_box .bookBanner');
                    bookCnt += 1;
                    if (bookCnt > $(".bookBnSection .bookBanner ul").length) {
                        bookCnt = 1;
                    }
                    bookNumber.text(bookCnt);
                }
                nodePart.animate({
                    'left': -leftSize * 2
                }, speed, function () {
                    $(this).css({
                        'left': -leftSize
                    }).children(':first').appendTo($(this));
                });
                slider_interval = setInterval(function () {
                    sliderBanner.next_Slide(199, 1)
                }, 3000);
            },
            prev_Slide: function (leftSize, category, speed) {
                clearInterval(slider_interval);
                if (category == 1) {
                    nodePart = $('.teacher_intro ul');
                } else if (category == 2) {
                    nodePart = $('.weport-memoirs ul.freepassBanner');
                } else if (category == 5) {
                    nodePart = $('.ncs-memoirs ul.freepassBanner');
                } else if (category == 4) {
                    nodePart = $('.book_box .bookBanner');
                    bookCnt -= 1;
                    if (bookCnt < 1) {
                        bookCnt = 6;
                    }
                    bookNumber.text(bookCnt);
                }
                nodePart.animate({
                    'left': leftSize - leftSize
                }, speed, function () {
                    $(this).css({
                        'left': -leftSize
                    }).children(':last').prependTo($(this));
                });
                slider_interval = setInterval(function () {
                    sliderBanner.next_Slide(199, 1)
                }, 3000);
            },
            play_Slide: function () {
                clearInterval(slider_interval);
                slider_interval = setInterval(function () {
                    sliderBanner.next_Slide(199, 1);
                }, 3000);
            },
        };
        sliderBanner.play_Slide();



    var $body = $('body'),
        $popLayerWarningMessage01 = $("#popLayerWarningMessage01");


    function controller() {

        var $weportBookList = $('#weportBooklistSliderList'),
            weportBookListTemplate = weportBookList.getTemplate();

        $weportBookList.append(weportBookListTemplate);

        booklistSlider.bootstrap({
            $superElement: $('#weportBooklistSlider'),
            $list: $('#weportBooklistSliderList'),
            $listwrapper: $('#weportBooklistSliderWrapper'),
            $buttonPrev: $('#weportBooklistSlider .button.prev'),
            $buttonNext: $('#weportBooklistSlider .button.next'),
            $pagingCurrent: $('#weportBooklist .weport_booklist__paging .current'),
            $pagingTotal: $('#weportBooklist .weport_booklist__paging .total'),
            showCount: 5
        });

        $(".weport_book .numCount span").text($(".bookBnSection .bookBanner ul").length);
        
        // 이벤트 팝업창 띄우기
        handlerEventPopup(['popLayerEventMessage01']);
    }

    return controller;
});