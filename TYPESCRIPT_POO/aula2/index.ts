class Car {
  private cor: string;

  constructor(cor: string) {
    this.cor = cor;
  }

  public getCor(): string {
    return this.cor;
  }
  // esse método só pode ser acessado pela própria classe, suas instancias ou instancias e classes filhas
  // se for private aqui, o método só pode ser acessado pela própria classe
  protected move(km: number) {
    console.log("move, move", km);
  }
}

class Honda extends Car {
  private pneu: boolean;

  constructor(pneu: boolean, cor: string) {
    super(cor);
    this.pneu = pneu;
  }

  public hondaMove(km: number) {
    super.move(km);
  }
}

const hondaCar = new Honda(true, "black");

hondaCar.hondaMove(25);
