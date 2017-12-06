define([
    'jquery',
    'parseURL',
    'factory/space/space.helper'
], function ($, parseURL, spaceHelper) {
    "use strict";

    function HandlerTabmenu(opts) {

        this.selector = opts.selector;
        this.$wrapper = $(opts.selector.wrapper);
        this.$anchor = $(opts.selector.anchor);

    }

    HandlerTabmenu.prototype = {
        constructor: HandlerTabmenu,
        bootstrap: function () {

            this.$anchor.on('click.menuHandler', $.proxy(this.menuHandler, this));

        },

        menuHandler: function (e) {

            var $self = $((e.target.nodeName.toLowerCase() != 'a')?e.target.parentNode:e.target),
                $parent = $self.closest('li'),
                location = $self.attr('href'),
                $target = $(location),
                spaceType = $self.data('space-type'),
                page = $self.data('page');

            this.menuClear();

            $parent.addClass('active');
            $target.addClass('active');

            this._urlSwitch(spaceType, page);

            return false;
        },

        menuClear: function () {

            $(this.selector.activeTarget).removeClass('active');
            $(this.selector.contentTarget).removeClass('active');

        },

        _urlSwitch: function(spaceType, page) {

            spaceHelper.urlParamHandle.set('space_type', spaceType);
            spaceHelper.urlParamHandle.set('page', page);
        },

    };

    return HandlerTabmenu;
});