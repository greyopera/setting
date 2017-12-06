define([
    'jquery',
], function ($) {
    "use strict";

    var $navigation,
        $menuElementSelector,
        $menuChild,
        handlerGlobalNavigation = {

            bootstrap: function(opts) {

                $navigation = $(opts.targetElementSelector);
                if(!$navigation.length) return;

                $menuElementSelector = $(opts.menuElementSelector);
                $menuChild = $menuElementSelector.children();

                $menuChild.on('mouseenter.menuHover', this.menuHover);
                $menuChild.on('mouseleave.menuOut', this.menuOut);

            },

            menuHover: function(e) {

                var $target = $(this);
                $target.addClass('hover');

            },

            menuOut: function(e) {

                var $target = $(this);
                $target.removeClass('hover');

            },

            menuActive: function() {

            }
        }

    return handlerGlobalNavigation;


});