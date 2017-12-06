define([
    'jquery',
    'HandlerExpiredTimer',
], function ($, HandlerExpiredTimer) {
    "use strict";

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
                    for (var i = 0; i < 3; i++) {
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
            if (timeCnt > 3) {
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

    function setOfflineList() {     // 체크된 카테고리에 따른 리스트 출력
        var checked_categories = [],
            hashStr = '#';
        $('#offlineLectureList .filter').each(function(){
            $(this).hide();
        });
        $('#offlineLectureFilter .child-category').each(function(){
            var t = $(this);
            if(t.prop('checked')) {
                checked_categories.push(t.val() * 1);
                hashStr += t.val() + ',';
            }
        });        
        $('#total .offline_lecture_list').each(function(){  // 체크된 카테고리와 리스트 각 목록에 저장된 카테고리 비교
            var categoryArr = $(this).data('category'),
                t = $(this), 
                flag = false;
            
            for(var i = 0, len = categoryArr.length; i < len; i++) {
                if(checked_categories.indexOf(categoryArr[i]) !== -1) {
                    t.show();
                    flag = true;
                    break;
                }
            }
            if(!flag) t.hide();
        });
        if(hashStr === "#"){
            location.hash = "!";
        } else {
            location.hash = hashStr.substring(1, hashStr.length - 1);
        }
        
        $('#total').show();
    }
    
    function allCheck(){
        $('#offlineLectureFilter input:checkbox').prop('checked', true);
        $('#total .offline_lecture_list').show();
    }

    function controller() {
        document.getElementById('total').style.display = 'block';

        $('.filterButton').on('click', function(){  // 전체 , 모집중, 마감임박, 최근개설강의, 예정강의 눌렀을 때의 리스트 출력
            var ref = $(this).attr('name');           
            $('#offlineLectureList .filter').each(function(){
                $(this).hide();
            });
            $('#' + ref).show();
            if(ref === "total"){
                allCheck();
            } else {                
                $('#offlineLectureFilter input:checkbox').prop('checked', false);
            }
            location.hash = "!";
        });        

        $('#offlineLectureFilter .all-check').on('change', function(){  // 전체 체크시
            var checked = $(this).prop('checked');
            $(this).parent().parent().find('.child-category').prop('checked', checked);
            setOfflineList();
        });

        $('#offlineLectureFilter .child-category').on('change', function(){
            $(this).parent().parent().find('.all-check').prop('checked', false);
            setOfflineList();
        });
        $('#selectReset').on('click', function(){   // 선택초기화
            $('#offlineLectureFilter input:checkbox').prop('checked', false);
            setOfflineList();
        });     
	
		$(window).on('load', function () {
		    var hashtag = location.hash.substring(1, location.hash.length).replace(/ /gi, '%20'),
                hashArr = hashtag.split(',');
            
            if(hashtag) {                
                $('#offlineLectureFilter .child-category').each(function(){
                    var t = $(this);
                    if( hashArr.includes(t.val().toString()) ) {
                        t.prop('checked', true);
                    }
                });
                setOfflineList();
            } else {
                $('#offlineLectureFilter input:checkbox').prop('checked', true);
            }            
		});
    }

    return controller;
});