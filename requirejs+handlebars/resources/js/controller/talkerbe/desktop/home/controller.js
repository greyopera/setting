define([
    'jquery',
    'factory/talkerbe_review/student_user_score/talkerbe.review.student.user.score',
    'factory/talkerbe_review/student_user_score/util.slide.function',
    'factory/talkerbe_school_plan_board/talkerbe.school.plan.board',
    'factory/talkerbe_school_plan_board/util.slide.function',
    'jqueryCookie',
    'jqueryFreezeheader',
    'complexCarousel'
], function($, talkerbeReviewStudentUserScore, slideFunction, talkerbeSchoolPlanBoard, schoolSlideFunction) {
    "use strict";

    if(!$.fn.freezeHeader) $.fn.freezeHeader = window.jQuery.fn.freezeHeader;

    var $popLayerWarningMessage01 = $("#popLayerWarningMessage01"),
        $buttonLayerWarningMessageClose = $("#buttonLayerWarningMessageClose"),
        $buttonLayerWarningMessageCloseall = $("#buttonLayerWarningMessageCloseall"),
        $reviewStudentUserScore = $("#reviewStudentUserScore"),
        $reviewStudentUserScoreRollingList = $("#reviewStudentUserScoreRollingList"),
        $reviewStudentUserScoreRollingListTable,
        reviewStudentUserslideInstance,
        $schoolPlanBoard = $("#schoolPlanBoard"),
        $schoolPlanBoardRollingList = $("#schoolPlanBoardRollingList"),
        $schoolPlanBoardRollingListTable,
        schoolPlanBoardslideInstance,
        $mainStreategyLectureBoardTeachers = $("#mainStreategyLectureBoardTeachers");



    $(document).ready(function(){
        if ($.cookie('floatingoneday') == undefined ){
            $("#floating_banner").show();
        }
        $("#floatOneDayCloseButton").click(function(){
           $("#floating_banner").hide();
        });


        if ($.cookie('oneDay') == undefined) {
            $("#popLayerFreepass").show();
        }
        $("#oneDayCloseButton").bind("click",function(){
            if ($("#oneDayCloseCheck input").is(":checked")){
                $.cookie('oneDay', '1', { expires: 1, path : '/' });
            }
            $("#popLayerFreepass").hide();
            return false;
        });
    });
    $("#oneDayCloseCheck").click(function(){
        if ($("#oneDayCloseCheck input").is(":checked")) {
            $.cookie('oneDay', '1', { expires: 1, path : '/' });
            $("#popLayerFreepass").hide();
        };
    });
    $("#floatOneDayCloseCheck").click(function(){
        $.cookie('floatingoneday', '2', { expires: 1, path: '/'});
        $("#floating_banner").hide();
        return false;
    });


    function closeWarningPopup() {
        $popLayerWarningMessage01.removeClass('active');
    }

    function closeAllWarningPopup() {
        $.cookie('talkerbe_popup_main_warning_message0412', 'true');
        closeWarningPopup();
    }

    function controller() {

        /* 메인 경고 메세지 팝업 */
        if($.cookie('talkerbe_popup_main_warning_message0412') != 'true') {
            $popLayerWarningMessage01.addClass('active');
        }
        $buttonLayerWarningMessageClose.on('click', closeWarningPopup);
        $buttonLayerWarningMessageCloseall.on('click', closeAllWarningPopup);

        /*
            수강생 성적후기 모델
        */
        $reviewStudentUserScore.on('mouseenter', function() { $(this).addClass('is_enter') });
        $reviewStudentUserScore.on('mouseleave', function() { $(this).removeClass('is_enter') });

        var templateTalkerbeReviewStudentUserScore = talkerbeReviewStudentUserScore
            .setModel(window.__reviewStudentUserScore)
            .getTemplate();

        $reviewStudentUserScoreRollingList.empty().append(templateTalkerbeReviewStudentUserScore);
        $reviewStudentUserScoreRollingListTable = $reviewStudentUserScoreRollingList.find('table');
        $reviewStudentUserScoreRollingListTable.freezeHeader({ 'height': '223px', hideScroll: true });

        reviewStudentUserslideInstance = new slideFunction();
        reviewStudentUserslideInstance.bootStrap({
            selector: {
                container: '#reviewStudentUserScore',
                list: '#reviewStudentUserScoreRollingList > div > table',
                button: {
                    prev: '#reviewStudentUserScoreRollingPrev',
                    next: '#reviewStudentUserScoreRollingNext'
                }
            },
            timerCount : 3000,
            fullSize : window.__reviewStudentUserScore.items.length
        });

        /*
            학원 개설 강의 모델
        */
        $schoolPlanBoard.on('mouseenter', function() { $(this).addClass('is_enter') });
        $schoolPlanBoard.on('mouseleave', function() { $(this).removeClass('is_enter') });

        var templateTalkerbeSchoolPlanBoard = talkerbeSchoolPlanBoard
            .setModel(window.__schoolPlanBoard)
            .getTemplate();

        $schoolPlanBoardRollingList.empty().append(templateTalkerbeSchoolPlanBoard);
        $schoolPlanBoardRollingListTable = $schoolPlanBoardRollingList.find('table');
        $schoolPlanBoardRollingListTable.freezeHeader({ 'height': '223px', hideScroll: true });

        schoolPlanBoardslideInstance = new schoolSlideFunction();
        schoolPlanBoardslideInstance.bootStrap({
            selector: {
                container: '#schoolPlanBoard',
                list: '#schoolPlanBoardRollingList > div > table',
                button: {
                    prev: '#schoolPlanBoardRollingPrev',
                    next: '#schoolPlanBoardRollingNext'
                }
            },
            timerCount : 0,
            fullSize : window.__schoolPlanBoard.items.length
        });

        /*
            학원 소개 롤링
        */
        $mainStreategyLectureBoardTeachers.complexCarousel({
            $list: $mainStreategyLectureBoardTeachers.find('.main_streategy_lecture_board__teachers__list'),
            $navigator: $mainStreategyLectureBoardTeachers.find('.main_streategy_lecture_board__teachers__navigator'),
            $menuAnchor: $mainStreategyLectureBoardTeachers.find('.main_streategy_lecture_board__teachers__navigator .button'),
            $listwrapper: $mainStreategyLectureBoardTeachers.find('.main_streategy_lecture_board__teachers__wrapper'),
            timerCount: 2000,
            easing: 'easeInOutExpo'
        });

    }

    return controller;
});