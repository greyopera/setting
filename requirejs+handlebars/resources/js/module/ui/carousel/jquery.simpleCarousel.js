define([
    'jquery',
    'jqueryTouchSwipe',
    'jqueryTransit'
], function($) {
    "use strict";

    /**
     * 단순한 좌우측 제어 가능한 Carousel
     * @dependency jQuery, touchSwipe, transit
     * @param options {object}
     * @example
     * $(selector).simpleCarousel();
     * @markup
     * <div class="selector">
            <button type="button" class="button prev"><span><img src="previmage" alt="prev"></span></button>
            <button type="button" class="button next"><span><img src="nextimage" alt="next"></span></button>
            <div class="listwrapper">
                <ul>
                    <li><img src="imagepath" alt=""></li>
                    ...
                </ul>
            </div>
        </div>
     * @returns {*}
     */
    function simpleCarousel( options ) {
        var $self = $(this);
        var defaults = {
            $list : $self.find('ul'),
            $listwrapper : $self.find('.listwrapper'),
            $prev : $self.find('button.prev'),
            $next : $self.find('button.next'),
            perwidth : 0,
            fullwidth : 1000,
            timer : null,
            easing : 'easeOutCubic',
            duration : 400
        }, FULL_WIDTH, PER_WIDTH, LIST_COUNT;

        var settings = $.extend( {}, defaults, options );

        var $list = settings.$list,
            $listwrapper = settings.$listwrapper,
            $child = $list.children(),
            $navigator,
            $navigatorChild,
            timer;

        $self.data('status', {
            animation:false,
            initStatus:false,
            currentCount:1
        });

        function initialize() {

            FULL_WIDTH = settings.fullwidth || $('body').width(); // 동적계산에 제일 좋은 방법을 고민해 봐야함....
            PER_WIDTH = settings.perwidth || $list.width();
            LIST_COUNT = $child.length;

            $self.data({
                'FULL_WIDTH': FULL_WIDTH,
                'PER_WIDTH': PER_WIDTH,
                'LIST_COUNT' : LIST_COUNT
            });

            $child.width( PER_WIDTH );
            $listwrapper.width( PER_WIDTH );
            $list.width( PER_WIDTH * (LIST_COUNT+1) ).addClass('setList');

            if(!$self.data('status').initStatus) {
                bindEvent();
                $self.data('status').initStatus = true;
            }

            if(settings.timer) {
                timerHandler();
            }

            if(settings.navigator) {
                setNavigator(settings.navigator);
            }

            if(settings.touchSlide) {
                $list.swipe( {
                    swipeLeft: moveNext,
                    swipeRight: movePrev
                });
            }
        }

        function setNavigator( selector ) {

            $navigator = $(selector);
            $navigatorChild = $navigator.children();
            $navigatorChild.eq(0).addClass('active');
        }

        function timerHandler() {

            $self.on('mouseenter.timer', stopTimer);
            $self.on('mouseleave.timer', startTimer);

            startTimer();
        }

        function startTimer() {
            if(timer) clearTimeout(timer);
            timer = setInterval(moveNext, settings.timer);
        }

        function stopTimer() {
            clearTimeout(timer);
        }

        function reset() {

            $child.removeAttr('style');
            $listwrapper.removeAttr('style');
            $list.removeAttr('style').removeClass('setList');
            initialize();
        }

        function bindEvent() {

            var $prev = settings.$prev,
                $next = settings.$next;

            $prev.on('click', movePrev);
            $next.on('click', moveNext);

            $self.on('reset', reset);
        }

        function animation(x, cbf) {

            $list.transition({
                x: x,
                duration: settings.duration,
                easing: settings.easing,
                complete: cbf
            });
        }

        function movePrev(e) {

            if($self.data('status').animation) return;
            $self.data('status').animation = true;

            if(settings.navigator) {
                $navigatorChild.removeClass('active');
                $navigatorChild.eq($self.data('status').currentCount - 2).addClass('active')
            }

            var x = $self.data('PER_WIDTH') * ($self.data('status').currentCount-2) * -1,
                cbf = function() {
                    $self.data('status').animation = false;
                    $self.data('status').currentCount -= 1;
                };

            if($self.data('status').currentCount == 1) {

                $list.css({ x:-PER_WIDTH });
                x = 0;

                var $clone = $list.children().last().clone();
                $clone.insertBefore($list.children().first());

                cbf = function() {
                    $self.data('status').animation = false;
                    $self.data('status').currentCount = LIST_COUNT;

                    $list.css({ x:-PER_WIDTH*(LIST_COUNT-1) });
                    $clone.remove();
                };
            }

            animation(x, cbf);

            return false;
        }

        function moveNext(e) {

            if($self.data('status').animation) return;
            $self.data('status').animation = true;

            if(settings.navigator) {
                $navigatorChild.removeClass('active');
                $navigatorChild.eq($self.data('status').currentCount - 2).addClass('active')
            }

            var x = $self.data('PER_WIDTH') * $self.data('status').currentCount * -1,
                cbf = function() {
                    $self.data('status').animation = false;
                    $self.data('status').currentCount += 1;
                };

            if($self.data('LIST_COUNT') == $self.data('status').currentCount) {

                var $clone = $list.children().first().clone();
                $clone.appendTo($list);

                cbf = function() {
                    $self.data('status').animation = false;
                    $self.data('status').currentCount = 1;

                    $list.css({ x:0 });
                    $clone.remove();
                };
            }

            animation(x, cbf);

            return false;
        }

        return this.each(initialize);
    }

    $.fn.simpleCarousel = simpleCarousel;
});
