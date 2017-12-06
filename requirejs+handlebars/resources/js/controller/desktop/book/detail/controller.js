define([
    'jquery',
    'parseURL',
    './list.tabhandler',
    './errata.search',
    './review.register',
    'jqueryUI'
], function ($, parseURL, listTabhandler, errataSearch, reviewRegister) {
    "use strict";

    var parseLocate = parseURL(document.location.href);

    window.on_pop_posts = function (url) {
        window.open(url, "contents", "width=725,height=450,top=150,left=200,scrollbars=yes");
        return false;
    };

    window.On_Star = reviewRegister.starHandler;
    window.WriteOkGo_P = reviewRegister.validation;

    function changeSelectPrintingOptions() {
        var $self = $(this),
            model = $self.data($self.find(':selected').val()),
            $bookErrataListSearchfieldArticle = $('#bookErrataListSearchfieldArticle');

        $bookErrataListSearchfieldArticle.empty().append('<option value="default">선택하세요.</option>');
        model.forEach(function (element, index) {
            $bookErrataListSearchfieldArticle.append('<option value="' + element + '">' + element + '</option>');

        });
    }

    function createSelectEditionOptions(model) {

        var $bookErrataListSearchfieldSection = $('#bookErrataListSearchfieldSection');

        for (var prop in model) {

            $bookErrataListSearchfieldSection.append('<option value="' + prop + '">' + prop + '</option>').data(prop, model[prop].printing);
        }

        $bookErrataListSearchfieldSection.on('change', changeSelectPrintingOptions);
    }

    function sortModel(orgin_model) {
        var model = {};
        for (var a = 0, b = orgin_model.length; a < b; a++) {

            var edition = orgin_model[a].edition;
            var printing = orgin_model[a].printing;

            if (!model.hasOwnProperty(edition)) model[edition] = {};
            if (!model[edition].hasOwnProperty('printing')) model[edition].printing = [];

            model[edition]['printing'].push(printing);

        }

        for (var prop in model) {
            model[prop].printing.sort(function (a, b) {
                return a - b;
            })
        }
        return model;

    }

    function controller() {

        var bookErrataModel = $('#bookErrataSearchForm').data('result'),
            bookErrataSelected = $('#bookErrataSearchForm').data('selected');

        listTabhandler.binding(); // 탭버튼 기능 연결

        errataSearch
            .setForm('#bookErrataSearchForm')
            .setSubmit('#bookErrataListSearchButton');

        if (parseLocate.hash.match(/tab\-/)) { // 정오표일 경우 탭 클릭.

            $("#tabAnchorList a").eq( parseLocate.hash.split('-')[1]-1 ).triggerHandler("click");
        }

        var sortBookModel = sortModel(bookErrataModel);
        createSelectEditionOptions(sortBookModel);

        if(bookErrataSelected) {

            $("#bookErrataListSearchfieldSection").val(bookErrataSelected.edition).trigger('change');
            $("#bookErrataListSearchfieldArticle").val(bookErrataSelected.printing).trigger('change');

        }

    }

    return controller;

});