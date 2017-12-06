define([
    'jquery',
    'parseURL',
    'copyToClipboard',
    'factory/space/space.api',
    'factory/space/space.helper',
    'factory/space/view/space.view',
    'factory/space/view/space.view.comment',
    'factory/space/view/space.view.comment.Paging',
    './validation'
], function ($, parseURL, copyToClipboard, spaceAPI, spaceHelper, spaceView, spaceViewComment, CommentPaging, validation) {
    "use strict";

    var GET_URL = parseURL(document.URL),
        $spaceBbs = $("#spaceBbs"),
        $spaceComment,
        isLogin = $spaceBbs.data('is-login'),
        listUrl = $spaceBbs.data('list-url'),
        spaceType = 1,
        getParameter = GET_URL.pathname.split('/'),
        PAGE_ID = getParameter[getParameter.length - 1],
        params = {
            ID : PAGE_ID
        },
        commentParams = {
            'limit': 5,
            'ordering': '-id',
            'current_page': 0,
            ID: PAGE_ID
        },
        instancePaging,
        $inputDocumentUrl = $("#inputDocumentUrl"),
        $commentCount;

    for (var idx in GET_URL.searchObject) if (GET_URL.searchObject[idx]['space_type']) spaceType = GET_URL.searchObject[idx]['space_type'];

    $inputDocumentUrl.val(GET_URL.protocol + '//' + GET_URL.host + GET_URL.pathname + GET_URL.search);

    function deleteComment(e) {

        e.preventDefault();

        var $self = $(this),
            $parent = $self.closest('.container'),
            ID = $parent.data('comment-id');

        if (confirm('댓글을 삭제하시겠습니까?\n내용:' + $parent.find('.reply').text())) {
            spaceViewComment
                .delete(ID)
                .then(function (res) {
                    alert('삭제 되었습니다.');
                    exchangeComment();
                });
        }

        return false;
    }

    function modifyCommentStatusChange(e) {

        e.preventDefault();

        var $self = $(this),
            $super = $self.closest('.space_bbs__view__comment__board'),
            $parent = $self.closest('.container'),
            $reply = $parent.find('.reply'),
            $input = $parent.find('.text'),
            $currentEl = $super.find('.is_modify');

        if($currentEl.length) $currentEl.find('.cancel').trigger('click');

        $input.val($reply.text());
        $parent.addClass('is_modify');

        return false;
    }

    function updateComment(e) {

        e.preventDefault();

        var $self = $(this),
            $parent = $self.closest('.container'),
            commentId = $parent.data('comment-id'),
            $textarea = $parent.find('[name="comment'+commentId+'"]'),
            params = {
                'description': $textarea.val(),
                'commentId': commentId,
                'current_page': 1
            };

        validation
            .updateSubmit($textarea)
            .then(function() {

                spaceViewComment
                    .update(params)
                    .then(function (res) {
                        //alert('수정 되었습니다.');
                        commentParams.current_page = instancePaging.$contextPaging.find('li.active').index();
                        exchangeComment();
                    });

            })
            .catch(function(res) {
                alert(res.message);
            });

        return false;
    }

    function cancelComment(e) {

        e.preventDefault();

        var $self = $(this),
            $parent = $self.closest('.container'),
            $input = $parent.find('.text');

        $input.val('');
        $parent.removeClass('is_modify');

        return false;
    }

    function exchangeComment(e) {

        spaceViewComment
            .getList(commentParams)
            .then(function (res) {

                var getTemplate = $(spaceViewComment.getTemplate());

                $spaceComment = $("#spaceBbsViewComment");
                $spaceComment.empty().append(getTemplate);

                // 페이징 기능 플러그인
                instancePaging = new CommentPaging();
                instancePaging.initialize({
                    board: '#spaceBbsViewCommentBoard',
                    paging: {context: '.paging', anchor: '.list a', prev: '.prev', next: '.next'}
                });

                $commentCount.text(res.model.count);

            });
    }

    function setRecommend(e) {

        e.preventDefault();

        var $self = $(this),
            $spaceCount = $self.find('.count'),
            params = {
                ID : PAGE_ID
            };

        if(!isLogin) {
            location.href= $spaceBbs.data('login-url');
        }

        if($self.data('is-recommend') == true) {

            params['check_recommend'] = false;


            spaceView
                .removeRecommend(params)
                .then(function (res) {

                    alert('추천이 해제 되었습니다.');
                    $spaceCount.text(res.model.space_recommend.count);
                    $self.removeClass('active');
                    $self.data('is-recommend', false);

                });

        } else {

            params['check_recommend'] = true;

            spaceView
                .setRecommend(params)
                .then(function (res) {

                    alert('추천 되었습니다.');
                    $spaceCount.text(res.model.space_recommend.count);
                    $self.addClass('active');
                    $self.data('is-recommend', true);

                });
        }


        return false;

    }

    function registerComment(e) {

        e.preventDefault();

        var $self = $(this),
            $parent = $self.closest('.space_bbs__view__comment__board'),
            $input = $parent.find('[name="description"]'),
            params = {
                'space_id': PAGE_ID,
                'description': $input.val()
            };

        if(!isLogin) {
            location.href= $spaceBbs.data('login-url');
            return;
        }


        validation
            .commentSubmit()
            .then(function() {

                spaceViewComment
                    .register(params)
                    .then(function (res) {
                        alert('등록 되었습니다.');
                        exchangeComment();
                    });

            })
            .catch(function(res) {
                alert(res.message);
            });

        return false;
    }

    function deleteList(e) {

        e.preventDefault();

        spaceView
            .deleteList(PAGE_ID)
            .then(function (res) {
                alert('삭제 되었습니다.');
                location.href = spaceHelper.urlAddSpaceType(spaceType, listUrl);
            });

        return false;
    }

    function copyUrl() {
        copyToClipboard($inputDocumentUrl.get(0));
        alert('클립보드에 복사 되었습니다. 원하는 곳에서 Ctrl + V 하세요.\n[' + $inputDocumentUrl.val() + ']');
        return false;
    }

    function controller() {

        // 보기 Template
        spaceView
            .setContext('#spaceBbs')
            .getView(params)
            .then(function (res) {

                spaceView.setTemplate();
                $commentCount = $("#commentCount");
                exchangeComment();

            });

        $spaceBbs.on('click', '.space_bbs__view__function .delete', deleteList);
        $spaceBbs.on('click', '.space_bbs__view__comment__board .function .modify', modifyCommentStatusChange);
        $spaceBbs.on('click', '.space_bbs__view__comment__board .function .delete', deleteComment);
        $spaceBbs.on('click', '.space_bbs__view__comment__board .modify_context .cancel', cancelComment);
        $spaceBbs.on('click', '.space_bbs__view__comment__board .modify_context .register', updateComment);
        $spaceBbs.on('click', '.space_bbs__view__comment__board .submit button', registerComment);
        $spaceBbs.on('click', '.space_bbs__view__etc_function .recommend', setRecommend);
        $spaceBbs.on('click', '.space_bbs__view__etc_function .copyurl', copyUrl);

    }

    return controller;
});