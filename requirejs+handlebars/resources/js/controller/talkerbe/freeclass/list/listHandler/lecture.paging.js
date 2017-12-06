define([
    'jquery',
    'Mustache',
    'text!./lecture.paging.mustache'
], function ($, Mustache, templateLecturePaging) {
    "use strict";

    var $pagingArea,
        $list,
        $focus,
        PagingData = {
            displaySize : 10
        },
        pageStatus = {
            currentPage : 0
        },
        statusFirst = true;

    var lecturePaging = {

        create: function( $listParam, pagingAreaSelector, focusSelector ) {

            $list = $listParam;

            $focus = $(focusSelector);
            $pagingArea = $(pagingAreaSelector);

            PagingData.pageRepeat = this._helperPageRepeat;

            if($list.length < 10) {

                PagingData.totalSize = 1;
                PagingData.pageLength = 1;
                $pagingArea.empty().append( Mustache.render(templateLecturePaging, PagingData) );

            } else {

                PagingData.totalSize = $list.length;
                PagingData.pageLength = Math.ceil(PagingData.totalSize / PagingData.displaySize);

                $pagingArea.empty().append( Mustache.render(templateLecturePaging, PagingData) );
                $pagingArea.find('.link').on('click', this.moveList);
                $pagingArea.find('.prev .button').on('click', this.movePrev);
                $pagingArea.find('.next .button').on('click', this.moveNext);
                $pagingArea.find('.link').on('click', this.moveList);

                $pagingArea.find('.link').eq(0).trigger('click');
            }
        },

        destroy: function() {

            $pagingArea.empty();

        },

        moveNext: function() {

            pageStatus.currentPage = pageStatus.currentPage + 1;
            $pagingArea.find('.link').eq(pageStatus.currentPage).trigger('click');
        },

        movePrev: function() {

            pageStatus.currentPage = pageStatus.currentPage - 1;
            $pagingArea.find('.link').eq(pageStatus.currentPage).trigger('click');

        },

        moveList: function() {

            var $self = $(this),
                $parent = $self.closest('li'),
                start,
                end;

            $parent.siblings('.active').removeClass('active');
            $parent.addClass('active');

            pageStatus.currentPage = $parent.index();

            if(pageStatus.currentPage > 0) {
                $pagingArea.find('.prev .button').removeClass('disabled').attr('disabled', false);
            } else {
                $pagingArea.find('.prev .button').addClass('disabled').attr('disabled', true);
            }

            if(pageStatus.currentPage <= PagingData.pageLength - 2) {
                $pagingArea.find('.next .button').removeClass('disabled').attr('disabled', false);
            } else {
                $pagingArea.find('.next .button').addClass('disabled').attr('disabled', true);
            }

            start = pageStatus.currentPage * PagingData.displaySize,
            end = pageStatus.currentPage * PagingData.displaySize + PagingData.displaySize;

            $list.removeClass('active');
            for(var a = start, b = end; a<b; a++) {
                $list.eq(a).addClass('active');
            }

        },

        _helperPageRepeat: function () {

            return function (text, render) {

                var renderTemplate = '';
                for(var a = 0, b = this.pageLength; a<b; a++) {

                    renderTemplate += text.replace('{{ number }}', a+1);
                    if(a == 0) renderTemplate = renderTemplate.replace('<li>', '<li class="active">');

                }

                return render(renderTemplate);
            }
        }
    }

    return lecturePaging;
});