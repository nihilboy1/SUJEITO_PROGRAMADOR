import { Attendant } from "./Attendant";
import { Car } from "./Car";
import { Consumer } from "./Consumer";

export class Store {
  consumer: Consumer;
  car: Car;
  attendant: Attendant;
  finalPrice: number;
  priceWithDiscount: number;

  constructor(consumer: Consumer, car: Car, attendant: Attendant) {
    this.attendant = attendant;
    this.consumer = consumer;
    this.car = car;
    this.car.setPrice(this.giveDiscount(this.car.getPrice()));
    this.finalPrice = this.car.getPrice();
    this.attendant.setCommission(this.addComission(this.finalPrice));
    this.priceWithDiscount = 0;
  }

  private giveDiscount(price: number): number {
    if (this.car.getYear() < 2000) {
      this.priceWithDiscount = this.car.getPrice() * 90;
      this.car.setPrice(this.priceWithDiscount);
    } else {
      this.car.setPrice(price);
    }

    if (this.consumer.getIncome() < 5000) {
      this.priceWithDiscount = this.car.getPrice() * 90;
      return this.car.setPrice(this.priceWithDiscount);
    } else {
      return this.car.setPrice(this.car.getPrice());
    }
  }

  public addComission(value: number): number {
    return this.attendant.setCommission(value * 0.02);
  }
}
