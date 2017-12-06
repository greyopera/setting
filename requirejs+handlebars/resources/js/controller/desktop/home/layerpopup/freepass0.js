define([
    'jquery',
    'Mustache',
    'text!./freepass0.mustache',
    'jqueryCookie'
], function ($, Mustache, templatefreepass) {
    "use strict";

    var $body = $('body'),
        $freepassLayer,
        layer = {
            getTemplate: function() {
                return Mustache.render(templatefreepass, {});
            },
            appendBody: function() {
                if($.cookie('weport_popup_main_warning_message0418') == 'true') return this;
                $body.append(this.getTemplate());
                return this;
            },
            setFunction: function() {
                $freepassLayer = $("#shortTermLayerHomeEventFreepass");
                if(!$freepassLayer.length) return;

                $freepassLayer.on('click', '.button.dayclose', $.proxy(this._dayClose, this) );
                $freepassLayer.on('click', '.button.close', $.proxy(this._close, this) );
            },

            _dayClose: function() {
                $.cookie('weport_popup_main_warning_message0418', 'true', { expires: 1 });
                this._close();
            },

            _close: function() {
                $freepassLayer.remove();
            }
        }

    return layer;
});