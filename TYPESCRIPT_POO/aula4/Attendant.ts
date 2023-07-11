export class Attendant {
  private name: string;
  private commission: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getCommission(): number {
    return this.commission;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setCommission(commission: number) {
    this.commission = commission;
  }
}
