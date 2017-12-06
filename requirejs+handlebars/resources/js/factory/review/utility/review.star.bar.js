define([
    'jquery',
], function ($) {
    "use strict";

    /**
     * 별점 수치가 있을 경우 소수점 2번째 자리에서 반올림
     * {% set avg_score = content.review_avg_score %}
     * TODO : backend 데이터가 소수점을 전부 표현해 주고 있어서, 개선이 필요함.
     */
    function reviewStarBar() {

        if($('.star_everage').length) {

            var starEverage = $('.star_everage'),
                starBar = starEverage.find('.bar'),
                starValue, starRatio, starOriginalValue;

            for(var a = 0, b = starEverage.length; a<b; a++) {
                starOriginalValue = starEverage.eq(a).data('score');
                if(!starOriginalValue) continue;

                starValue = Number(starEverage.eq(a).data('score')).toFixed(1);
                starValue = (starValue == 0.0) ? 0 : starValue;
                starRatio = ((100*starValue)/5).toFixed(1);

                if(starOriginalValue == 0) starEverage.eq(a).find('.everage').remove();
                else starEverage.eq(a).find('.everage em').text(starValue);

                starBar.eq(a).find('em').width(starRatio + '%');

            }

        }
    }

    return reviewStarBar;

});