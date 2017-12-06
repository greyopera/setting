define([
    'jquery',
    'Mustache',
    'text!./teacherlist.mustache',
    'text!./teachermenu.mustache'
], function ($, Mustache, templateTeacherList, templateTeacherMenu) {
    "use strict";

    var teacherList = {
        modelTeacherlist: null,

        getModel: function () {
            return this.modelTeacherlist || null;
        },

        setModel: function (model) {
            this.modelTeacherlist = model || null;
            this._divideSection();

            return this;
        },

        getTemplate: function (categoryCode) {

            if (!this.modelTeacherlist) {
                console.error('Don\'t exist model');
                return this;
            }

            return {
                menu: this._getTemplateMenu(categoryCode),
                list: this._getTemplateListinCategory(categoryCode)
            }
        },

        _divideSection: function () {

            var section = this.modelTeacherlist.groups,
                teachers = this.modelTeacherlist.teachers,
                catchTeacher,
                teachersId,
                containList;

            for (var idx in teachers) {

                catchTeacher = teachers[idx];
                teachersId = parseInt(catchTeacher.id, 10);

                for (var a = 0, b = section.length; a < b; a++) {
                    containList = section[a].containTeacherId;

                    if (containList.indexOf(teachersId) > -1) {
                        if (!section[a].hasOwnProperty('teachers')) section[a].teachers = [];
                        for(var c=0, d=containList.length; c<d; c++) {
                            if(containList[c] == teachersId) {
                                section[a].teachers[c] = catchTeacher;
                                break;
                            }
                        }
                    }
                }

                if (!section['all'].hasOwnProperty('teachers')) section['all'].teachers = [];
                section['all'].teachers.push(catchTeacher);
            }

            delete this.modelTeacherlist.teachers;

        },

        _getTemplateMenu: function (categoryCode) {

            if (!this.modelTeacherlist) {
                console.error('Don\'t exist model');
                return this;
            }

            var groups = this.modelTeacherlist.groups;

            groups['all'].current = true;

            for (var a = 0, b = groups.length; a < b; a++) {
                if (groups[a].code == categoryCode) {
                    groups[a].current = true;
                    delete groups['all'].current;
                } else {
                    delete groups[a].current;
                }
            }

            return Mustache.render(templateTeacherMenu, this.modelTeacherlist)

        },

        _getTemplateListinCategory: function (categoryCode) {

            if (!this.modelTeacherlist) {
                console.error('Don\'t exist model');
                return;
            }

            var groups = this.modelTeacherlist.groups,
                catchModels;

            for (var a = 0, b = groups.length; a < b; a++) {

                if (categoryCode == 0) {
                    groups[a].current = true;
                } else {
                    if (groups[a].code == categoryCode) {
                        groups[a].current = true;
                    } else {
                        delete groups[a].current;
                    }
                }
            }

            return Mustache.render(templateTeacherList, this.modelTeacherlist);
        }
    }

    return teacherList;

});