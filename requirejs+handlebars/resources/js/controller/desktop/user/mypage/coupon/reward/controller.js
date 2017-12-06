/**
 * Created by jlee on 2017-03-30.
 */
define([
    'jquery'
], function ($) {
    "use strict";

    var $reward_info_id = $('#reward_info_id'),
        $reward_info_tables = $(".reward-info-table");


    function switch_table_data(reward_info_id) {

        var selector = '#reward-info-table-' + reward_info_id;
        $reward_info_tables.each(function() {
            $(this).hide();
        });

        $(selector).show();

    }


    function controller() {

        switch_table_data($reward_info_id.val());

        $reward_info_id.on('change', function() {
           switch_table_data($(this).val());
        });

    }

    return controller;
});