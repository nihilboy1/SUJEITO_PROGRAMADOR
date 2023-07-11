"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(model, year, price) {
        this.model = model;
        this.year = year;
        this.price = price;
    }
    Car.prototype.getYear = function () {
        return this.year;
    };
    Car.prototype.getPrice = function () {
        return this.price;
    };
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.setModel = function (model) {
        this.model = model;
    };
    Car.prototype.setYear = function (year) {
        this.year = year;
    };
    Car.prototype.setPrice = function (price) {
        return (this.price = price);
    };
    return Car;
}());
exports.Car = Car;
