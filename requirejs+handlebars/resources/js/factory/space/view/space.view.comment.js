define([
    'jquery',
    'Mustache',
    'moment',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
    'text!./space.view.comment.mustache',
], function ($, Mustache, moment, parseURL, spaceAPI, spaceHelper, templateSpaceCommentView) {
    "use strict";

    var COMMENT_COLUMN_SIZE = 0,
        COMMENT_TOTAL_SIZE = 0,
        GET_URL = parseURL(document.URL),
        ID = GET_URL.pathname.split('/'),
        spaceType = 1;

    ID = ID[ID.length - 1];
    for(var idx in GET_URL.searchObject) if(GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    var spaceViewComment = {
            $contextElement: null,
            modelSpaceCommentView: null,

            setContext: function (selector) {
                this.$contextElement = $(selector);
                return this;
            },

            getList: function(params) {

                if (!params) throw new Error('[params] 가 없습니다.\nspaceViewComment.getList(params) {object} limit|ordering|current_page|ID');

                var requireParams = ['limit', 'ordering', 'current_page', 'ID'],
                    recieveParams = JSON.stringify(params),
                    notEnough = [];

                for (var prop in requireParams) {
                    if (!recieveParams.match(requireParams[prop])) {
                        notEnough.push(requireParams[prop]);
                    }
                }

                if (notEnough.length) throw new Error('파라미터 요청이 잘못 되었습니다. [' + notEnough.toString() + '] 이 없습니다.');

                COMMENT_COLUMN_SIZE = params.limit;
                spaceViewComment.commentCurrentPage = params.current_page;
                params.offset = spaceViewComment.commentCurrentPage*COMMENT_COLUMN_SIZE;

                return spaceAPI
                    .comment.getList(params)
                    .then(function (res) {

                        var pagingArray = [],
                            attachModel;

                        COMMENT_TOTAL_SIZE = Math.ceil( res.model.count / COMMENT_COLUMN_SIZE );
                        spaceViewComment.modelSpaceCommentView = res.model;

                        attachModel = {
                            params : res.params,
                            items: res.model.results,
                            pagingArray: pagingArray
                        };

                        if(COMMENT_TOTAL_SIZE <= 1) {

                            attachModel.isPaging = false;

                        } else {

                            for(var a = 0, b = COMMENT_TOTAL_SIZE; a<b; a++) {

                                // Paging 에 온전한 Link 를 위해서 필요함.
                                var pageInfo = {
                                    currentPage:(spaceViewComment.commentCurrentPage == a) ? true : false,
                                    count:a+1,
                                    offset:a*COMMENT_COLUMN_SIZE
                                };

                                pagingArray.push(pageInfo);
                            }
                            attachModel.isPaging = true;
                        }

                        spaceViewComment.modelSpaceCommentView = $.extend(spaceViewComment.modelSpaceCommentView, attachModel);
                        return res;

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });
            },


            getTemplate: function () {

                if (!spaceViewComment.modelSpaceCommentView) {
                    console.error('comment view 모델이 없습니다.');
                    return;
                }

                return Mustache.render(templateSpaceCommentView, spaceViewComment.modelSpaceCommentView);

            },

            delete: function(ID) {

                return spaceAPI
                    .comment.delete(ID)
                    .then(function (res) {

                        return res;

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });
            },

            register: function(params) {

                return spaceAPI
                    .comment.register(params)
                    .catch(function (e) {
                        throw new Error(e);
                    });
            },

            update: function(params) {

                return spaceAPI
                    .comment.update(params)
                    .catch(function (e) {
                        throw new Error(e);
                    });
            }


        };

    return spaceViewComment;

});

