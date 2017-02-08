// namespace
var App = App || {};

App.LoadingState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function () {

    };

    fn.prototype.preload = function () {
        // load json configuration files
        this.load.json('assetsConfig', 'assets/json/assets.json');
    };

    fn.prototype.create = function () {
        // use arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('PlayGame');
    };

    return fn;
})();
