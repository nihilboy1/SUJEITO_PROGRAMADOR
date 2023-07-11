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

  public giveDiscount(price: number): number {
    if (this.car.getYear() < 2000) {
      this.priceWithDiscount = this.car.getPrice() * 0.9;
      this.car.setPrice(this.priceWithDiscount);
    } else {
      this.car.setPrice(price);
    }

    if (this.consumer.getIncome() < 5000) {
      this.priceWithDiscount = this.car.getPrice() * 0.9;
      return this.car.setPrice(this.priceWithDiscount);
    } else {
      return this.car.setPrice(this.car.getPrice());
    }
  }

  public addComission(value: number): number {
    return this.attendant.setCommission(value * 0.02);
  }

  public PurchaseDetails(): void {
    console.log(
      `Consumer: ${this.consumer.getName()} 
      \nModel: ${this.car.getModel()}, Year: ${this.car.getYear()}, Price: ${this.car.getPrice()} 
      \nAttendant: ${this.attendant.getCommission()}`
    );
  }
}
