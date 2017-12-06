define([
    'jquery',
    'parseURL',
    'createGoogleShortUrl',
    'createKakaoShareButton',
    'factory/mobile/review/lecture/list/review.lecture.list',
    'factory/mobile/review/lecture/register/validation',
    'simpleCarousel',
    'loaderDable'
], function (
    $,
    parseURL,
    createGoogleShortUrl,
    createKakaoShareButton,
    reviewLectureList,
    reviewRegisterValidation)
{
    "use strict";

    var $lectureCarousel = $("#lectureCarousel"),
        $lectureDetailViewBodyTablist = $("#lectureDetailViewBodyTablist"),
        $lectureDetailViewBodyTabAnchor = $lectureDetailViewBodyTablist.find('a'),
        $lectureDetailViewBodyContents = $("#lectureDetailViewBodyContents"),
        $lectureDetailViewBodyContentsChild = $lectureDetailViewBodyContents.children(),
        $buttonReviewRegister = $("#buttonReviewRegister"),
        $lectureContentReview = $("#lectureContentReview"),
        $contentsReviewForm = $("#contentsReviewForm"),
        $lectureReviewRegister = $("#lectureReviewRegister"),
        $lectureReviewRegisterStarList = $("#lectureReviewRegisterStarList"),
        $lectureReviewRegisterStarItem = $lectureReviewRegisterStarList.find('label'),
        $reviewLectureContent = $("#reviewLectureContent"),
        $reviewRegisterSubject = $("#reviewRegisterSubject"),
        $reviewRegisterDescription = $("#reviewRegisterDescription"),
        $lectureDetailViewFooter = $("#lectureDetailViewFooter"),
        $buttonLectureReviewRegisterSubmit = $("#buttonLectureReviewRegisterSubmit"),
        $buttonLectureReviewRegisterCancel = $("#buttonLectureReviewRegisterCancel"),
        $buttonReviewLectureMoreview = $("#buttonReviewLectureMoreview"),
        $buttonKakaoShare = $("#buttonKakaoShare");

    function scrollHeight() {

        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }

    function submitRegisterForm(e) {

        e.preventDefault();

        reviewRegisterValidation()
            .then(function () {

                if ($reviewRegisterDescription.val() == '') {
                    $reviewRegisterDescription.val($reviewRegisterSubject.val());
                }

                return $.ajax({
                    type: "POST",
                    url: $contentsReviewForm.attr('action'),
                    data: {
                        'score':$('[name=score]:checked').val(),
                        'subject':$reviewRegisterSubject.val(),
                        'description':$reviewRegisterDescription.val()
                    }
                });

            })
            .then(function(res) {

                if(res.status == 'success') {

                    alert('정상 등록 되었습니다.');

                    closeRegisterForm();

                    window.__reviewVideoListModel.items.unshift(res.data);
                    insertLectureList(window.__reviewVideoListModel);

                    $('[name=score][value=5]+label').get(0).click();
                    $reviewRegisterSubject.val('');
                    $reviewRegisterDescription.val('');

                }

            })
            .catch(function (res) {
                if (e) e.preventDefault();
                if (res.message) alert(res.message);
                return false;
            });

        return false;
    }

    function closeRegisterForm() {
        $lectureReviewRegister.removeClass('is_open_register');
    }

    function openRegisterForm() {
        var $self = $(this),
            existUserContent = $self.data('exist-user-content');

        if(existUserContent == 'True') {
            alert('수강후기는 실제 수강생만 작성 가능합니다.')
        } else {
            $lectureReviewRegister.addClass('is_open_register');
        }

    }

    function menuHandler() {

        var $self = $(this),
            $parent = $self.closest('ul'),
            $children = $parent.children(),
            $targetElement = $($self.attr('href'));

        $children.removeClass('active');
        $lectureDetailViewBodyContentsChild.removeClass('active');

        $self.closest('li').addClass('active');
        $targetElement.addClass('active');
        $(window).trigger('scroll');

        return false;
    }

    function handlerStars() {
        var $self = $(this),
            index = $self.closest('li').index() + 1;

        $lectureReviewRegisterStarItem.removeClass('active');

        for (var a = 0; a < index; a++) {
            $lectureReviewRegisterStarItem.eq(a).addClass('active');
        }

    }

    function pageMoreView() {

        var templateReviewLecturelist = reviewLectureList
            .nextPage()
            .getTemplate();

        if (reviewLectureList.PAGE_STATUS == 'LIST_FULL') {
            $lectureContentReview.addClass('list_full');
        }

        $reviewLectureContent.append(templateReviewLecturelist);
        $(window).trigger('scroll');

        return false;
    }

    var scrollHandler = {
        bootstrap: function () {

            var scrollTop = $(window).scrollTop(),
                footerHeight = $('footer').outerHeight(),
                allowScroll = scrollHeight() - $('body').height(),
                limitMatrix = allowScroll - footerHeight;

            if (allowScroll - footerHeight <= 0 || scrollTop >= limitMatrix) {
                $lectureDetailViewFooter.removeClass('fixed');
                if(!$lectureDetailViewFooter.hasClass('active')) $lectureDetailViewFooter.addClass('active');

            } else {

                if(!$lectureDetailViewFooter.hasClass('fixed')) $lectureDetailViewFooter.addClass('fixed');
                if (scrollTop == 0) {
                    $lectureDetailViewFooter.removeClass('active');
                } else {
                    if(!$lectureDetailViewFooter.hasClass('active')) $lectureDetailViewFooter.addClass('active');
                }

            }

        }
    }

    function connectGoogleShortURLwithKakaoShareButton() {

        function kakaoShareButtonCallback() {
            $buttonKakaoShare.css('opacity', 1);
        }

        function googleShortURLCallback() {

            var GOOGLE_SHORT_URL = createGoogleShortUrl.shortURL,
                opts = {
                    container: '#buttonKakaoShare',
                    label: '이 강의 추천해 드려요.\n\n' + $buttonKakaoShare.data('label') + '\n' + GOOGLE_SHORT_URL,
                    image: {
                        src: $buttonKakaoShare.data('image'),
                        width: '300',
                        height: '180'
                    },
                    webButton: {
                        text: '바로 가기',
                        url: GOOGLE_SHORT_URL // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL 이어야 합니다.
                    }
                };

            createKakaoShareButton
                .bootstrap(kakaoShareButtonCallback, opts);
        }

        createGoogleShortUrl // Generate Google Short URL
            .bootstrap($buttonKakaoShare.data('url'), googleShortURLCallback);
    }

    function insertLectureList(model) {

        var templateReviewLecturelist = reviewLectureList
            .setOptions({PAGE_SIZE: 5, CURRENT_PAGE: 1})
            .setModel(model)
            .getTemplate();

        if (model.items.length == 0) {
            $lectureContentReview.addClass('no_result');
        } else if (model.items.length < 5) {
            $lectureContentReview.addClass('no_more');
        } else {

        }

        $reviewLectureContent.empty().append(templateReviewLecturelist);

    }

    function controller() {

        /**
         * 강의 후기 Template 삽입
         */
        insertLectureList(window.__reviewVideoListModel);

        $lectureCarousel.simpleCarousel({
            $listwrapper: $lectureCarousel.find('.lecture_detail_view_headinfo__embed__wrapper'),
            timer: 0,
            // navigator: $lectureCarousel.find('.lecture_detail_view_headinfo__embed__dots'),
            easing: 'easeOutQuint',
            touchSlide: true
        });

        $lectureDetailViewBodyTabAnchor.on('click', menuHandler);
        $buttonReviewRegister.on('click', openRegisterForm);

        $buttonLectureReviewRegisterCancel.on('click', closeRegisterForm);
        $buttonLectureReviewRegisterSubmit.on('click', submitRegisterForm);

        $lectureReviewRegisterStarItem.on('click', handlerStars);
        $buttonReviewLectureMoreview.on('click', pageMoreView);

        $(window).on('scroll', scrollHandler.bootstrap).trigger('scroll');

        connectGoogleShortURLwithKakaoShareButton(); // 구글 Short URL 추출 후 카카오 버튼과 연동.

        $reviewRegisterSubject.on('focus', function() { $lectureDetailViewFooter.removeClass('active'); });
        $reviewRegisterDescription.on('focus', function() { $lectureDetailViewFooter.removeClass('active'); });
        $reviewRegisterSubject.on('blur', function() { $(window).trigger('scroll'); });
        $reviewRegisterDescription.on('blur', function() { $(window).trigger('scroll'); });

        if($lectureContentReview.data('status') == 'True' && $lectureContentReview.data('is-have-content') == 'True') {
            $("#tabMenuReviewAnchor").trigger('click');
            $lectureReviewRegister.addClass('is_open_register');
        }
        else if($lectureContentReview.data('status') == 'True' && $lectureContentReview.data('is-have-content') == 'False') {
            $("#tabMenuReviewAnchor").trigger('click');
        }

        $(window).on('load', function () {

            // 관련 컨텐츠 데이블
            dable('setService', 'weport.co.kr');
            dable('renderWidget', 'dablewidget_ml6ydR74', {ignore_items:true});

        });


    }

    return controller;
});
