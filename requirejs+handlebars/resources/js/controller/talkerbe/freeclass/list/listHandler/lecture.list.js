define([
    'jquery',
    'Mustache',
    'text!./lecture.list.mustache',
], function ($, Mustache, templateLectureList) {
    "use strict";

    var lectureList = {
        modelLectureList: null,

        setModel: function (model) {
            this.modelLectureList = model;
            return this;
        },

        getModel: function () {
            return this.modelLectureList;
        },

        getTemplate: function () {

            if (!this.modelLectureList) {
                console.warn('Don\'t exist model. try setModel method');
                return;
            }

            return Mustache.render(templateLectureList, this.modelLectureList);
        }
    }

    return lectureList;
});