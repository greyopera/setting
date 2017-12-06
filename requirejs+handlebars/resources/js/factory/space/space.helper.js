define([
    'jquery',
    'parseURL',
    'purl'
], function ($, parseURL, purl) {
    "use strict";

    var spaceHelper = {

        urlAddSpaceType: function(spaceType, url) {

            var getUrl = parseURL(url || document.URL),
                changeUrl = '';

            if(getUrl.searchObject) {

                var params = [],
                    urlValue,
                    objectKey;

                for (var idx in getUrl.searchObject) {

                    urlValue = getUrl.searchObject[idx];
                    objectKey = Object.keys(urlValue)[0];

                    if (objectKey == 'space_type') urlValue['space_type'] = spaceType;

                    params.push(objectKey + '=' + urlValue[objectKey]);

                }

                if(!params.join('&').match(/space_type/)) params.push('space_type=' + spaceType);

            }

            changeUrl = getUrl.pathname + "?" + params.join('&');
            return changeUrl;

        },

        urlInitParameter: function(url) {

            var spaceType = this.urlParamHandle.get('space_type');
            var page = this.urlParamHandle.get('page');
            var noticeStatus = this.urlParamHandle.get('notice');

            if(!spaceType) this.urlParamHandle.set('space_type', 1);
            if(!page) this.urlParamHandle.set('page', 1);
            if(!noticeStatus) this.urlParamHandle.set('notice', false);
        },

        getAddFullParam: function(url) {

            var URL = purl(url),
                currentParam = purl(document.URL).param(),
                param = URL.param(),
                paramSearch = '?';

            param = $.extend(currentParam, param);

            for(var prop in param) {
                if(paramSearch[paramSearch.length - 1] != '&' && paramSearch[paramSearch.length - 1] != '?') paramSearch += '&';
                paramSearch += prop + '=' + param[prop];
            }

            return URL.attr('path') + paramSearch;
        },

        urlParamHandle: {
            getFull: function(url) {
                var URL = purl(url || document.URL);
                return {
                    _obj: URL,
                    param: URL.param()
                }
            },

            get: function(attr, url) {

                var URL = purl(url || document.URL);
                return URL.param(attr);

            },

            set: function(attr, value, url) {

                var URL = purl(document.URL),
                    currentParam = URL.param(),
                    param = {},
                    paramSearch = '?';

                param[attr] = value;
                param = $.extend(currentParam, param);

                for(var prop in param) {
                    if(paramSearch[paramSearch.length - 1] != '&' && paramSearch[paramSearch.length - 1] != '?') paramSearch += '&';
                    paramSearch += prop + '=' + param[prop];
                }

                history.pushState(null, null, paramSearch); // 진입시 부족한 파라미터 보충.
                return this;
            }
        }

    };

    return spaceHelper;


});
