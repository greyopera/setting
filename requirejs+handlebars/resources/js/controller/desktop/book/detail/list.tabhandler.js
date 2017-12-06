define(['jquery'], function ($) {
    "use strict";

    /**
     * TabMenu 제어
     */
    var $tabAnchor = $("#tabAnchorList a"),
        $tabAnchorList = $("#tabAnchorList li"),
        $tabContents = $("#tabContents .tabCon");

    function menuClick(e) {

        var $self = $(this),
            $targetElement,
            targetHref = $self.attr('href');

        if (targetHref.match(/#/)) $targetElement = $(targetHref)
        else return;

        $tabContents.css('display', 'none');
        $targetElement.css('display', 'block');

        $tabAnchorList.removeClass('active');
        $self.closest('li').addClass('active');

        return false;
    }

    function tabHandler() {

    }

    function binding() {
        $tabAnchor.on('click.menuClick', menuClick);
    }

    return {
        tabHandler: tabHandler,
        binding: binding
    };

});