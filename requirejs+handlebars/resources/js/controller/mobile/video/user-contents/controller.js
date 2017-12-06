define([
    'jquery',
    'factory/mobile/review/lecture/list/review.lecture.list',
    'factory/mobile/review/lecture/register/validation'
], function (
    $,
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
        $buttonReviewLectureMoreview = $("#buttonReviewLectureMoreview");

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

    function insertLectureList(model) {

        var templateReviewLecturelist = reviewLectureList
            .setOptions({INIT_SIZE: 3, PAGE_SIZE: 5, CURRENT_PAGE: 1})
            .setModel(model)
            .getTemplate();

        if (model.items.length == 0) {
            $lectureContentReview.addClass('no_result');
        } else if (model.items.length < 3) {
            $lectureContentReview.addClass('no_more');
        } else {

        }

        $reviewLectureContent.empty().append(templateReviewLecturelist);

    }

    function controller() {

        var $body = $('body');

        /**
         * 강의 후기 Template 삽입
         */
        insertLectureList(window.__reviewVideoListModel);

        $buttonReviewRegister.on('click', openRegisterForm);

        $buttonLectureReviewRegisterCancel.on('click', closeRegisterForm);
        $buttonLectureReviewRegisterSubmit.on('click', submitRegisterForm);

        $lectureReviewRegisterStarItem.on('click', handlerStars);
        $buttonReviewLectureMoreview.on('click', pageMoreView);

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

    }

    return controller;
});
