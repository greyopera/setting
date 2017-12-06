define(['jquery'], function () {
    "use strict";
    $(".teacher-tab-close").click(function(){
       $(".offlineTeacherFilter").hide();
       $(".teacher-tab-close").hide();
       $(".teacher-tab-open").show();
    });
    $(".teacher-tab-open").click(function(){
       $(".offlineTeacherFilter").show();
       $(".teacher-tab-open").hide();
       $(".teacher-tab-close").show();
    });

    var $statParent = $("#listmain"),
        $statButton = $('#classCount .listsub button'),
        selector = ".weport-filter";
        selector += ", .teacher-filter";
        selector += ", input[name=week_type]";
        selector += ", input[name=month_type]";
        selector += ", input[name=is_payback]";
        selector += ", input[name=time]";
        selector += ", input[name=start_date]";

    function time_to_sec(time) {
        var t = time.split(":");
        return Number(t[0]) * 3600 + Number(t[1]) * 60 + Number(t[2]);
    }

    /**
     * TODO : filter 된 항목을 다시 filter 하기 때문에, 이후 리팩토링이 필요함.
     */
    function changeStatDisplay() {

        var $list = $('.weport-content.isActive'),
            listRecruit = [], // 모집중
            listDeadlineClose = [], // 마감임박
            listClosed = [], // 마감
            $count = {
                total: $("#classCountTotal"),
                closed: $("#classCountClosed"),
                recruit: $("#classCountRecruit"),
                deadlineClose: $("#classCountDeadlineClose")
            };

        $list.filter(function() {
            var $self = $(this),
                $status = $self.find('.isStatus');

            if($status.find('.end').length) {
                listClosed.push(this);
            } else {
                listRecruit.push(this);
                if($status.find('.finish').length) listDeadlineClose.push(this);
            }
        });

        $statParent.data({
            $list: $list,
            recruit: listRecruit,
            deadlineClose: listDeadlineClose,
            closed: listClosed
        });

        $count.total.text($list.length); // 전체
        $count.recruit.text(listRecruit.length); // 모집
        $count.deadlineClose.text(listDeadlineClose.length); // 마감임박
        $count.closed.text(listClosed.length); // 마감
    }

    function filter() {

        var filter = [];

        $('.weport-filter:checked').each(function (index, f) {
            if ($(f).data('category-id')) {
                filter.push(Number($(f).data('category-id')));
            }
        });
        $(".lecture-select-reset").click(function(){
            $(".weport-filter-reset").trigger('click');
        })


        if (filter.length == 0) $(".weport-filter-all").prop('checked', true);

        var is_payback = $("input[name=is_payback]:checked").val();

        $('.weport-content').each(function (index, content) {
            var display = false;

            var content_category = $(content).data('categories');
            if (filter.length == 0) display = true;

            if(content_category.filter(function(value){
                return filter.includes(value);
            }).length == filter.length) display = true;

            if (is_payback == '1' && $(content).data('is-payback') == '0') display = false;
            if (is_payback == '0' && $(content).data('is-payback') == '1') display = false;

            // 강의시간
            var time = $("input[name=time]:checked").val();
            if (time != 'all' && display) {

                var t = time_to_sec($(content).data('time'));
                if (time_to_sec($("input[name=time]:checked").data('time-gte')) > t) display = false;
                if (time_to_sec($("input[name=time]:checked").data('time-lte')) < t) display = false;

            }

            // 개강일
            var start_date = $("input[name=start_date]:checked").val();
            if (start_date != 'all' && display) {
                display = start_date == $(content).data('start-date');
            }

            if ($(".teacher-filter:checked").data('teacher-id') != null && $(".teacher-filter:checked").data('teacher-id') != $(content).data('teacher')) display = false;

            if(display) {
                $(content).addClass('isActive').css('display', 'block');
            } else {
                $(content).removeClass('isActive').css('display', 'none');
            }

        });

        changeStatDisplay(); // 계기판 표시함.
        showCurrentStat.call( $statButton.eq(0).get(0) ); // 초기화 과정.

        // listsubTit 아래 바로 listsubTit오면 숨김
        $('.listsubTit').each(function (index, listsubTit) {
            $(listsubTit).toggle($(listsubTit).nextAll('.listsubTit, .weport-content:visible').first().hasClass('weport-content'));
        })
    }

    function showCurrentStat() {
        var $self = $(this),
            stat = $self.data('stat'),
            $list = $statParent.data('$list'),
            $target;

        $statButton.removeClass('active');
        $self.addClass("active");

        $list.css('display','none');

        var show = {
            all : function() {
                $target = $statParent.data('$list');
                $target.css('display','block');
            },
            recruit : function() {
                $target = $( $statParent.data('recruit') );
                $target.css('display','block');

            },
            deadlineClose : function() {
                $target = $( $statParent.data('deadlineClose') );
                $target.css('display','block');

            },
            closed : function() {
                $target = $( $statParent.data('closed') );
                $target.css('display','block');
            }
        };
        show[stat]();
    }

    function eventHandler() {
        $( selector ).on('change.doFilter', filter).trigger('change'); // 검색 조건에 따라 목록 filter
        $statButton.on('click.showCurrentStat', showCurrentStat); // 현재 필터된 목록에서 클릭 시 해당 내용만 표현
    }

    return {
        selector : selector,
        eventHandler : eventHandler,
        changeStatDisplay : changeStatDisplay
    };

});