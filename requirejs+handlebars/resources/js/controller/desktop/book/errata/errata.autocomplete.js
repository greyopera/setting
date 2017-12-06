define(['jquery', 'jqueryUI'], function ($) {
    "use strict";

    var autoComplete = {
        completeObj: null,
        eventBind: function (selector, selectorBookId) {

            var that = this,
                selectedValue;

            this.completeObj = $(selector).autocomplete({
                highlightClass: "bold-text",
                select: function (event, ui) {
                    $('#bookErrataListSearchfieldArticle').val(ui.item.printing)
                    $('#bookErrataListSearchfieldSection').val(ui.item.edition)
                    $(selectorBookId).val(ui.item.id);
                    $('#bookErrataSearchForm').submit();
                },
                focus: function (event, ui) {
                },
                open: function () {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                },
                close: function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                },
                response: function (event, ui) {
                    // ui.content is the array that's about to be sent to the response callback.
                    if (ui.content.length === 0) {
                        $(selector).attr('isResults', false);
                    } else {
                        $(selector).attr('isResults', true);
                    }
                },
                minLength: 1,
                appendTo: "#bookErrataListSearchfieldBooknameResult"
            });

            this.completeObj.data('ui-autocomplete')._renderItem = function (ul, item) {
                $(selectorBookId).val('');
                var newText = String(item.label).replace(new RegExp(this.term, "gi"), "<span class='ui-state-highlight'>$&</span>");

                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<span class='autocomplete__resultbutton'><span class='wrap'>" + newText + "</span></span>")
                    .appendTo(ul);
            };

            return this;

        },

        setModel: function (selector) {
            var that = this;
            this.GET(selector)
                .then(function (res) {

                    var catchSubjectModel = [];
                    for (var prop in res.data) {
                        catchSubjectModel.push({
                            id: res.data[prop].id, 
                            value: res.data[prop].book__book_errata__subject,
                            edition: res.data[prop].book__book_errata__edition,
                            printing: res.data[prop].book__book_errata__printing,
                        });
                    }

                    that.completeObj.autocomplete("option", "source", catchSubjectModel);
                });

            return this;
        },
        GET: function (selector) {

            var model = $(selector).data('result');

            return new Promise(function (resolve, reject) {

                if (model.length == 0) {
                    reject({message: '책이 없습니다.'})
                } else {
                    resolve({data: model})
                }

            });
        }

    };

    return autoComplete;
});