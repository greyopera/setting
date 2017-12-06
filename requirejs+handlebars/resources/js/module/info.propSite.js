define([
    'parseURL'
], function (parseURL) {
    "use strict";

    var propSite = {};

    var getUrl = parseURL(window.location.href);
    if (getUrl.hostname.match(/talkerbe/) || getUrl.pathname.match(/talkerbe/) || getUrl.search.match(/service=talkerbe/)) {
        propSite['isTalkerbe'] = true;
    } else {
        propSite['isTalkerbe'] = false;
    }

    return propSite;
});