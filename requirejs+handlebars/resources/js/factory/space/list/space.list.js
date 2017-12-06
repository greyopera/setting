define([
    'jquery',
    'Mustache',
    'moment',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
    'text!./space.list.category.mustache',
    'text!./space.list.board.mustache',
], function($, Mustache, moment, parseURL, spaceAPI, spaceHelper, templateSpaceListCategory, templateSpaceListBoard) {
    "use strict";

    var GET_URL = parseURL(document.URL),
        ID = GET_URL.pathname.split('/'),
        spaceType = 1,
        currentPage = 1,
        noticeStatus = false;

    ID = ID[ID.length - 1];
    for (var idx in GET_URL.searchObject) {
        if (GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];
        if (GET_URL.searchObject[idx]['notice']) noticeStatus = GET_URL.searchObject[idx]['notice'];
        if (GET_URL.searchObject[idx]['page']) currentPage = GET_URL.searchObject[idx]['page'];
    }

    var COLUMN_SIZE = 0,
        TOTAL_SIZE = 0,
        viewUrl,
        writeUrl,
        spaceList = {
            isSearch: false,
            $contextElement: null,
            currentPage: 1,
            modelSpaceList: {
                category: {},
                board: {}
            },

            setModelBoard: function(model) {

                spaceList.modelSpaceList.board = model;
                return this;

            },

            setModelCategory: function(model) {

                spaceList.modelSpaceList.category = model;
                return this;
            },

            setContext: function(selector) {
                this.$contextElement = $(selector);
                this.$contextElement.empty();
                return this;
            },

            getModelBoard: function() {
                return spaceList.modelSpaceList.board;
            },

            getModelCategory: function() {
                return spaceList.modelSpaceList.category;
            },

            getTemplate: {

                list: function() {

                    if (!spaceList.modelSpaceList.board) {
                        console.error('board 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                        return;
                    }

                    return Mustache.render(templateSpaceListBoard, spaceList.modelSpaceList.board);
                },

                category: function() {

                    if (!spaceList.modelSpaceList.category) {
                        console.error('category 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                        return;
                    }

                    return Mustache.render(templateSpaceListCategory, spaceList.modelSpaceList.category);
                }
            },


            setTemplate: {

                list: function(selector) {

                    var $contextTarget = (selector) ? $(selector) : spaceList.$contextElement;

                    if (!spaceList.modelSpaceList.board) {
                        console.error('board 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                        return;
                    }

                    if (!$contextTarget.length) {
                        console.error('해당하는 Selector 요소가 없습니다.');
                        return;
                    }

                    $contextTarget.append(spaceList.getTemplate.list());
                },

                category: function(selector) {

                    var $contextTarget = (selector) ? $(selector) : spaceList.$contextElement;

                    if (!spaceList.modelSpaceList.category) {
                        console.error('category 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                        return;
                    }

                    if (!$contextTarget.length) {
                        console.error('해당하는 Selector 요소가 없습니다.');
                        return;
                    }

                    $contextTarget.append(spaceList.getTemplate.category());
                }
            },

            getCategory: function() {

                return spaceAPI
                    .getCategory()
                    .then(function(res) {

                        spaceList.modelSpaceList.category.items = res;
                        spaceList.modelSpaceList.category.getRatio = spaceList._helperCategoryDivideRatio;
                        // currentPage noticeStatus spaceType
                        for (var idx in spaceList.modelSpaceList.category.items) {
                            var currentCategory = spaceList.modelSpaceList.category.items[idx];
                            spaceList.modelSpaceList.category.items[idx].page = 1;
                            if (currentCategory.num == spaceType) {
                                spaceList.modelSpaceList.category.items[idx].page = currentPage;
                            }
                        }


                        return res;

                    })
                    .catch(function(res) {
                        return res;
                    });
            },

            getListNotice: function(params) {

                return spaceAPI
                    .getListNotice({
                        'offset': params.offset,
                        'space_type': params.space_type
                            //                        'limit': 3
                    })
                    .catch(function(res) {
                        return res;
                    });
            },

            getListRecommend: function(params) {

                return spaceAPI
                    .getListRecommend({
                        'offset': params.offset,
                        'space_type': params.space_type,
                        'limit': 3
                    })
                    .catch(function(res) {
                        return res;
                    });
            },

            getList: function(params) {

                if (!params) throw new Error('[params] 가 없습니다.\nspaceList.getList(params) {object} limit|ordering|space_type');

                var requireParams = ['limit', 'ordering', 'space_type'],
                    recieveParams = JSON.stringify(params),
                    notEnough = [],
                    params = $.extend({}, params);

                for (var prop in requireParams) {
                    if (!recieveParams.match(requireParams[prop])) {
                        notEnough.push(requireParams[prop]);
                    }
                }

                if (notEnough.length) throw new Error('파라미터 요청이 잘못 되었습니다. [' + notEnough.toString() + '] 이 없습니다.');

                COLUMN_SIZE = params.limit;
                params.offset = params.current_page * COLUMN_SIZE;

                return Promise
                    .all([
                        spaceAPI.getList(params),
                        spaceList.getListNotice(params),
                        spaceList.getListRecommend(params)
                    ])
                    .then(function(res) {

                        var pagingArray = [],
                            attachModel,
                            listModel = res[0];

                        listModel.model.notice = res[1];
                        listModel.model.recommend = res[2];

                        TOTAL_SIZE = Math.ceil(listModel.model.count / COLUMN_SIZE);
                        spaceList.modelSpaceList.board = listModel.model;
                        spaceList.isSearch = false;

                        attachModel = {
                            params: listModel.params,
                            items: listModel.model.results,
                            isAdmin: spaceList.$contextElement.data('user-admin'),
                            'spaceType': listModel.model['space_type'],
                            dateFormat: spaceList._helperListDateFormat,
                            isPublicText: spaceList._helperListisPublicText,
                            listUrl: spaceHelper.urlAddSpaceType(listModel.model['space_type'], spaceList.$contextElement.data('list-url')),
                            writeUrl: spaceHelper.urlAddSpaceType(listModel.model['space_type'], spaceList.$contextElement.data('write-url')),
                            viewUrl: spaceList._helperViewUrl,
                            pagingArray: pagingArray
                        };

                        if (!params.is_public) {
                            attachModel.has_policy_all = true;
                        } else {
                            if (params.is_public == 'true') {
                                attachModel.has_policy_public = true;
                            } else {
                                attachModel.has_policy_private = true;
                            }
                        }

                        if (TOTAL_SIZE <= 1) {

                            attachModel.isPaging = false;

                        } else {

                            for (var a = 0, b = TOTAL_SIZE; a < b; a++) {

                                // Paging 에 온전한 Link 를 위해서 필요함.
                                var pageInfo = {
                                    currentPage: (parseInt(listModel.params.current_page, 10) == a) ? true : false,
                                    count: a + 1,
                                    offset: a * COLUMN_SIZE
                                };

                                pagingArray.push(pageInfo);
                            }
                            attachModel.isPaging = true;
                        }

                        spaceList.modelSpaceList.board = $.extend(spaceList.modelSpaceList.board, attachModel);
                        return listModel;

                    })
                    .catch(function(e) {
                        throw new Error(e);
                    });

            },

            deleteList: function(idGroup) {

                if (confirm('삭제하시겠습니까?\n번호 : ' + idGroup)) {
                    return spaceAPI.deleteList(idGroup)
                }

            },

            changePolicy: function(idGroup, status) {
                return spaceAPI.changePolicy(idGroup, status);
            },

            _helperCategoryDivideRatio: function() {
                return function(text, render) {
                    var ratio = (100 / spaceList.modelSpaceList.category.items.length).toFixed(2);
                    return render(ratio.toString());
                }
            },

            _helperListDateFormat: function() {
                return function(text, render) {
                    var date = moment(this[text]).format('YYYY.MM.DD');

                    return render(date);
                }
            },

            _helperListisPublicText: function() {
                return function(text, render) {
                    var status = (this[text]) ? '공개' : '비공개';
                    return render(status);
                }
            },

            _helperViewUrl: function() {

                var url = spaceHelper.urlAddSpaceType(spaceType, spaceList.$contextElement.data('view-url')),
                    ID,
                    changeParameter,
                    getProp;

                return function(text, render) {

                    ID = this[text];
                    spaceType = this['space_type'].num;

                    if (url.match(/\?/)) {

                        if (url.match(/space_type/)) {

                            url = url.split('?');
                            url[0] = url[0] + '/' + ID;

                            changeParameter = url[1].split('&');
                            for (var idx in changeParameter) {
                                getProp = changeParameter[idx].split('=');
                                if (getProp[0] == 'space_type') {
                                    getProp[1] = spaceType;
                                }
                                changeParameter[idx] = getProp.join('=');
                            }
                            url[1] = changeParameter.join('&');
                            url = url.join('?');

                        } else {

                            url = url.split('?');
                            url[0] = url[0] + '/' + ID;
                            url[1] = url[1] + '&space_type=' + spaceType;

                            url = url.join('?');

                        }

                    } else {

                        url = url.split('?');
                        url[0] = url[0] + '/' + ID;
                        url[1] = url[1] + '?space_type=' + spaceType;
                        url = url.join('?');

                    }

                    return render(url);
                }
            },

            _getUrl: {

                view: function() {
                    return spaceHelper.urlAddSpaceType(spaceType, spaceList.$contextElement.data('view-url'))
                },

                write: function() {
                    return spaceHelper.urlAddSpaceType(spaceType, spaceList.$contextElement.data('write-url'))
                }

            },

            __extendAPI: {
                spaceAPI: spaceAPI
            }

        };

    return spaceList;

});