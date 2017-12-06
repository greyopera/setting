define([
    'jquery',
    './space.view.comment'
], function ($, spaceViewComment) {
    "use strict";

    /**
     * 페이징
     * @constructor
     */
    function CommentPaging() {

        var that = this,
            currentPage = 1,
            totalPage = 1;

        this.$contextBoard = null;
        this.$contextPaging = null;

        this.moveNext = function(e) {

            if(e) e.preventDefault();

            currentPage = currentPage + 1;
            if(currentPage >= totalPage+1) { currentPage = 1; }

            this.movePage(e, currentPage);
            return false;
        };

        this.movePrev = function(e) {
            if(e) e.preventDefault();

            currentPage = currentPage - 1;
            if(currentPage == 0) { currentPage = totalPage; }

            this.movePage(e, currentPage);
            return false;
        };

        this.movePage = function(e, n) {

            if(e) e.preventDefault();

            var $self = $(e.target),
                that = this,
                n = n || parseInt($self.text(),10),
                limit = this.$contextBoard.data('param-limit'),
                ordering = this.$contextBoard.data('param-ordering'),
                space_type = this.$contextBoard.data('param-space_type'),
                ID = this.$contextBoard.data('comment-space-id'),
                params = {
                    limit: limit,
                    ordering: ordering,
                    space_type: space_type,
                    current_page: n-1,
                    ID: ID
                };

            spaceViewComment
                .getList(params)
                .then(function(res) {

                    that.$contextBoard.replaceWith( spaceViewComment.getTemplate() );
                    that.initialize(that.selector);
                    that.$contextBoard.addClass('active');
                    currentPage = params.current_page + 1;

                });


            return false;
        };

        this.initialize = function(selector, keywordSearch) {

            if(keywordSearch) {
                this.keyword = keywordSearch.keyword;
                this.searchType = keywordSearch.searchType;
            }

            this.selector = selector;
            this.$contextBoard = $(selector.board);
            this.$contextPaging = this.$contextBoard.find(selector.paging.context);
            this.$contextAnchor = this.$contextBoard.find(selector.paging.anchor);

            totalPage = this.$contextAnchor.length;

            this.$contextPaging.on('click', selector.paging.anchor, $.proxy(this.movePage, this));
//            this.$contextPaging.on('click', selector.paging.prev, $.proxy(this.movePrev, this));
//            this.$contextPaging.on('click', selector.paging.next, $.proxy(this.moveNext, this));

        };

    }

    return CommentPaging;

});

