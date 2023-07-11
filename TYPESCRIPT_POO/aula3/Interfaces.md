Em Programação Orientada a Objetos (POO), uma interface é um contrato que define um conjunto de métodos e propriedades que uma classe deve implementar. No TypeScript, uma interface é uma forma de definir a estrutura e o comportamento esperados de um objeto.

A interface no TypeScript é declarada usando a palavra-chave `interface` seguida pelo nome da interface e, em seguida, um conjunto de propriedades e métodos que devem ser implementados pelas classes que a utilizam. Por exemplo:

```typescript
interface Animal {
  nome: string;
  mover(): void;
  fazerBarulho(): void;
}
```

Nesse exemplo, definimos uma interface chamada `Animal`, que possui duas propriedades: `nome`, do tipo `string`, e dois métodos: `mover()` e `fazerBarulho()`, ambos sem argumentos e sem retorno (`void`).

Quando uma classe implementa uma interface, ela deve fornecer uma implementação para todos os métodos e propriedades definidos na interface. Isso garante que a classe atenda aos requisitos da interface. Por exemplo:

```typescript
class Cachorro implements Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  mover() {
    console.log(`${this.nome} está se movendo.`);
  }

  fazerBarulho() {
    console.log(`${this.nome} está fazendo barulho.`);
  }
}
```

Neste exemplo, a classe `Cachorro` implementa a interface `Animal` e fornece uma implementação para os métodos `mover()` e `fazerBarulho()`. A classe também possui uma propriedade `nome` do tipo `string`. Ao implementar a interface, a classe garante que possui todas as propriedades e métodos necessários.

O uso de interfaces no TypeScript permite definir contratos claros entre diferentes partes do código. Isso promove o reuso de código e ajuda a garantir a consistência e a interoperabilidade entre as classes. Além disso, o TypeScript verifica em tempo de compilação se todas as propriedades e métodos da interface foram implementados corretamente, ajudando a evitar erros comuns.
