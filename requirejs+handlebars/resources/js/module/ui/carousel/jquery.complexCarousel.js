define([
    'jquery',
    'jqueryTouchSwipe',
    'jqueryTransit'
], function ($) {
    "use strict";

    /**
     * Complex Carousel
     * @dependency jQuery, touchSwipe, transit
     * @param options
     * @returns {*}
     */
    function complexCarousel(options) {

        var $superElement = $(this);
        var defaults = {
            $list: $superElement.find('ul'),
            $navigator: $superElement.find('.menu_list ul'),
            $listwrapper: $superElement.find('.listwrapper'),
            $prev: $superElement.find('button.prev'),
            $next: $superElement.find('button.next'),
            $play: $superElement.find('button.play'),
            $stop: $superElement.find('button.stop'),
            $menuAnchor: null,
            replaceMenuImage: null,
            perwidth: null,
            fullwidth: null,
            showcount: null,
            timerCount: null
        };

        var settings = $.extend({}, defaults, options);

        var FULL_WIDTH,
            PER_WIDTH,
            LIST_COUNT,
            SHOW_COUNT,
            $list = settings.$list,
            $listwrapper = settings.$listwrapper,
            $listchild = $list.children(),
            $prevButton = settings.$prev,
            $nextButton = settings.$next,
            $navigator = settings.$navigator,
            $navchild = $navigator.children(),
            $menuAnchor = settings.$menuAnchor,
            turnsPrev = null,
            replaceMenuImage = settings.replaceMenuImage,
            timerCount = settings.timerCount,
            childLength = $listchild.length;

        $superElement.data('status', {
            animation: false,
            initStatus: false,
            currentCount: 1
        });

        function initialize() {

            var totalArrowLength;

            FULL_WIDTH = settings.fullwidth || $('body').width(); // 동적 계산에 제일 좋은 방법을 고민해 봐야함....
            PER_WIDTH = settings.perwidth || $list.width();
            SHOW_COUNT = settings.showcount;
            LIST_COUNT = (SHOW_COUNT) ? Math.ceil(childLength / SHOW_COUNT) : childLength,

                $listchild.width(PER_WIDTH);

            if (SHOW_COUNT) {

                $listwrapper.width(PER_WIDTH * SHOW_COUNT);
                $list.width((PER_WIDTH * childLength) * (LIST_COUNT + 1)).addClass('setList');

                totalArrowLength = SHOW_COUNT * LIST_COUNT;
                if (totalArrowLength > childLength) {
                    for (var a = 0, b = totalArrowLength - childLength; a < b; a++) {
                        $list.append('<li class="blank" style="width:' + PER_WIDTH + 'px">&nbsp;</li>');
                    }
                }

                $listchild = $list.children();

            } else {

                $listwrapper.width(PER_WIDTH);
                $list.width((PER_WIDTH * childLength) * (LIST_COUNT + 1)).addClass('setList');

            }

            $superElement.data({
                'FULL_WIDTH': FULL_WIDTH,
                'PER_WIDTH': PER_WIDTH,
                'LIST_COUNT': LIST_COUNT
            });

            if (!$superElement.data('status').initStatus) {
                bindEvent();
                navigatorHandler();
                $superElement.data('status').initStatus = true;
            }

            if (timerCount) timerStart();
        }

        function reset() {

            $list.removeAttr('style').removeClass('setList');
            $listwrapper.removeAttr('style');
            $listchild.removeAttr('style');

            initialize();
        }

        function bindEvent() {

            $prevButton.on('click', _moveHandler('prev'));
            $nextButton.on('click', _moveHandler('next'));
            $superElement.on('reset', reset);

            if (timerCount) {
                $superElement
                    .on('mouseenter.timer', timerStop)
                    .on('mouseleave.timer', timerStart);
            }

            if ($menuAnchor && $menuAnchor.length > 1) {
                for (var i = 0, j = $menuAnchor.length; i < j; i++) $menuAnchor.eq(i).data('idx', i + 1);
                // $menuAnchor.on('click', anchorHandler);
                $menuAnchor.on('mouseenter', anchorHandler);
                $menuAnchor.on('mouseenter', timerStop);
                $menuAnchor.on('mouseleave', timerStart);
            }

        }

        function timerStart() {

            if (timerCount) timerStop();
            $superElement.timer = setInterval(_moveHandler('next'), timerCount);

        }

        function timerStop() {

            clearInterval($superElement.timer);

        }

        function anchorHandler(e) {

            var $self = $(this),
                count = $self.data('idx');

            _moveHandler('custom')(e, count);

            return false;

        }

        function navigatorHandler() {

            var $turnsPrev;

            if ($navigator.length == 0) return;

            var $activateNavigator = $navchild.eq($superElement.data('status').currentCount - 1);

            if (turnsPrev) {
                $turnsPrev = $navchild.eq(turnsPrev - 1);

                $turnsPrev.removeClass('active');

                if (replaceMenuImage) {
                    var turnsOff = $turnsPrev.find('img').attr('src').replace(replaceMenuImage.active, replaceMenuImage.default),
                        turnsOn = $activateNavigator.find('img').attr('src').replace(replaceMenuImage.default, replaceMenuImage.active);

                    $turnsPrev.find('img').attr('src', turnsOff);
                    $activateNavigator.find('img').attr('src', turnsOn);
                }
            }

            $activateNavigator.addClass('active');
        }

        function animation(param) {

            $list.transition({
                easing: settings.easing || 'none',
                x: param.x,
                complete: param.callback
            });
        }

        function _moveHandler(direction) {

            return function (e, customCount) {

                var param;

                if ($superElement.data('status').animation) return;
                $superElement.data('status').animation = true;

                turnsPrev = $superElement.data('status').currentCount;

                switch (direction) {
                    case 'custom' :
                        param = _moveCustom(e, customCount);
                        break;
                    case 'prev' :
                        param = _movePrev(e);
                        break;
                    case 'next' :
                        param = _moveNext(e);
                        break;
                }

                animation(param);
                navigatorHandler();

                return false;
            }
        }

        function _moveCustom(e, customCount) {

            var x = PER_WIDTH * (customCount - 1) * -1,
                callback = function () {
                    $superElement.data('status').animation = false;
                };

            $superElement.data('status').currentCount = customCount;

            return {
                x: x,
                callback: callback
            }
        }

        function _movePrev(e) {

            var x = PER_WIDTH * ($superElement.data('status').currentCount - 2) * -1,
                callback = function () {
                    $superElement.data('status').animation = false;
                };

            if (SHOW_COUNT) {

                x = PER_WIDTH * SHOW_COUNT * ($superElement.data('status').currentCount - 2) * -1;
                $superElement.data('status').currentCount -= 1;

                if ($superElement.data('status').currentCount == 0) {

                    x = 0;

                    for (var a = (SHOW_COUNT * LIST_COUNT) - SHOW_COUNT, b = SHOW_COUNT * LIST_COUNT; a < b; a++) {
                        $listchild.first().before($listchild.eq(a).clone());
                    }

                    $list.css({x: PER_WIDTH * SHOW_COUNT * -1});
                    $superElement.data('status').currentCount = LIST_COUNT;

                    callback = function () {
                        $superElement.data('status').animation = false;
                        for (var c = 0, d = SHOW_COUNT; c < d; c++) {
                            $list.children().first().remove();
                        }
                        $list.css({x: -PER_WIDTH * SHOW_COUNT * (LIST_COUNT - 1)}); //마지막 위치로 리셋
                    };

                }

            } else {

                $superElement.data('status').currentCount -= 1;

                if ($superElement.data('status').currentCount == 0) {

                    $list.css({x: -PER_WIDTH});
                    x = 0;

                    var $clone = $list.children().last().clone();
                    $clone.insertBefore($list.children().first());

                    $superElement.data('status').currentCount = LIST_COUNT;

                    callback = function () {
                        $superElement.data('status').animation = false;
                        $list.css({x: -PER_WIDTH * (LIST_COUNT - 1)});
                        $clone.remove();
                    };

                }

            }

            return {
                x: x,
                callback: callback
            }
        }

        function _moveNext(e) {

            var x = PER_WIDTH * $superElement.data('status').currentCount * -1,
                callback = function () {
                    $superElement.data('status').animation = false;
                };

            if (SHOW_COUNT) { // SHOW_COUNT 가 양수일 경우, 좌표 재계산 (지속적인 Next 는 되지 않고, 다시 0으로 초기화)

                x = PER_WIDTH * SHOW_COUNT * $superElement.data('status').currentCount * -1;
                $superElement.data('status').currentCount += 1;

                if (LIST_COUNT == $superElement.data('status').currentCount - 1) {

                    for (var a = 0, b = SHOW_COUNT; a < b; a++) {
                        $list.append($listchild.eq(a).clone());
                    }

                    $superElement.data('status').currentCount = 1;

                    callback = function () {
                        $superElement.data('status').animation = false;
                        $list.css({x: 0});
                        for (var c = SHOW_COUNT * LIST_COUNT, d = (SHOW_COUNT * LIST_COUNT) + SHOW_COUNT; c < d; c++) {
                            $list.children().last().remove();
                        }
                    };

                }

            } else {

                $superElement.data('status').currentCount += 1;

                if (LIST_COUNT == $superElement.data('status').currentCount - 1) {

                    var $clone = $list.children().first().clone();
                    $clone.appendTo($list);

                    $superElement.data('status').currentCount = 1;

                    callback = function () {
                        $superElement.data('status').animation = false;
                        $list.css({x: 0});
                        $clone.remove();
                    };

                }
            }

            return {
                x: x,
                callback: callback
            }
        }

        return this.each(initialize);
    }

    $.fn.complexCarousel = complexCarousel;
});
