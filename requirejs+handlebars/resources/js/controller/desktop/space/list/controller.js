define([
    'jquery',
    'parseURL',
    'factory/space/space.api',
    'factory/space/space.helper',
    'factory/space/list/space.list',
    'factory/space/list/space.list.Paging',
    './Handler.tabmenu'
], function ($, parseURL, spaceApi, spaceHelper, spaceList, Paging, HandlerTabmenu) {
    "use strict";

    var $spaceBbs = $("#spaceBbs"),
        instanceTabMenu,
        COLUMN_SIZE = 10,
        spaceType = spaceHelper.urlParamHandle.get('space_type') || 1,
        currentPage = spaceHelper.urlParamHandle.get('page') - 1 || 0,
        noticeStatus = spaceHelper.urlParamHandle.get('notice') || 0,
        paramsInit = {
            limit: COLUMN_SIZE,
            ordering: '-id',
            space_type: spaceType,
            current_page: currentPage
        };

    function deleteList(e) {

        e.preventDefault();

        var $self = $(this),
            $super = $self.closest('.space_bbs__list'),
            $tableCheckbox = $super.find('.space_bbs__list__board table tbody .checkbox input:checked'),
            $publicStatus = $super.find('[name="status_policy"]'),
            idGroup = [],
            params = {
                limit: $super.data('param-limit'),
                ordering: $super.data('param-ordering'),
                space_type: $super.data('param-space_type'),
                search_type: '',
                search_keyword: '',
                current_page: currentPage,
                is_public: $publicStatus.val()
            };

        for (var a = 0, b = $tableCheckbox.length; a < b; a++) {
            idGroup.push($tableCheckbox.eq(a).data('id'));
        }

        spaceList
            .deleteList(idGroup)
            .then(function (res) {

                spaceList
                    .getList(params)
                    .then(exchangeList)
                    .then(function () {
                        alert('삭제 되었습니다.')
                    });

            });

        return false;
    }

    function changePolicy(e) {

        e.preventDefault();

        var $self = $(this),
            status = $self.data('policy-status'),
            $super = $self.closest('.space_bbs__list'),
            $parent = $super.find('.space_bbs__list__board'),
            $tableCheckbox = $parent.find('table tbody .checkbox input:checked'),
            $publicStatus = $super.find('[name="status_policy"]'),
            checkNotice = ($self.closest('tr').is('.notice')) ? 'list' : false,
            idGroup = [],
            rejectGroup = [],
            params = {
                limit: $super.data('param-limit'),
                ordering: $super.data('param-ordering'),
                space_type: $super.data('param-space_type'),
                search_type: '',
                search_keyword: '',
                current_page: currentPage,
                is_public: $publicStatus.val(),
                space_attr: checkNotice
            };

        for (var a = 0, b = $tableCheckbox.length; a < b; a++) {

            var getRow = $tableCheckbox.eq(a);
            // if(getRow.closest('tr').is('.notice') || getRow.closest('tr').is('.has_notice') ) {
            //
            //     getRow.prop('checked', false);
            //     rejectGroup.push($tableCheckbox.eq(a).data('id'));
            //
            // } else {

            idGroup.push({
                subject: getRow.data('subject'),
                id: getRow.data('id'),
                space_attr: false
            });

            // }
        }

        if (rejectGroup.length) {

            var message = '[' + rejectGroup + ']번호의 공지글은 목록에서 변경할 수 없습니다.';
            if (idGroup.length) {

                message += '\n 나머지 요청을 수행합니다.';
                alert(message);

            } else {

                alert(message);
                return;

            }

        }

        spaceList
            .changePolicy(idGroup, status)
            .then(function (res) {
                spaceList
                    .getList(params)
                    .then(exchangeList);
            })
            .then(function () {
                alert('상태값이 변경되었습니다.')
            });

        return false;
    }

    function searchList(e) {

        e.preventDefault();

        var $self = $(this),
            $super = $self.closest('.space_bbs'),
            $board = $self.closest('.space_bbs__list'),
            $searchType = $board.find('[name="searchfield_type"]'),
            $keyWord = $board.find('[name="search_keyword"]'),
            $publicStatus = $board.find('[name="status_policy"]'),
            params = {
                limit: $board.data('param-limit'),
                ordering: $board.data('param-ordering'),
                space_type: $board.data('param-space_type'),
                search_type: $searchType.val(),
                search_keyword: $keyWord.val(),
                current_page: 0,
                is_public: $publicStatus.val()
            };

        spaceList
            .getList(params)
            .then(exchangeList);

        return false;
    }


    function toggleListCheckbox(e) {

        var $self = $(this),
            $board = $self.closest('table'),
            $bodyCheckbox = $board.find('tbody .checkbox input');

        if ($self.is(':checked')) {
            $bodyCheckbox.prop('checked', true);
        } else {
            $bodyCheckbox.prop('checked', false);
        }

        return;
    }

    function toggleNotice(e) {

        var $self = $(this),
            $parent = $self.closest('.space_bbs__list'),
            value = $self.is(':checked');

        if (value) {
            spaceHelper.urlParamHandle.set('notice', true);
            $parent.addClass('is_notice_hide');
        } else {
            spaceHelper.urlParamHandle.set('notice', false);
            $parent.removeClass('is_notice_hide');
        }

        return false;
    }


    function detectPublic(e) {

        e.preventDefault();

        var $self = $(this),
            $super = $self.closest('.space_bbs__list'),
            $searchType = $super.find('[name="searchfield_type"]'),
            $keyWord = $super.find('[name="search_keyword"]'),
            $publicStatus = $super.find('[name="status_policy"]'),
            params = {
                limit: $super.data('param-limit'),
                ordering: $super.data('param-ordering'),
                space_type: $super.data('param-space_type'),
                search_type: $searchType.val(),
                search_keyword: $keyWord.val(),
                current_page: 0,
                is_public: $publicStatus.val()
            };

        spaceList
            .getList(params)
            .then(exchangeList);

        return false;

    }

    function exchangeList(res) {

        var instancePaging,
            $existBoard = $("#spacebbsContents" + res.model.space_type),
            $board = $existBoard.closest('.space_bbs__list'),
            $getTemplate;

        if ($existBoard) $existBoard.remove();

        spaceList.setModelBoard(res.model);
        $getTemplate = $(spaceList.getTemplate.list());
        spaceList.$contextElement.append($getTemplate);
        $getTemplate.addClass('active');

        // 페이징 기능 플러그인
        console.log('paging');
        instancePaging = new Paging();
        instancePaging.initialize({
            board: '#spacebbsContents' + res.model.space_type,
            dataTarget: '#spaceBbsCategory .menu a',
            paging: {context: '.paging', anchor: '.list a', prev: '.prev', next: '.next'}
        }, {
            spaceType: res.model.space_type,
            search_keyword: $board.find('[name="search_keyword"]').val(),
            search_type: $board.find('[name="searchfield_type"]').val(),
            is_public: $board.find('[name="status_policy"]').val()
        });

        return Promise.resolve(true);

    }

    function listUrlChange() {

        var URL = spaceHelper.urlParamHandle.getFull(),
            viewUrl = spaceHelper.urlParamHandle.getFull(this.href),
            param = URL.param,
            paramSearch = '?';

        param = $.extend(viewUrl.param, param);

        for (var prop in param) {
            if (paramSearch[paramSearch.length - 1] != '&' && paramSearch[paramSearch.length - 1] != '?') paramSearch += '&';
            paramSearch += prop + '=' + param[prop];
        }

        this.href = viewUrl._obj.attr('path') + paramSearch;
    }

    function writeList() {

        var URL = spaceHelper.urlParamHandle.getFull(),
            writeUrl = spaceHelper.urlParamHandle.getFull($spaceBbs.data('write-url')),
            param = URL.param,
            paramSearch = '?';

        param = $.extend(writeUrl.param, param);

        for (var prop in param) {
            if (paramSearch[paramSearch.length - 1] != '&' && paramSearch[paramSearch.length - 1] != '?') paramSearch += '&';
            paramSearch += prop + '=' + param[prop];
        }
        this.href = writeUrl._obj.attr('path') + paramSearch;
    }

    function controller() {

        spaceList
            .setContext('#spaceBbs')
            .getCategory()
            .then(function (model) {

                spaceList.setTemplate.category();
                return model;

            }).then(function (spaceCategoryModel) {

                var model = spaceCategoryModel,
                    promiseTask = [],
                    params = paramsInit;

                for (var a = 0, b = model.length; a < b; a++) {
                    params.space_type = model[a].num;

                    if (params.space_type == spaceType) {
                        params.current_page = currentPage;
                    } else {
                        params.current_page = 0;
                    }

                    spaceList.__extendAPI.spaceAPI.isTransaction = false; // 목록 복수 호출을 위해 강제로 상태값 변경.
                    promiseTask.push(spaceList.getList(params));
                }

                return promiseTask;

            }).then(function (promiseTask) {

                Promise
                    .all(promiseTask)
                    .then(function (models) {

                        console.log(models);

                        models.forEach(exchangeList);

                        // 탭메뉴 플러그인.
                        instanceTabMenu = new HandlerTabmenu({
                            selector: {
                                wrapper: '#spaceBbsCategory',
                                activeTarget: '#spaceBbsCategory li',
                                anchor: '#spaceBbsCategory a',
                                contentTarget: '.space_bbs__list'
                            }
                        });

                        instanceTabMenu.bootstrap();
                        instanceTabMenu.$wrapper.find('[data-space-type=' + spaceType + ']').trigger('click');

                        if(spaceHelper.urlParamHandle.get('notice') == 'true') {
                            $("#handlerNoticeRender_"+spaceType).trigger('click');
                        }


                    });
            });

        $spaceBbs.on('change', '.handler_notice_render', toggleNotice);
        $spaceBbs.on('click', '.space_bbs__list__board thead .checkbox input', toggleListCheckbox);
        $spaceBbs.on('click', '.space_bbs__list__board a', listUrlChange);
        $spaceBbs.on('click', '.space_bbs__list__board .function .delete', deleteList);
        $spaceBbs.on('click', '.space_bbs__list__function .delete', deleteList);
        $spaceBbs.on('click', '.space_bbs__list__board .function .write', writeList);
        $spaceBbs.on('click', '.space_bbs__list__function .write', writeList);
        $spaceBbs.on('click', '.space_bbs__list .searchfield .submit', searchList);
        $spaceBbs.on('click', '.space_bbs__list__function .policy', changePolicy);
        $spaceBbs.on('change', '.space_bbs__list__function [name=status_policy]', detectPublic);

        spaceHelper.urlInitParameter();
    }

    return controller;
});