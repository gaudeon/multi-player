// namespace
var App = App || {};

App.FlagOrangeRight = (function () {
    "use strict";

    var fn = function (game, x, y) {
        App.Flag.call(this, game, x, y, key, frame);
    };

    fn.prototype = Object.create(App.Flag.prototype);
    fn.prototype.constructor = fn;

    return fn;
})();