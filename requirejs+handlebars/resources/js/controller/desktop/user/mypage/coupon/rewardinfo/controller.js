/**
 * Created by jlee on 2017-03-29.
 */
define([
    'jquery'
], function ($) {
    "use strict";

    var $reward_info_id = $('input[name="reward_info_id"]');
    var $bank_name = $('select[name="bank_name"] option:selected');
    var $account_number = $('input[name="account_number"]');
    var $account_holder = $('input[name="account_holder"]');
    var $id_card_image = $('input[name="id_card_image"]');
    var $rewardInfoSubmitButton = $("#reward_info__submit");
    var $rewardInfoCancelButton = $("#reward_info__cancel");

    function rewardInfoSubmit () {
        var fd = new FormData();

        if ($reward_info_id.val() !== undefined && $reward_info_id.val() !== "") {
            fd.append("reward_info_id", $reward_info_id.val());
        }

        if ($bank_name.val() !== undefined && $bank_name.val() !== "") {
            fd.append("bank_name", $bank_name.val());
        }

        if ($account_number.val() !== undefined && $account_number.val() !== "") {
            fd.append("account_number", $account_number.val());
        }

        if ($account_holder.val() !== undefined && $account_holder.val() !== "") {
            fd.append("account_holder", $account_holder.val());
        }

        var id_card_image_files = $id_card_image[0].files;
        if (id_card_image_files) {
            fd.append("id_card_image", id_card_image_files[0]);
        }

        $.ajax({
            url: "/v1/coupon/reward-info",
            processData: false,
            contentType: false,
            data: fd,
            type: "POST",
            success: function(response) {
                alert(response.message);
                window.opener.location.reload();
                window.close();
            },
            error: function(xhr, status, error) {
               alert(xhr.responseJSON.message);
            }
        });
    }

    function rewardInfoCancel() {
        window.close();
    }

    function controller () {
        $rewardInfoSubmitButton.on("click", rewardInfoSubmit);
        $rewardInfoCancelButton.on("click", rewardInfoCancel);
    }

    return controller;
});