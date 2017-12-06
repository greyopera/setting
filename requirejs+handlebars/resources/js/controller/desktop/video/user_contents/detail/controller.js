define([
    'jquery'
], function ($) {
    "use strict";

    var is_menu = false;
    var list_width = 250;
    var top_container = $("#top_container").height();
    var is_hd = true;

    function toggle_menu() {
        is_menu = !is_menu;

        if (is_menu == false) {
            $('#player_container').css('width', $(window).innerWidth());
            $("#list_container").animate({
                'right': -250
            }, 100);
            $("#btn_quailty").animate({
                'right': 80
            }, 100);
        } else {
            $('#player_container').css('width', $(window).innerWidth() - 250);
            $("#list_container").animate({
                'right': 0
            }, 100);
            $("#btn_quailty").animate({
                'right': 260
            }, 100);
        }
    }

    function controller() {

        $("#player_container").attr('src', $("#player_container").data('url-high'));

        $('#hdoff').click(function () {
            $('#hdimg').attr('src', '/static/images/newimg/mypage/pophdoff.png');
            $('#hdoff').attr('src', '/static/images/newimg/mypage/popvodoff_on.png');
            $('#hdon').attr('src', '/static/images/newimg/mypage/popvodon_off.png');
            $("#player_container").attr('src', $("#player_container").data('url-low'));
        });

        $('#hdon').click(function () {
            $('#hdimg').attr('src', '/static/images/newimg/mypage/pophdon.png');
            $('#hdoff').attr('src', '/static/images/newimg/mypage/popvodoff_off.png');
            $('#hdon').attr('src', '/static/images/newimg/mypage/popvodon_on.png');
            $("#player_container").attr('src', $("#player_container").data('url-high'));
        });

        $('#player_container').css('width', $(window).innerWidth());
        $("#player_container").css('height', $(window).innerHeight() - $("#top_container").height() - $('#banner_container').height());
        $("#list_container").css('height', $(window).innerHeight());

        $(window).resize(function () {
            $('#player_container').css('width', $(window).innerWidth());
            $("#player_container").css('height', $(window).innerHeight() - $("#top_container").height());
            console.log($(window).innerHeight(),$("#top_container").height(),$('#banner_container').height());
            $("#list_container").css('height', $(window).innerHeight());
        });

        $("#tfbannercls").click(function () {
            $("#banner_container").css({height:0, overflow:'hidden'});
            $(window).trigger('resize');
        });

        $("#btn_toggle, #btn_toggle2").on('click', toggle_menu);
    }

    return controller;
});