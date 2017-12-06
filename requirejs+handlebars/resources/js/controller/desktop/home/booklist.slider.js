define(['jquery'], function ($) {
    "use strict";

    /**
     * $superElement : 모체 객체 요소
     * $list : 목록 요소
     * $listwrapper : 목록 랩퍼 요소
     * $children : 목록의 자식들 요소
     * $buttonPrev : Prev 이동버튼 요소
     * $buttonNext : Next 이동버튼 요소
     * $pagingCurrent : 현재 페이지 요소
     * $pagingTotal : 전체 페이지 요소
     * showCount : 한번에 보여지는 갯수
     * currentCount : 현재 페이지 수
     * totalCount : 전체 페이지 수
     * currentDestinate : 현재 움직인 좌표값
     */
    var booklistSlider = {

        movePrev: function () {
            if(this.currentCount == 0) return;
            this.currentCount = this.currentCount - 1;

            this._move('prev');
            this._setPaging();
        },

        moveNext: function () {
            if(this.currentCount == this.totalCount - 1) return;
            this.currentCount = this.currentCount + 1;

            this._move('next');
            this._setPaging();
        },

        bindEvent: function () {
            this.$buttonPrev.on('click', $.proxy(this.movePrev, this));
            this.$buttonNext.on('click', $.proxy(this.moveNext, this));
        },

        bootstrap: function (opts) {
            for (var prop in opts) this[prop] = opts[prop]

            this.$children = this.$list.children();
            this.bindEvent();
            this._setInitialVariable();
            this._setSize();
            this._setPaging();
        },

        _setInitialVariable: function () {
            this.currentCount = 0;
            this.currentDestinate = 0;
            this.totalCount = Math.ceil(this.$children.length / this.showCount);
        },

        _setSize: function () {

            var totalSize = 0,
                wrapperSize = 0,
                inSize = 0;

            for (var a = 0, b = this.$children.length; a < b; a++) {
                inSize = this.$children.eq(a).outerWidth(true);
                if( a < this.showCount ) {
                    wrapperSize += inSize;
                }
                totalSize += inSize;
            }

            this.$list.width( totalSize );
            this.$listwrapper.width( wrapperSize );
        },

        _setPaging: function () {
            this.$pagingTotal.text(this.totalCount);
            this.$pagingCurrent.text(this.currentCount+1);
        },

        _move: function (direction) {

            var startCount = this.currentCount * this.showCount,
                endCount = startCount + this.showCount,
                destinate,
                destinateWeight = 0;

            for (var a = startCount, b = endCount; a < b; a++) {
                destinateWeight -= this.$children.eq(a).outerWidth(true);
            }

            if(direction == 'next') {
                destinate = this.currentDestinate + destinateWeight;
            } else {
                destinate = this.currentDestinate - destinateWeight;
            }

            this.$list.css('left', destinate);
            this.currentDestinate = destinate;
        }
    }

    return booklistSlider;
});