define([
    'jquery',
    'Mustache',
    'moment',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
    './space.write.validation',
    'text!./space.write.mustache',
    'text!../modify/space.modify.mustache',
], function ($, Mustache, moment, parseURL, spaceAPI, spaceHelper, validation, templateSpaceWrite, templateSpaceModify) {
    "use strict";

    var $registerForm,
        GET_URL = parseURL(document.URL),
        listUrl,
        userId,
        spaceType = 1,
        modify = false;

    for(var idx in GET_URL.searchObject) if(GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    var spaceWrite = {
            $contextElement: null,
            modelSpaceWrite: null,

            setModel: function (model) {

                spaceWrite.modelSpaceWrite = model;
                return this;

            },

            setContext: function (selector) {
                this.$contextElement = $(selector);
                return this;
            },

            getModel: function () {
                return spaceWrite.modelSpaceWrite;
            },


            getTemplate: function (modifyStatus) {

                modify = modifyStatus || false;

                if (!spaceWrite.modelSpaceWrite) {
                    console.error('view 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                    return;
                }

                if(modify) {
                    return Mustache.render(templateSpaceModify, spaceWrite.modelSpaceWrite);
                } else {
                    return Mustache.render(templateSpaceWrite, spaceWrite.modelSpaceWrite);
                }

            },


            setTemplate: function (modifyStatus, selector) {

                modify = modifyStatus || false;

                var $contextTarget = (selector) ? $(selector) : spaceWrite.$contextElement;

                if (!spaceWrite.modelSpaceWrite) {
                    console.error('write 모델이 없습니다. setModel 메소드로 Model을 설정하세요.');
                    return;
                }

                if (!$contextTarget.length) {
                    console.error('해당하는 Selector 요소가 없습니다.');
                    return;
                }

                $contextTarget.append(spaceWrite.getTemplate(modify));

            },

            getWrite: function () {

                return spaceAPI
                    .getWrite()
                    .then(function (model) {

                        listUrl = spaceHelper.urlAddSpaceType(spaceType, spaceWrite.$contextElement.data('list-url'));
                        userId = spaceAPI._getUserId();

                        spaceWrite.modelSpaceWrite = model;

                        var attachModel = {
                            listUrl: listUrl,
                            userId: userId,
                            spaceType: spaceType,
                            spaceSelect: spaceWrite._helperSpaceSelect,
                            isAdmin : spaceWrite.$contextElement.data('user-admin'),
                        };

                        spaceWrite.modelSpaceWrite = $.extend(spaceWrite.modelSpaceWrite, attachModel);

                        return {model: spaceWrite.modelSpaceWrite};

                    })
                    .catch(function (e) {
                        throw new Error(e);
                    });

            },

            register: function (params) {

                return validation
                    .submit()
                    .then(function () {

                        return spaceAPI
                            .register(params)
                            .then(function (res) {
                                alert('글등록이 정상 등록 되었습니다.');
                                return {status: true}
                            })
                            .catch(function (e) {
                                throw new Error(e);
                            });

                    })
                    .catch(function (res) {

                        alert(res.message);
                        return res;
                    });

            },

            modify: function (params) {

                return validation
                    .submit()
                    .then(function () {

                        return spaceAPI
                            .modify(params)
                            .then(function (res) {
                                alert('글수정이 정상 등록 되었습니다.');
                                return {status: true}
                            })
                            .catch(function (e) {
                                throw new Error(e);
                            });

                    })
                    .catch(function (res) {

                        return res;
                    });

            },

            _helperSpaceSelect: function() {

                return function (text, render) {

                    if(spaceType == this.num) return render("selected='selected'");

                    return;
                }
            }


        };

    return spaceWrite;

});

