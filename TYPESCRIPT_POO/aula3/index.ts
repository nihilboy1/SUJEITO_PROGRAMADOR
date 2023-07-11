interface Rat {
  nome: string;
  idade: number;
  fugir: () => void;
}

class Mamifero {
  quantidadePatas: number;

  constructor(quantidadePatas: number) {
    this.quantidadePatas = quantidadePatas;
  }

  andar() {
    console.log(`O mamífero está andando com ${this.quantidadePatas} patas.`);
  }
}
// é possivel usar extends e implements na mesma classe
class Jerry extends Mamifero implements Rat {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number, quantidadePatas: number) {
    super(quantidadePatas);
    this.nome = nome;
    this.idade = idade;
  }

  fugir() {
    // aqui eu estou implementando o método setado pela 'interface'
  }

  andar() {
    console.log("Jerry andando com ", this.quantidadePatas, "patas");
  }
}
