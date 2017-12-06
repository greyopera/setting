define(['jquery', 'moment'], function($, moment) {

    /**
     * 이벤트 종료시간 계산하기.
     * http://admin.weport.co.kr/ > 기타(배너) > weport.menu.event_timer에 의존 하고 있음.
     * @refer http://apis.weport.co.kr/v1/meta/metadata/events/view
     * @param {string} event_name
     * @param {function} callback
     * @returns {instance} jQuery chain
     * @example
     *  $(selector).expiredTime('event.weport.3', callback) // 종료시간 할당.
     *  $(selector).data('expiredDate') // 종료 남은 시간 days, hours, minutes, seconds, milliseconds
     */
    function expiredTime( event_name, callback ) {

        var $self = $(this),
            getExpired = function() {
                return $.get('//apis.weport.co.kr/v1/meta/metadata/events/view');
            },
            convertDate = function() {

                var dates = moment.duration( $self.data('expiredDate') );

                // TODO : moment.duration.format 의 방법을 찾아야 함.
                return {
                    days : (dates.days() < 10) ? '0' + dates.days() : dates.days().toString(),
                    hours : (dates.hours() < 10) ? '0' + dates.hours() : dates.hours().toString(),
                    minutes : (dates.minutes() < 10) ? '0' + dates.minutes() : dates.minutes().toString(),
                    seconds : (dates.seconds() < 10) ? '0' + dates.seconds() : dates.seconds().toString(),
                    milliseconds : (dates.milliseconds() < 10) ? '0' + dates.milliseconds() : dates.milliseconds().toString(),
                };

            };

        function initialize() {

            var $self = $(this);

            getExpired().then(function(res) {

                $self.data('expiredDate', res[event_name].deadline * 1000);
                if(callback) callback.call($self.get(0), convertDate());

            }).fail(function(res) {

                $self.data('expiredDate', false);

            });

            $self.on('convertDate', convertDate);
        }

        return this.each(initialize);
    }

    $.fn.expiredTime = expiredTime;
});
