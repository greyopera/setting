define([
    'jquery',
    'complexCarousel',
    'https://openapi.map.naver.com/openapi/v3/maps.js?clientId=qb8cg398qSJt3xdQJUsO',
], function ($) {
    "use strict";

    var $tab1 = $('#tab1'),
        $tab2 = $('#tab2'),
        $addr1 = $('#addr1'),
        $addr2 = $('#addr2'),

        $maptoggle_navermap = $('#maptoggle_navermap'),
        $maptoggle_navermap2 = $('#maptoggle_navermap2'),
        $maptoggle_picture = $('#maptoggle_picture'),
        $maptoggle_picture2 = $('#maptoggle_picture2'),

        $map = $('#map'),
        $picture = $('#picture'),
        $picture2 = $('#picture2');
    function controller() {


        $(function () {

            $(".offline_reviews__teachers").hide();
            $(".offline_reviews__teachers:first").show();

            $("ul.tabs li").click(function () {
                $("ul.tabs li").removeClass("active");
                $(this).addClass("active");
                $(".offline_reviews__teachers").hide();
                var activeTab = $(this).attr("rel");
                $("#" + activeTab).fadeIn();
                if (activeTab == "teacher_tab01"){
                    hyejin_bd_info.open(map, hyejin_bd);
                } else {
                    dongwon_bd_info.open(map, dongwon_bd);
                }
            });
        });


        $tab2.hide();
        $addr2.hide();
        $picture.hide();
        $picture2.hide();

        var lat = 37.4946044;
        var lng = 127.0311071;

        var mapOptions = {
            center: new naver.maps.LatLng(lat, lng),
            zoom: 12
        };

        var map = new naver.maps.Map('map', mapOptions);
        var hyejin_bd = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map
        });

        var hyejin_bd_info = new naver.maps.InfoWindow({
            content: "<div style='padding: 4px; font-size:12px;'>혜진6층 본관, 혜진4층 2별관</div>"
        });
        naver.maps.Event.addListener(hyejin_bd, "click", function(e) {
            if (hyejin_bd_info.getMap()) {
                hyejin_bd_info.close();
            }
            hyejin_bd_info.open(map, hyejin_bd);
            $("#teacher_tab02").hide();
            $("#teacher_tab01").show();
        });
        hyejin_bd_info.open(map, hyejin_bd);

        var dongwon_bd = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.4943144, 127.0306371),
            map: map
        });

        var dongwon_bd_info = new naver.maps.InfoWindow({
            content: "<div style='padding: 4px; font-size:12px;'>동원3층 1별관</div>"
        });

        naver.maps.Event.addListener(dongwon_bd, "click", function(e) {
            if (dongwon_bd_info.getMap()) {
                dongwon_bd_info.close();
            }
            dongwon_bd_info.open(map, dongwon_bd);
            $("#teacher_tab01").hide();
            $("#teacher_tab02").show();
        });

        var weportBtn = $(".weport_map_btn");
        var naverBtn = $(".naver_map_btn");

        $maptoggle_navermap.click(function () {
            $map.show();
            $picture.hide();
            $picture2.hide();
            naverBtn.addClass('active');
            weportBtn.removeClass('active')
        });
        $maptoggle_navermap2.click(function () {
            $map.show();
            $picture.hide();
            $picture2.hide();
            naverBtn.addClass('active');
            weportBtn.removeClass('active')
        });

        $maptoggle_picture.click(function () {
            $map.hide();
            $picture.show();
            $picture2.show();
            naverBtn.removeClass('active');
            weportBtn.addClass('active')
        });
        $maptoggle_picture2.click(function () {
            $map.hide();
            $picture.show();
            $picture2.show();
            naverBtn.removeClass('active');
            weportBtn.addClass('active')
        });

    }

    return controller;
});