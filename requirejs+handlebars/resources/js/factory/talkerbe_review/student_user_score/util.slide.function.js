define([
    'jquery'
], function($) {

    /**
     * @constructor
     * @description 후기를 롤링 시키는 기능.
     */
    function slideFunction() {

        this.sceneCount = 0;
        this.timer = null;
        this.timerCount = null;
        this.$container = null;
        this.$list = null;
        this.FULL_SIZE = 0; // 전체 컴럼 수
        this.COLUMN_SIZE = 1; // 반복 컬럼수
        this.DISPLAY_SIZE = 5; // 한페이지에 보여지는 컬럼 수
        this.COLUMN_HEIGHT = 37; // 페이지당 움직이는 수치
        this.isAnimate = false;

    }

    slideFunction.prototype = {

        movePrev: function () {

            if (this.isAnimate) return false;
            if (this.sceneCount == 0) {
                this.sceneCount = this.PAGE_SIZE + 1;
            }

            this.sceneCount--;
            this._moveScene();

        },

        moveNext: function () {

            if (this.isAnimate) return false;

            if (this.sceneCount >= this.PAGE_SIZE) {
                this.sceneCount = -1;
            }

            this.sceneCount++;
            this._moveScene();

        },

        _moveScene: function () {

            var that = this,
                coodinates = -this.COLUMN_HEIGHT * this.sceneCount;

            this.isAnimate = true;
            this.$list.stop()
                .animate({
                    marginTop: coodinates + 'px'
                }, {
                    easing: 'easeOutExpo',
                    duration: 400,
                    complete: function () {
                        that.isAnimate = false;
                    }
                });

        },

        _startTimer: function () {

            var that = this;
            if (this.timer) this._stopTimer();

            this.timer = setInterval(function () {

                if (that.sceneCount == that.PAGE_SIZE) that.sceneCount = -1;
                that.moveNext();

            }, this.timerCount);

        },

        _stopTimer: function () {
            clearTimeout(this.timer);
        },

        bootStrap: function (opts) {

            this.$list = $(opts.selector.list);
            this.$container = $(opts.selector.container);

            this.$buttonPrev = $(opts.selector.button.prev);
            this.$buttonNext = $(opts.selector.button.next);

            this.timerCount = opts.timerCount || null;
            this.FULL_SIZE = opts.fullSize;
            this.PAGE_SIZE = Math.floor( (this.FULL_SIZE - this.DISPLAY_SIZE) / this.COLUMN_SIZE );

            this.$container.on('click.movePrev', opts.selector.button.prev, $.proxy(this.movePrev, this));
            this.$container.on('click.moveNext', opts.selector.button.next, $.proxy(this.moveNext, this));

            this.$buttonPrev.addClass('active');
            this.$buttonNext.addClass('active');

            if (this.timerCount) {
                this.$container.on('mouseenter', $.proxy(this._stopTimer, this));
                this.$container.on('mouseleave', $.proxy(this._startTimer, this));

                this._startTimer();
            }

        }

    };

    return slideFunction;

});


