define([
    'jquery',
    'Mustache',
    'text!./booklist.mustache',
    'json!./booklist.model.json'
], function ($, Mustache, templateBooklist, modelBooklist) {
    "use strict";

    var booklist = {
        getTemplate: function() {
            return Mustache.render(templateBooklist, modelBooklist);
        }
    }

    return booklist;


});