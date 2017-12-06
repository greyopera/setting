define([
    'jquery',
], function ($) {
    "use strict";

    var $tabMenu,
        $tabChildren;

    function moveMenu() {

        var $self = $(this),
            $targetElement = $( $self.attr('href') ),
            $targetImage = $self.find('img'),
            $image = $tabMenu.find('img'),
            top = $targetElement.offset().top - 270,
            $current;

        $('html, body').stop().animate({scrollTop: top}, {duration: 500, easing:'easeOutCubic' });

        for(var a = 0, b = $image.length; a<b; a++) {
            $current = $image.eq(a);
            if($current.attr('src').match(/_on/)) {
                $current.attr('src', $current.attr('src').replace('_on.jpg','_off.jpg'))
            }
        }

        $targetImage.attr('src', $targetImage.attr('src').replace('_off.jpg','_on.jpg'));


        return false;
    }

    function handlerTabmenu(selector) {
        $tabMenu = $(selector);
        $tabChildren = $tabMenu.find('a');

        $tabChildren.on('click', moveMenu);
    }

    return handlerTabmenu;
});