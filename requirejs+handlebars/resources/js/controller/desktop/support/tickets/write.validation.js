define(['jquery'], function ($) {
    'use strict';

    var globalFunction = {
        view_go: function (seq, no, html) {
            no = no || '';
            html = html || '';
            location.href = html + "?mode=view&seq=" + seq + "&page=1&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&total_page=1&vod_idx=&no=" + no;
        },

        view_go_video: function (val1, val2, val3) {
            document.all.top_video_subject.innerHTML = val1;
            document.all.top_video_content.innerHTML = val2;
            //		alert(document.getElementById["top_flv_player"].src);
            document.all.ifr_video.src = "/html/sub_06/customer05_video.php?ext1=" + val3;
        },

        view_go_secret: function (seq) {
        },


        view_go_secret_pop: function (seq) {
        },

        write_go: function () {
            location.href = "?mode=write&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
        },

        mod_go: function (seq) {
            location.href = "?mode=mod&seq=" + seq + "&page=1&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
        },

        confirm_go: function (seq, act) {
            location.href = "?mode=confirm&seq=" + seq + "&act=" + act + "&page=1&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
        },

        confirm_go_pop: function (seq, act) {
            var pop_contact = window.open("/_util/board/pop_pass.php?mode=confirm&seq=" + seq + "&act=" + act + "&page=1&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=", 'pop_contact', 'width=450,height=260,resizable=0,scrollbars=0');
            pop_contact.focus();

        },

        del_go: function (seq) {
            if (confirm("정말로 삭제 하시겠습니까?\n삭제한 정보는 복구가 불가능합니다.")) {
                location.href = "?mode=del_ok&seq=" + seq + "&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
            }
        },

        reply_go: function (seq) {
            location.href = "?mode=reply&seq=" + seq + "&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
        },

        list_go: function () {
            location.href = "?mode=list&page=1&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&vod_idx=";
        },

        up_file_disabled: function (str, targ) {
            var target = eval("document.form1." + targ);
            if (str.checked) {
                target.disabled = false;
            } else {
                target.disabled = true;
            }
        },

        search_go: function () {
            var ff = document.SearchForm;
            if (!ff.search_text.value) {
                alert("검색어를 입력해 주십시오.");
                ff.search_text.focus();
                return;
            }
        },

        cate_go: function (category) {
            var ff = document.SearchForm;
            ff.search_category.value = category;
            ff.submit();
        },

        WriteOkGo: function (e) {
            var ff = document.WriteForm;

            if(ff.category_service.value == 'weport') {

                if (ff.category_weport.value == '') {
                    alert("카테고리를 선택해주세요.");
                    return false;
                }
            }

            if(ff.category_service.value == 'talkerbe') {

                if (ff.category_talkerbe.value == '') {
                    alert("카테고리를 선택해주세요.");
                    return false;
                }
            }

            if(ff.category_service.value == 'ncs') {

                if (ff.category_ncs.value == '') {
                    alert("카테고리를 선택해주세요.");
                    return false;
                }
            }

            if(ff.category_service.value == 'all') {

                if (ff.category_all.value == '') {
                    alert("카테고리를 선택해주세요.");
                    return false;
                }
            }

            if (!ff.subject.value || ff.subject.value == "제목을 입력해주세요.") {
                alert("제목을 입력하여 주십시오.");
                ff.subject.value = "";
                ff.subject.focus();
                return false;
            }
            if (!ff.content.value || ff.content.value == "내용을 작성해 주세요.") {
                alert("내용을 작성해 주세요.");
                ff.content.value = "";
                ff.content.focus();
                return false;
            }

            alert('문의 주셔서 고맙습니다.');

            $("#btn_write_ok").attr({
                'src': '/static/images/customer/btn05_loading.gif',
                'disabled': 'diabled'
            });


        },

        page_go: function (page) {
            location.href = "?mode=list&page=" + page + "&&bc_id=bbs_qna&search_category=all&num_per_page=10&page_per_block=10&search=&search_text=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=&search_ext1=";
        }

    };

    for (var prop in globalFunction) {
        window[prop] = globalFunction[prop];
    }

    return globalFunction;
});