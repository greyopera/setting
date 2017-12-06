define(['jquery'], function ($) {
    "use strict";

    var errataSearch = {
        IS_READY: true,

        submit: function (e) {

            var $pending = $("<span class='pending' style='display:inline-block; margin:6px 0 0 5px;'><img src='/static/images/newimg/offline/loading.gif' alt='Loading' /></span>"),
                that = this;

            errataSearch
                .catch(function (res) {
                    if(e) e.preventDefault();
                    alert(res.message);
                    
                });

        },

        GET: function () {
            return $.get(this.$form.attr('action'), this.$form.serializeObject());
        },

        setForm: function (form) {
            this.$form = $(form);
            return this;
        },
        setBookImage: function (selector, imagePath) {

            this.imagePath = imagePath;
            $(selector).empty().append('<img src=" ' + this.imagePath + ' " alt="" />');

            return this;
        },

        setDownloadButton: function (selector, downloadPath) {

            this.downloadPath = downloadPath;
            $(selector).attr('href', this.downloadPath);
            $(selector).closest('div').addClass('active');

            return this;
        },

        setSubmit: function (selector) {
            $(selector).on('click.submit', $.proxy(this.submit, this));
        }

    };

    return errataSearch;
});