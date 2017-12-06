define([
    'jquery',
], function ($) {
    "use strict";


    function legacy() {

        $(window).ready(function () {
            if (window.location.hash === "#tab_con3") {
                $('#h3tab03').trigger('click');
            }
        });

        // 탭메뉴 핸들러
        $(".videoTitle h3").click(function (e) {

            // tab-list 의 li 만큼 돌아가면서 반복한다.
            $(".videoTitle h3").each(function () {
                // 현재 이미지 경로가 _on으로 되어있는 _off로 변경한 이미지 주소로 변경하여 저장한ㄷ.
                // (이미 _off.png 일경우에는 _on.png 가 포함이 안되어있기때문에 적용이 안됨)
                // this 는 for 문안에서 현재 돌고있는 this 가된
                var offimg = $(this).find("img").attr("src").replace("_on.jpg", "_off.jpg");
                // 이미지 경로를 off로 된 이미지 경로로 바꿈
                $(this).find("img").attr("src", offimg);
            });

            // 현재 선택된 li만 on 이미지로 바꿔주기위해 위과정을 다시 반복
            var onimg = $(this).find("img").attr("src").replace("_off.jpg", "_on.jpg");
            $(this).find("img").attr("src", onimg);

            var attr = $(this).find("a").attr("href");


            $("html, body").animate({
                'scrollTop': $(attr).offset().top - 230
            }, 500);
            e.preventDefault();


        });
    }

    return legacy;
});