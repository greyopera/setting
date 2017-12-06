define([
    'jquery',
], function ($) {
    "use strict";

    var reviewUtil = {

        openTeacherDetailView: function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath);
            return false;
        },

        openLectureRegister: function(url) {

            var $self,
                locationPath;

            if(typeof url == 'string') {
                locationPath = url;
            } else {
                $self = $(this),
                locationPath = $self.attr('href');
            }

            window.open(locationPath, '_openLectureReviewRegister', 'width=740,height=410');
            return false;
        },

        openLectureReview : function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath, '_openLectureReview', 'width=740, height=600');
            return false;
        },

        openTeacherReview : function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath, '_openTeacherReview', 'width=740, height=760');
            return false;
        },

        openExamReview : function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath, '_openExamReview', 'width=740, height=760');
            return false;
        },

        openVideoContentDetail : function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath, '_openVideoContentDetail', 'width=852, height=900');
            return false;
        },

        openReviewDetail : function() {
            var $self = $(this),
                locatePath = $self.attr('href');

            window.open(locatePath, '_openReviewDetail', 'width=740, height=600');
            return false;
        },


        viewDescription : function() {
            var $self = $(this),
                $parent = $self.closest('tr'),
                $result = $parent.next('.review_result'),
                $siblingParent = $parent.siblings().not($result);

            $siblingParent.removeClass('active');

            if ($result.hasClass('active')) {
                $result.removeClass('active');
            } else {
                $result.addClass('active');
            }
        }
    }

    return reviewUtil;

});