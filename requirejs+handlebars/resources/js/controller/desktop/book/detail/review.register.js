define(['jquery'], function ($) {
    "use strict";

    function registerValidation() {
        var ff = document.WriteForm_Postscript;

        if (!ff.subject.value) {
            alert("제목을 입력하여 주십시오.");
            ff.subject.focus();
            return false;
        }

        if (ff.subject.value == "제목을 입력해주세요.") {
            alert("제목을 입력하여 주십시오.");
            ff.subject.focus();
            return false;
        }

        if (!ff.description.value) {
            alert("내용을 입력하여 주십시오.");
            ff.description.focus();
            return false;
        }
    }

    function registerStarHandler(num) {

        if (num == "0") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_off.gif");
        }

        if (num == "1") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_off.gif");
        }

        if (num == "2") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_off.gif");
        }

        if (num == "3") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_off.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_off.gif");
        }

        if (num == "4") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_off.gif");
        }

        if (num == "5") {
            $("#StarImg1")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg2")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg3")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg4")
                .attr("src", "/static/images/common/star_on.gif");
            $("#StarImg5")
                .attr("src", "/static/images/common/star_on.gif");
        }

        document.WriteForm_Postscript.score.value = num;
    }

    return {
        validation: registerValidation,
        starHandler: registerStarHandler
    };

});