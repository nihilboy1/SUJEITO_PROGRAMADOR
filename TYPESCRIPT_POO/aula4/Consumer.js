"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
var Consumer = /** @class */ (function () {
    function Consumer(name, income) {
        this.name = name;
        this.income = income;
    }
    Consumer.prototype.getName = function () {
        return this.name;
    };
    Consumer.prototype.getIncome = function () {
        return this.income;
    };
    Consumer.prototype.setName = function (name) {
        return (this.name = name);
    };
    Consumer.prototype.setIncome = function (income) {
        return (this.income = income);
    };
    return Consumer;
}());
exports.Consumer = Consumer;
