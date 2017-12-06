define([
    'jquery',
    'Mustache',
    'moment',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
    'text!./space.view.mustache'
], function ($, Mustache, moment, parseURL, spaceAPI, spaceHelper, templateSpaceView) {
    "use strict";

    var GET_URL = parseURL(document.URL),
        ID = GET_URL.pathname.split('/'),
        spaceType = 1;

    ID = ID[ID.length - 1];
    for(var idx in GET_URL.searchObject) if(GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    var spaceView = {
            $contextElement: null,
            modelSpaceView: null,
            modelSpaceCommentView: null,

            setModel: function (model) {

                spaceView.modelSpaceView = model;
                return this;

            },

            setContext: function (selector) {
                this.$contextElement = $(selector);
                return this;
            },

            getModel: function () {
                return spaceView.modelSpaceView;
            },


            getTemplate: function () {

                if (!spaceView.modelSpaceView) {
                    console.error('view 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                    return;
                }


                return Mustache.render(templateSpaceView, spaceView.modelSpaceView);

            },


            setTemplate: function (selector) {

                var $contextTarget = (selector) ? $(selector) : spaceView.$contextElement;

                if (!spaceView.modelSpaceView) {
                    console.error('board 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                    return;
                }

                if (!$contextTarget.length) {
                    console.error('해당하는 Selector 요소가 없습니다.');
                    return;
                }

                $contextTarget.append(spaceView.getTemplate());
                return this;

            },

            getView: function (params) {

                return spaceAPI
                    .getView(params)
                    .then(function (res) {

                        spaceView.modelSpaceView = res.model;

                        var attachModel = {
                            items : res.model.results,
                            dateFormat : spaceView._helperListDateFormat,
                            listUrl: spaceHelper.getAddFullParam(spaceView.$contextElement.data('list-url')),
                            writeUrl: spaceHelper.getAddFullParam(spaceView.$contextElement.data('write-url')),
                            vieweUrl: spaceHelper.getAddFullParam(spaceView.$contextElement.data('view-url')),
                            modifyUrl: spaceView._helperModifyUrl,
                            sideViewUrl: spaceView._helperSideViewUrl
                        };
                        spaceView.modelSpaceView = $.extend(spaceView.modelSpaceView, attachModel);
                        if(!spaceView.modelSpaceView.is_owner && !spaceView.modelSpaceView.is_admin){
                            spaceView.modelSpaceView.items.attach_file = null;
                        }
                        return {model: spaceView.modelSpaceView};

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });

            },

            setRecommend: function (params) {

                return spaceAPI
                    .setRecommend(params)
                    .then(function (res) {

                        return res;

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });

            },

            removeRecommend: function (params) {

                return spaceAPI
                    .removeRecommend(params)
                    .then(function (res) {

                        return res;

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });

            },


            deleteList: function(id) {

               if(confirm('삭제하시겠습니까?')) {
                    return spaceAPI.deleteList(id)
                } else {
                   return Promise.reject("삭제 취소");
               }

            },

            _helperListDateFormat: function () {

                return function (text, render) {

                    var date = moment(this[text]).format('YYYY.MM.DD');
                    return render(date);
                }

            },


            _helperModifyUrl: function() {

                var url = GET_URL.pathname.split('/'),
                    ID = url[url.length - 1],
                    modifyUrl = spaceView.$contextElement.data('modify-url');

                return function (text, render) {

                    if(modifyUrl.match(/\?/)) {
                        modifyUrl = modifyUrl.replace('?', '/' + ID + '?');
                    } else {
                        modifyUrl = modifyUrl + '/' + ID;
                    }

                    if(GET_URL.search) modifyUrl = modifyUrl + GET_URL.search;
                    return render(modifyUrl);

                }
            },

            _helperSideViewUrl: function() {

                var url = GET_URL.pathname.split('/');

                return function (text, render) {

                    url[url.length - 1] = this;
                    url = url.join('/');

                    if(GET_URL.search) url = url + GET_URL.search;
                    return render(url);
                }
            }


        };

    return spaceView;

});

