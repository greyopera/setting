define([
    'jquery'
], function ($) {
    "use strict";

    var $freeList,
        $videoList;

    function videoStop() {
        for(var a = 0, b = $videoList.length; a<b; a++) $videoList.eq(a).get(0).pause();
        $(".freeclass__video_list__context.isYoutube iframe").remove();
    }

    function clickList() {

        var $self = $(this),
            $videoContext = $self.find('.freeclass__video_list__context');

        if($self.is('.isPlay')) {
            closeList()
            return;
        }

        videoStop();
        $freeList.removeClass('isPlay');

        $self.addClass('isPlay');

        if($videoContext.is('.isYoutube')) {

            if($videoContext.data('src') == '') {

                $videoContext.empty().append('<p>주소가 바르지 않습니다.</p>');

            } else {
                var videoAddress = $videoContext.data('src') + "?&autoplay=1",
                    $iframeContext = $videoContext.find('iframe');

                $iframeContext.remove();

                var iframe = $("<iframe>")
                    .attr('src', videoAddress)
                    .attr('allowfullscreen', '1')
                    .css({
                        'width': '563px',
                        'height': '344px',
                        'margin-left': 'auto',
                        'margin-right': 'auto',
                        'display': 'block'
                    });

                $videoContext.append(iframe);
            }

        } else {

            var $videoTarget = $videoContext.find('video');
            $videoTarget.get(0).play();
        }
    }

    function closeList() {

        videoStop();
        $freeList.removeClass('isPlay');

        return false;
    }

    function listHandler() {

        $freeList = $(".freeclass__video_list__items"),
        $videoList = $(".freeclass__video_list__items video");

        //강의 리스트를 클릭 했을때
        $freeList.on("click", clickList);

        // X 버튼 클릭시
        $(".btn_youtube_close").click(closeList);

    }

    return listHandler;
});