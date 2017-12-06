define([
    'jquery',
    'Mustache',
    'moment',
    'text!./talkerbe.review.student.user.score.mustache',
], function ($, Mustache, moment, templateTalkerbeReviewStudentUserScore) {
    "use strict";

    var talkerbeReviewStudentUserScore = {

        setModel: function (model) {
            this.modelTalkerbeReviewStudentUserScore = model;
            return this;
        },
        getModel: function () {
            return this.modelTalkerbeReviewStudentUserScore;
        },

        getTemplate: function () {
            if (!this.modelTalkerbeReviewStudentUserScore) {
                console.warn('Don\'t exist model. try setModel method');
                return;
            }

            this.modelTalkerbeReviewStudentUserScore.idReduce = this._helperIdReduce;
            this.modelTalkerbeReviewStudentUserScore.createdAt = this._helperCreatedAt;


            return Mustache.render(templateTalkerbeReviewStudentUserScore, this.modelTalkerbeReviewStudentUserScore);
        },

        _helperCreatedAt: function () {
            return function (text, render) {
                var date = moment(this.created_at).format('YYYY.MM.DD');
                return render(date);
            }
        },

        _helperIdReduce: function () {
            return function (text, render) {
                var id = this.id.toString().split(''),
                    limitCount = 3;

                if (id.length > limitCount) {
                    for (var a = 0, b = id.length; a < b; a++) {
                        if (a > limitCount-1) id[a] = '*';
                    }
                }

                return render(id.join(''));

            }
        }
    };

    return talkerbeReviewStudentUserScore;


});