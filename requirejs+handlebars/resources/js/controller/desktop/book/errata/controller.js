define([
    'jquery',
    './errata.search',
    './errata.autocomplete',
    'jqueryUI'
], function ($, errataSearch, errataAutocomplete) {
    "use strict";


    function controller() {

        errataSearch
            .setForm('#bookErrataSearchForm', '#bookErrataListSearchfieldBookname')
            .setSubmit('#bookErrataListSearchButton');

        errataAutocomplete
            .setModel('#bookErrataListSearchfieldBooknameResult')
            .eventBind('#bookErrataListSearchfieldBookname', '#bookErrataListSearchfieldBooknameId');

    }

    return controller;

});