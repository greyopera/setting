define([
    'jquery',
    'Mustache',
    'controller/talkerbe/freeclass/list/listHandler/lecture.paging'
], function ($, Mustache, lecturePaging) {
    "use strict";

    /**
     * 기출해설 : explain
     * 예상적중 : prediction
     * 기술총평 : review
     */
    var filterObject,
        parentSelector,
        pagingSelector,
        $parent,
        $list,
        $listChildren;

    function getStatus() {

        return {
            toeicAll: filterObject.toeic.$all.prop('checked'),
            toeicExplain: filterObject.toeic.$explain.prop('checked'),
            toeicPrediction: filterObject.toeic.$prediction.prop('checked'),
            opicAll: filterObject.opic.$all.prop('checked'),
            opicReview: filterObject.opic.$review.prop('checked')
        }
    }

    function sortList(e) {

        var currentElement = e.target,
            $currentListChild = $(),
            status;

        if (currentElement.type != 'checkbox') return;

        if (currentElement == filterObject.toeic.$explain.get(0) ||
            currentElement == filterObject.toeic.$prediction.get(0)) {

            if (filterObject.toeic.$explain.prop('checked') == true &&
                filterObject.toeic.$prediction.prop('checked') == true) {
                filterObject.toeic.$all.prop('checked', true);
            } else {
                filterObject.toeic.$all.prop('checked', false);
            }

        }

        if (currentElement == filterObject.opic.$review.get(0)) {
            if (filterObject.opic.$review.prop('checked') == true) {
                filterObject.opic.$all.prop('checked', true);
            } else {
                filterObject.opic.$all.prop('checked', false);
            }
        }

        if (currentElement == filterObject.toeic.$all.get(0)) {
            if (filterObject.toeic.$all.prop('checked') == true) {
                filterObject.toeic.$explain.prop('checked', true);
                filterObject.toeic.$prediction.prop('checked', true);
            } else {
                filterObject.toeic.$explain.prop('checked', false);
                filterObject.toeic.$prediction.prop('checked', false);
            }
        }

        if (currentElement == filterObject.opic.$all.get(0)) {
            if (filterObject.opic.$all.prop('checked') == true) {
                filterObject.opic.$review.prop('checked', true);
            } else {
                filterObject.opic.$review.prop('checked', false);
            }
        }

        status = getStatus();

        $listChildren.removeClass('active');
        if (status.toeicAll == true) {
            $currentListChild = $currentListChild.add($listChildren.filter('[data-kinds="explain"], [data-kinds="prediction"]'));
        } else if (status.opicAll == true) {
            $currentListChild = $currentListChild.add($listChildren.filter('[data-kinds="review"]'));
        }

        if (status.toeicExplain == true) {
            $currentListChild = $currentListChild.add($listChildren.filter('[data-kinds="explain"]'));
        }

        if (status.toeicPrediction == true) {
            $currentListChild = $currentListChild.add($listChildren.filter('[data-kinds="prediction"]'));
        }

        if (status.opicReview == true) {
            $currentListChild = $currentListChild.add($listChildren.filter('[data-kinds="review"]'));
        }

        if ($currentListChild) {

            $currentListChild.addClass('active');
            lecturePaging.create($currentListChild, pagingSelector, parentSelector);
            $("#listNoResult").remove();

        } else {

            $list.append('<div class="list_no_result" id="listNoResult"><p>선택된 강의가 없습니다.</p></div>');
            lecturePaging.destroy();

        }
    }

    function lectureFilter( opts ) {

        pagingSelector = opts.selector.paging;
        parentSelector = opts.selector.parent;
        $parent = $(opts.selector.parent);
        $list = $(opts.selector.list);
        $listChildren = $(opts.selector.listChildren);
        filterObject = opts.filterObject;

        filterObject.$container.on('click', sortList);
    }

    return lectureFilter;

});