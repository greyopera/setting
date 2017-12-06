define([
    'jquery',
], function ($) {
    "use strict";

    function filter() {
        var filter = [];
        $('.weport-filter:checked').each(function (index, f) {
            if ($(f).data('category-id')) filter.push(Number($(f).data('category-id')));
        });

        var view_count = 0;

        $('.lecture_list_searchtype').each(function (index, content) {
            var display = true;

            var content_category = $(content).data('categories');
            for (var i = 0; i < filter.length; i++) {
                if (content_category.indexOf(filter[i]) == -1) display = false;
            }

            if ($(".teacher-filter:checked").data('teacher-id') != null && $(".teacher-filter:checked").data('teacher-id') != $(content).data('teacher')) display = false;

            if (display) {
                view_count += 1;
                $(content).show();
            } else {
                $(content).hide();
            }
        });

        $('.search_result_point').text(view_count + '건');
    }

    return filter;
});