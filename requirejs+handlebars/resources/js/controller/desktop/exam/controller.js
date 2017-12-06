define([
    'jquery'
], function ($) {
    "use strict";




    // for (i=0; i<$(".list_test_r tr").length-1;i++){
    //     var v = i+1;
    //     $(".question_list").eq(i).children('div').addClass('question_' + v);
    // }
    $(".list_test_r input").on("click", function(){
       var examItem = "." + $(this).attr("class");
       $(examItem).find('span').addClass("check");

       var examResultCount  = $(".list_test_r input:checked").length;
       var examTotalCount = $(".list_test_r tr").length-1;
       $("#examRemainCount").html( examTotalCount - examResultCount );
    });
    $(window).resize(function(){
        var omrHeight = $(window).height();
        var windowWidth = $(window).width();
        $(".exam-omr-inner").css("height",omrHeight - 150);
        $("#test_problem_wrap").css("width",windowWidth-250);

    }).resize();
    $(document).ready(function(){
        var pagerHtml = "";
        pagerHtml += '<a class="exam_pager exam_1 exam_active" onclick="currentDiv(1)"><span class="exam-pager-check"></span>1</a>'
        $(".exam_pager_button").html(pagerHtml);
        for ( var dots=2; dots<$(".list_test_r tr").length ; dots++){
            pagerHtml += '<a class="exam_pager exam_'+dots+' question_'+dots+'" onclick="currentDiv('+dots+')"><span class="exam-pager-check"></span>'+dots+'</a>'
            $(".exam_pager_button").html(pagerHtml);
        }
    });



    function controller() {
        $("#examHeaderToggle").on("click", function(){
            $("#examHeader").hide();
            $("#examHeaderOff").show();
        });
        $("#examHeaderOn").on("click", function(){
            $("#examHeader").show();
            $("#examHeaderOff").hide();
        });
        $("#examImageZoom_slide").on("click",function(){
            $(".zoom_list").slideToggle();
        });
        $("#examImageZooom_125").on("click", function(){
            var findImg = $("#problemList li img");
            $("#problemList img").css("width","initial");
            for(i=0; i<findImg.length;i++){
                findImg.eq(i).css("width", findImg[i].width * 1.25);
            }
            $(".zoom_list").slideUp();
            $("#examImageZoom_slide .exam_zoom_text").text('125%');
        });
        $("#examImageZooom_150").on("click", function(){
            var findImg = $("#problemList li img");
            $("#problemList img").css("width","initial");
            for(i=0; i<findImg.length;i++){
                findImg.eq(i).css("width", findImg[i].width * 1.5);
            }
            $(".zoom_list").slideUp();
            $("#examImageZoom_slide .exam_zoom_text").text('150%');
        });
        $("#examImageZooom_100").on("click", function(){
            $("#problemList img").css("width","initial");
            $(".zoom_list").slideUp();
            $("#examImageZoom_slide .exam_zoom_text").text('100%');
        });
    }
    return controller;

});