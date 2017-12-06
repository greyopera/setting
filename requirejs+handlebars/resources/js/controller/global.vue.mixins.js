define([], function () {
    return {
        filterMixin: {
            filters: {
                /**
                 * 날자 객체를 Y.m.d 형태 스트링으로 변환
                 */
                date: function(value) {
                    var dateObj = new Date(value);
                    return dateObj.getFullYear() + '. ' + (dateObj.getMonth() + 1) + '. ' + dateObj.getDate() + '.';
                },

                /**
                 * 이름 홍길동을 홍*동으로 변환 2자인 경우 홍* 으로 변혼
                 * 후기 리스트에서 사용함
                 */
                namemask: function(value) {
                    if (value.length > 2) {
                        var head = value[0];
                        var tail = value[value.length-1];
                        var body = '';

                        for(var i = 0; i < value.length-2; i++) {
                            body += '*';
                        }

                        return head + body + tail;
                    } else {
                        return value[0] + '*';
                    }
                },

                /**
                 * 가격 표시할 때 3자리 단위마다 컴마를 찍어줌
                 */
                numWithCommas: function (value) {
                    if (value)
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    else
                        return value;
                },

                /**
                 * 시간 표시할 때 시, 분만 표시하고 초는 버림
                 */
                formattime: function (value) {
                    if (value)
                        return value.slice(0, 5);
                    else
                        return value;
                }
                
            },

            methods: {
                /**
                 * 후기 별 로드
                 */
                renderStars: function (value) {
                    var count_star_off = 5 - value;
                    var count_star_on = value;

                    var result_html = '';

                    for(var i = 0; i < count_star_on; i++) {
                        result_html += '<img class="star star-on" src="/static/images/common/star03_on.png" />';
                    }

                    for(var i = 0; i < count_star_off; i++) {
                        result_html += '<img class="star star-off" src="/static/images/common/star02_off.png" />';
                    }

                    return result_html;
                }
            }
        }
    }
});