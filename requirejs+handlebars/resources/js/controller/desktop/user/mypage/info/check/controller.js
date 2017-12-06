define([
    'jquery',
    './validation'
], function ($, validation) {
    "use strict";

    var $registerFormSubmitButton = $("#checkFormSubmitButton");


    function validationSubmit(e) {

        validation
            .submit()
            .then(function (res) {
                // $('#registerForm [disabled]').removeAttr('disabled');
            })
            .catch(function (res) {
                e.preventDefault();
                alert(res.message);
                return false;
            });
    }

    function controller() {

        $registerFormSubmitButton.on('click', validationSubmit);

    }

    return controller;
});