var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car(cor) {
        this.cor = cor;
    }
    Car.prototype.getCor = function () {
        return this.cor;
    };
    Car.prototype.move = function (km) {
        console.log("move, move", km);
    };
    return Car;
}());
var Honda = /** @class */ (function (_super) {
    __extends(Honda, _super);
    function Honda(pneu, cor) {
        var _this = _super.call(this, cor) || this;
        _this.pneu = pneu;
        return _this;
    }
    Honda.prototype.hondaMove = function (km) {
        _super.prototype.move.call(this, km);
    };
    return Honda;
}(Car));
var hondaCar = new Honda(true, "black");
hondaCar.hondaMove(25);
