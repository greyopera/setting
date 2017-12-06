define([
    'jquery',
    'Mustache',
    'text!./space.list.mustache',
], function ($, Mustache, templateReviewVideolist) {
    "use strict";

    var reviewlist = {

        PAGE_SIZE: 0,
        INIT_SIZE: 0,
        CURRENT_PAGE: 0,
        TOTAL_PAGE: 0,
        PAGE_STATUS: null,
        setModel: function (model) {
            this.modelReviewList = model;
            return this;
        },

        getModel: function () {
            return this.modelReviewList;
        },

        getTemplate: function () {

            if (!this.modelReviewList) {
                console.warn('Don\'t exist model. try setModel method');
                return;
            }

            if (this.PAGE_SIZE) {
                return Mustache.render(templateReviewVideolist, this._setTemplateHelper(this.getPageonModelReviewList()));
            } else {
                return Mustache.render(templateReviewVideolist, this._setTemplateHelper(this.modelReviewList));
            }

            return Template;
        },

        setOptions: function (opts) {
            for (var prop in opts) this[prop] = opts[prop];
            this.CURRENT_PAGE--; // 옵션을 1부터 시작하기 위해서 필요한 감산.

            return this;
        },

        getPageonModelReviewList: function () {

            var splitModel = {items: []},
                start = this.CURRENT_PAGE * this.PAGE_SIZE,
                end = start + this.PAGE_SIZE,
                totalLength = this.modelReviewList.items.length;

            if(this.INIT_SIZE != 0 && this.INIT_SIZE != this.PAGE_SIZE) {

                start = (start == 0) ? 0 : (this.CURRENT_PAGE * this.PAGE_SIZE) - this.INIT_SIZE + 1;
                end = (start == 0) ? this.INIT_SIZE : (start + this.PAGE_SIZE);
                if(end > totalLength) end = totalLength;
                this.TOTAL_PAGE = Math.round( (totalLength - this.INIT_SIZE) / this.PAGE_SIZE ) + 1;

            } else {

                if(end > totalLength) end = totalLength;
                this.TOTAL_PAGE = Math.round(totalLength / this.PAGE_SIZE) - 1;

            }

            for (var a = start; a < end; a++) {
                splitModel.items.push(this.modelReviewList.items[a]);
            }

            return splitModel;
        },

        nextPage: function () {

            if(this.CURRENT_PAGE == this.TOTAL_PAGE - 1) this.PAGE_STATUS = 'LIST_FULL';
            else this.PAGE_STATUS = null;

            this.CURRENT_PAGE = (this.CURRENT_PAGE == this.TOTAL_PAGE) ? this.TOTAL_PAGE : this.CURRENT_PAGE + 1;

            return this;
        },

        prevPage: function () {

            if(this.CURRENT_PAGE == 0) {
                this.PAGE_STATUS = 'LIST_FULL';
            } else {
                this.CURRENT_PAGE = this.CURRENT_PAGE - 1;
                this.PAGE_STATUS = null;
            }

            return this;
        },

        _setTemplateHelper: function (model) {

            model.convertScoreImage = this._helperConvertScoreImage;
            model.nameReduce = this._helperNameReduce;

            return model;
        },

        _helperConvertScoreImage: function () {
            return function (text, render) {

                var templateScore = '';

                for (var a = 1, b = 6; a < b; a++) {
                    if (a > this.score) templateScore += '<img src="/static/images/common/star02_off.png" class="star_image" width="10" />'
                    else templateScore += '<img src="/static/images/common/star02_on.png" class="star_image" width="10" />'
                }

                return render(templateScore);
            }
            //<img src="/images/common/star_on.gif"><img src="/images/common/star_on.gif"><img src="/images/common/star_on.gif"><img src="/images/common/star_on.gif"><img src="/images/common/star_on.gif">
        },

        _helperNameReduce: function () {
            return function (text, render) {
                var username = this.username.toString().split(''),
                    limitCount = 3;

                username[1] = '*';

                return render(username.join(''));

            }
        }
    }

    return reviewlist;


});