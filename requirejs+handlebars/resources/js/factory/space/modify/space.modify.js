define([
    'jquery',
    'Mustache',
    'moment',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
], function ($, Mustache, moment, parseURL, spaceAPI, spaceHelper) {
    "use strict";

    var spaceModify = {
        $contextElement: null,
        modelSpaceModify: null,

        setModel: function (model) {

            spaceModify.modelSpaceModify = model;
            return this;

        },

        setContext: function (selector) {
            this.$contextElement = $(selector);
            return this;
        },

        getModel: function () {
            return spaceModify.modelSpaceModify;
        },

        getModify: function (ID) {

            return spaceAPI
                .getModify(ID)
                .then(function (model) {
                    spaceModify.modelSpaceModify = model;
                    return {model: spaceModify.modelSpaceModify};
                })
                .catch(function (e) {
                    throw new Error(e);
                });

        },
    };

    return spaceModify;

});

