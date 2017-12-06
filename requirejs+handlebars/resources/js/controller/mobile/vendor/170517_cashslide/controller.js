define([
    'jquery',
    'createKakaoShareButton',
    './validation',
    'mapResizable'
], function ($, createKakaoShareButton, validation) {
    "use strict";

    var $phoneNumberSubmit = $("#phoneNumberSubmit"),
        $phoneSubmitAgreeRadio = $("#phoneSubmitAgree input"),
        $phoneNumber = $('[name=phoneNumber]'),
        $advertisementInformation = $('[name=advertisement_information]'),
        $buttonKakaoShare = $("#buttonKakaoShare"),
        $agreeDocumentcloseButton = $("#agreeDocumentcloseButton"),
        $snsLinkButton = $("#snsLink area"),
        $section02 = $("#section02");


    function submit() {

        validation
            .submit()
            .then(function (res) {

                var successMessage = res.message;
                var vendor_service = $('#vendor_service').val();
                console.log(vendor_service);
                $.post('/v1/event/vendor/' + vendor_service,
                    {
                        'phone_number': res.phoneNumber,
                        'advertisement_information': $advertisementInformation.is(':checked')
                    })
                    .then(function (res) {
                        alert(successMessage);
                        var updateDBID = res.id;

                        createKakaoShareButton
                            .bootstrap(kakaoShareButtonCallback, {
                                container: '#buttonKakaoShare',
                                label: '[무료 이벤트]\n지금 바로 신청하시면, 前대기업 채용담당자 조민혁의\n<2017 취업 팩트체크> 강의를 무료로 확인할 수 있습니다. (약 3만원 상당)\n\n당신의 취업성공을 위해, \n\"실제 채용 경험을\" 토대로 공개하는\n대기업 채용담당자의 합격을 위한 \'취업 팩트\'를\n지금 \'무료\'로 확인하세요!',
                                image: {
                                    src: $buttonKakaoShare.data('image'),
                                    width: '300',
                                    height: '180'
                                },
                                webButton: {
                                    text: '무료 신청하러 가기',
                                    url: $buttonKakaoShare.data('url')
                                }
                            });

                        $('#buttonKakaoShare').on('click.trackShare', function () {
                            $.post('/v1/event/vendor/cashslide/kakao_share', { 'id': updateDBID });
                        });

                    }, function (res) {
                        alert(res.responseJSON[0]);
                    });
            })
            .catch(function (res) {
                alert(res.message);
            });

        return false;
    }

    function handlerAgreeRadio() {
        var $self = $(this),
            $neighborhood = $self.next().find('img'),
            neighborPath = $neighborhood.attr('src'),
            status = $self.is(':checked');

        if (status) {
            $neighborhood.attr('src', neighborPath.replace('.png', '_active.png'));
        } else {
            $neighborhood.attr('src', neighborPath.replace('_active.png', '.png'));
        }

    }

    function kakaoShareButtonCallback() {
        $buttonKakaoShare.css('opacity', 1);
    }

    var agreeLayer = {
        $layer: $('#agreeDocument'),
        $buttonClose: $('#agreeDocumentcloseButton'),
        open: function () {
            agreeLayer.$layer.addClass('active');
            return false;
        },
        close: function () {
            agreeLayer.$layer.removeClass('active');
            return false;
        }
    }

    function handlerShareButton(e) {

        var $self = $(this);

        if (validation.isPass) {

        } else {

            e.preventDefault();
            alert('사전등록 후 진행해 주세요.');
            $('html, body').stop().animate({
                scrollTop: $section02.offset().top,
                easing: 'swing'
            });
            return false;

        }
    }

    function controller() {


        $phoneNumberSubmit.on('click', submit);
        $phoneSubmitAgreeRadio.on('change', handlerAgreeRadio);

        $buttonKakaoShare.on('click', handlerShareButton);
        agreeLayer.$buttonClose.on('click', agreeLayer.close);
        $('.agree_layer_button').on('click', agreeLayer.open);

        $('map').mapResizable();

        requireModule(['loaderGoogleAnalytics'], function () {
            ga('create', 'UA-99328690-1', 'auto');
            ga('send', 'pageview');
        });


    }

    return controller;
});
