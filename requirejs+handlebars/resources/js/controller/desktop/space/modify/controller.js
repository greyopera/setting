define([
    'jquery',
    'parseURL',
    'Mustache',
    'controller/desktop/space/write/controller',
    'factory/space/modify/space.modify',
    'tinyMCE',
    'text!../write/question1.mustache',
    'text!../write/question2.mustache',
    'text!../write/question3.mustache',
], function ($, parseURL, Mustache, writeController, spaceModify, tinyMCE, question1Template, question2Template, question3Template) {
    "use strict";

    var GET_URL = parseURL(document.URL),
        $spaceBbs = $("#spaceBbs"),
        spaceType = 1,
        getParameter = GET_URL.pathname.split('/'),
        PAGE_ID = getParameter[getParameter.length - 1];

    for (var idx in GET_URL.searchObject) if (GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    function controller() {

        // 기본적인 작성 기능은 위탁
        writeController({modify:true}).then(function () {

            spaceModify
                .getModify(PAGE_ID)
                .then(function (res) {

                    var results = res.model.results;
                    $('[name=space_type]').val(results['space_type'].num);
                    $('[name=subject]').val(results['subject']);
                    $('[name=is_notice]').prop('checked', results['is_notice']);
                    $('[name=description]').val(results['description']);
                    tinyMCE.activeEditor.setContent(results['description'])
                    if(results['attach_file']) {
                        var file = results['attach_file'];
                        $('[name=filediv] a').text(file.name).attr('href', file.url);
                    }

                    $('#space_type').change(function(){
                        var num = $(this).val();
                        if(num == 1){
                            tinyMCE.activeEditor.setContent(Mustache.render(question1Template))
                        } else if (num == 2) {
                            tinyMCE.activeEditor.setContent(Mustache.render(question2Template))
                        } else {
                            tinyMCE.activeEditor.setContent(Mustache.render(question3Template))
                        }
                    });

                });
        });


    }

    return controller;
});