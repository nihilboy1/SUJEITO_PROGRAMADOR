"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
var Store = /** @class */ (function () {
    function Store(consumer, car, attendant) {
        this.attendant = attendant;
        this.consumer = consumer;
        this.car = car;
        this.car.setPrice(this.giveDiscount(this.car.getPrice()));
        this.finalPrice = this.car.getPrice();
        this.attendant.setCommission(this.addComission(this.finalPrice));
        this.priceWithDiscount = 0;
    }
    Store.prototype.giveDiscount = function (price) {
        if (this.car.getYear() < 2000) {
            this.priceWithDiscount = this.car.getPrice() * 0.9;
            this.car.setPrice(this.priceWithDiscount);
        }
        else {
            this.car.setPrice(price);
        }
        if (this.consumer.getIncome() < 5000) {
            this.priceWithDiscount = this.car.getPrice() * 0.9;
            return this.car.setPrice(this.priceWithDiscount);
        }
        else {
            return this.car.setPrice(this.car.getPrice());
        }
    };
    Store.prototype.addComission = function (value) {
        return this.attendant.setCommission(value * 0.02);
    };
    Store.prototype.PurchaseDetails = function () {
        console.log("Consumer: ".concat(this.consumer.getName(), " \n      \nModel: ").concat(this.car.getModel(), ", Year: ").concat(this.car.getYear(), ", Price: ").concat(this.car.getPrice(), " \n      \nAttendant: ").concat(this.attendant.getCommission()));
    };
    return Store;
}());
exports.Store = Store;
