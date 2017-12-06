define([
    'jquery',
    'Mustache',
    'moment',
    'text!./talkerbe.school.plan.board.mustache',
], function ($, Mustache, moment, templateTalkerbeSchoolPlanBoard) {
    "use strict";

    var talkerbeSchoolPlanBoard = {

        setModel: function (model) {
            this.modelTalkerbeSchoolPlanBoard = model;
            return this;
        },
        getModel: function () {
            return this.modelTalkerbeSchoolPlanBoard;
        },

        getTemplate: function () {
            if (!this.modelTalkerbeSchoolPlanBoard) {
                console.warn('Don\'t exist model. try setModel method');
                return;
            }

            this.modelTalkerbeSchoolPlanBoard.idReduce = this._helperIdReduce;
            this.modelTalkerbeSchoolPlanBoard.createdAt = this._helperCreatedAt;


            return Mustache.render(templateTalkerbeSchoolPlanBoard, this.modelTalkerbeSchoolPlanBoard);
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

    return talkerbeSchoolPlanBoard;


});