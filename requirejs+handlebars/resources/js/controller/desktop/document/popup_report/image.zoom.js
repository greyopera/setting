define([
    'jquery',
    'imagePanzoom'
], function ($) {
    "use strict";

    var imageZoom = {

        $wrapper: null,
        destroyEvent: function () {

            var $zoomTarget = $('.setPanZoom'),
                $panzoom = $zoomTarget.find('.panzoom');

            $zoomTarget.removeClass('setPanZoom');
            $panzoom.removeAttr('style').panzoom('destroy');

            this.$wrapper.off('mousewheel.focal');
        },

        bindZoomEvent: function (event) {

            var $self = $(event.target),
                $parent = $self.closest('li'),
                $panzoom = $parent.find('.panzoom');

            if ($parent.hasClass('setPanZoom')) return;

            $parent.addClass('setPanZoom');
            $panzoom.panzoom({
                $zoomRange: $parent.find(".zoom-range"),
                $reset: $parent.find(".reset"),
                startTransform: 'scale(2)',
                linearZoom: true,
                minScale: 1,
                maxScale: 6,
                increment: 0.1,
                duration: 800,
                contain: "invert",
                onZoom: function () {
                    // $(this).panzoom("setMatrix", [ 1.81818, 0, 0, 1.81818, 345.272, 230.318 ]);
                }

            });

            this.$wrapper.on('mousewheel.focal', function (e) {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                $panzoom.panzoom('zoom', zoomOut, {
                    increment: 0.1,
                    animate: true,
                    focal: e
                });
            });

        },

        bootstrap: function (selector) {

            this.$wrapper = $(selector.wrapper);
            this.$wrapper.on('click.zoom', selector.clickSelector, $.proxy(this.bindZoomEvent, this) );

        }

    };

    return imageZoom;
});