"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendant = void 0;
var Attendant = /** @class */ (function () {
    function Attendant(name) {
        this.commission = 0;
        this.name = name;
    }
    Attendant.prototype.getName = function () {
        return this.name;
    };
    Attendant.prototype.getCommission = function () {
        return this.commission;
    };
    Attendant.prototype.setName = function (name) {
        return (this.name = name);
    };
    Attendant.prototype.setCommission = function (commission) {
        return (this.commission = commission);
    };
    return Attendant;
}());
exports.Attendant = Attendant;
