define(['jquery'], function($) {

    /**
     * 팝업 제어 (리팩토링 필요함.
     * @param {string} url
     * @param {string} target
     */
    function windowPopup(url, w, h, target) {
        var cw = screen.availWidth,
            ch = screen.availHeight,
            w = w ? w : 830,
            h = h ? h : 450,
            _target = target ? target : "_blank",
            ml, mt;

        ml = (cw - w) / 2;
        mt = (ch - h) / 2;

        window.open(url, _target, 'width=' + w + ',height=' + h + ',top=' + mt + ',left=' + ml + ',resizable=no,scrollbars=yes');
    }

    return windowPopup;
});
