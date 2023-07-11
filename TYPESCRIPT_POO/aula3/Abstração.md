Uma classe abstrata é uma classe que não pode ser instanciada diretamente, servindo como um modelo para outras classes derivadas. Ela fornece uma estrutura comum e define a implementação básica de certos métodos, enquanto permite que as classes derivadas personalizem e implementem esses métodos de forma específica.

Para definir uma classe abstrata em TypeScript, você usa a palavra-chave `abstract` antes da declaração da classe. Veja um exemplo:

```typescript
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract makeSound(): void;

  public move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}
```

Nesse exemplo, a classe `Animal` é definida como uma classe abstrata usando a palavra-chave `abstract`. Ela possui uma propriedade `name` e um método abstrato `makeSound()`, que não tem uma implementação definida na classe abstrata. A classe abstrata também possui um método `move()` que possui uma implementação padrão.

Observe que métodos abstratos não podem ter uma implementação na classe abstrata. As classes derivadas são responsáveis por implementar esses métodos abstratos de acordo com sua própria lógica.

Ao criar uma classe derivada de uma classe abstrata, você deve fornecer uma implementação para todos os métodos abstratos da classe base. Veja um exemplo:

```typescript
class Dog extends Animal {
  public makeSound(): void {
    console.log(`${this.name} barks.`);
  }
}

const dog: Animal = new Dog("Buddy");
dog.makeSound(); // "Buddy barks."
dog.move(10); // "Buddy moved 10 meters."
```

Nesse exemplo, a classe `Dog` estende a classe abstrata `Animal` e implementa o método abstrato `makeSound()` de acordo com o comportamento específico de um cachorro.

As classes abstratas são úteis quando você deseja definir uma estrutura comum e comportamentos básicos para um grupo de classes relacionadas, mas permite que cada classe derivada forneça sua própria implementação específica. Elas promovem a consistência do código e a reutilização, fornecendo um ponto de partida para classes especializadas. Além disso, as classes abstratas também podem conter membros não abstratos, como propriedades e métodos com implementação padrão, que podem ser compartilhados por todas as classes derivadas.
