define([
    'jquery',
    'expiredTimer',
], function ($) {
    "use strict";

    /**
     * expiredTime 함수를 이용해서 Timer를 연결.
     * @constructor
     */
    function HandlerExpiredTimer(opts) {
        this.$targetSelector = (opts.targetSelector instanceof $) ? opts.targetSelector : $(opts.targetSelector);
        this.leftTimerAPIEventName = opts.leftTimerAPIEventName;
        this.displayCallback = opts.displayCallback;
    }

    HandlerExpiredTimer.prototype = {
        constructor: this,
        destroy: function() {
            clearTimeout(this.timerStatus);
        },
        timerBinding: function() {

            var that = this;

            this.$targetSelector.expiredTime(this.leftTimerAPIEventName, function () {

                var $self = $(this); // this: target Element

                that.timerStatus = setInterval(function () {
                    var remainTime = $self.data('expiredDate');
                    if (remainTime <= 0) {
                        clearInterval(that.timerStatus);
                        return;
                    }

                    $self.data('expiredDate', remainTime - 1000);
                    that.displayCallback($self.triggerHandler('convertDate'));

                }, 1000);

                that.displayCallback($self.triggerHandler('convertDate'));
            });

        },

        bootstrap: function() {

            this.timerBinding();

        }
    }

    return HandlerExpiredTimer;
});
