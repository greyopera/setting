define([
    'jquery',
    'parseURL',
    './space.list',
    '../space.helper'
], function ($, parseURL, spaceList, spaceHelper) {
    "use strict";

    /**
     * 페이징
     * @constructor
     */
    function Paging() {

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
                params = {
                    limit: limit,
                    ordering: ordering,
                    space_type: space_type,
                    current_page: n-1
                };

            params = $.extend(params, this.optionParams);

            spaceList
                .getList(params)
                .then(function(res) {

                    that.$contextBoard.replaceWith( spaceList.getTemplate.list() );
                    that.initialize(that.selector, {
                        search_keyword:res.params['search_keyword'],
                        search_type:res.params['search_type'],
                        is_public:res.params['is_public']
                    });
                    that.$contextBoard.addClass('active');
                    currentPage = res.params['current_page'];

                    that._urlSwitch(currentPage, res.params.space_type);

                });

            return false;
        };

        this.initialize = function(selector, optionParams) {

            this.optionParams = optionParams;
            this.selector = selector;

            this.$contextBoard = $(selector.board);
            this.$contextPaging = this.$contextBoard.find(selector.paging.context);
            this.$contextAnchor = this.$contextBoard.find(selector.paging.anchor);

            totalPage = this.$contextAnchor.length;

            this.$contextPaging.on('click', selector.paging.anchor, $.proxy(this.movePage, this));
            this.$contextPaging.on('click', selector.paging.prev, $.proxy(this.movePrev, this));
            this.$contextPaging.on('click', selector.paging.next, $.proxy(this.moveNext, this));

        };

        this._urlSwitch = function(page, spaceType) {

            $(this.selector.dataTarget).eq(spaceType-1).data('page', page+1);
            spaceHelper.urlParamHandle.set('page', page+1);

        };

    }

    return Paging;

});

