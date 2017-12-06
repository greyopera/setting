define([], function() {
    "use strict";

    if(typeof dable == 'undefined') {
        (function(d,a,b,l,e,_) {
        d[b]=d[b]||function(){(d[b].q=d[b].q||[]).push(arguments)};e=a.createElement(l);
        e.async=1;e.charset='utf-8';e.src='//static.dable.io/dist/plugin.min.js';
        _=a.getElementsByTagName(l)[0];_.parentNode.insertBefore(e,_);
        })(window,document,'dable','script');
    }
});