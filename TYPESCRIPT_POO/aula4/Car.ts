export class Car {
  private model: string;
  private year: number;
  private price: number;

  constructor(model: string, year: number, price: number) {
    this.model = model;
    this.year = year;
    this.price = price;
  }

  public getYear(): number {
    return this.year;
  }

  public getPrice(): number {
    return this.price;
  }

  public getModel(): string {
    return this.model;
  }

  public setModel(model: string): void {
    this.model = model;
  }
  public setYear(year: number): void {
    this.year = year;
  }
  public setPrice(price: number): number {
    return (this.price = price);
  }
}
