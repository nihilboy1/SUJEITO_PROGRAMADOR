export class Consumer {
  private name: string;
  private income: number;

  constructor(name: string, income: number) {
    this.name = name;
    this.income = income;
  }

  public getName(): string {
    return this.name;
  }

  public getIncome(): number {
    return this.income;
  }

  public setName(name: string) {
    return (this.name = name);
  }

  public setIncome(income: number) {
    return (this.income = income);
  }
}
