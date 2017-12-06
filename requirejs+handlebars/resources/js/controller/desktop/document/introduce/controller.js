define([
    'jquery',
    '../controller'
], function ($, publicController) {
    "use strict";


    function controller() {

        publicController(); // 서브메뉴 공용 실행 기능.

    }

    return controller;
});